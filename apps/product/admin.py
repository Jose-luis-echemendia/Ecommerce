from django.contrib import admin
from .models import Product, ProductPhoto, Color, ProductDetail, Size

# Register your models here.

class ColorAdmin(admin.ModelAdmin):
    list_display = ('name',)

class SizeAdmin(admin.ModelAdmin):
    list_display = ('name',)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'quantity', 'compare_price', 'price', 'category')
    list_display_links = ('id', 'name', 'category')
    list_filter = ('category', )
    list_editable = ('compare_price', 'price', 'quantity', )
    search_fields = ('name', 'category', 'price', 'sold', 'date_created')
    filter_horizontal = ('photos', 'colors', 'details', 'sizes')
    list_per_page = 25
    

class ProductDetailsAdmin(admin.ModelAdmin):
    list_display = ('name', )
    list_display_links = ('name',)
    list_filter = ('name', )
    raw_id_fileds = ('name', )
    list_per_page = 25
    
class ProductPhotoAdmin(admin.ModelAdmin):
    #trabajar aqui
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(product__isnull=False)
    
    readonly_fields = ('image_tag', )
    list_display = ('product', 'photo', 'image_tag')
    list_display_links = ('product',)
    list_filter = ('product', )
    raw_id_fileds = ('product',)
    list_per_page = 25
    

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductDetail, ProductDetailsAdmin)

admin.site.register(ProductPhoto, ProductPhotoAdmin)    

admin.site.register(Color, ColorAdmin)
admin.site.register(Size, SizeAdmin)