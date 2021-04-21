import requests

API_KEY = "0xz09MYKjxQEBfQ1tFwheP9YPHU9d7tE" # Could define it in .env file
endpoint = "https://api.giphy.com/v1/gifs/trending" # Endpoint could also just be a url in the Giphy Explorer - developers.giphy.com/explorer -> https://api.giphy.com/v1/gifs/search?api_key=0xz09MYKjxQEBfQ1tFwheP9YPHU9d7tE&q=star wars&limit=10&offset=0&rating=g&lang=en

params = {"api_key": API_KEY, "limit": 3, "rating": "g"} # No search param included since we've already defined we're searching for trending gifs. The other params explain themselves
response = requests.get(ENDPOINT, params=params).json() # The final response uses the endpoint with our parameters
for gif in response["data"]: # ...for each gif
    title = gif["title"] 
    trending_date = gif["trending_datetime"]
    url = gif["url"]
    print(f"{title} | {trending_date} | {url}") # ...print this information

# Perform a search for a term on giphy
search_term = "shrug"
params = {"api_key": API_KEY, "limit": 1, "q": search_term, "rating": "g"}
response = requests.get(endpoint, params=params).json()
for gif in response["data"]:
    title = gif["title"]
    url = gif["url"]
    print(f"{title} | {url}")
