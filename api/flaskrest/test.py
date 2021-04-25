# Can also run this off the Python prompt. Referring to file main.py
import requests

BASE = "http://127.0.0.1:5000/"

response = requests.get(BASE + "HelloWorld/liam")
print(response.json())