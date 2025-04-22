import { useState } from 'react'
import './App.css'
import { fetchArtworkById } from './services/artAPI'
import { fetchArtworks } from './services/artAPI'
import ArtworkCard from './components/ArtworkCard'
import ArtworkDetail from './components/ArtworkDetail'
import BookCard from './components/BookCard'
import Footer from './components/Footer'
import Header from './components/Header'
import { fetchMeBooks } from './services/booksAPI'
import ArtModal from './components/ArtModal'
import React from 'react';
import { fetchMeArts } from './services/artAPI'
import 'bootstrap/dist/css/bootstrap.min.css';


/**
 * Main App component which handles the display of artworks, books, and related functionalities.
 * @returns The rendered App component.
 */
function App() {

  const [image, setImage] = useState('');
  const [recArts, setRecArts] = useState([]);
  const [artwork, setArtwork] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [description, setDescription] = useState('');
  const [bookList, setBookList] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [error, setError] = useState(null);

  // const myFavs = localStorage.getItem('my.favorites')
  //   ? JSON.parse(localStorage.getItem('my.favorites')) :
  //   []
  // const [favorites, setFavorites] = useState([]);

  // const updatedMemories = [...memories, newMemory].sort((a, b) => {
  //   return new Date(a.date) - new Date(b.date);
  // });
  // setMemories(updatedMemories);
  // localStorage.setItem('stored.memories', JSON.stringify(updatedMemories));


  const handleDescription = async (desc) => {
    // setDescription('');
    console.log(desc)
    setDescription(desc || 'No description available')
  }
  
   /**
   * Fetches books related to the artwork, based on the artist, title, medium, and type.
   * @param {string} artist The artist's name.
   * @param {string} title The artwork's title.
   * @param {string} medium The medium used for the artwork.
   * @param {string} type The type of artwork (e.g., painting, sculpture).
   */
  const handleFetchMeBook = async (artist, title, medium, type) => {
    setBookList([]);
    setRecArts([]);
    const books = await fetchMeBooks(artist, title, medium, type)
    console.log(books);
    setBookList(books);
  }

   /**
   * Fetches artworks similar to the selected artwork, based on artist, medium, and type.
   * @param {string} artist The artist's name.
   * @param {string} medium The medium used for the artwork.
   * @param {string} type The type of artwork.
   */
  const handleFetchMeArts = async (artist, medium, type) => {
    setRecArts([]);
    setBookList([]);
    const arts = await fetchMeArts(artist, medium, type);
    setRecArts(Array.isArray(arts) ? arts : []);
  }

  /**
   * Sets the image for the modal when an artwork is clicked.
   * @param {object} art The artwork object to display in the modal.
   */
  const getImage = (art) => {
    console.log('the click worked');
    setRecArts([]);
    setBookList([]);
    setImage(art); 
    setModalShow(true);
  };


  /**
   * Fetches a random artwork and its details.
   */
  const handleFetchArtwork = async () => {
    try {
      setArtworks([]);
      const artworksList = await fetchArtworks(10);
      const randomArtwork = artworksList[Math.floor(Math.random() * artworksList.length)];
      const data = await fetchArtworkById(randomArtwork.id);
      console.log(randomArtwork.id)
      
      setRecArts([]);
      setBookList([]);
      setArtwork(data);

      console.log('works');
    } catch (err) {
      setError('Failed to load artwork');
      console.error(err);
    }
  };

  /**
   * Fetches the artwork gallery and filters artworks that have an image ID.
   */
  const handleArtworkGallery = async () => {
    try {
      const art = await fetchArtworks();
      const filteredArtworks = art.filter(a => a.image_id);
      setArtworks(filteredArtworks);
      setArtwork();

    } catch (err) {
      setError('Failed to load artwork');
      console.error(err);
    }
  };

  return (
    <>

      <h1>
        <Header
          title={"Canvas to Covers"} />
      </h1>

      <main>
        {/* Button to trigger random artwork fetching  */}
        <button className='user-option' onClick={handleFetchArtwork}>Random Artwork</button>

        {/* Button to trigger gallery view */}
        <button className='user-option' onClick={handleArtworkGallery}>View Gallery</button>

        {/* Error message if artwork fetching fails */}
        {error && <p>{error}</p>}

        {/* If there's an artwork, show its details */}
        {artwork && (
          <div>
            <ArtworkDetail
              id={artwork?.image_id}
              url={`https://www.artic.edu/iiif/2/${artwork?.image_id}/full/843,/0/default.jpg`}
              title={artwork?.title}
              artist={artwork?.artist_display}
              medium={artwork?.medium_display}
              artworktype={artwork?.artwork_type_title}
              year={artwork?.date_display}
              description={artwork.thumbnail?.alt_text || 'No description available.'}

              // List of recommended books
              bookHandler={() =>
                handleFetchMeBook(
                  artwork?.artist,
                  artwork?.title,
                  artwork?.medium_display,
                  artwork?.artwork_type_title
                )
              }

              // List of similar artworks 
              artHandler={() =>
                handleFetchMeArts(
                  artwork?.artist_display,
                  artwork?.medium_display,
                  artwork?.artwork_type_title
                )
              }
            />
            
            {/* List of recommended books */}
            <div className='book-list'>
              {bookList.length > 0 ? (
                bookList.map((book, index) => {
                  const info = book.volumeInfo;

                  if (!info) return null;

                  const thumbnail = info.imageLinks?.thumbnail || 'https://via.placeholder.com/150?text=No+Image';
                  const title = info.title || 'Untitled';
                  const author = info.authors && info.authors.length > 0
                    ? info.authors[0]
                    : 'Unknown Author';
                  const bookDescription = info.description || 'No description available';

                  return (
                    <BookCard
                      key={index}
                      thumbnail={thumbnail}
                      title={title}
                      author={author}
                      // description={bookDescription}
                      // descriptionHandler={() => handleDescription(bookDescription)}

                      
                    />
                  );
                })
              ) : (
                // <p>No Current Book Recommendations</p>
                <p></p>
              )}
            </div>

            {/* Similar artworks */}
            <div className='rec-art-list'>
              {recArts.map((art, index) => (
                <ArtworkCard
                  key={index}
                  id={art.id}
                  title={art.title}
                  url={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
                  detailHandler={() => getImage(art)}

                  onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                />

              ))}


            </div>

          </div>
        )}

        {/* Display artwork gallery */}
        <div className='gallery'>

          {artworks.map((art, index) => (
            <ArtworkCard
              key={index}
              id={art.id}
              title={art.title}
              url={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
              detailHandler={() => getImage(art)}

              // onError={(e) => e.target.src = 'https://via.placeholder.com/300'} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Available';
              }}
            />

          ))}
          {image &&
            <div className='art-details'>
              <ArtModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                artwork={image}
                bookList={bookList}
                bookHandler={handleFetchMeBook}
                artHandler={handleFetchMeArts}
                artworks={recArts}
              />


            </div>
          }
        </div>

      </main>

      <Footer />

    </>
  )
}

export default App

