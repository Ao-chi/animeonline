import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";

const SearchResults = ({ instance }) => {
    const [searchData, setSearchData] = useState([]);
    const { searchQuery } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setSearchData([]);
            if (searchQuery.length > 0) {
                const data = await instance.get(`advanced-search?query=${searchQuery}`);
                const results = data.data.results.map(
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
                setSearchData(results);
                console.log(data.data.results);
            }
        };
        fetchData();
    }, [searchQuery]);

    return (
        <>
            <main className="seaerch-results-page">
                <section className="search-result container">
                    <h1>Search Results</h1>
                    <div className="search-result__wrapper">
                        {searchData &&
                            searchData.map(
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
                                        <Link to={`/info/${id}`} key={`${romaji}-${id}`}>
                                            <Card
                                                data={{
                                                    id,
                                                    title: { romaji, english },
                                                    image,
                                                    releaseDate,
                                                    status,
                                                    totalEpisodes,
                                                    type,
                                                    rating,
                                                }}
                                            />
                                        </Link>
                                    );
                                }
                            )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default SearchResults;
