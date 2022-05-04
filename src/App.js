import React, { useEffect, useState } from "react";
import TMDB from "./TMDB";
import MovieRow from "./components/MovieRow";
import './App.css'
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList] = useState([])
  const [featureData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    
    const loadAll = async () => {
      //lista total de filmes
      let list = await TMDB.getHomeList()
      setMovieList(list)
      
      //lista de filmes originais da netflix (featured)
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await TMDB.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    } //remove o evento ao sair da pagina

  }, [])

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featureData && 
        <FeaturedMovie item={featureData} />
      }
      
      <section className="lists">
        {movieList.map((item, index) => (
          <MovieRow key={index} title={item.title} items={item.items} />
        ))}

      </section>

      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando..."/>
        </div>
      }

      
      
    </div>
  )

    
}

/*
Header
destaque
listas
rodape
*/