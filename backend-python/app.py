from urllib import request
import click
import flask
from flask import request
import pymysql
from db_loader import load_data
from query import execute_query


app = flask.Flask(__name__)
db = pymysql.connect(
    user="root",
    password="testpass",
    host="db",
    database="challenge",
)

@app.route("/")
def home():
    return flask.jsonify({"hello": "world"})


@app.route("/test")
def test():        
    with db.cursor() as c:
        c.execute("SELECT * FROM movies")
        result = c.fetchone()
        print(c.fetchone())
    return flask.jsonify({"data":result})

@app.route("/query", methods=['GET'])
def query():
    filters = dict(request.args)
    print(filters)
    data = {"data": execute_query(filters)}
    print(data)
    print(type(data["data"]))
    return data


@app.cli.command("load-movielens")
def load_movielens():
    with db.cursor() as cur:
        cur.execute("SELECT col FROM test;")
        (result,) = cur.fetchone()
        click.echo(f"result {result}")

@app.cli.command("load-db")
def load_db():
    load_data()
