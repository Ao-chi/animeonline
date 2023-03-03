import React, { useEffect, useState } from "react";

import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Card from "../../components/Card";
import EpisodeCard from "../../components/Episode-Card/Episode-Card";
import RelatedCard from "../../components/Related-card/RelatedCard";

import AnimeinfoSkeleton from "../../components/AnimeinfopageSkeleton/Animeinfoskeleton";
import "./AnimeInfopage.scss";

const Animeinfopage = ({ instance }) => {
    const { animeId } = useParams();
    const [aniInfo, setAniInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [episodeLists, setEpisodeLists] = useState(null);
    const [selectedChunk, setSelectedChunk] = useState(0);
    // const [selectOpen, setSelectOpen] = useState(false);
    // const [selectedPlaceholder, setSelectedPlaceholder] = useState();

    console.log();
    const toggleDescription = () => {
        setShowFullDesc(!showFullDesc);
    };

    // const buttonClasses = showFullDesc ? "active" : "";
    // const buttonText = showFullDesc ? "Read Less" : "Read More";
    const buttonClasses = showFullDesc ? "active" : "";
    const descriptionLength = aniInfo.description && aniInfo.description.replace(/<br>/g, "").length;
    const buttonText = showFullDesc ? "Read Less" : "Read More";

    useEffect(() => {
        const fetchAniInfo = async () => {
            setLoading(true);
            if (animeId.length > 0) {
                const data = await instance.get(`info/${animeId}?provider=gogoanime?isDub=false`);
                setAniInfo(data.data);
                setLoading(false);
            }
        };

        fetchAniInfo();
    }, [instance, animeId]);

    // devide episodes morethan 24 into chunks
    useEffect(() => {
        const episodeListUpdate = () => {
            const episodeListChunk = [];
            if (aniInfo.episodes) {
                for (let i = 0; i < aniInfo.episodes.length; i += 24) {
                    episodeListChunk.push(aniInfo.episodes.slice(i, i + 24));
                }
                setSelectedChunk(0);
                setEpisodeLists(episodeListChunk);
                console.log(aniInfo);
            }
        };
        episodeListUpdate();
    }, [setEpisodeLists, aniInfo.episodes, aniInfo]);

    const handleEpisodeSelect = (e) => {
        setSelectedChunk(e.target.value);
    };

    return (
        <>
            {loading ? (
                <>
                    <AnimeinfoSkeleton />
                </>
            ) : (
                <>
                    {aniInfo && (
                        <main className="animeinfo-main">
                            <section className="info-page">
                                <div className="bg-cover">
                                    <div className="cover">
                                        <div className="overlay--blur"></div>
                                        <picture className="cover__img">
                                            <source media="(max-width:992px)" srcSet={aniInfo.image} />

                                            <img src={aniInfo.cover} alt={aniInfo.title?.romaji} />
                                        </picture>
                                    </div>
                                </div>
                                <div className="anime details-wrapper container">
                                    <div className="anime__img">
                                        <img src={aniInfo.image} alt={`${aniInfo.title?.romaji} poster`} />
                                    </div>
                                    <div className="anime__main-detail">
                                        <div className="anime__title">
                                            <h1 className="title">{aniInfo.title?.romaji}</h1>
                                            <p className="other-titles">
                                                <i>
                                                    {aniInfo.title?.english}, {aniInfo.title?.native}
                                                </i>
                                            </p>
                                        </div>
                                        {aniInfo.genres && (
                                            <div className="anime__genres">
                                                {aniInfo.genres.map((genre) => {
                                                    return <Link key={genre}>{genre}</Link>;
                                                })}
                                            </div>
                                        )}
                                        <div className="anime__air-time">
                                            <p>
                                                <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
                                                {aniInfo.season} {aniInfo.releaseDate}
                                            </p>
                                            <span className="dot"></span>
                                            <p>
                                                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                {aniInfo.duration} mins
                                            </p>
                                        </div>
                                        <div className="anime__description">
                                            {/* <p
                                                className={showFullDesc ? "show" : ""}
                                                dangerouslySetInnerHTML={{
                                                    __html: showFullDesc
                                                        ? aniInfo.description &&
                                                          aniInfo.description.replace(/<br>/g, "")
                                                        : aniInfo.description &&
                                                          `${aniInfo.description
                                                              .substring(0, 300)
                                                              .replace(/<br>/g, "")}...`,
                                                }}
                                            />
                                            <button
                                                className={buttonClasses}
                                                aria-label="Read more"
                                                onClick={toggleDescription}
                                            >
                                                {buttonText}
                                            </button> */}
                                            <p
                                                className={showFullDesc ? "show" : ""}
                                                dangerouslySetInnerHTML={{
                                                    __html: showFullDesc
                                                        ? aniInfo.description &&
                                                          aniInfo.description.replace(/<br>/g, "")
                                                        : aniInfo.description &&
                                                          `${aniInfo.description
                                                              .substring(0, 300)
                                                              .replace(/<br>/g, "")}...`,
                                                }}
                                            />
                                            {descriptionLength > 300 && (
                                                <button
                                                    className={buttonClasses}
                                                    aria-label="Read more"
                                                    onClick={toggleDescription}
                                                >
                                                    {buttonText}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="other-details">
                                        <div className="other-details__wrapper">
                                            <p className="other-details__key">Type:</p>
                                            <p className="other-details__val">{aniInfo.type}</p>
                                        </div>
                                        <div className="other-details__wrapper">
                                            <p className="other-details__key">Status:</p>
                                            <p className="other-details__val">{aniInfo.status}</p>
                                        </div>
                                        <div className="other-details__wrapper">
                                            <p className="other-details__key">Studios:</p>
                                            <p className="other-details__val">{aniInfo.studios}</p>
                                        </div>
                                        <div className="other-details__wrapper">
                                            <p className="other-details__key">Episodes:</p>
                                            <p className="other-details__val">{aniInfo.totalEpisodes}</p>
                                        </div>
                                        <div className="other-details__wrapper">
                                            <p className="other-details__key">sub or Dub:</p>
                                            <p className="other-details__val">{aniInfo.subOrDub}</p>
                                        </div>
                                        <div>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="episode-lists container">
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
                                                    // console.log(episodeChunk);
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
                                        {episodeLists &&
                                            episodeLists[selectedChunk]?.map(
                                                ({ id: epId, title, number, image }, index) => {
                                                    return (
                                                        <NavLink
                                                            key={`${epId}${index}`}
                                                            to={`/watch/${aniInfo.id}?watching=${epId}`}
                                                        >
                                                            <EpisodeCard
                                                                data={{
                                                                    id: epId,
                                                                    title,
                                                                    number,
                                                                    image,
                                                                }}
                                                            ></EpisodeCard>
                                                        </NavLink>
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                                <div className="related-container bg-color">
                                    <h2>Related</h2>

                                    {aniInfo.relations
                                        ?.slice(0, 5)
                                        .map(({ id, image, title: { romaji }, status, type }) => {
                                            return (
                                                <NavLink to={`/info/${id}`} key={`${id}${romaji}`}>
                                                    <RelatedCard
                                                        data={{
                                                            id,
                                                            image,
                                                            title: { romaji },
                                                            status,
                                                            type,
                                                        }}
                                                    ></RelatedCard>
                                                </NavLink>
                                            );
                                        })}
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
                                            {aniInfo.recommendations &&
                                                aniInfo.recommendations.map((reccomendation) => {
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
                                                            <NavLink
                                                                to={`/info/${id}`}
                                                                onClick={(e) => {
                                                                    setLoading(true);
                                                                    toggleDescription();
                                                                }}
                                                            >
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
                    )}
                </>
            )}
        </>
    );
};

export default Animeinfopage;
