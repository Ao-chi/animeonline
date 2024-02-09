import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../constants";

const Search = ({ className = "" }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [active, setActive] = useState(false);
    const debouncedSearchTerm = useDebounce(searchQuery, 500);

    //debounce function
    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const timeoutId = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(timeoutId);
            };
        }, [value, delay]);

        return debouncedValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData([]);
                if (debouncedSearchTerm.length > 0) {
                    const response = await axios.get(
                        // `https://api.consumet.org/meta/anilist/advanced-search?query=${debouncedSearchTerm}`,
                        `${BASE_URL}/advanced-search?query=${debouncedSearchTerm}`
                    );

                    const results =
                        response.data.results &&
                        response.data.results.map(
                            ({
                                id,
                                title: { romaji, english },
                                image,
                                releaseDate,
                                status,
                                totalEpisodes,
                                type,
                                rating,
                            }) => ({
                                id,
                                title: { romaji, english },
                                image,
                                releaseDate,
                                status,
                                totalEpisodes,
                                type,
                                rating,
                            })
                        );
                    setData(results);
                    console.log(response.data.results);
                    handleFocus();
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [debouncedSearchTerm, setData, setActive]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${encodeURI(searchQuery)}`);
        setSearchQuery("");
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFocus = () => {
        setActive(!false);
    };

    const handleInputBlur = (e) => {
        // Check if the related target of the blur event is a child of the search results
        if (e.relatedTarget && e.relatedTarget.closest(".search-results-wrap")) {
            setActive(true);
            return;
        }
        setActive(false);
    };

    return (
        <form
            className={`header__search ${className} `}
            id="searchAni"
            action="submit"
            onSubmit={handleSubmit}
            method="get"
        >
            <button className="search_btn" aria-label="Search button" type="submit">
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
            <label htmlFor="animeSearch">
                <input
                    type="text"
                    id="animeSearch"
                    placeholder="Search anime..."
                    name="query"
                    title="anime title"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={handleInputChange}
                    // onBlur={handleInputBlur}
                    onFocus={handleFocus}
                />
            </label>
            <div className={`search search-results-wrap ${active ? "active" : ""}`}>
                <ul className="search__results">
                    {data &&
                        data
                            ?.slice(0, 8)
                            .map(
                                ({
                                    id,
                                    title: { romaji, english },
                                    image,
                                    releaseDate,
                                    status,
                                    totalEpisodes,
                                    type,
                                    rating,
                                }) => {
                                    return (
                                        <Link to={`/info/${id}`} key={id} onClick={() => setSearchQuery("")}>
                                            <li className="search__lists result">
                                                <div className="result__img">
                                                    <img src={image} alt={`${romaji}-image-poster`} />
                                                </div>
                                                <div className="result__details">
                                                    <h5>{romaji}</h5>
                                                    <div className="result__minor-details">
                                                        <p className="status-date">
                                                            <span>{status}</span>
                                                            <span className="dot"></span>
                                                            <span>{releaseDate}</span>
                                                        </p>
                                                        <p className="type-rating">
                                                            <span>{type}</span>
                                                            <span className="dot"></span>
                                                            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                                            <span>{rating / (10).toFixed(1)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    );
                                }
                            )}
                </ul>
            </div>
        </form>
    );
};

export default Search;
