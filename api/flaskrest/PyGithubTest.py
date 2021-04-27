# Not integrating with Flask YET - will do some stuff with the database in flask once I get my head around this
from github import Github

g = Github("access_token") # Print your access token here or in a .env file

for repo in g.get_user().get_repos():
    print(repo.name)

    # https://pygithub.readthedocs.io/en/latest/introduction.html