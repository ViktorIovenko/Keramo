''' from django.urls import path, include

from main import views

app_name = 'main'

urlpatterns = [

    path('about/', views.about, name= "about"),
    path('contact/', views.contact, name="contact"),
    path('not-found.html/', views.notfound, name="not-found.html"),
]'''
from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('not-found.html', views.notfound, name='not-found.html'),
]







