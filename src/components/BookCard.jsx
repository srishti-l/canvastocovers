import { useState } from 'react';

/**
 * BookCard component displays an individual book's thumbnail, title, and author.
 * Allows users to toggle description visibility and add/remove books from favorites (stored in localStorage).
 *
 * @component
 * @param {Object} props - Props passed to the component
 * @param {string} props.title - The title of the book
 * @param {string} props.thumbnail - URL to the book's cover image
 * @param {string} props.author - The author of the book
 * @param {string} props.description - A brief description of the book
 * @param {Function} props.descriptionHandler - Function to update the selected book description in the parent component
 *
 * @returns {JSX.Element} The rendered book card with image, title, author, favorite toggle, and optional description
 */


const BookCard = ({ title, thumbnail, author, description, descriptionHandler }) => {
    // state for book favorites 
    const [isFavorite, setIsFavorite] = useState(false);

    const [showDesc, setShowDesc] = useState(false);

    /**
     * Handles clicking on the book image.
     * Triggers the description handler and toggles description visibility.
     */

    const handleImageClick = () => {
        descriptionHandler();  // This updates the description in App.js
        setShowDesc(!showDesc); // Toggle visibility of the description
    };

     /**
     * Handles adding or removing the book from favorites (stored in localStorage).
     */
    
    const handleFavoriteClick = () => {
        const favoriteBook = {
            title,
            author,
            thumbnail,
            description
        };

        const stored = JSON.parse(localStorage.getItem('my.favorites')) || [];
        const filteredFavorites = stored.filter(book => book.title !== title);

        let updatedFavorites;
    
        if (filteredFavorites.length === stored.length) {
            updatedFavorites = [...stored, favoriteBook];
            setIsFavorite(true);
            alert(`${title} added to favorites!`);
        } else {
            updatedFavorites = filteredFavorites;
            alert(`${title} removed from favorites.`);
            setIsFavorite(false);
        }
        localStorage.setItem('my.favorites', JSON.stringify(updatedFavorites));
    };

    // const toggleDescription = () => {
    //     setShowDesc(!showDesc);
    // }

    // jsx for book card display
    return (
        <div className="book">
            <img src={thumbnail} onClick={handleImageClick} alt="book"></img>
            <p className="favorite" onClick={() => handleFavoriteClick()}>{isFavorite ? '❤️' : '♡'}</p>
            <h4>{title}</h4>
            <p>By {author}</p>
            {/* <h4 className='book-description-title'>Book Description</h4>
            <p className='book-description'>{description}</p>
         */}
            {/* {description && showDesc && (
                <div className="book-description">
                    <h5>Book Description</h5>
                    <p>{description}</p>
                </div>
            )} */}
            {/* {description && (
                <button onClick={toggleDescription}>
                    {showDesc ? "Hide Description" : "Show Description"}
                </button>
            )} */}
        </div>

    )
}

export default BookCard; 