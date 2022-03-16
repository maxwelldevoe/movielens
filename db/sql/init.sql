USE challenge;

CREATE TABLE movies (
    movie_id int,
    movie_title varchar(225),
    movie_genres varchar(225)
);

CREATE TABLE links (
    movie_id int,
    imdb_id int,
    tmdb_id int
);

CREATE TABLE ratings (
    user_id int,
    movie_id int,
    rating decimal,
    rating_time varchar(50)
);

CREATE TABLE tags (
    user_id int,
    movie_id int,
    tag varchar(225),
    tag_time varchar(50)
);