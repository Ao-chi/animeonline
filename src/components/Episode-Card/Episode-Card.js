import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EpisodeCard = ({ data }) => {
    const proxy = "https://cors.consumet.stream";
    return (
        <div className="episode-card">
            <div className="episode-card__image-wrapper">
                <div className="episode-card__overlay"></div>
                <FontAwesomeIcon className="episode-card__play" icon={faPlay}></FontAwesomeIcon>
                <img src={`${proxy}/${data.image}`} alt={data.id} />
            </div>
            <div className="episode-card__desc">
                <p className="ep-title">{data.title}</p>
                <p className="ep-number">{`Episode ${data.number}`}</p>
            </div>
        </div>
    );
};

export default EpisodeCard;
