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

SELECT movies.movie_id, 
movies.movie_title, 
movies.movie_genres,
GROUP_CONCAT(DISTINCT tags.tag) tags 
FROM movies
JOIN links ON movies.movie_id = links.movie_id
JOIN ratings ON movies.movie_id = ratings.movie_id
JOIN tags ON movies.movie_id = tags.movie_id
WHERE movies.movie_title LIKE '%jumanji%' LIMIT 50, 1
GROUP_CONCAT(DISTINCT ratings.rating) ratings