from flask import Flask

app = Flask("Flask Server")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

def main():
    app.run(host='0.0.0.0', port=8080)
