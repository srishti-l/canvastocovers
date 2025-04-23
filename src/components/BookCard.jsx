import { useState } from 'react';

/**
 * BookCard component displays an individual book's thumbnail, title, and author.
 * Allows users to toggle description visibility and add/remove books from favorites (stored in localStorage).
 *
 * @component
 * @param {Object} props - Props passed to the component
 * @param {string} title - The title of the book
 * @param {string} thumbnail - URL to the book's cover image
 * @param {string} author - The author of the book
 * @param {string} description - A description of the book
 * @param {Function} descriptionHandler - Function to show the selected book's description 
 *
 * @returns {JSX.Element} The rendered book card with image, title, author, favorite toggle, and optional description
 */


const BookCard = ({ title, thumbnail, author, description, descriptionHandler }) => {
    // state for book favorites 
    const [isFavorite, setIsFavorite] = useState(false);

    // state for showing book description
    const [showDesc, setShowDesc] = useState(false);

    /**
     * Handles clicking on the book image.
     * Triggers the description handler and toggles the description visibility on click
     */

    const handleTitleClick = () => {
        descriptionHandler();  
        setShowDesc(!showDesc); 
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
            setIsFavorite(false);
            alert(`${title} removed from favorites.`);
        }
        localStorage.setItem('my.favorites', JSON.stringify(updatedFavorites));
    };


    // jsx for book card display
    return (
        <div className="book">
            <img src={thumbnail} alt="book"></img>
            <p className="favorite" onClick={() => handleFavoriteClick()}>{isFavorite ? '❤️' : '♡'}</p>
            <h4>{title}</h4>
            <p>By {author}</p>
            <h5 className='book-desc' onClick={handleTitleClick}>Click for Book Description</h5>
            {showDesc && description && (
                <div className="book-description">
                    <p>{description}</p>
                </div>
            )}
        </div>

    )
}

export default BookCard; 