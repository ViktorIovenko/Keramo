from django.urls import path, include

from goods import views

app_name = 'goods'

urlpatterns = [

    path('', views.shop, name= "shop"),
    path('product/', views.product, name="product"),
]
