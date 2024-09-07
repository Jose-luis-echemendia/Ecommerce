from rest_framework import serializers
from .models import Product, ProductDetail, Color, Size

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = ['name', 'items']
        
class ColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'
        
class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    photos = serializers.StringRelatedField(many=True)
    colors = serializers.StringRelatedField(many=True)
    sizes = serializers.StringRelatedField(many=True)
    details = ProductDetailSerializer(many=True)  # Usamos el serializador que acabamos de crear

    class Meta:
        model = Product
        fields = [
            'id',
            'slug',
            'name',
            'colors', 
            'sizes',
            'photos',
            'description', 
            'details',  # Ahora details se serializará correctamente
            'price', 
            'compare_price',
            'category', 
            'quantity', 
            'sold', 
            'favorite',
            'date_created', 
        ]
