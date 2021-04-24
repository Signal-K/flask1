# Importing modules
from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource): # Class that is a resource
    def get(self):
        return {"data": "Hello World"} # What happens when get request is sent to this url endpoint

api.add_resource(HelloWorld, "/") # Make it accessible at the root endpoint

if __name__ == "__main__":
    app.run(debug=True)