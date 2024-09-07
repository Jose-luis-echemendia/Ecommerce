from django.urls import path

from .views import *

urlpatterns = [
    path('detail/<productID>', ProductDetailView.as_view()),
    path('get-products', ListProductsView.as_view()),
    path('search', ListSearchView.as_view()),
    path('related/<productId>', ListRelatedView.as_view()),
    path('by/search', ListBySearchView.as_view()),
    
    path('colors', ListColorsView.as_view()),
    path('sizes', ListSizesView.as_view()),
]