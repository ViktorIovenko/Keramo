"""
URL configuration for attex project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from jidox.view import index_view
from django.conf.urls.static import static
from django.conf import settings
from main import views as main_views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Главная страница
    path('', main_views.index, name='main'),

    # Маршруты приложения main
    path('', include('main.urls')),

    # Маршруты приложения user
    path('user/', include('users.urls')),

    # Маршруты приложения goods
    path('shop/', include('goods.urls')),

    # Dashboard
    path('adminpanel', index_view, name='index'),

    # App
    path('apps/', include('apps.urls')),

    # Custom
    path('custom/', include('custom.urls')),

    # Layouts
    path('layouts/', include('layouts.urls')),

    # Components
    path('components/', include('components.urls')),

    # Accounts
    path('accounts/', include('allauth.urls')),
]

if settings.DEBUG:
    urlpatterns += [
                       path('__debug__/', include('debug_toolbar.urls')),
                   ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

"""from django.contrib import admin
from django.urls import path, include
from jidox.view import index_view
from django.conf.urls.static import static
from main import views
from jidox import settings


urlpatterns = [
    path("admin/", admin.site.urls),

    path('', views.index, name= "main"),
    path('', include('main.urls')),
    path('shop/', include('goods.urls')),

    # Dashboard
    path("adminpanel", view=index_view, name="index"),

    # App
    path("apps/", include("apps.urls")),

    # Custom
    path("custom/", include("custom.urls")),
    # Layouts
    path("layouts/", include("layouts.urls")),

    # Components
    path("components/", include("components.urls")),

    path("accounts/", include("allauth.urls")),
]

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]
    urlpatterns +=static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)"""