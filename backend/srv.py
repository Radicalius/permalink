import flask, requests, hashlib
from flask import Flask, request, send_file, make_response

app = Flask(__name__)

@app.route("/add", methods=["POST"])
def add():
    print(request.data)
    url = request.form["url"]
    hash = hashlib.sha256(url.encode("utf8")).hexdigest()
    text = requests.get(url).text
    file = open("pages/{0}".format(hash), "wb")
    file.write(text.encode("utf8"))
    file.close()
    resp = make_response("http://localhost:8000/{0}".format(hash))
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp

@app.route("/<hash>")
def get(hash):
    resp = send_file("pages/{0}".format(hash))
    resp.headers["Content-Type"] = "text/html"
    return resp

if __name__ == "__main__":
    app.run(host="localhost", port=8000)
