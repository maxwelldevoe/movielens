import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./app.css"

const Movies = (props) => {
  return (
    <span>
      {props.movies.map((movie) => {
        return (
          <div>
            <p>{movie.movie_title}</p>
            <p>{movie.movie_genres}</p>
            <p>{movie.ratings}</p>
            <p>{movie.tags}</p>
          </div>
        )
      })}
    </span>
  )
}

const App = () => {
  const [movies, setMovies] = useState([])
  const [showMovies, setShowMovies] = useState(false)
  const [error, setError] = useState('')
  const [queryType, setQueryType] = useState('')
  const [page, setPage] = useState(1)
  const [filterValue, setFilterValue] = useState('')
  const [helpMessage, setHelpMessage] = useState('')
  const [radioParent1, checkradioParent1] = useState(false)
  const [radioParent2, checkradioParent2] = useState(false)
  const [radioMovieChild1, checkRadioMovieChild1] = useState(false)
  const [radioMovieChild2, checkRadioMovieChild2] = useState(false)
  const [radioMovieChild3, checkRadioMovieChild3] = useState(false)
  const [radioRatingChild1, checkRadioRatingChild1] = useState(false)
  const [radioRatingChild2, checkRadioRatingChild2] = useState(false)
  const [radioRatingChild3, checkRadioRatingChild3] = useState(false)
  const [filterCategory, setFilterCategory] = useState('')

  const handleQuery = async () => {
    const filters = {
      "type": queryType,
      "body": {[filterCategory]: filterValue},
      "page": page
    }
    try {
      const response = await axios.get("/query", {params: filters});
      if (response.status === 200) {
        setMovies([...response.data.data])
      }
    } catch (err) {
      setError(err)
      console.log(err)
      }
    setShowMovies(true)
  };

  useEffect(() => {
    if(showMovies) {
      console.log(movies)
      movies.map((movie) => {
        console.log(movie)
      })
    }
  })

  const handleRadioParent = (e) => {
    let val = e.target.value
    if (val === "movie") {
      checkradioParent2(false)
      checkradioParent1(true)
      setQueryType(val)
      setHelpMessage(
        "Query Movies by ID, Title, or Tag/s"
      )
    } else if (val === "rating") {
      checkradioParent1(false)
      checkradioParent2(true)
      setQueryType(val)
      setHelpMessage(
        "Query Ratings by Movie ID, Movie Title, or User ID"
      )
    }
  }

  const handleMovieRadioChild = (e) => {
    let val = e.target.value
    if (val === "movie_id") {
      checkRadioMovieChild1(true)
      checkRadioMovieChild2(false)
      checkRadioMovieChild3(false)
    } else if (val === "title") {
      checkRadioMovieChild1(false)
      checkRadioMovieChild2(true)
      checkRadioMovieChild3(false)
    } else if (val === "tags") {
      checkRadioMovieChild1(false)
      checkRadioMovieChild2(false)
      checkRadioMovieChild3(true)
    }
    setFilterCategory(val)
  }

  const handleRadioRatingChild = (e) => {
    let val = e.target.value
    if (val === "movie_id") {
      checkRadioRatingChild1(true)
      checkRadioRatingChild2(false)
      checkRadioRatingChild3(false)
    } else if (val === "title") {
      checkRadioRadioChild1(false)
      checkRadioRatingChild2(true)
      checkRadioRatingChild3(false)
    } else if (val === "user_id") {
      checkRadioRadioChild1(false)
      checkRadioRatingChild2(false)
      checkRadioRatingChild3(true)
    }
    setFilterCategory(val)
  }

  return (
    <div>
      <h1>Movie Database</h1>
      <h2>{helpMessage}</h2>
      <div className="buttons">
        <input className="buttons" type="radio" value="movie" onChange={handleRadioParent} checked={radioParent1} /> Movie
        <input type="radio" value="rating" onChange={handleRadioParent} checked={radioParent2} /> Rating
      </div>
      <div>
        {radioParent1 ? <div><input className="buttons" type="radio" value="movie_id" name="ID" onChange={handleMovieRadioChild} checked={radioMovieChild1} /><label>ID</label></div> : null}
        {radioParent1 ? <div><input className="buttons" type="radio" value="title" onChange={handleMovieRadioChild} checked={radioMovieChild2} /><label>Title</label></div> : null}
        {radioParent1 ? <div><input className="buttons" type="radio" value="tags" onChange={handleMovieRadioChild} checked={radioMovieChild3} /><label>Tags</label></div> : null}
        {radioParent2 ? <div><input className="buttons" type="radio" value="movie_id" onChange={handleRadioRatingChild} checked={radioRatingChild1} /><label>Movie ID</label></div> : null}
        {radioParent2 ? <div><input className="buttons" type="radio" value="title" onChange={handleRadioRatingChild} checked={radioRatingChild2} /><label>Title</label></div> : null}
        {radioParent2 ? <div><input className="buttons" type="radio" value="user_id" onChange={handleRadioRatingChild} checked={radioRatingChild3} /><label>User ID</label></div> : null}
      </div>

      <div className="textBox">
        <input className="textBox" type="text" onChange={e => setFilterValue(e.target.value)} />
      </div>
      <div>
        <button className="searchButton" onClick={handleQuery}>Search</button>
      </div>
        <div>
          {showMovies ? <Movies movies={movies} /> : null}
        </div>
    </div>
  )
}

export default App;