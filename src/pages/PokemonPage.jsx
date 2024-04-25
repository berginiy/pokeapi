// PokemonPage.jsx

import styles from './PokemonPage.module.css';
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function PokemonPage() {
    const url = useParams()
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon/' + url.idpokemon);
        setPokemon(res.data)
    }

    console.log(pokemon)

    return (
        <div className={styles.container}>
            <div className={styles.backBg}></div>
            <div className={styles.pokemonBg}>
                <img className={styles.image} src={pokemon?.sprites?.other['official-artwork']?.front_default} alt="" />
            </div>

            <div className={styles.pokeDetails}>
                <h1 className={styles.title}>{pokemon?.name}</h1>

                <div>
                    <h2 className={styles.subtitle}>Type:</h2>
                    <ul className={styles.typeList}>
                        {pokemon.types?.map((type, index) => (
                            <li key={index} className={styles.type}>{type.type.name}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className={styles.subtitle}>Stats:</h2>
                    <ul className={styles.statsList}>
                        {pokemon.stats?.map((stat, index) => (
                            <li key={index} className={styles.stat}>
                                <span className={styles.statName}>{stat.stat.name}:</span>
                                <span className={styles.statValue}>{stat.base_stat}</span>
                                <div className={styles.statBar} style={{ width: `${stat.base_stat}%` }}></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PokemonPage