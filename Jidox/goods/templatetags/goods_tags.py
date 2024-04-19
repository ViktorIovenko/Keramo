from django import template

from goods.models import Categories, Teg, Tile, Line, Products


register = template.Library()
@register.simple_tag()
def teg_categories():
    return Categories.objects.all()
