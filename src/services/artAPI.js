const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

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
    console.error(`Errof fetching artwork`, error); 
    return null; 
  }
}