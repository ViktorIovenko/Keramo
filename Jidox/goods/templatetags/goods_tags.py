from django import template

from goods.models import Categories, Teg, Tile, Line, Product


register = template.Library()
@register.simple_tag()
def teg_categories():
    return Categories.objects.all()
