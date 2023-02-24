import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Card from "../Card";

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

import { Link } from "react-router-dom";

const TrendingAnime = ({ trendingAnime, loading }) => {
    const swiperRef = useRef();

    return (
        <>
            <section className="trending-anime">
                <div className="container">
                    <div className="container__title">
                        <h1>Trending Now</h1>
                        <div className="swiper-controls">
                            <div
                                className="swiper-button-next trend-next"
                                tabIndex="-1"
                                role="button"
                                aria-label="Next slide"
                                aria-controls="trending"
                                aria-disabled="true"
                                onClick={() => swiperRef.current?.slideNext()}
                            ></div>
                            <div
                                className="swiper-button-prev trend-prev"
                                tabIndex="0"
                                role="button"
                                aria-label="Previous slide"
                                aria-controls="trending"
                                aria-disabled="false"
                                onClick={() => swiperRef.current?.slidePrev()}
                            ></div>
                        </div>
                    </div>
                    {loading ? (
                        <div className="trending trending-skeleton" id="trending">
                            <div className="grid-trending">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index} className="skeleton-card trending-card">
                                        <div className="card__img skeleton skeleton__img"></div>
                                        <div className="card__title skeleton skeleton__text"></div>
                                        <div className="card__episode skeleton skeleton__text"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Swiper
                            onSlideChange={(swiper) => {
                                const isEnd = swiper.isEnd;
                                const nextBtn = document.querySelector(".trend-next");
                                const prevBtn = document.querySelector(".trend-prev");

                                if (isEnd) {
                                    nextBtn.classList.add("swiper-button-disabled");
                                    nextBtn.setAttribute("aria-disabled", "true");
                                } else {
                                    nextBtn.classList.remove("swiper-button-disabled");
                                    nextBtn.setAttribute("aria-disabled", "false");
                                }

                                if (swiper.activeIndex === 0) {
                                    prevBtn.classList.add("swiper-button-disabled");
                                    prevBtn.setAttribute("aria-disabled", "true");
                                } else {
                                    prevBtn.classList.remove("swiper-button-disabled");
                                    prevBtn.setAttribute("aria-disabled", "false");
                                }
                            }}
                            grabCursor={true}
                            // navigation={true}
                            modules={[Pagination, Navigation]}
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
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
                            {trendingAnime &&
                                trendingAnime.map(
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
                                    }) => (
                                        <SwiperSlide key={id} className="card__items">
                                            <Link to={`/info/${id}`}>
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
                                        </SwiperSlide>
                                    )
                                )}
                        </Swiper>
                    )}
                </div>
            </section>
        </>
    );
};

export default TrendingAnime;
