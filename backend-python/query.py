from email.mime import base
import pymysql
import json

db = pymysql.connect(
    user="root",
    password="testpass",
    host="db",
    database="challenge",
)

def build_query(filters):
    if "type" not in filters.keys():
        return "ERROR - No Type"
    
    if filters["type"] == "movie":
        base_query = get_movies(json.loads(filters["body"]))
    elif filters["type"] == "rating":
        base_query = get_ratings(json.loads(filters["body"]))

    if int(filters["page"]) < 2:
        base_query += " LIMIT 50"
    else:
        base_query += f" LIMIT 50, {50 * (int(filters['page']) - 1)}"

    return base_query

def get_movies(filters):
    base_query = """
        SELECT movies.movie_id, movies.movie_title, movies.movie_genres,
                GROUP_CONCAT(DISTINCT tags.tag) tags, GROUP_CONCAT(DISTINCT ratings.rating) ratings
        FROM movies
        JOIN links ON movies.movie_id = links.movie_id
        JOIN ratings ON movies.movie_id = ratings.movie_id
        JOIN tags ON movies.movie_id = tags.movie_id
        """

    if "title" in filters.keys():
        base_query += f"WHERE movies.movie_title LIKE '%{filters['title']}%'"

    if "tags" in filters.keys():
        if len(filters["tags"]) < 2:
            base_query += f"WHERE tags.tag = {filters['tags']}"
        else:
            base_query += f"WHERE tags.tag IN {tuple(filters['tags'])}"

    if "movie_id" in filters.keys():
        base_query += f"WHERE movies.movie_id = {int(filters['movie_id'])}"

    return base_query

def get_ratings(filters):
    base_query = """
        SELECT m.movie_title, r.*
        FROM ratings r
        JOIN movies m ON r.movie_id = m.movie_id
        """
    if "user_id" in filters.keys():
        base_query += f"WHERE r.user_id = {int(filters['user_id'])}"
    if "movie_id" in filters.keys():
        base_query += f"WHERE r.movie_id = {int(filters['movie_id'])}"
    if "title" in filters.keys():
        base_query += f"WHERE m.movie_title LIKE '%{filters['title']}%'"
    
    return base_query


def execute_query(filters):
    query = build_query(filters)
    print(query)
    with db.cursor(pymysql.cursors.DictCursor) as c:
        c.execute(query)
        result = c.fetchall()
    return result