const BASE_URL = `https://www.googleapis.com/books/v1/volumes`
const apikey = `AIzaSyBoOykZVOhblPnKVc4WILG2pvMK9TBrNyY`

/**
 * Fetches book recommendations from the Google Books API based on artwork details.
 *
 * @async
 * @function fetchMeBooks
 * @param {string} artist - The artist's name (optional)
 * @param {string} title - The artwork's title (optional)
 * @param {string} medium - The medium used in the artwork (optional)
 * @param {string} artworktype - The type of artwork (optional)
 * @returns {Array} Array of book results
 *                   
 */
export const fetchMeBooks = async (artist, title, medium, artworktype) => {
  try {
    const filters = [artist, title, medium, artworktype]
      .filter(item => item != null && item !== '') 
      .join(' '); 


    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${filters}`);
    const data = await response.json();

    return data.items || []; 
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

