// import React from "react";

// // Props for ImageContainer
// interface ImageContainerProps {
//   src: string;
//   alt: string;
// }

// // Reusable component for displaying images
// const ImageContainer: React.FC<ImageContainerProps> = ({ src, alt }) => (
//   <div className="relative flex-1 flex items-center justify-center rounded-lg">
//     <img
//       src={src}
//       alt={alt}
//       className="w-full h-full object-cover rounded-lg"
//     />
//     <span className="absolute top-2 left-2 bg-white text-gray-800 text-sm px-2 py-1 rounded-md shadow">
//       Available
//     </span>
//   </div>
// );

// // Props for DisplayCarImage
// interface DisplayCarImageProps {
//   selectedImg: string;
// }

// const DisplayCarImage: React.FC<DisplayCarImageProps> = ({ selectedImg }) => {
//   return <ImageContainer src={selectedImg} alt="Selected" />;
// };

// export default DisplayCarImage;




import React, { useState } from "react";

// Props for ImageContainer
interface ImageContainerProps {
  src: string;
  alt: string;
  onLoad: () => void;
  isLoading: boolean;
}

// Reusable component for displaying images
const ImageContainer: React.FC<ImageContainerProps> = ({ src, alt, onLoad, isLoading }) => (
  <div className="relative flex-1 flex items-center justify-center rounded-lg min-h-[300px]">
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
        <span className="text-gray-500 text-sm animate-pulse">Loading image...</span>
      </div>
    )}
    <img
      src={src}
      alt={alt}
      onLoad={onLoad}
      className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
    />
    {!isLoading && (
      <span className="absolute top-2 left-2 bg-white text-gray-800 text-sm px-2 py-1 rounded-md shadow">
        Available
      </span>
    )}
  </div>
);

// Props for DisplayCarImage
interface DisplayCarImageProps {
  selectedImg: string;
}

const DisplayCarImage: React.FC<DisplayCarImageProps> = ({ selectedImg }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ImageContainer
      src={selectedImg}
      alt="Selected"
      isLoading={isLoading}
      onLoad={() => setIsLoading(false)}
    />
  );
};

export default DisplayCarImage;
