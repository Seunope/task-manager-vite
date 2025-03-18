import { useNavigate } from 'react-router-dom';
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaChevronLeft } from 'react-icons/fa6';

type GoBackButton = {
  handleGoBack?: () => void;
};

const GoBackButton = ({ handleGoBack }: GoBackButton) => {
  const navigate = useNavigate();

  const handleClick = () => {
    handleGoBack ? handleGoBack() : navigate(-1);
  };
  return (
    // <FontAwesomeIcon
    //   icon={faChevronLeft}
    //   className="px-1 py-1 md:px-2 md:py-2 border-2 border-GREY rounded-xl
    //    sm:rounded-md cursor-pointer"
    //   onClick={handleClick}
    // />
    <FaChevronLeft
      className=" px-2 py-1 md:py-2 text-sm border-2 border-GREY box-content 
                                rounded-md sm:rounded-lg cursor-pointer"
      onClick={handleClick}
    />
  );
};

export default GoBackButton;
