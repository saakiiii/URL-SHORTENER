from flask import Flask, jsonify, render_template, redirect, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, current_user, UserMixin, logout_user
import datetime
import uuid
# from flask_jwt_extended import create_access_token,unset_jwt_cookies, jwt_required, JWTManager
import jwt

login_manager = LoginManager()
app = Flask(__name__)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.sqlite3'
app.secret_key = 'secret key'
db = SQLAlchemy(app)
CORS(app)
login_manager.init_app(app)
app.config["JWT_SECRET_KEY"] = "123"
# jwt_ = JWTManager(app)

class users(db.Model, UserMixin):
    id = db.Column('id', db.Integer, primary_key = True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(100))
    email = db.Column(db.String(100))

class urls(db.Model):
    id = db.Column('id', db.Integer, primary_key = True)
    original_url = db.Column(db.String(500))
    short_code = db.Column(db.String(100))
    username = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    clicks = db.Column(db.Integer)

# with app.app_context():
#     db.create_all()

@login_manager.user_loader
def load_user(user_id):
    return users.get(user_id)

@app.route('/login', methods=['GET', 'POST'])
def login():
    getdata = request.get_json('body')
    print(getdata)
    username = getdata["username"]
    user = users.query.filter_by(username=username).first()
    if user != None: 
     if user.password == getdata["password"]:
        login_user(user)
        return {"response":'true'}
    return {"response":"false"}

@app.route('/register', methods=['POST'])
def register():
    getdata = request.get_json('body')
    print(getdata)
    username = getdata["username"]
    password = getdata["password"]
    user = users.query.filter_by(username=username).first()
    if user == None:
        newuser = users(username=username, password=password)
        db.session.add(newuser)
        db.session.commit()
        return {"response":'true'}
    return {"response":'false'}

@app.route('/')
def home():
    return 'hello'

@app.route('/getdata', methods=['GET'])
def getdata():
    print('RUNNING')
    print(users.query.all)
    return jsonify({"hello":""})

@app.route('/getlinks', methods=['POST', 'GET'])
# @jwt_required()
def getlinks():
    token = request.headers.get('Authorization', '').split('Bearer ')[1]
    print(token)
    # decoded = jwt.decode(token, "123", algorithms=["HS256"])
    # print(decoded["username"])
    getdata = request.get_json('body')
    print(getdata)
    links = urls.query.filter_by(username=getdata["username"]).all()
    jsonformat = [{"short_code":x.short_code, "original_url":x.original_url, "timestamp":x.created_at} for x in links]
    jsonformat.reverse()
    return {"links":jsonformat}

@app.route("/<code>")
# @jwt_required()
def redirectUrl(code):
    url = urls.query.filter_by(short_code=code).first()
    url.clicks = url.clicks + 1
    db.session.commit()
    return redirect(url.original_url)

@app.route("/islogged", methods=['POST'])
# @jwt_required()
def islogged():
    # token = request.headers.get('Authorization', '').split('Bearer ')[1]
    return {"response":"true", "username":""}

@app.route("/addlink", methods=['POST'])
def addlink():
    data = request.get_json()
    original_url = data['original_url']
    short_code = str(uuid.uuid4())[0:5]
    username = data['username']
    created_at = datetime.datetime.now()
    clicks = 0
    newurl = urls(original_url=original_url, short_code=short_code, username=username, created_at=created_at, clicks=clicks)
    db.session.add(newurl)
    db.session.commit()
    return {"data":"committed"}

@app.route("/deletelink", methods=['POST', 'GET'])
def deletelink():
    data = request.get_json()
    short_code = data["short_code"]
    username = data["username"]
    url = urls.query.filter_by(short_code=short_code, username=username).first()
    db.session.delete(url)
    db.session.commit()
    return {"response":"true"}

@app.route('/editlink', methods=['POST'])
# @jwt_required()
def editlink():
    data = request.get_json()
    short_code = data["short_code"]
    new_short_code = data["new_short_code"]
    username = data["username"]
    print(data)
    url = urls.query.filter_by(short_code=short_code, username=username).first()
    url.short_code = new_short_code
    db.session.commit()
    return {"response":"true"}

@app.route('/currentlink', methods=['POST', 'GET'])
def getcurrentlink():
    data = request.get_json()
    url = None
    if "short_code" in data.keys():
        short_code = data["short_code"]
        username = data["username"]
        url = urls.query.filter_by(username=username, short_code=short_code).first()
        if url != None:
            return jsonify({"original_url":url.original_url, "clicks":url.clicks, "short_code":short_code})
        else:
            return jsonify({"original_url":'Not found', "clicks":"NA", "short_code":"Not available"})
    else:
        url = urls.query.filter_by(username="user1").first()
        return jsonify({"original_url":url.original_url, "clicks":url.clicks, "short_code":url.short_code})

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    logout_user()
    return response

app.run(debug=True)