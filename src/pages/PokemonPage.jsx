import styles from './PokemonPage.module.css';
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function PokemonPage() {
    const { idpokemon } = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idpokemon}`);
                setPokemon(res.data)
            } catch (error) {
                console.error("Error fetching Pokémon data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [idpokemon])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!pokemon) {
        return <div>Pokémon not found</div>
    }

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
                                <div className={styles.statBar} style={{ width: `${stat.base_stat}%`, backgroundColor: getTypeColor(pokemon.types[0].type.name) }}></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function getTypeColor(type) {
    switch (type) {
        case 'normal':
            return '#A8A77A';
        case 'fire':
            return '#EE8130';
        case 'water':
            return '#6390F0';
        case 'electric':
            return '#F7D02C';
        case 'grass':
            return '#7AC74C';
        case 'ice':
            return '#96D9D6';
        case 'fighting':
            return '#C22E28';
        case 'poison':
            return '#A33EA1';
        case 'ground':
            return '#E2BF65';
        case 'flying':
            return '#A98FF3';
        case 'psychic':
            return '#F95587';
        case 'bug':
            return '#A6B91A';
        case 'rock':
            return '#B6A136';
        case 'ghost':
            return '#735797';
        case 'dragon':
            return '#6F35FC';
        case 'dark':
            return '#705746';
        case 'steel':
            return '#B7B7CE';
        case 'fairy':
            return '#D685AD';
        default:
            return ''; // Default color
    }
}

export default PokemonPage;
