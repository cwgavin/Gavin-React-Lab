from flask import Flask
from server.test import predict

app = Flask("Flask Server")


@app.route("/")
def hello_world():
    return predict(app.logger)


def main():
    app.run(host="0.0.0.0", port=8080)
