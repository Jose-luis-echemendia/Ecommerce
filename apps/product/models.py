from django.db import models
from datetime import datetime
from apps.category.models import Category
from django.utils.html import format_html


class Color(models.Model):
    options = (
        ("black", "black"),
        ("while", "while"),
        ("red","red"),
        ("gray","gray"),
        ("stone","stone"),
        ("yellow","yellow"),
        ("rose","rose"),
        ("purpura","purpura"),
    )
    
    name = models.CharField(max_length=10, choices=options, default="black", unique=True)

    def __str__(self):
        return self.name
    
class Size(models.Model):
    options = (
        ("XL", "XL"),
        ("X", "X"),
        ("M", "M"),
        ("XS", "XS"),
        ("XSS", "XSS"),
        ("34", "34"),
        ("35", "35"),
        ("36", "36"),
        ("37", "37"),
        ("38", "38"),
        ("39", "39"),
        ("40", "40"),
        ("41", "42"),
    )
    
    name = models.CharField(max_length=10, choices=options, default="xl", unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=255)
    colors = models.ManyToManyField(Color, related_name='product_colors', blank=True)
    sizes = models.ManyToManyField(Size, related_name='product_zises', blank=True)
    photos = models.ManyToManyField('ProductPhoto', related_name='product_photos', blank=True)
    description = models.TextField()
    details = models.ManyToManyField('ProductDetail', related_name='product_details',blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    compare_price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    favorite = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)
    
    def __str__(self):
        return self.name
    
    
class ProductDetail(models.Model):
    product = models.ForeignKey(Product, related_name='product_details', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    items = models.TextField()

    def __str__(self):
        return self.name

    
    
    
class ProductPhoto(models.Model):
    product = models.ForeignKey(Product, related_name='product_photos', on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='media/photos/%Y/%m/')

    def __str__(self):
        return self.photo.url

    def image_tag(self):
        if self.photo:
            return format_html('<img src="{}" alt="{}" width="200" height="200" />'.format(self.photo.url, self.product.name))
        else: return ""
    image_tag.short_description = 'Image'