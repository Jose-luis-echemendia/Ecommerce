from django.db import models
from apps.product.models import Product
from .countries import Countries
from datetime import datetime
from django.utils import timezone
from django.contrib.auth import get_user_model
User = get_user_model()


class Order(models.Model):
    class OrderStatus(models.TextChoices):
        completed = 'completed'
        not_processed = 'not_processed'
        processed = 'processed'
        shipping = 'shipped'
        delivered = 'delivered'
        cancelled = 'cancelled'
    
    status = models.CharField(
        max_length=50, choices=OrderStatus.choices, default=OrderStatus.not_processed)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transaction_id = models.CharField(max_length=255, unique=True)
    amount_products = models.DecimalField(max_digits=8, decimal_places=2)
    amount_total = models.DecimalField(max_digits=8, decimal_places=2)
    tax = models.DecimalField(max_digits=3, decimal_places=2)
    coupon_name = models.CharField(max_length=20)
    full_name = models.CharField(max_length=255)
    address_line_1 = models.CharField(max_length=255)
    apartament = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255)
    province = models.CharField(max_length=255)
    postalCode = models.CharField(max_length=20)
    country = models.CharField(
        max_length=255, choices=Countries.choices, default=Countries.Peru)
    telephone_number = models.CharField(max_length=255)
    cardNumber = models.CharField(max_length=20)
    nameCard = models.CharField(max_length=20)
    expirationData = models.CharField(max_length=20)
    CVC = models.CharField(max_length=20)
    shipping_name = models.CharField(max_length=255)
    shipping_time = models.CharField(max_length=255)
    shipping_price = models.DecimalField(max_digits=5, decimal_places=2)
    date_issued = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return self.transaction_id


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    count = models.IntegerField()
    date_added = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name