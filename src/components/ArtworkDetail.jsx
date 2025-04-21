import ArtworkCard from "./ArtworkCard";

const ArtworkDetail = ({ artwork, id, url, artist, title, year, medium, artworktype, description, bookHandler, artHandler }) => {
    return (
        <>
            <figure>
                <ArtworkCard
                    id={id}
                    title={title}
                    url={url} />
                <figcaption>
                    <h3>{title} by {artist}</h3>
                    <p>{medium} {artworktype}, created in {year}</p>
                    <p>{description}</p>
                </figcaption>
            </figure>
            <div className='user-actions'>
                <button className='user-option' onClick={bookHandler}>Get Book Recommendations</button>
                <button className='user-option' onClick={artHandler}>View Similar Pieces</button>
            </div>
        </>

    )
}

export default ArtworkDetail;
