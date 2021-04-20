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

[**Response & Requests**](https://www.notion.so/skinetics/Request-and-response-6ec116e47509426b8f02df82ccdbde0f)

All interactions between a client and an API are split into a request and a response:

- Requests contain relevant data regarding your API request call, such as the base URL, the endpoint, the method used, the headers
- Responses contain the relevant data returned by the server, including the data or content, the status code, and the headers

`TheDogAPI` 

```python
>>> response = requests.get("https://api.thedogapi.com/v1/breeds")
>>> response
<Response [200]>
>>> response.request
<PreparedRequest [GET]>

>>> request = response.request
>>> request.url
'https://api.thedogapi.com/v1/breeds'
>>> request.path_url
'/v1/breeds'
>>> request.method
'GET'
>>> request.headers
{'User-Agent': 'python-requests/2.24.0', 'Accept-Encoding': 'gzip, deflate',
'Accept': '*/*', 'Connection': 'keep-alive'}

>>> response
<Response [200]>
>>> response.text
'[{"weight":{"imperial":"6 - 13","metric":"3 - 6"},
"height":{"imperial":"9 - 11.5","metric":"23 - 29"},"id":1,
"name":"Affenpinscher", ...}]'
>>> response.status_code
200
>>> response.headers
{'Cache-Control': 'post-check=0, pre-check=0', 'Content-Encoding': 'gzip',
'Content-Type': 'application/json; charset=utf-8',
'Date': 'Sat, 25 Jul 2020 17:23:53 GMT'...}
```

[Getting to know APIs.ipynb](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4244ade6-d46e-4ae1-91f8-5c3477fdb2f1/Getting_to_know_APIs.ipynb)

### HTTP Headers

Used to define a few parameters governing requests and responses:

- Accept = What type of content the client can accept
- Content-Type = What type of content the server will respond with
- User-Agent = What software the client is using to communicate with the server
- Server = What software the server is using to communicate with the client
- Authentication = Who is calling the API and what credentials they have

To inspect the headers of a response, use `response.headers`:

**Custom headers**

Send or request additional custom information from clients. 

- Can use a dictionary to define headers
- Send them along with the request using the `headers` parameter of `.get()`

### HTTP Methods

- POST → Create a new resource → `requests.post()`
- GET → Read an existing resource → `requests.get()`
- PUT → Update an existing resource → `requests.put()`
- DELETE → Delete an existing resource → `requests.delete()`

CRUD operations - Create, read, update delete

```python
requests.post("https://api.thedogapi.com/v1/vreeds/1")
405 Method Not Allowed
```

Not all endpoints (URLs) will allow for Post, Put or Delete methods (especially public APIs)

### Query Parameters

Add `?` before the first query parameter

- Used as filters you can send with API request to narrow down the responses

Generate only male users from randomuser.me:

```python
requests.get("https://randomuser.me/api/?gender=male").json()
```

```python
query_params = {"gender": "male", "nat": "de"}
requests.get("https://randomuser.me/api/", params=query_params).json()
```

<details><summary>Mars API Photos</summary>
```py
flask1/api/1 on 🌱 + 🚀  main via 👾 pyenv (apivenv)took 2s 
➜ python
Python 3.8.5 (default, Jan 27 2021, 15:41:15) 
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import requests
>>> endpoint = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos"
>>> api_key = "DEMO_KEY"
>>> query_params = {"api_key": api_key, "earth_date": "2020-07-01"}
>>> response = requests.get(endpoint, params=query_params)
r>>> response
<Response [200]>
>>> response.json()#
{'photos': [{'id': 754118, 'sol': 2809, 'camera': {'id': 20, 'name': 'FHAZ', 'rover_id': 5, 'full_name': 'Front Hazard Avoidance Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/fcam/FLB_646868981EDR_F0810628FHAZ00337M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754119, 'sol': 2809, 'camera': {'id': 20, 'name': 'FHAZ', 'rover_id': 5, 'full_name': 'Front Hazard Avoidance Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/fcam/FRB_646868981EDR_F0810628FHAZ00337M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754120, 'sol': 2809, 'camera': {'id': 20, 'name': 'FHAZ', 'rover_id': 5, 'full_name': 'Front Hazard Avoidance Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/fcam/FRB_646860144EDR_F0810628FHAZ00337M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754121, 'sol': 2809, 'camera': {'id': 20, 'name': 'FHAZ', 'rover_id': 5, 'full_name': 'Front Hazard Avoidance Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/fcam/FLB_646860144EDR_F0810628FHAZ00337M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754122, 'sol': 2809, 'camera': {'id': 21, 'name': 'RHAZ', 'rover_id': 5, 'full_name': 'Rear Hazard Avoidance Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/rcam/RRB_646869036EDR_F0810628RHAZ00337M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754123, 'sol': 2809, 'camera': {'id': 21, 'name': 'RHAZ', 'rover_id': 5, 'full_name': 'Rear Hazard Avoidance Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/rcam/RLB_646869036EDR_F0810628RHAZ00337M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754124, 'sol': 2809, 'camera': {'id': 21, 'name': 'RHAZ', 'rover_id': 5, 'full_name': 'Rear Hazard Avoidance Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/rcam/RRB_646860185EDR_F0810628RHAZ00337M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754125, 'sol': 2809, 'camera': {'id': 21, 'name': 'RHAZ', 'rover_id': 5, 'full_name': 'Rear Hazard Avoidance Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/rcam/RLB_646860185EDR_F0810628RHAZ00337M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754126, 'sol': 2809, 'camera': {'id': 26, 'name': 'NAVCAM', 'rover_id': 5, 'full_name': 'Navigation Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/ncam/NLB_646869070EDR_F0810628NCAM00229M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754127, 'sol': 2809, 'camera': {'id': 26, 'name': 'NAVCAM', 'rover_id': 5, 'full_name': 'Navigation Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/ncam/NLB_646860211EDR_F0810628NCAM00229M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754128, 'sol': 2809, 'camera': {'id': 26, 'name': 'NAVCAM', 'rover_id': 5, 'full_name': 'Navigation Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/ncam/NRB_646869070EDR_F0810628NCAM00229M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}, {'id': 754129, 'sol': 2809, 'camera': {'id': 26, 'name': 'NAVCAM', 'rover_id': 5, 'full_name': 'Navigation Camera'}, 'img_src': 'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02809/opgs/edr/ncam/NRB_646860211EDR_F0810628NCAM00229M_.JPG', 'earth_date': '2020-07-01', 'rover': {'id': 5, 'name': 'Curiosity', 'landing_date': '2012-08-06', 'launch_date': '2011-11-26', 'status': 'active'}}]}
```
</details>