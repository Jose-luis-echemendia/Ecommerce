from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from apps.product.models import Product, Color, Size
from apps.product.serializers import ProductSerializer, ColorsSerializer, SizeSerializer
from apps.category.models import Category
from apps.reviews.models import Review

from django.db.models import Q

from django.shortcuts import  get_object_or_404


class ListColorsView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        if Color.objects.all().exists():
            colors = Color.objects.all()
            colors = ColorsSerializer(colors, many=True).data
            
            return Response({'colors': colors}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No colors found'}, status=status.HTTP_404_NOT_FOUND)


class ListSizesView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        if Size.objects.all().exists():
            sizes = Size.objects.all()
            sizes = SizeSerializer(sizes, many=True).data
            
            return Response({'sizes': sizes}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No sizes found'}, status=status.HTTP_404_NOT_FOUND)



class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, productID, format=None):
        try:
            #product = get_object_or_404(Product, slug = productSlug)
            product_id=int(productID)
        
        except:
            return Response(
                {'error': 'Product ID must be an integer or product not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        if Product.objects.filter(id=product_id).exists():
            product = Product.objects.get(id=product_id)
            
            
            reviews = Review.objects.filter(product=product)
        
            rating = 0.0
            for review in reviews:
                rating+=float(review.rating)
            product = ProductSerializer(product).data
            if(len(reviews)==0):
                product['rating']=0.0
            else:
                product['rating'] = rating/len(reviews)
        
        
                
            for detail in product['details']:
                items_str = detail['items'].replace('\r\n', '')  # Eliminar los caracteres de nueva línea
                items_list = [item.strip() for item in items_str.split(",")]  # Convertir la cadena en una lista de elementos
                items_list[-1] = items_list[-1].strip("'")  # Eliminar la comilla simple al final del último elemento
                detail['items'] = items_list
        
            
            return Response({'product':product}, status=status.HTTP_200_OK)
        
        else:
            return Response({'error': 'Product with this ID does not exist'}, status=status.HTTP_404_NOT_FOUND)
            

class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):

        sortBy = request.query_params.get('sortBy')
        
        if not (sortBy == 'date_created' or sortBy == 'price' or sortBy == 'sold' or sortBy == 'name' or sortBy == 'favorite'):
            sortBy = 'date_created'
        
        order = request.query_params.get('order')
        limit = request.query_params.get('limit')
        
        if not limit:
            limit = 6
        
        try:
            limit = int(limit)
        except:
            return Response(
                {'error': 'Limit must be an integer'},
                status=status.HTTP_404_NOT_FOUND
            )

        if limit <= 6:
            limit = 6
            
        if(sortBy == 'favorite'):
            products = Product.objects.exclude(favorite=0)
        else:
            products = Product.objects.all()
            
        if order == 'desc':
            sortBy = '-' + sortBy
            products = products.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            products = products.order_by(sortBy).all()[:int(limit)]    
        else:
            products = products.order_by(sortBy).all()
            
            
        

        products = ProductSerializer(products, many=True).data
    
        for product in products:
            for detail in product['details']:
                items_str = detail['items'].replace('\r\n', '')  # Eliminar los caracteres de nueva línea
                items_list = [item.strip() for item in items_str.split(",")]  # Convertir la cadena en una lista de elementos
                items_list[-1] = items_list[-1].strip("'")  # Eliminar la comilla simple al final del último elemento
                detail['items'] = items_list
        
        
        if products:
            return Response({'products': products}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'no products to list'}, status=status.HTTP_404_NOT_FOUND)
            


class ListSearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        search = data['search']

        # Chequear si algo input ocurrio en la busqueda
        if len(search) == 0:
            # mostrar todos los productos si no hay input en la busqueda
            search_results = Product.objects.order_by('-date_created').all()
        else:
            # Si hay criterio de busqueda, filtramos con dicho criterio usando Q
            search_results = Product.objects.filter(
                Q(description__icontains=search) | Q(name__icontains=search)
            )

        if category_id == 0:
            search_results = ProductSerializer(search_results, many=True)
            return Response(
                {'search_products': search_results.data},
                status=status.HTTP_200_OK)
        

        # revisar si existe categoria
        if not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'Category not found'},
                status=status.HTTP_404_NOT_FOUND)

        category = Category.objects.get(id=category_id)

        # si la categoria tiene apdre, fitlrar solo por la categoria y no el padre tambien
        if category.parent:
            search_results = search_results.order_by(
                '-date_created'
            ).filter(category=category)
        
        else:
            # si esta categoria padre no tiene hijjos, filtrar solo la categoria
            if not Category.objects.filter(parent=category).exists():
                search_results = search_results.order_by(
                    '-date_created'
                ).filter(category=category)
        
            else:
                categories = Category.objects.filter(parent=category)
                filtered_categories = [category]

                for cat in categories:
                    filtered_categories.append(cat)
                
                filtered_categories = tuple(filtered_categories)

                search_results = search_results.order_by(
                    '-date_created'
                ).filter(category__in=filtered_categories)
        
        search_results = ProductSerializer(search_results, many=True)
        return Response({'search_products': search_results.data}, status=status.HTTP_200_OK)


