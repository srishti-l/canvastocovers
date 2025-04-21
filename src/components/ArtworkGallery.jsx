import ArtworkCard from "./ArtworkCard";
import ArtworkDetail from "./ArtworkDetail";

const ArtworkGallery = ({artwork}) => {
    if (!artwork) return <p>Select an artwork to see details</p>;

  return (
    <div className="artwork-detail">
      <h2>{artwork.title}</h2>
      <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} alt={artwork.title} />
      {/* Add other details like artist, year, description here */}
    </div>
  );
}

export default ArtworkGallery; 