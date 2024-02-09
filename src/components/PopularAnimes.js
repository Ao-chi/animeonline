import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/css/autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCirclePlay, faStar } from "@fortawesome/free-solid-svg-icons";

const PopularAnime = ({ popularAnime }) => {
    return (
        <section className="popular-anime">
            <Swiper
                loop={true}
                pagination={{
                    clickable: true,
                }}
                grabCursor={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
            >
                {popularAnime &&
                    popularAnime?.map(
                        ({
                            id,
                            image,
                            cover,
                            title: { romaji, english, native },
                            description,
                            type,
                            releaseDate,
                            rating,
                        }) => (
                            <SwiperSlide key={id}>
                                <div className="popular-card">
                                    <div className="popular-card__img">
                                        <div className="popular-card__overlay"></div>
                                        <picture className="popular-card__picture">
                                            <source media="(min-width: 650px)" srcSet={cover} />
                                            <img src={image} alt={romaji} />
                                        </picture>
                                    </div>
                                    <div className="popular-card__info">
                                        <div className="popular-card__title">
                                            <h2>{romaji}</h2>
                                        </div>
                                        <div className="popular-card__episode">
                                            <p>
                                                <FontAwesomeIcon icon={faCirclePlay}></FontAwesomeIcon>
                                                {type}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                                                {releaseDate}
                                            </p>
                                            <p>
                                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                                {(rating / 10).toFixed(1)}
                                            </p>
                                            <p className="hd-icon">HD</p>
                                            <p className="cc-icon">CC</p>
                                        </div>
                                        <div className="popular-card__desc">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        description && description.length > 200
                                                            ? `${description
                                                                  .substring(0, 250)
                                                                  .replace(/<br>/g, "")}...`
                                                            : description.replace(/<br>/g, ""),
                                                }}
                                            />
                                        </div>
                                        <div className="popular-card__watch">
                                            <Link
                                                className="episodes__links popular-card__watch--btn"
                                                to={`/info/${id}`}
                                            >
                                                <FontAwesomeIcon icon={faCirclePlay}></FontAwesomeIcon>
                                                Watch Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    )}
            </Swiper>
        </section>
    );
};

export default PopularAnime;
