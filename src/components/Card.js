import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ data }) => {
    // const title =
    //     data.title.romaji.length > 30
    //         ? data.title.romaji.substring(0, 25) + "..."
    //         : data.title.romaji;
    const rating1 = (data?.rating / 10).toFixed(1);
    const {
        id,
        image,
        cover,
        title: { romaji, english, native },
        type,
        episodes,
        status,
        rating,
    } = data;
    return (
        <div className="card">
            <div className="card__img">
                <div className="card__overlay"></div>
                <FontAwesomeIcon className="card__play" icon={faPlay}></FontAwesomeIcon>
                <img src={image} alt={data.title.romaji} />
                <div className="card__rating">
                    <span className="rating">
                        <FontAwesomeIcon className="rating__star" icon={faStar}></FontAwesomeIcon>
                        {rating1}
                    </span>
                </div>
                <div className="card__detail">
                    <div className="card__inner-detail">
                        <h4>{data.title.romaji}</h4>
                        <div className="status">
                            <p>{data.status}</p>
                            <span className="dot"></span>
                            <p>{data?.releaseDate ? data.releaseDate : data.type}</p>
                        </div>
                        <div className="time">
                            <p>
                                {data?.duration === null || data?.duration === undefined
                                    ? " "
                                    : `${data?.duration} mins`}
                            </p>
                            <span className="dot"></span>
                            <p>{data.totalEpisodes ? data.totalEpisodes : data.episodes} EPS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
