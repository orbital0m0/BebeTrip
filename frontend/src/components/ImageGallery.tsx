import { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ImageGalleryProps {
  images: Array<{
    id: number;
    imageUrl: string;
    isMain: boolean;
    sortOrder: number;
  }>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">이미지가 없습니다</span>
      </div>
    );
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {/* Main Image */}
        <div
          className="col-span-4 md:col-span-3 row-span-2 relative cursor-pointer overflow-hidden rounded-lg"
          onClick={() => {
            setSelectedIndex(0);
            setShowModal(true);
          }}
        >
          <img
            src={images[0].imageUrl}
            alt="Main"
            className="w-full h-96 object-cover hover:scale-105 transition-transform"
          />
        </div>

        {/* Thumbnail Images */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={image.id}
            className="relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => {
              setSelectedIndex(index + 1);
              setShowModal(true);
            }}
          >
            <img
              src={image.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-48 md:h-[11.5rem] object-cover hover:scale-105 transition-transform"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  +{images.length - 5}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <FiX size={32} />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <FiChevronLeft size={48} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <FiChevronRight size={48} />
          </button>

          <div className="max-w-6xl max-h-[90vh] px-16">
            <img
              src={images[selectedIndex].imageUrl}
              alt={`Image ${selectedIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="text-white text-center mt-4">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
