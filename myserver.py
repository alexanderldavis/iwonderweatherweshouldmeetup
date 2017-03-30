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
    #res = req.get('https://api.meetup.com/2/events?key=163b1a1f7e132d77122c72f55111458&group_urlname=ny-tech&sign=true')
    #res = req.get('https://api.meetup.com/2/groups?key=163b1a1f7e132d77122c72f55111458&sign=true&{}'.format(args)+'') #v1
    #res = req.get('https://api.meetup.com/find/events?key=163b1a1f7e132d77122c72f55111458&sign=true&{}'.format(args)+'') #v2
    res = req.get('https://api.meetup.com/2/groups?key=163b1a1f7e132d77122c72f55111458&sign=true&{}'.format(args)) #v3 (Category support)
    #test = "https://api.meetup.com/2/groups?key=163b1a1f7e132d77122c72f55111458&sign=true&photo-host=public&zip=94066&page=20"
    return res.text

@app.route('/proxy/weather/<string:state>/<string:city>', methods=['GET'])
def get_weather(state,city):
    print("helloword")
    res=req.get("http://api.wunderground.com/api/f5c219a47e0685f8/conditions/q/{}/{}.json".format(state,city))
    print(res)
    return res.text

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8088)
