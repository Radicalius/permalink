import flask, requests, hashlib
from flask import Flask, request, send_file, make_response

app = Flask(__name__)

@app.route("/add", methods=["POST"])
def add():
    url = request.form["url"].encode("utf8")
    hash = hashlib.sha256(url).hexdigest()
    file = open("pages/{0}".format(hash), "wb")
    file.write(request.form["content"].encode("utf8"))
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
    app.run(host="0.0.0.0", port=8000)
