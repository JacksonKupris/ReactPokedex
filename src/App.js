  
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
      console.log(InfoUrl)

      Promise.all(InfoUrl.map(url =>
        axios.get(url)
      )).then(data => {
        
  
         setSpriteUrl (data.map(element => (element.data.sprites.front_default)))

      })

    })

    


    return () => cancel()
  }, [currentPageUrl])




  // function fetchPokemonData (InfoUrl) {

  //   const urls = InfoUrl
  //   // use map() to perform a fetch and handle the response for each url
  //   Promise.all(urls.map(url =>
  //     axios.get(url)
  //   ))
  //   .then(data => {
  //     // do something with the data
  //     // console.log(data.map(element => (element.data.sprites.front_default)))

  //     // var setSpriteUrl = data.map(element => (element.data.sprites.front_default))
  //     // console.log(setSpriteUrl)
  //     // setSpriteUrl(data.map(p => console.log(p.data.sprites.front_default)))
  //     // console.log(SpritesList)
  //   })

  // }



  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."
  
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