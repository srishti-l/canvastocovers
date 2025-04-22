const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

/**
 * Fetches a random page of artworks from the Art Institute of Chicago API.
 *
 * @async
 * @function fetchArtworks
 * @param {number} [limit=100] - Number of artworks to fetch per request
 * @returns {Promise<Array>} A promise that resolves to an array of artwork objects
 */

export const fetchArtworks = async (limit = 100) => {
  try {
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=${limit}`
    );

    // const response = await fetch(`${BASE_URL}?limit=${limit}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return [];
  }
};

/**
 * Fetches detailed data for a specific artwork by its ID.
 *
 * @async
 * @function fetchArtworkById
 * @param {number|string} id - The ID of the artwork to fetch
 * @returns {Promise<Object|null>} A promise that resolves to the artwork data, or null if an error occurs
 */

export const fetchArtworkById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching artwork with ID ${id}:`, error);
    return null;
  }
};

/**
 * Fetches artworks matching the specified filters (artist, medium, and type).
 *
 * @async
 * @function fetchMeArts
 * @param {string} artist - The artist name to filter by (optional)
 * @param {string} medium - The medium to filter by (optional)
 * @param {string} type - The artwork type to filter by (optional)
 * @returns {Promise<Array|null>} A promise that resolves to a filtered array of artwork results, or null on error
 */

export const fetchMeArts = async (artist, medium, type) => {
  try {
    const filters = [artist, medium, type].filter(Boolean).join(' ');
    const response = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(filters)}&limit=4&fields=id,title,image_id`
    );
    const data = await response.json();

    // const filters = [artist, medium, type]
    // .filter(Boolean)
    // .join(' ')
    // const response = await fetch(`${BASE_URL}?q=${filters}&limit=10`); 
    // const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching artwork`, error);
    return null;
  }
}