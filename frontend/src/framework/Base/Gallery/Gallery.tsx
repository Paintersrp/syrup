import React, { useState } from "react";
import "./Gallery.css";

interface GalleryProps {
  images: { url: string; caption?: string }[];
  layout: "grid" | "masonry";
}

const Gallery: React.FC<GalleryProps> = ({ images, layout }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const getGalleryClassName = () => {
    switch (layout) {
      case "grid":
        return "gallery-container grid-layout";
      case "masonry":
        return "gallery-container masonry-layout";
      default:
        return "gallery-container";
    }
  };

  return (
    <div className={getGalleryClassName()}>
      {images.map((image, index) => (
        <div
          key={index}
          className="image-container"
          onClick={() => openLightbox(index)}
        >
          <img
            src={image.url}
            alt={`Image ${index}`}
            className="gallery-image"
          />
          {image.caption && (
            <div className="image-caption">{image.caption}</div>
          )}
        </div>
      ))}
      {selectedImageIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content">
            <img
              src={images[selectedImageIndex].url}
              alt={`Image ${selectedImageIndex}`}
              className="lightbox-image"
            />
            {images[selectedImageIndex].caption && (
              <div className="lightbox-caption">
                {images[selectedImageIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
