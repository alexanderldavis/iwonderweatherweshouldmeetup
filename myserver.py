from flask import Flask, request, Response
from json import dumps, loads
from flask_pymongo import PyMongo
from flask import jsonify
from bson.json_util import dumps
from bson.objectid import ObjectId
import requests as req

app = Flask(__name__)
mongo = PyMongo(app)

@app.route('/proxy/meetupmain', methods=['GET'])
def do_proxy():
    args = request.url.split('?')[1]
    res = req.get('https://api.meetup.com/2/events?key=163b1a1f7e132d77122c72f55111458&group_urlname=ny-tech&sign=true')
    # res = req.get('http://api.meetup.com/find/groups?{}'.format(args))
    return res.text

<<<<<<< HEAD
@app.route('/proxy/weather')
def get_weather():
    args=request.url.split("?")[1]
    res=req.get("https://query.yahooapis.com/v1/public/yql?"+args)
    return res.text
=======


>>>>>>> f15eb87404a7b99a8a3acc84d17ac04ee343302a
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8088)
