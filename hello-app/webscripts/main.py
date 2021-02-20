def fahrenheit_from(celsius):
    """Convert Celsius to Fahrenheit degrees."""
    try:
        fahrenheit = float(celsius) * 9 / 5 + 32
        fahrenheit = round(fahrenheit, 3)  # Round to three decimal places
        return str(fahrenheit)
    except ValueError:
        return "invalid input"

if __name__ == "__main__":
    celsius = input("Celsius: ")
    print("Fahrenheit:", fahrenheit_from(celsius))
    #https://realpython.com/python-web-applications/#add-code-as-a-function
    ##https://cloud.google.com/appengine/docs/flexible/python/configuring-your-app-with-app-yaml //#//#/ https://console.cloud.google.com/appengine/start?authuser=3&project=hello-app-305408