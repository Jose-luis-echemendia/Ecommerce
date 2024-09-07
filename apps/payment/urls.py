from django.urls import path
from .views import GetPaymentTotalView, ProcessPaymentView, GetHistoryPaymentView

app_name="payment"

urlpatterns = [
    path('get-payment-total', GetPaymentTotalView.as_view()),
    path('get-history-payment', GetHistoryPaymentView.as_view()),
    path('make-payment', ProcessPaymentView.as_view()),
]