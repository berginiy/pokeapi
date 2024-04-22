import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function PokemonPage() {
    const url = useParams()
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        getData()
    },[])

    async function getData() {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon/' + url.idpokemon);
        setPokemon(res.data)
    }

    console.log(pokemon)

    return (
        <div>
            <h1>{pokemon?.name}</h1>
            
            <div>
                <img src={pokemon?.sprites?.other['official-artwork']?.front_default} alt="" />
            </div>
        </div>
    )
}

export default PokemonPage