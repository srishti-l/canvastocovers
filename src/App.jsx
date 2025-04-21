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


function App() {
  const [image, setImage] = useState(''); // this will be state for image changing, image is the current url, setImage is the updated
  // would this only be for random image generator? 
  const [book, setBook] = useState(''); // this will be the state for the book recommendation
  const [recArts, setRecArts] = useState([]);
  const [artwork, setArtwork] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [id, setID] = useState('');
  const [bookList, setBookList] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);


  const handleArtDetails = (art) => {
    const artwork_id = art.id;
    try {
      // const artwork = await fetchArtworkById(artwork_id.id)
      console.log(artwork_id);
    } catch {
      setError('Failed to load artwork');
    }
  }

  // getting the book list 
  const handleFetchMeBook = async (artist, title, medium, type) => {
    // const books = await fetchMeBooks("Van Gogh", "Starry Night", "Oil", "Painting");
    setBookList([]);
    setRecArts([]);
    // setArtworks([]);
    const books = await fetchMeBooks(artist, title, medium, type)
    console.log(books);
    setBookList(books);
  }

  //  getting art list
  const handleFetchMeArts = async (artist, medium, type) => {
    setRecArts([]);
    setBookList([]);
    const arts = await fetchMeArts(artist, medium, type);
    // setArtworks(arts)
    setRecArts(Array.isArray(arts) ? arts : []);
  }

  // getting the images for the art modal 
  const getImage = (art) => {
    console.log('the click worked');
    setRecArts([]);
    setBookList([]);
    setImage(art); // Set the selected artwork in state
    setModalShow(true);
  };


  //  get single art pieces 
  const handleFetchArtwork = async () => {
    // const id = '129884'; // example ID from AIC
    try {
      setArtworks([]);
      const artworksList = await fetchArtworks(10);

      // Step 2: Pick a random one
      const randomArtwork = artworksList[Math.floor(Math.random() * artworksList.length)];

      // Step 3: Fetch full details for that artwork
      const data = await fetchArtworkById(randomArtwork.id);
      console.log(randomArtwork.id)
      // const data = await fetchArtworkById(id);
      setBookList([]);
      setArtwork(data);
      // setArtworks([]);
      console.log('works');
    } catch (err) {
      setError('Failed to load artwork');
      console.error(err);
    }
  };

  //  get art gallery 
  const handleArtworkGallery = async () => {
    try {
      const art = await fetchArtworks();
      const filteredArtworks = art.filter(a => a.image_id);
      setArtworks(filteredArtworks);
      // setArtworks(art);
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
        {/* click for random art  */}
        <button className='user-option' onClick={handleFetchArtwork}>Random Artwork</button>

        {/* click for gallery view  */}
        <button className='user-option' onClick={handleArtworkGallery}>View Our Gallery</button>

        {/* check rationale of error code */}

        {error && <p>{error}</p>}

        {/* if the artwork exists, diplay artwork details onClick */}

        {artwork && (
          <div>
            <ArtworkDetail
              id={artwork.image_id}
              url={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              title={artwork.title}
              artist={artwork.artist_display}
              medium={artwork.medium_display}
              artworktype={artwork.artwork_type_title}
              year={artwork.date_display}
              description={artwork.thumbnail?.alt_text || 'No description available.'}

              // book button 
              bookHandler={() =>
                handleFetchMeBook(
                  artwork?.artist,
                  artwork?.title,
                  artwork?.medium_display,
                  artwork?.artwork_type_title
                )
              }

              // similar art button 
              artHandler={() =>
                handleFetchMeArts(
                  artwork?.artist_display,
                  artwork?.medium_display,
                  artwork?.artwork_type_title
                )
              }
            />
            {/* <button onClick={() => handleFetchMeBook(artwork.artist, artwork.title, artwork.medium_display, artwork.artwork_type_title)}>Get Book Recs</button> */}
            {/* generate recommended book list  */}
            <div className='book-list'>
              {bookList.length > 0 ? (
                bookList.map((book, index) => {
                  const info = book.volumeInfo;

                  if (!info) return null;

                  const thumbnail = info.imageLinks?.thumbnail || 'https://via.placeholder.com/150?text=No+Image';
                  const title = info.title || 'Untitled';
                  const author = Array.isArray(info.authors) && info.authors.length > 0
                    ? info.authors[0]
                    : 'Unknown Author';

                  return (
                    <BookCard
                      key={index}
                      thumbnail={thumbnail}
                      title={title}
                      author={author}
                    />
                  );
                })
              ) : (
                // <p>No Current Book Recommendations</p>
                <p></p>
              )}
            </div>

            {/* populate recommended arts on button click */}
            {/* generate recommended art list  */}
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

        {/* populate the gallery */}
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

        {/* <Recommender /> */}
      </main>

      {/* <Footer /> */}

      {/* <footer>
        <Footer />
      </footer> */}

    </>
  )
}

export default App

