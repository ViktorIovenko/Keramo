"""from django.urls import path, include

from goods import views

app_name = 'goods'

urlpatterns = [

    path('search/', views.shop, name='search'),
    path('', views.shop, name="shop_all"),
    path('<slug:category_slug>/', views.shop, name='shop'),
    # path('<slug:category_slug>/<int:page>', views.shop, name='shop'),
    path('product/<slug:product_slug>/', views.product, name="product"),

]"""
from django.urls import path
from . import views

app_name = 'goods'

urlpatterns = [
    path('search/', views.shop, name='search'),
    path('', views.shop, name='shop_all'),
    path('<slug:category_slug>/', views.shop, name='shop'),
    path('product/<slug:product_slug>/', views.product, name='product'),
]







