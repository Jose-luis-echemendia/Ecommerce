from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.cart.models import Cart, CartItem
from apps.coupons.models import FixedPriceCoupon, PercentageCoupon
from apps.orders.models import Order, OrderItem
from apps.product.models import Product
from apps.shipping.models import Shipping
from django.core.mail import send_mail
from .createTransaction import createTransaction


class GetPaymentTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        tax = request.query_params.get("tax")
        tax = float(tax)

        shipping_id = request.query_params.get("shipping_id")
        shipping_id = str(shipping_id)

        coupon_name = request.query_params.get("coupon_name")
        coupon_name = str(coupon_name)

        try:
            cart = Cart.objects.get(user=user)

            # revisar si existen iitems
            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {"error": "Need to have items in cart"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            cart_items = CartItem.objects.filter(cart=cart)

            for cart_item in cart_items:
                if not Product.objects.filter(id=cart_item.product.id).exists():
                    return Response(
                        {"error": "A proudct with ID provided does not exist"},
                        status=status.HTTP_404_NOT_FOUND,
                    )
                if int(cart_item.count) > int(cart_item.product.quantity):
                    return Response(
                        {"error": "Not enough items in stock"},
                        status=status.HTTP_200_OK,
                    )

                total_amount = 0.0
                total_compare_amount = 0.0

                for cart_item in cart_items:
                    total_amount += float(cart_item.product.price) * float(
                        cart_item.count
                    )
                    total_compare_amount += float(
                        cart_item.product.compare_price
                    ) * float(cart_item.count)

                total_compare_amount = round(total_compare_amount, 2)
                original_price = round(total_amount, 2)

                # Cupones
                if coupon_name != "":
                    # Revisar si cupon de precio fijo es valido
                    if FixedPriceCoupon.objects.filter(
                        name__iexact=coupon_name
                    ).exists():
                        fixed_price_coupon = FixedPriceCoupon.objects.get(
                            name=coupon_name
                        )
                    discount_amount = float(fixed_price_coupon.discount_price)
                    if discount_amount < total_amount:
                        # total_amount -= discount_amount
                        total_after_coupon = total_amount - discount_amount

                    elif PercentageCoupon.objects.filter(
                        name__iexact=coupon_name
                    ).exists():
                        percentage_coupon = PercentageCoupon.objects.get(
                            name=coupon_name
                        )
                        discount_percentage = float(
                            percentage_coupon.discount_percentage
                        )

                        if discount_percentage > 1 and discount_percentage < 100:
                            # total_amount -= total_amount * (discount_percentage / 100)
                            total_after_coupon = total_amount - total_amount * (
                                discount_percentage / 100
                            )

                # Impuesto estimado
                estimated_tax = round((total_amount * tax), 2)

                total_amount += total_amount * tax

                total_after_coupon += estimated_tax

                shipping_cost = 0.0
                # verificar que el envio sea valido

                if Shipping.objects.filter(id__iexact=shipping_id).exists():
                    # agregar shipping a total amount
                    shipping = Shipping.objects.get(id=shipping_id)
                    shipping_cost = shipping.price
                    total_amount += float(shipping_cost)
                    total_after_coupon += float(shipping_cost)

                total_amount = round(total_amount, 2)

                # Total despues del cupon
                total_after_coupon = round(total_after_coupon, 2)

                return Response(
                    {
                        "original_price": f"{original_price:.2f}",
                        "total_after_coupon": f"{total_after_coupon:.2f}",
                        "total_amount": f"{total_amount:.2f}",
                        "total_compare_amount": f"{total_compare_amount:.2f}",
                        "estimated_tax": f"{estimated_tax:.2f}",
                        "shipping_cost": f"{shipping_cost:.2f}",
                    },
                    status=status.HTTP_200_OK,
                )

        except:
            return Response(
                {
                    "error": "Something went wrong when retrieving payment total information"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ProcessPaymentView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        tax = data["taxe"]

        # nonce = data["nonce"]
        shipping_id = str(data["shippingId"])
        coupon_name = str(data["couponName"])
        originalPrice=str(data["originalPrice"])
        total_amount = float(data["totalCost"])

        full_name = data["firstName"] + " " + data["lastName"]
        address_line_1 = data["address"]
        apartament = data["apartament"]
        city = data["city"]
        province = data["province"]
        postalCode = data["postalCode"]
        country = data["country"]
        telephone_number = data["phone"]
        cardNumber = data["cardNumber"]
        nameCard = data["nameCard"]
        expirationData = data["expirationDate"]
        CVC = data["CVC"]

        # revisar si datos de shipping son validos
        if not Shipping.objects.filter(id__iexact=shipping_id).exists():
            return Response(
                {"error": "Invalid shipping option"}, status=status.HTTP_404_NOT_FOUND
            )

        cart = Cart.objects.get(user=user)

        # revisar si usuario tiene items en carrito
        if not CartItem.objects.filter(cart=cart).exists():
            return Response(
                {"error": "Need to have items in cart"},
                status=status.HTTP_404_NOT_FOUND,
            )

        cart_items = CartItem.objects.filter(cart=cart)

        # revisar si hay stock

        for cart_item in cart_items:
            if not Product.objects.filter(id=cart_item.product.id).exists():
                return Response(
                    {"error": "Transaction failed, a proudct ID does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            if int(cart_item.count) > int(cart_item.product.quantity):
                return Response(
                    {"error": "Not enough items in stock"}, status=status.HTTP_200_OK
                )

        """
        total_amount = 0.0

        for cart_item in cart_items:
            total_amount += float(cart_item.product.price) * float(cart_item.count)

        # Cupones
        if coupon_name != "":
            if FixedPriceCoupon.objects.filter(name__iexact=coupon_name).exists():
                fixed_price_coupon = FixedPriceCoupon.objects.get(name=coupon_name)
                discount_amount = float(fixed_price_coupon.discount_price)

                if discount_amount < total_amount:
                    total_amount -= discount_amount

            elif PercentageCoupon.objects.filter(name__iexact=coupon_name).exists():
                percentage_coupon = PercentageCoupon.objects.get(name=coupon_name)
                discount_percentage = float(percentage_coupon.discount_percentage)

                if discount_percentage > 1 and discount_percentage < 100:
                    total_amount -= total_amount * (discount_percentage / 100)

        total_amount += total_amount * tax
        """
        if coupon_name == "":
            coupon_name = "DEFAULT"

        shipping = Shipping.objects.get(id=int(shipping_id))

        shipping_name = shipping.name
        shipping_time = shipping.time_to_delivery
        shipping_price = shipping.price

        # total_amount += float(shipping_price)
        # total_amount = round(total_amount, 2)

        for cart_item in cart_items:
            update_product = Product.objects.get(id=cart_item.product.id)
            # encontrar cantidad despues de coompra
            quantity = int(update_product.quantity) - int(cart_item.count)
            # obtener cantidad de producto por vender
            sold = int(update_product.sold) + int(cart_item.count)
            # actualizar el producto
            Product.objects.filter(id=cart_item.product.id).update(
                quantity=quantity, sold=sold
            )

        # crear orden
        try:
            order = Order.objects.create(
                user=user,
                transaction_id=createTransaction(
                    postalCode, country, shipping_name, shipping_time
                ),
                amount_products=originalPrice,
                amount_total=total_amount,
                tax=tax,
                coupon_name=coupon_name,
                full_name=full_name,
                address_line_1=address_line_1,
                apartament=apartament,
                city=city,
                province=province,
                postalCode=postalCode,
                country=country,
                telephone_number=telephone_number,
                shipping_name=shipping_name,
                shipping_time=shipping_time,
                shipping_price=float(shipping_price),
                cardNumber=cardNumber,
                nameCard=nameCard,
                expirationData=expirationData,
                CVC=CVC,
            )
        except Exception as e:
            return Response(
                {"error": "Transaction succeeded but failed to create the order"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        for cart_item in cart_items:
            try:
                # agarrar el producto
                product = Product.objects.get(id=cart_item.product.id)
                OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    price=cart_item.product.price,
                    count=cart_item.count,
                )
            except:
                return Response(
                    {
                        "error": "Transaction succeeded and order created, but failed to create an order item"
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        try:
            send_mail(
                "Your Order Details",
                "Hey "
                + full_name
                + ","
                + "\n\nWe recieved your order!"
                + "\n\nGive us some time to process your order and ship it out to you."
                + "\n\nYou can go on your user dashboard to check the status of your order."
                + "\n\nSincerely,"
                + "\nShop Time",
                "mail@ninerogues.com",
                [user.email],
                fail_silently=False,
            )
        except:
            return Response(
                {
                    "error": "Transaction succeeded and order created, but failed to send email"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        try:
            # Vaciar carrito de compras
            CartItem.objects.filter(cart=cart).delete()
            # Actualizar carrito
            Cart.objects.filter(user=user).update(total_items=0)
        except:
            return Response(
                {
                    "error": "Transaction succeeded and order successful, but failed to clear cart"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"success": "Transaction successful and order was created"},
            status=status.HTTP_200_OK,
        )



class GetHistoryPaymentView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            orders = Order.objects.filter(user=user, status=Order.OrderStatus.completed).order_by("-date_issued")
            result = []

            for order in orders:
                item = {}

                products_information = []
                order_items = OrderItem.objects.filter(order=order)

                for order_item in order_items:

                    item_information = {}

                    item_information["product_name"] = order_item.product.name
                    item_information["count"] = order_item.count
                    item_information["price"] = order_item.price
                    products_information.append(item_information)

                item["status"] = order.status
                item["products_information"] = products_information
                item["transaction_id"] = order.transaction_id
                item["amount_products"] = order.amount_products
                item["amount_total"] = order.amount_total
                item["shipping_price"] = order.shipping_price
                item["tax"] = order.tax
                item["address_line_1"] = order.address_line_1
                item["date_issued"] = order.date_issued
                item["address_line_1"] = order.address_line_1
                item["city"] = order.city
                item["province"] = order.province

                result.append(item)

            return Response({"historyPayment": result}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(
                {"error": "Something went wrong when retrieving orders"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )