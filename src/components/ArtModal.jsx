import ArtworkDetail from "./ArtworkDetail";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BookCard from "./BookCard";


/**
 * A component imported from Bootstrap, that renders a modal when an image is clicked on, and reveals art details. .
 *
 * @component
 * @param {Object} props - The props object.
 *
 * @returns {JSX.Element} A JSX element that displays the modal with artwork details
 */
function ArtModal(props) {
  const { show, onHide, artwork, bookList, bookHandler, artHandler, artworks } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {artwork.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ArtworkDetail
          {...artwork}
          artwork={artwork}
          id={artwork.image_id}
          url={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
          description={artwork.thumbnail?.alt_text || 'No description available.'}
          bookHandler={() => bookHandler(
            artwork.artist_display,
            artwork.title,
            artwork.medium_display,
            artwork.artwork_type_title
          )}
          artHandler={() =>
            artHandler(
              artwork?.artist_display,
              artwork?.medium_display,
              artwork?.artwork_type_title
            )
          }
        />
        {bookList.length > 0 && (
          <div className='book-list'>
            {bookList?.map((book, index) => (
              <BookCard
                key={index}
                thumbnail={book.volumeInfo.imageLinks?.thumbnail}
                title={book.volumeInfo.title || 'Untitled'}
                author={book.volumeInfo.authors || 'Unknown Author'}
                description={book.volumeInfo.description || 'No specific description'}
                descriptionHandler={props.descriptionHandler}
              />

            ))}
          </div>
        )}

        {artworks && artworks.length > 0 && (
          <div className='rec-art-list'>
            <div className='artwork-list'>
              {artworks.map((art, index) => (
                <div key={index}>
                  <img
                    src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
                    alt={art.title}
                    style={{ width: '100px', height: 'auto', margin: '0.5rem' }}
                  />
                  <p>{art.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ArtModal; 
