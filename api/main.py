from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app) # Wrap the app in an API - initialise the restful API

if __name__ == "__main__":
    app.run(debug=True) # Start the server, run the [flask] app