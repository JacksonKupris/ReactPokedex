import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList'

import axios from 'axios'
import Pagination from './components/paganation';



// Set a state for each of the individual items you're trying to track


function App() {
  const PokemonInfo = [{}]

  const [pokemon, setPokemon] = useState([])
  const [height, setHeight] = useState([])
  const [weight, setWeight] = useState([])
  const [type, setType] = useState([])




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
      
        PokemonInfo["Name"] = res.data.results.map(q => ({
          name: q.name
            }))

      // Slice so that it removes the last '/' in the url making sure there is no irregularities in atttempting to get the sprite/info 
      var InfoUrl = res.data.results.map(q => q.url.slice(0, -1))


      Promise.all(InfoUrl.map(url =>
        
        axios.get(url)
      )).then(data => {
        setLoading(true)

        PokemonInfo["Id"] =  (data.map(element => (element.data.id)))        
        PokemonInfo["Height"] =  (data.map(element => (element.data.height)))
        PokemonInfo["Weight"] =  (data.map(element => (element.data.weight)))
        PokemonInfo["Type1"] =  (data.map(element => (element.data.types[0])))
        PokemonInfo["SpriteUrl"] =  (data.map(element => (element.data.sprites.front_default)))
        // PokemonInfo["Type2"] =  (data.map(element => (element.data.types[1])))

        setHeight(data.map(element => (element.data.height)))
        setWeight(data.map(element => (element.data.weight)))
        setType(data.map(element => (element.data.types[0].type.name)))
        

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

  // if (loading) return "LOADING..."
  
  return (
    
    <>
      <PokemonList pokemon={pokemon} sprite={sprite} height={height} weight={weight} type={type} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;