[Documentation](http://ar.skinetics.tech/stellarios/compass)
[Back to main repo](https://github.com/signal-k/flask1)
[Notion link](https://www.notion.so/skinetics/Simple-Python-API-Stuff-986f48eb29d34afcbe0824a199acf2aa)

** Move this to Jupyter Notebook

```py
>>> import requests
>>> response = requests.get("https://thedogapi.com/v1/breeds@")
>>> response.headers
{'Date': 'Mon, 19 Apr 2021 01:34:42 GMT', 'Content-Type': 'text/html; charset=UTF-8', 'Transfer-Encoding': 'chunked', 'Connection': 'keep-alive', 'Set-Cookie': '__cfduid=d6ea3f797968e428ad8b29b60979050a81618796082; expires=Wed, 19-May-21 01:34:42 GMT; path=/; domain=.thedogapi.com; HttpOnly; SameSite=Lax', 'Cache-Control': 'public, max-age=0, must-revalidate', 'Etag': '"f74fd65d479b542829dd215458367b73-ssl-df"', 'Content-Encoding': 'gzip', 'Age': '0', 'Vary': 'Accept-Encoding', 'X-NF-Request-ID': 'b0262214-6ee5-44d2-a0aa-5f38fb44d29c-40503038', 'CF-Cache-Status': 'DYNAMIC', 'cf-request-id': '09895d0c5500000a74c9321000000001', 'Expect-CT': 'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"', 'Report-To': '{"max_age":604800,"group":"cf-nel","endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report?s=Cc0khacQ7iwsF6pkmOTns2rNWY%2F9K6H9TqtV...}
```