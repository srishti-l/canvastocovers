/**
 * A component that displays an artwork image. Clicking the image triggers a detail handler.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {number|string} props.id - The unique identifier for the artwork.
 * @param {string} props.title - The title of the artwork, used for alt text.
 * @param {string} props.url - The image URL of the artwork.
 * @param {Function} props.detailHandler - Function to call when the image is clicked (e.g., to show details or open a modal).
 * @param {Function} [props.onError] - Optional error handler for the image (e.g., fallback if image fails to load).
 *
 * @returns {JSX.Element} A JSX element that displays the artwork image.
 */

const ArtworkCard = ({id, title, url, detailHandler, onError}) => {

    return (
        <>
            <img src={url} className="logo" alt={`image of ${title}`} width={'40%'} onClick={detailHandler} />
            
        </>
    )

}

export default ArtworkCard; 