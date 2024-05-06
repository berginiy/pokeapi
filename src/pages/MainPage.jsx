import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';

function MainPage() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20');
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPokemon = pokemon.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.list}>
            {/* Форма для поиска */}
            <form onSubmit={e => e.preventDefault()} className={styles.searchForm}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Enter Pokemon name"
                    className={styles.searchInput}
                />
            </form>

            {/* Список покемонов */}
            <ul className={styles.cards}>
                {loading ? (
                    <div>Loading...</div>
                ) : filteredPokemon.length > 0 ? (
                    filteredPokemon.map((item, index) => (
                        <li key={index} className={styles.card}>
                            {/* Карточка покемона */}
                            <div className={styles.cardHover}>
                                <div className={styles.cardHoverContent}>
                                    <h3 className={styles.cardHoverTitle}>
                                        {item.name}
                                    </h3>
                                    <p className={styles.cardHoverText}>Weight: {item.weight}</p>
                                    <p className={styles.cardHoverText}>Type: {item.types.map(type =>
                                        <span key={type.type.name} className={styles.type}>{type.type.name}</span>
                                    )}</p>
                                    <Link to={'/pokemon/' + item.id} className={styles.cardHoverLink}>
                                        <span>Learn More</span>
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </Link>
                                </div>
                                <div className={styles.cardHoverExtra}>
                                    <h4>Additional Info</h4>
                                    <p>Put additional information here.</p>
                                </div>
                                <img src={item.sprites.other['official-artwork'].front_default} alt="" className={styles.cardHoverImage} />
                            </div>
                        </li>
                    ))
                ) : (
                    <div>No results found</div>
                )}
            </ul>

            {/* Кнопка "Загрузить еще" */}
            {nextPage && (
                <button onClick={handleLoadMore} className={styles.loadMoreButton}>
                    Load More
                </button>
            )}
        </div>
    );
}

export default MainPage;
