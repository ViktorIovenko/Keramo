
from django.urls import path
from .views import (
    user_detail_view,
    user_redirect_view,
    user_update_view,
    register,
)

app_name = "users"
urlpatterns = [
    path("register/", register, name="register"),
    path("~redirect/", user_redirect_view, name="redirect"),
    path("~update/", user_update_view, name="update"),
    path("<str:username>/", user_detail_view, name="detail"),
]
