/**
 * A component that displays an artwork image. Clicking the image triggers an artwork details handler.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {number} id - The unique identifier for the artwork.
 * @param {string} title - The title of the artwork, used for alt text.
 * @param {string} url - The image URL of the artwork.
 * @param {Function} detailHandler - Function to call when the image is clicked (e.g., to show details or open a modal). 
 * @returns {JSX.Element} A JSX element that displays the artwork image.
 */

const ArtworkCard = ({id, title, url, detailHandler}) => {

    return (
        <>
            <img src={url} className="logo" alt={`image of ${title}`} width={'40%'} onClick={detailHandler} />
        </>
    )

}

export default ArtworkCard; 