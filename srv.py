import flask, requests, hashlib
from flask import Flask, request, send_file

app = Flask(__name__)

@app.route("/add", methods=["POST"])
def add():
    url = request.form["url"]
    hash = hashlib.sha256(url.encode("utf8")).hexdigest()
    print(requests.get(url).headers)
    text = requests.get(url).text
    file = open("pages/{0}".format(hash), "wb")
    file.write(text.encode("utf8"))
    file.close()
    return "http://localhost:8000/{0}".format(hash) , 200

if __name__ == "__main__":
    app.run(host="localhost", port=8000)
