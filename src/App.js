import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList'

import axios from 'axios'
import Pagination from './components/paganation';

// Set a state for each of the individual items you're trying to track


function App() {
  const PokemonInfo = [{}]

  const [pokemon, setPokemon] = useState([])
  const [id, setID] = useState([])

  const [height, setHeight] = useState([])
  const [weight, setWeight] = useState([])
  const [type, setType] = useState([])
  const [type2, setType2] = useState([])
  const [sprite, setSpriteUrl] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=16")
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

      // Slice so that it removes the last '/' in the url making sure there is no irregularities in attempting to get the sprite/info 
      var InfoUrl = res.data.results.map(q => q.url.slice(0, -1))


      Promise.all(InfoUrl.map(url =>
        
        axios.get(url)
      )).then(data => {
        setLoading(true)
        // console.log(data.map(element => (element.data)))
        PokemonInfo["Id"] =  (data.map(PokemonID => (PokemonID.data.id)))        
        PokemonInfo["Height"] =  (data.map(PokemonHeight => (PokemonHeight.data.height)))
        PokemonInfo["Weight"] =  (data.map(PokemonWeight => (PokemonWeight.data.weight)))
        PokemonInfo["Type1"] =  (data.map(PokemonType1 => (PokemonType1.data.types[0])))
        PokemonInfo["SpriteUrl"] =  (data.map(PokemonSprite => (PokemonSprite.data.sprites.front_default)))
        PokemonInfo["Type2"] =  (data.map(PokemonType2 => (PokemonType2.data.types[1])))

        for (var Type in PokemonInfo['Type2']) {
          if (PokemonInfo['Type2'][Type] === undefined) {
            PokemonInfo['Type2'][Type] = {slot:2,
            type:{name:'N/A',
                  url:'N/A'}}
          }
        }

        const FinalPokemon = (data.map(element => ({
          ID: element.data.id,
          Type1: element.data.types[0].type.name,
          Height: element.data.height,
          Weight: element.data.weight,
          Sprite: element.data.sprites.front_default,
          // Type2: filtered
        })))

        for (var Sprite in PokemonInfo["SpriteUrl"]){
          // console.log(PokemonInfo["SpriteUrl"][Sprite])
          if (PokemonInfo["SpriteUrl"][Sprite] === null){

            PokemonInfo["SpriteUrl"][Sprite] = 'https://cdn2.bulbagarden.net/upload/9/98/Missingno_RB.png'
            // alert('found it ' + PokemonInfo["SpriteUrl"][Sprite])
            // console.log(PokemonInfo["SpriteUrl"][Sprite])

          }
        }

        setHeight(data.map(PokemonHeight => (PokemonHeight.data.height)))
        setWeight(data.map(PokemonWeight => (PokemonWeight.data.weight)))
        setType(data.map(PokemonType1 => (PokemonType1.data.types[0].type.name)))
        setType2(PokemonInfo['Type2'].map(PokemonType2 => (PokemonType2.type.name)))
        setSpriteUrl (data.map(PokemonSprite => (PokemonSprite.data.sprites.front_default)))
        setID (data.map(PokemonID => (PokemonID.data.id)))


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
      <PokemonList pokemon={pokemon} sprite={sprite} height={height} weight={weight} type={type} type2={type2} id={id}  />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;