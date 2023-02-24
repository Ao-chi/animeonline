import React, { useEffect, useState } from "react";

import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Card from "../../components/Card";
import EpisodeCard from "../../components/Episode-Card/Episode-Card";
import RelatedCard from "../../components/Related-card/RelatedCard";

import "./AnimeInfopage.scss";

const Animeinfopage = ({ instance }) => {
    const { animeId } = useParams();
    const [aniInfo, setAniInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showFullDesc, setShowFullDesc] = useState(false);

    const toggleDescription = () => {
        setShowFullDesc(!showFullDesc);
    };

    const buttonClasses = showFullDesc ? "active" : "";
    const buttonText = showFullDesc ? "Read Less" : "Read More";

    useEffect(() => {
        const fetchAniInfo = async () => {
            const data = await instance.get(`info/${animeId}?provider=gogoanime?isDub=false`);
            const {
                id,
                title: { romaji, english, native },
                synonyms,
                isAdult,
                countryOfOrigin,
                color,
                cover,
                image,
                currentEpisode,
                description,
                releaseDate,
                startDate: { year: sYear, month: sMonth, day: sDay },
                endDate: { year: endYear, month: endMonth, day: endDay },
                totalEpisodes,
                rating,
                duration,
                genres,
                season,
                studios,
                subOrDub,
                type,
                recommendations,
                relations,
                episodes,
                status,
            } = data.data;
            // console.log(romaji);
            setAniInfo({
                id,
                title: { romaji, english, native },
                synonyms,
                isAdult,
                countryOfOrigin,
                color,
                cover,
                image,
                currentEpisode,
                description,
                releaseDate,
                startDate: { year: sYear, month: sMonth, day: sDay },
                endDate: { year: endYear, month: endMonth, day: endDay },
                totalEpisodes,
                rating,
                duration,
                genres,
                season,
                studios,
                subOrDub,
                type,
                recommendations,
                relations,
                episodes,
                status,
            });
            setLoading(false);
        };
        fetchAniInfo();
    }, [instance, animeId]);

    return (
        <>
            {loading ? (
                <>
                    <div>
                        <p>loading</p>
                    </div>
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
                                            <source
                                                media="(max-width:992px)"
                                                srcSet={aniInfo.image}
                                            />

                                            <img src={aniInfo.cover} alt={aniInfo.title?.romaji} />
                                        </picture>
                                    </div>
                                </div>
                                <div className="anime details-wrapper container">
                                    <div className="anime__img">
                                        <img
                                            src={aniInfo.image}
                                            alt={`${aniInfo.title?.romaji} poster`}
                                        />
                                    </div>
                                    <div className="anime__main-detail">
                                        <div className="anime__title">
                                            <h1 className="title">{aniInfo.title?.romaji}</h1>
                                            <p className="other-titles">
                                                <i>
                                                    {aniInfo.title?.english},{" "}
                                                    {aniInfo.title?.native}
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
                                                <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                ></FontAwesomeIcon>
                                                {aniInfo.season} {aniInfo.releaseDate}
                                            </p>
                                            <span className="dot"></span>
                                            <p>
                                                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                {aniInfo.duration} mins
                                            </p>
                                        </div>
                                        <div className="anime__description">
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
                                            <button
                                                className={buttonClasses}
                                                aria-label="Read more"
                                                onClick={toggleDescription}
                                            >
                                                {buttonText}
                                            </button>
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
                                            <p className="other-details__val">
                                                {aniInfo.totalEpisodes}
                                            </p>
                                            <p>{aniInfo.subOrDub}</p>
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
                                    </div>
                                    <div className="episode-lists__container">
                                        {aniInfo.episodes?.map(
                                            ({ id, title, number, image }, index) => {
                                                return (
                                                    <NavLink
                                                        key={`${id}${index}`}
                                                        onClick={() => setLoading(true)}
                                                    >
                                                        <EpisodeCard
                                                            data={{ id, title, number, image }}
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
                                                        <SwiperSlide
                                                            key={`${reccomendation.id}-${romaji}`}
                                                        >
                                                            <NavLink
                                                                to={`/info/${id}`}
                                                                onClick={() => setLoading(true)}
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
