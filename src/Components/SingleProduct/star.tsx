import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  clickable?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  clickable = false,
}) => {
  const validRating = Math.min(Math.max(rating, 0), 5);

  const handleClick = (index: number) => {
    if (clickable && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className={
        index < validRating
          ? "text-orange-500 cursor-pointer"
          : "text-gray-300 cursor-pointer"
      }
      onClick={() => handleClick(index)}
    />
  ));

  return <div className="flex space-x-1">{stars}</div>;
};

export default StarRating;
