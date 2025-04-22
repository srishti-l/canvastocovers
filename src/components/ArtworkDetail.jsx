import ArtworkCard from "./ArtworkCard";


/**
 * ArtworkDetail component displays detailed information about a selected artwork,
 * including its image, metadata, and options to fetch related books or similar artworks.
 *
 * @component
 * @param {Object} props - Props passed to the component
 * @param {Object} props.artwork - The full artwork object (optional, may contain extra data)
 * @param {string} props.id - The ID of the artwork
 * @param {string} props.url - The URL of the artwork image
 * @param {string} props.artist - Name of the artist
 * @param {string} props.title - Title of the artwork
 * @param {string} props.year - Year the artwork was created
 * @param {string} props.medium - Medium used in the artwork
 * @param {string} props.artworktype - Type or category of the artwork
 * @param {string} props.description - Description or alternative text for the artwork
 * @param {Function} props.bookHandler - Function to fetch book recommendations
 * @param {Function} props.artHandler - Function to fetch similar artworks
 *
 * @returns {JSX.Element} The rendered artwork detail section with image, metadata, and action buttons
 */

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
