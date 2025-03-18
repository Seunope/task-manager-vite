import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface RatingProps {
  rating: number;
  maxRating?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  const getStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="hidden sm:flex">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FaStar key={`full-${i}`} className="text-YELLOW text-sm" />
          ))}
        {hasHalfStar && <FaStarHalfAlt key="half" className="text-YELLOW text-sm" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <FaRegStar key={`empty-${i}`} className="text-YELLOW text-sm" />
          ))}
      </div>
    );
  };

  return <div className="flex">{getStars()}</div>;
};

export default Rating;
