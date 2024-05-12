import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./PokemonPage.module.css";

function PokemonPage() {
    const { idpokemon } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [evolutionChain, setEvolutionChain] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idpokemon}`);
                setPokemon(res.data);

                const evolutionRes = await axios.get(res.data.species.url);
                const evolutionChainRes = await axios.get(evolutionRes.data.evolution_chain.url);
                const chain = parseEvolutionChain(evolutionChainRes.data.chain);
                setEvolutionChain(chain);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [idpokemon]);

    const parseEvolutionChain = (chain) => {
        const evolutionChain = [];
        let current = chain;

        do {
            evolutionChain.push({
                id: current.species.url.split("/")[6],
                name: current.species.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${current.species.url.split("/")[6]}.png`,
            });
            current = current.evolves_to[0];
        } while (current && current.hasOwnProperty("evolves_to"));

        return evolutionChain;
    };

    const handleEvolutionClick = (id) => {
        window.location.href = `/pokemon/${id}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pokemon) {
        return <div>Pokémon not found</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.backBg}></div>
            <div className={styles.pokemonBg}>
                <img
                    className={styles.image}
                    src={pokemon.sprites?.other["official-artwork"]?.front_default}
                    alt=""
                />
            </div>

            <div className={styles.pokeDetails}>
                <h1 className={styles.title}>{pokemon?.name}</h1>

                <div>
                    <h2 className={styles.subtitle}>Type:</h2>
                    <ul className={styles.typeList}>
                        {pokemon.types?.map((type, index) => (
                            <li key={index} className={styles.type}>
                                {type.type.name}
                            </li>
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
                                <div
                                    className={styles.statBar}
                                    style={{
                                        width: `${stat.base_stat}%`,
                                        backgroundColor: getTypeColor(pokemon.types[0].type.name),
                                    }}
                                ></div>
                                <div
                                    className={styles.statBar}
                                    style={{ width: `${stat.base_stat}%` }}
                                ></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.evolution}>
                <h2 className={styles.subtitle}>Evolution:</h2>
                <div className={styles.evolutionImages}>
                    {evolutionChain.map((evolution, index) => (
                        <React.Fragment key={index}>
                            <img
                                className={styles.evolutionImage}
                                src={evolution.image}
                                alt={`Evolution ${index + 1}`}
                                onClick={() => handleEvolutionClick(evolution.id)}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <Link to="/" className={styles.backButton}>
                <FaArrowLeft /> Back
            </Link>
        </div>
    );
}

function getTypeColor(type) {
    switch (type) {
        case "normal":
            return "#A8A77A";
        case "fire":
            return "#EE8130";
        case "water":
            return "#6390F0";
        case "electric":
            return "#F7D02C";
        case "grass":
            return "#7AC74C";
        case "ice":
            return "#96D9D6";
        case "fighting":
            return "#C22E28";
        case "poison":
            return "#A33EA1";
        case "ground":
            return "#E2BF65";
        case "flying":
            return "#A98FF3";
        case "psychic":
            return "#F95587";
        case "bug":
            return "#A6B91A";
        case "rock":
            return "#B6A136";
        case "ghost":
            return "#735797";
        case "dragon":
            return "#6F35FC";
        case "dark":
            return "#705746";
        case "steel":
            return "#B7B7CE";
        case "fairy":
            return "#D685AD";
        default:
            return "";
    }
}

export default PokemonPage;