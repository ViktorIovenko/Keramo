from django.http import HttpResponse
from django.shortcuts import render

from goods.models import Categories

def index (request) -> HttpResponse:


    context: dict[str,str] = {
        'title': 'Home',
        'content': 'Main page',

    }
    return render(request, 'main/index.html', context)

def about (request) -> HttpResponse:
    context: dict[str,str] = {
        'title': 'About',
        'content': 'Main page'
    }
    return render(request, 'main/about.html', context)

def contact (request) -> HttpResponse:
    context: dict[str,str] = {
        'title': 'Contact',
        'content': 'Main page'
    }
    return render(request, 'main/contact.html', context)

def notfound (request) -> HttpResponse:
    context: dict[str,str] = {
        'title': 'not-found',
        'content': 'Main page'
    }
    return render(request, 'main/not-found.html', context)