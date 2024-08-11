import React from 'react';

interface ReviewProps {
  name: string;
  profilePicture: string;
  rating: number;
  reviewText?: string;
}

const Review: React.FC<ReviewProps> = ({ name, profilePicture, rating, reviewText }) => {
  // Function to render stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927C9.424 2.02 10.576 2.02 10.951 2.927L12.548 7.135C12.705 7.533 13.086 7.826 13.515 7.894L18.126 8.654C19.106 8.812 19.499 10.019 18.779 10.707L15.348 13.94C15.021 14.251 14.876 14.724 14.962 15.19L15.872 19.688C16.057 20.641 15.008 21.369 14.202 20.845L10.291 18.399C9.893 18.149 9.107 18.149 8.709 18.399L4.798 20.845C3.992 21.369 2.943 20.641 3.128 19.688L4.038 15.19C4.124 14.724 3.979 14.251 3.652 13.94L0.221 10.707C-0.499 10.019 -0.106 8.812 0.874 8.654L5.485 7.894C5.914 7.826 6.295 7.533 6.452 7.135L8.049 2.927H9.049Z"></path>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-start space-x-4">
      <img
        className="w-12 h-12 rounded-full"
        src={profilePicture}
        alt={`${name}'s profile`}
      />
      <div>
        <div className="flex">
          <h4 className="text-lg text-black font-semibold mr-2">{name}</h4>
          <div className="flex align-bottom mt-[0.065rem]">
            {renderStars()}
          </div>
        </div>
        {reviewText && <p className="mt-2 text-gray-600">{reviewText}</p>}
      </div>
    </div>
  );
};

export default Review;