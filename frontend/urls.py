from django.urls import path
from .views import index, fastlink, dataInit

urlpatterns = [
    path('', index),
    path('fastlink/', fastlink),
    path('init/', dataInit),
]