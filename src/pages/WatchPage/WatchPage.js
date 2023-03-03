import axios from "axios";
// import Player from "../../components/ArtPlayer/ArtPlayer";
import Player from "../../components/ArtPlayer/Player";
import Card from "../../components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import EpisodeCard from "../../components/Episode-Card/Episode-Card";

import "./watchpage.scss";

const WatchPage = ({ instance }) => {
    const { animeId } = useParams();
    const query = new URLSearchParams(window.location.search);
    const watching = query.get("watching");
    const [loading, setLoading] = useState(true);
    const [episodeList, setEpisodeList] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [episodeLists, setEpisodeLists] = useState(null);
    const [selectedChunk, setSelectedChunk] = useState(0);

    const [videoUrl, setVideoUrl] = useState([]);

    useEffect(() => {
        const getEpisodes = async () => {
            const response = await instance.get(`info/${animeId}?provider=gogoanime?isDub=false`);

            const data = response.data;
            setEpisodeList(data);
            // console.log(data);
        };

        const getSources = async () => {
            const response = await axios.get(`https://api.consumet.org/meta/anilist/watch/${watching}`);

            setSelectedEpisode(watching);
            setVideoUrl(response.data.sources);
            setLoading(false);
        };

        // if (selectedEpisode === watching) {
        //     // console.log(`selectedEpisode is: ${selectedEpisode} and current: ${watching}`);
        // }
        getEpisodes();
        getSources();
    }, [animeId, watching, instance, selectedEpisode]);

    // devide episodes morethan 24 into chunks
    useEffect(() => {
        const episodeListUpdate = () => {
            const episodeListChunk = [];
            if (episodeList.episodes) {
                for (let i = 0; i < episodeList.episodes.length; i += 24) {
                    episodeListChunk.push(episodeList.episodes.slice(i, i + 24));
                }
                setSelectedChunk(0);
                setEpisodeLists(episodeListChunk);
                // console.log(episodeList);
            }
        };
        episodeListUpdate();
    }, [setEpisodeLists, episodeList.episodes]);
    const handleEpisodeSelect = (e) => {
        setSelectedChunk(e.target.value);
        console.log(selectedChunk);
    };
    return (
        <>
            <main>
                <section className="watch-player container">
                    <h1>Watchpage</h1>

                    {loading ? (
                        <>
                            <div>
                                <h1 style={{ color: "red" }}>Loading</h1>
                            </div>
                        </>
                    ) : (
                        <div className="art-player-container">
                            {videoUrl.length > 0 && (
                                <Player
                                    videoUrl={videoUrl}
                                    option={{
                                        hotkey: true,
                                        // setting: true,
                                        muted: false,
                                        autoplay: true,
                                        pip: false,
                                        autoSize: true,
                                        autoMini: true,
                                        autoOrientation: true,
                                        flip: true,
                                        playbackRate: true,
                                        aspectRatio: true,
                                        fullscreen: true,
                                        fullscreenWeb: true,
                                        subtitleOffset: true,
                                        miniProgressBar: true,
                                        mutex: true,
                                        backdrop: true,
                                        playsInline: true,
                                        volume: 1,
                                        airplay: false,
                                        lock: true,
                                        fastForward: true,
                                        lang: navigator.language.toLowerCase(),
                                        whitelist: ["*"],
                                        moreVideoAttr: {
                                            crossOrigin: "anonymous",
                                        },
                                    }}
                                />
                            )}
                        </div>
                    )}
                </section>
                <section className="episode-lists container watch-episodes">
                    <div className="episode-lists__wrapper">
                        <div className="episode-lists__header bg-color">
                            <h2>Episodes</h2>
                            <select
                                name="ep-list"
                                id="ep_list"
                                value={selectedChunk}
                                className="episode-select"
                                onChange={handleEpisodeSelect}
                            >
                                {" "}
                                {episodeLists &&
                                    episodeLists.map((episodeChunk, i) => {
                                        console.log(episodeChunk);
                                        return (
                                            <option
                                                className="episde-option"
                                                key={`${episodeChunk[0].number}-${i}`}
                                                value={i}
                                            >{`${episodeChunk[0].number} - ${
                                                episodeChunk[episodeChunk.length - 1].number
                                            }`}</option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="episode-lists__container">
                            {/* {episodeList.episodes &&
                                episodeList.episodes?.map(({ id: epId, title, number, image }, index) => {
                                    return (
                                        <Link
                                            className={`episode-lists__item ${
                                                watching === epId ? "active" : ""
                                            }`}
                                            key={`${epId}${index}`}
                                            to={`/watch/${animeId}?watching=${epId}`}
                                            onClick={() => setLoading(true)}
                                        >
                                            <EpisodeCard
                                                data={{
                                                    id: epId,
                                                    title,
                                                    number,
                                                    image,
                                                }}
                                            ></EpisodeCard>
                                        </Link>
                                    );
                                })} */}
                            {episodeLists &&
                                episodeLists[selectedChunk]?.map(
                                    ({ id: epId, title, number, image }, index) => {
                                        return (
                                            <Link
                                                className={`episode-lists__item ${
                                                    watching === epId ? "active" : ""
                                                }`}
                                                key={`${epId}${index}`}
                                                to={`/watch/${episodeList.id}?watching=${epId}`}
                                            >
                                                <EpisodeCard
                                                    data={{
                                                        id: epId,
                                                        title,
                                                        number,
                                                        image,
                                                    }}
                                                ></EpisodeCard>
                                            </Link>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                </section>
                <section className="recommended container">
                    <div className="recommended__wrapper">
                        <div className="recommended__header  bg-color">
                            <h2>Recommended</h2>
                        </div>
                        <div className="recommended-list">
                            <Swiper
                                grabCursor={true}
                                modules={[Pagination, Navigation]}
                                slidesPerView={2}
                                spaceBetween={20}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    1024: {
                                        slidesPerView: 5,
                                    },
                                }}
                            >
                                {episodeList.recommendations &&
                                    episodeList.recommendations.map((reccomendation) => {
                                        const {
                                            id,
                                            image,
                                            cover,
                                            title: { romaji, english, native },
                                            type,
                                            episodes,
                                            status,
                                            rating,
                                        } = reccomendation;

                                        return (
                                            <SwiperSlide key={`${reccomendation.id}-${romaji}`}>
                                                <NavLink to={`/info/${id}`} onClick={() => setLoading(true)}>
                                                    <Card
                                                        data={{
                                                            id,
                                                            image,
                                                            cover,
                                                            title: {
                                                                romaji,
                                                                english,
                                                                native,
                                                            },
                                                            type,
                                                            episodes,
                                                            status,
                                                            rating,
                                                        }}
                                                    ></Card>
                                                </NavLink>
                                            </SwiperSlide>
                                        );
                                    })}
                            </Swiper>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default WatchPage;