class ListRelatedView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, productId, format=None):
        try:
            product_id = int(productId)
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        
        # Existe product id
        if not Product.objects.filter(id=product_id).exists():
            return Response(
                {'error': 'Product with this product ID does not exist'},
                status=status.HTTP_404_NOT_FOUND)
            
        category = Product.objects.get(id=product_id).category

        if Product.objects.filter(category=category).exists():
            # Si la categoria tiene padrem filtrar solo por la categoria y no el padre tambien
            if category.parent:
                related_products = Product.objects.order_by(
                    '-sold'
                ).filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_products = Product.objects.order_by(
                        '-sold'
                    ).filter(category=category)
                
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)

                    filtered_categories = tuple(filtered_categories)
                    related_products = Product.objects.order_by(
                        '-sold'
                    ).filter(category__in=filtered_categories)
                
            #Excluir producto que estamos viendo
            related_products = related_products.exclude(id=product_id)
            related_products = ProductSerializer(related_products, many=True)

            if len(related_products.data) > 3:
                return Response(
                    {'related_products': related_products.data[:4]},
                    status=status.HTTP_200_OK)
            elif len(related_products.data) > 0:
                return Response(
                    {'related_products': related_products.data},
                    status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'No related products found'},
                    status=status.HTTP_200_OK)
            
        else:
            return Response(
                {'error': 'No related products found'},
                status=status.HTTP_200_OK)


class ListBySearchView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        if(data['category_id']) == 'all':
            data['category_id'] = 0
        try:
            category_id = int(data['category_id'])
        except:
            return Response(
                {'error': 'Category ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)
        price_range = data['price_range']
        sort_by = data['sort_by']

        if not (sort_by == 'date_created' or sort_by == 'price' or sort_by == 'sold' or sort_by == 'name'):
            sort_by = 'date_created'

        order = data['order']
        color = data['color']
        sizes= data['sizes']

        ## Si categoryID es = 0, filtrar todas las categorias
        if category_id == 0:
            product_results = Product.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {'error': 'This category does not exist'},
                status=status.HTTP_404_NOT_FOUND)
        else:
            category = Category.objects.get(id=category_id)
            if category.parent:
                # Si la categoria tiene padrem filtrar solo por la categoria y no el padre tambien
                product_results = Product.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    product_results = Product.objects.filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)

                    filtered_categories = tuple(filtered_categories)
                    product_results = Product.objects.filter(
                        category__in=filtered_categories)

        # Filtrar por precio
        if price_range == '1 - 19':
            product_results = product_results.filter(price__gte=1)
            product_results = product_results.filter(price__lt=20)
        elif price_range == '20 - 39':
            product_results = product_results.filter(price__gte=20)
            product_results = product_results.filter(price__lt=40)
        elif price_range == '40 - 59':
            product_results = product_results.filter(price__gte=40)
            product_results = product_results.filter(price__lt=60)
        elif price_range == '60 - 79':
            product_results = product_results.filter(price__gte=60)
            product_results = product_results.filter(price__lt=80)
        elif price_range == 'More than 80':
            product_results = product_results.filter(price__gte=80)
        
        #Filtrar producto por sort_by
        if order == 'desc':
            sort_by = '-' + sort_by
            product_results = product_results.order_by(sort_by)
        elif order == 'asc':
            product_results = product_results.order_by(sort_by)
        else:
            product_results = product_results.order_by(sort_by)
        

        #Filtrar por colores
        if color != 'all' and Color.objects.filter(name=color).exists():
            
            color = Color.objects.get(name=color)
            product_results = product_results.filter(colors=color)
            
        if sizes != 'all' and Size.objects.filter(name=sizes).exists():
            
            sizes = Size.objects.get(name=sizes)
            product_results = product_results.filter(sizes=sizes)
        
        product_results = ProductSerializer(product_results, many=True)
        
        if len(product_results.data) > 0:
            return Response(
                {'filtered_products': product_results.data},
                status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'No products found'},
                status=status.HTTP_200_OK)