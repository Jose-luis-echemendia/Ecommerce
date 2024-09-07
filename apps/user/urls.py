from django.urls import path
from .views import GetPermissionsGroupView


urlpatterns = [
    path('getPermissionsGroup', GetPermissionsGroupView.as_view()),
    
]