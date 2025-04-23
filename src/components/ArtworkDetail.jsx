import ArtworkCard from "./ArtworkCard";


/**
 * ArtworkDetail component displays detailed information about a selected artwork,
 * including its image, metadata, and options to fetch related books or similar artworks.
 *
 * @component
 * @param {Object} props - Props passed to the component
 * @param {Object} artwork - The full artwork object (optional, may contain extra data)
 * @param {string} id - The ID of the artwork
 * @param {string} url - The URL of the artwork image
 * @param {string} artist_display - Name of the artist
 * @param {string} title - Title of the artwork
 * @param {string} date_display - Year the artwork was created
 * @param {string} medium_display - Medium used for artwork
 * @param {string} artwork_type_title - Type of artwork
 * @param {string} description - Description or alt text for the artwork
 * @param {Function} bookHandler - Function to fetch book recommendations
 * @param {Function} artHandler - Function to fetch similar artworks
 *
 * @returns {JSX.Element} The rendered artwork detail section with image, metadata, and action buttons
 */

const ArtworkDetail = ({ artwork, id, url, artist_display, title, date_display, medium_display, artwork_type_title, description, bookHandler, artHandler }) => {
    return (
        <>
            <figure>
                <ArtworkCard
                    id={id}
                    title={title}
                    url={url} />
                <figcaption>
                    <h3>{title} by {artist_display}</h3>
                    <p>{medium_display} {artwork_type_title}, created in {date_display}</p>
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
