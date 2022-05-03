import React, { useEffect, useState } from "react";
import TMDB from "./TMDB";
import MovieRow from "./components/MovieRow";
import './App.css'

export default () => {

  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    const loadAll = async () => {
      let list = await TMDB.getHomeList()
      setMovieList(list)
    }

    loadAll()
  }, [])

  console.log(movieList)

  return (
    <div className="page">
      <section className="lists">
        {movieList.map((item, index) => (
          <MovieRow key={index} title={item.title} items={item.items} />
        ))}

      </section>
      
    </div>
  )
}

/*
Header
destaque
listas
rodape
*/