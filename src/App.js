import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList'
import axios from 'axios'
import Pagination from './components/paganation';

function App() {

  const [pokemon, setPokemon] = useState([])

  const [sprite, setSpriteUrl] = useState([])


  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))


      // Slice so that it removes the last '/' in the url making sure there is no irregularities in atttempting to get the sprite/info 
      var InfoUrl = res.data.results.map(q => q.url.slice(0, -1))


      Promise.all(InfoUrl.map(url =>
        
        axios.get(url)
      )).then(data => {
        setLoading(true)
        
        setSpriteUrl (data.map(element => (element.data.sprites.front_default)))

        setLoading(false)

      })

    })

    


    return () => cancel()
  }, [currentPageUrl])



  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "LOADING..."
  
  return (
    
    <>
      <PokemonList pokemon={pokemon} sprite={sprite} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;