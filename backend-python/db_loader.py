from unicodedata import decimal
import pymysql
import os
import csv

movies = os.path.expanduser("/files/movies.csv")
links = os.path.expanduser("/files/links.csv")
ratings = os.path.expanduser("/files/ratings.csv")
tags = os.path.expanduser("/files/tags.csv")

db = pymysql.connect(
    user="root",
    password="testpass",
    host="db",
    database="challenge",
)

def load_data():
    # serialize csv data into lists
    movie_list = _serialize_csv_data(movies)
    link_list = _serialize_csv_data(links)
    ratings_list = _serialize_csv_data(ratings)
    tag_list = _serialize_csv_data(tags)

    # load data into respective tables
    insert_rows(movie_list, "movies", "(movie_id, movie_title, movie_genres)", 3)
    insert_rows(link_list, "links", "(movie_id, imdb_id, tmdb_id)", 3)
    insert_rows(ratings_list, "ratings", "(user_id, movie_id, rating, rating_time)", 4)
    insert_rows(tag_list, "tags", "(user_id, movie_id, tag, tag_time)", 4)

def _serialize_csv_data(file):
    with open(file, 'r') as file:
        logs = file.readlines()
        db_rows = []
        for l in logs[1:]:
            a = l.strip('\n').split(',')
            b = []
            for x in a:
                if x.isdigit():
                    b.append(int(x))
                elif x.isdecimal():
                    b.append(decimal(x))
                else:
                    b.append(str(x))
            c = tuple(b)
            db_rows.append(c)
    return db_rows

def insert_rows(row_list, table, columns, column_count):
    with db.cursor() as c:
        for row in row_list:
            if len(row) == column_count and all(row):
                c.execute(f"INSERT INTO {table} {columns} VALUES {row}")
        db.commit()
    print(f"Data Successfully loaded into {table}")
