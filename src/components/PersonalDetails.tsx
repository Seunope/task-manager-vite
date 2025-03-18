import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';

import Button from './Button';
import editicon from '../img/edit-icon.png';
import { useSelector } from 'react-redux';
import { CentralState } from '../config/redux/store';
import { UserType } from '../config/redux/reducers/userSlice';

type PersonalDetailsProps = {
  onSetMenuOptions: () => void;
};

const PersonalDetails = ({ onSetMenuOptions }: PersonalDetailsProps) => {
  const navigate = useNavigate();
  const user = useSelector<CentralState, UserType>((state) => state.user);

  return (
    <div
      className="h-dvh sm:h-full pt-24 pb-10 md:pt-0 
    md:mt-8 w-full sm:w-3/4 mx-auto md:w-full px-10 flex flex-col justify-between md:block "
    >
      <div className="w-full ">
        <div className="w-full md:hidden flex items-center mb-10 ">
          <div
            className="w-6 h-6 border-2 flex items-center justify-center rounded-md"
            onClick={onSetMenuOptions}
          >
            <FaChevronLeft className="text-xs" />
          </div>
          <p className="font-bold w-full text-center">Edit Personal Details</p>
        </div>
        <div className="text-sm font-semibold">
          <p className="">Name</p>
          <div
            className="mt-1 h-10 px-4 bg-SECONDARY/50 
          rounded-lg flex justify-between items-center"
          >
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <img src={editicon} alt="" className="w-5" />
          </div>
        </div>
        <div className="text-sm font-semibold mt-4">
          <p className="">Phone Number</p>
          <div
            className="mt-1 h-10 px-4 bg-SECONDARY/50 rounded-lg flex 
          justify-between items-center"
          >
            <p>{user?.phoneNumber}</p>
            <img src={editicon} alt="" className="w-5" />
          </div>
        </div>
        <div className="text-sm font-semibold mt-4">
          <p className="">Coverage LGA</p>
          <div
            className="mt-1 h-10 px-4 bg-SECONDARY/50 rounded-lg flex 
          justify-between items-center"
          >
            <p>{user?.cluster}</p>
            <img src={editicon} alt="" className="w-5" />
          </div>
        </div>
        <div className="text-sm font-semibold mt-4">
          <p className="">Change Password</p>
          <div
            className="mt-1 h-10 px-4 bg-SECONDARY/50 rounded-lg flex 
          justify-between items-center"
          >
            <p>{'\u25CF'.repeat(10)}</p>
            <img src={editicon} alt="" className="w-5" />
          </div>
        </div>
      </div>

      <div>
        <Button
          variant="solid"
          className="mt-10 text-sm"
          onClick={() => navigate('/update-profile')}
        >
          Update Personal Details
        </Button>
        <Button
          variant="outline"
          className="mt-3 text-sm"
          onClick={() => navigate('/update-password')}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
