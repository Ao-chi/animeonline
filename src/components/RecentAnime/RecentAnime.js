import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const RecentAnime = ({ recentAnime, totalPages, currentPage, handlePagination, loading }) => {
    return (
        <>
            <section className="recent-anime">
                <div className="container">
                    <div className="container__title">
                        <h1>Latest Episodes</h1>
                        <div className="pages">
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                handlePagination={handlePagination}
                            />
                        </div>
                    </div>
                    <ul className="card-list  grid-template">
                        {loading ? (
                            <>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div className="skeleton-card" key={index}>
                                        <div className="card__img skeleton skeleton__img"></div>
                                        <div className="card__title skeleton skeleton__text"></div>
                                        <div className="card__episode skeleton skeleton__text"></div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                {recentAnime &&
                                    recentAnime.map(
                                        (
                                            {
                                                id,
                                                image,
                                                cover,
                                                title: { romaji, english, native },
                                                description,
                                                type,
                                                releaseDate,
                                                duration,
                                                episodeId,
                                                episodeNumber,
                                            },
                                            i
                                        ) => (
                                            <li className="card__items" key={i}>
                                                <Link to={`/watch/${id}?watching=${episodeId}`}>
                                                    <div className="card">
                                                        <div className="card__img">
                                                            <div className="card__overlay"></div>
                                                            <FontAwesomeIcon
                                                                className="card__play"
                                                                icon={faPlay}
                                                            ></FontAwesomeIcon>
                                                            <img src={image} alt={(romaji, episodeNumber)} />
                                                            <div className="card__episode">
                                                                <p>EP {episodeNumber}</p>
                                                            </div>
                                                        </div>
                                                        <div className="card__title">
                                                            <p>
                                                                {romaji.length > 30
                                                                    ? romaji.substring(0, 25) + "..."
                                                                    : romaji}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    )}
                            </>
                        )}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default RecentAnime;
