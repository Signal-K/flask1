from rest_framework import serializers
from .models import Book

class BookSerializer(serializer.ModelSerializer):
    class Meta:
        model = Book
        fields = {
            "pk", # primary key
            "title", # from models.py
            "num_pages",
            "isbn13", # can potentially be used as pk since it's a unique identifier/number as well
        }
        extra_kwargs = {
            "isbn13": {"required": False}, # Anything that can be blank in models.py for library django app
        }