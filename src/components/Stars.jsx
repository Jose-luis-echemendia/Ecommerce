import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarEmpty } from "@fortawesome/fontawesome-free-regular";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

export const Stars = ({ rating }) => {
  return (
    <>
      {rating && rating !== null && rating !== undefined && (
        <div>
          {rating >= 1 || rating >= 1.0 ? (
            <FontAwesomeIcon className="text-star" icon={faStar} />
          ) : rating === 0.5 ? (
            <FontAwesomeIcon className="text-star" icon={faStarHalfAlt} />
          ) : (
            <FontAwesomeIcon className="text-star" icon={faStarEmpty} />
          )}

          {rating >= 2 || rating >= 2.0 ? (
            <FontAwesomeIcon className="text-star" icon={faStar} />
          ) : rating === 1.5 ? (
            <FontAwesomeIcon className="text-star" icon={faStarHalfAlt} />
          ) : (
            <FontAwesomeIcon className="text-star" icon={faStarEmpty} />
          )}

          {rating >= 3 || rating >= 3.0 ? (
            <FontAwesomeIcon className="text-star" icon={faStar} />
          ) : rating === 2.5 ? (
            <FontAwesomeIcon className="text-star" icon={faStarHalfAlt} />
          ) : (
            <FontAwesomeIcon className="text-star" icon={faStarEmpty} />
          )}

          {rating >= 4 || rating >= 4.0 ? (
            <FontAwesomeIcon className="text-star" icon={faStar} />
          ) : rating === 3.5 ? (
            <FontAwesomeIcon className="text-star" icon={faStarHalfAlt} />
          ) : (
            <FontAwesomeIcon className="text-star" icon={faStarEmpty} />
          )}

          {rating >= 5 || rating >= 5.0 ? (
            <FontAwesomeIcon className="text-star" icon={faStar} />
          ) : rating === 4.5 ? (
            <FontAwesomeIcon className="text-star" icon={faStarHalfAlt} />
          ) : (
            <FontAwesomeIcon className="text-star" icon={faStarEmpty} />
          )}
        </div>
      )}
    </>
  );
};
