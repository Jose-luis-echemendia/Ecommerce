from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Order, OrderItem

from django.db.models import Q

from django.shortcuts import  get_object_or_404


class ListOrdersView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        try:
            orders = Order.objects.order_by("-date_issued").filter(user=user)
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

            return Response({"orders": result}, status=status.HTTP_200_OK)
        except:
            return Response(
                {"error": "Something went wrong when retrieving orders"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )



class ListOrderDetailView(APIView):
    def get(self, request, transactionId, format=None):
        user = self.request.user


        try:
            if Order.objects.filter(user=user, transaction_id=transactionId).exists():
                order = Order.objects.get(user=user, transaction_id=transactionId)
                result = {}
                result["status"] = order.status
                result["transaction_id"] = order.transaction_id
                result["tax"] = order.tax
                result["amount_products"] = order.amount_products
                result["amount_total"] = order.amount_total
                result["coupon_name"] = order.coupon_name
                result["full_name"] = order.full_name
                result["address_line_1"] = order.address_line_1
                result["apartament"] = order.apartament
                result["city"] = order.city
                result["province"] = order.province
                result["postalCode"] = order.postalCode
                result["country"] = order.country
                result["telephone_number"] = order.telephone_number
                result["shipping_name"] = order.shipping_name
                result["shipping_time"] = order.shipping_time
                result["shipping_price"] = order.shipping_price
                result["date_issued"] = order.date_issued

                order_items = OrderItem.objects.order_by("-date_added").filter(
                    order=order
                )
                result["order_items"] = []

                for order_item in order_items:
                    sub_item = {}

                    sub_item["name"] = order_item.name
                    sub_item["price"] = order_item.price
                    sub_item["count"] = order_item.count
                    sub_item["photos"] = [photo.photo.url for photo in order_item.product.photos.all()] 

                    result["order_items"].append(sub_item)
                    
                return Response({"order": result}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "Order with this transaction ID does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        except Exception as e:
            return Response(
                {"error": "Something went wrong when retrieving order detail"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
