const BASE_URL = `https://www.googleapis.com/books/v1/volumes`
const apikey = `AIzaSyBoOykZVOhblPnKVc4WILG2pvMK9TBrNyY`


  export const fetchMeBooks = async (artist, title, medium, artworktype) => {
    try {
      const filters = [artist, title, medium, artworktype]
        .filter(Boolean) // remove undefined/null/empty
        .join(' '); // join into one string

  
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${filters}`);
      const data = await response.json();
    
      return data.items || []; // return books array
    //   return data.items ? data.items.slice(0, 4) : [];
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };

