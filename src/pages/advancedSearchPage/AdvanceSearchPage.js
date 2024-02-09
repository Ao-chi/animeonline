import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import axios from "axios";

const AdvanceSearchPage = ({ instance }) => {
    const { animeGenre } = useParams();
    const [anime, setAnime] = useState([]);

    useEffect(() => {
        const getAnimeByGenre = async () => {
            const res = await axios.get(
                `https://api.consumet.org/meta/anilist/advanced-search?genres=["${animeGenre}"]`
            );
            setAnime(res.data.results);
            console.log(res.data);
        };

        getAnimeByGenre();
    }, [animeGenre]);

    return (
        <main className="genre-page">
            <div className="container">
                <h1>{animeGenre} Anime</h1>
            </div>
            <div className="card-list grid-template container">
                {anime &&
                    anime?.map(
                        ({
                            id,
                            image,
                            cover,
                            title: { romaji, english, native },
                            description,
                            type,
                            releaseDate,
                            duration,
                            totalEpisodes,
                            status,
                            rating,
                        }) => {
                            return (
                                <div className="">
                                    <Link to={`/info/${id}`} key={id}>
                                        <Card
                                            data={{
                                                id,
                                                image,
                                                cover,
                                                title: { romaji, english, native },
                                                description,
                                                type,
                                                releaseDate,
                                                duration,
                                                totalEpisodes,
                                                status,
                                                rating,
                                            }}
                                        />
                                    </Link>
                                </div>
                            );
                        }
                    )}
            </div>
        </main>
    );
};

export default AdvanceSearchPage;
