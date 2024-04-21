import styles from './MainPage.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function MainPage() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon/?limit=10');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            if (loadingMore) return;
            setLoadingMore(true);

            const res = await axios.get(nextPage);

            if (res.data.results.length > 0) {
                const pokemonsData = await Promise.all(res.data.results.map(async (item) => {
                    const pokemonRes = await axios.get(item.url);
                    return pokemonRes.data;
                }));
                setPokemon(prevPokemon => [...prevPokemon, ...pokemonsData]);
                setNextPage(res.data.next);
            }
            setLoading(false);
            setLoadingMore(false);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        fetchData();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.list}>
            <ul className={styles.cards}>
                {pokemon.map((item, index) => (
                    <li key={index} className={styles.card}>
                        <div className={styles.cardHover}>
                            <div className={styles.cardHoverContent}>
                                <h3 className={styles.cardHoverTitle}>
                                    {item.name}
                                </h3>
                                <p className={styles.cardHoverText}>Weight: {item.weight}</p>
                                <p className="card-hover__text">Type: {item.types.map(type => type.type.name).join(', ')}</p>
                                <a href="#" className={styles.cardHoverLink}>
                                    <span>Learn More</span>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                            </div>
                            <div className={styles.cardHoverExtra}>
                                <h4>Additional Info</h4>
                                <p>Put additional information here.</p>
                            </div>
                            <img src={item.sprites.other['official-artwork'].front_default} alt="" className={styles.cardHoverImage} />
                        </div>
                    </li>
                ))}
            </ul>
            {nextPage && (
                <button onClick={handleLoadMore} className={styles.loadMoreButton}>
                    Load More
                </button>
            )}
        </div>
    );
}

export default MainPage;