from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('backend/', include('api.urls')),
    path('', include('frontend.urls')),
    path('user/', include('accounts.urls')),
]
