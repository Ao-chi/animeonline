const RelatedCard = ({ data }) => {
    const {
        id,
        image,
        title: { romaji },
        status,
        type,
    } = data;
    return (
        <div className="related-card">
            <div className="related-card__img">
                <img src={image} alt={romaji} />
            </div>
            <div className="related-card__desc">
                <p className="related-card__title">{romaji}</p>

                <div className="related-card__sub-info">
                    <p>{type}</p>
                    <span className="dot"></span>
                    <p>{status}</p>
                </div>
            </div>
        </div>
    );
};

export default RelatedCard;
