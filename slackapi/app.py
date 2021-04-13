import os

from slackclient import SlackClient
SLACK_TOKEN = os.environ.get('SLACK_TOKEN') # Take from .env file

slack_client = SlackClient(SLACK_TOKEN)

# Retrieve a list of channels
def list_channels(): # create the function
    channels_call = slack_client.api_call("channels.list")
    if channels_call.get('ok'): # if result is true
        return channels_call['channels']
    return None # ifel

# Main Function
if __name__ == '__main__':
    channels = list_channels()
    if channels:
        print("Channels: ")
        for c in channels:
            print(c['name'] + " (" + c['id'] + ")")
    else:
        print("Unable to authenticate.")