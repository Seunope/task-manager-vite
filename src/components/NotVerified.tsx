import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Navbar from './Navbar';
import Button from './Button';
import DesktopHeader from './DesktopHeader';
import NavbarDesktop from './NavbarDesktop';
import { RESEND_OTP } from '../config/api/http';
import { CentralState } from '../config/redux/store';
import { PatchFunc } from '../config/api/http-mthd';
import { BusinessSliceDTO } from '../config/utils/types';

function NotVerified() {
  const navigate = useNavigate();
  const { business } = useSelector<CentralState, BusinessSliceDTO>((state) => state.business);
  const handleVerify = async () => {
    // e.preventDefault();
    // setError(null);
    // setLoading(true);
    // setTimer(60);

    try {
      const response = await PatchFunc(RESEND_OTP, {
        phoneNumber: business?.businessContact?.phoneNumber,
      });
      if (response.data.status === 'success') {
        toast.success(response.data.message);
        navigate('/verify', { state: { phoneNumber: business?.businessContact?.phoneNumber } });
      } else if (response.data.status === 'error') {
        toast.error(response.data.message);
      } else null;
      console.log(response);
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div>
      <Navbar />

      <div className="md:flex w-dvw sm:w-full h-dvh ">
        <NavbarDesktop />
        <div className="w-full h-full md:w-3/4 lg:w-4/5 bg-WHITE  md:overflow-y-scroll ">
          <DesktopHeader searchBar={false} />
          <div
            className="px-8 pb-10 pt-28 sm:pt-32 md:pt-28 
          w-dvw h-dvh sm:h-full sm:w-full bg-BACKGROUND 
          sm:bg-LIGHT_GREY/5 flex items-center justify-center"
          >
            <div
              className="w-4/5 sm:w-2/5 lg:w-1/3 bg-WHITE 
            py-10 px-6 lg:px-10 rounded-lg shadow-md"
            >
              <h1
                className=" w-full text-center font-bold 
              text-2xl sm:w-4/5 sm:mx-auto sm:text-3xl mb-6"
              >
                User is not verified
              </h1>

              <div className="w-full space-y-3">
                <Button variant="solid" onClick={handleVerify}>
                  Verify user
                </Button>
                <Button variant="outline" onClick={() => navigate(-1)} className="border-RED">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotVerified;
