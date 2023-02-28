import "./animeinfoskeleton.scss";

const AnimeinfoSkeleton = () => {
    return (
        <>
            <section className="info-page">
                <div className="bg-cover">
                    <div className="cover skeleton"></div>
                </div>
                <div className="anime details-wrapper container">
                    <div className="anime__img skeleton">
                        <div className="skeleton skeleton__img"></div>
                    </div>
                    <div className="anime__main-detail ">
                        <div className="anime__title skeleton skeleton__text">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div key={index} className="skeleton-card trending-card">
                                    <p className="other-titles skeleton skeleton__text"></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="other-details">
                        <div className="other-details__wrapper">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <p key={index} className="other-details__text skeleton skeleton__text"></p>
                            ))}
                        </div>

                        <div>
                            <p></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AnimeinfoSkeleton;
