import os
# Import WebClient from Python SDK (github.com/slackapi/python-slack-sdk) // https://api.slack.com/apps/A01U0HAUGH3/oauth?success=1
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

# WebClient insantiates a client that can call API methods
# When using Bolt, you can use either `app.client` or the `client` passed to listeners.
client = WebClient(token=os.environ.get("xoxb-585712992336-1987039158690-eWFQBbJpXGEL4fmAIwuEkmGp"))
channel_name = "_everyone"
conversation_id = None
try:
    # Call the conversations.list method using the WebClient
    for response in result client.conversations_list():
        if conversation_id is not None:
            break
        for channel in result["channels"]:
            if channel["name"] == channel_name:
                conversation_id = channel["id"]
                #Print result
                print(f"Found conversation ID: {conversation_id}")
                break

except SlackApiError as e:
    print(f"Error: {e}")
