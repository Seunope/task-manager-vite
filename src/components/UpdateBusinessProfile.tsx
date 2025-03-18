import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
// eslint-disable-next-line import/named

import Input from './Input';
import Navbar from './Navbar';
// import FileInput from './FileInput';
import { UPDATE_BUSINESS_PROFILE } from '../config/api/http';
import { BusinessSliceDTO } from '../config/utils/types';
import GoBackButton from './GoBackButton';
import NavbarDesktop from './NavbarDesktop';
import DesktopHeader from './DesktopHeader';
// import imageUploader from '../config/utils/imageUploader';
import { lagosStateLGAs, Lcda } from '../config/utils/customer-acq';
import { AppDispatch, CentralState } from '../config/redux/store';
import { CustomAxiosErrorType, onError, onSuccess } from '../config/api/http-mthd';
import { updateCurrentBusiness } from '../config/redux/reducers/businessSlice';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '../config/utils/utils';

interface FormData {
  name: string;
  //   email: string;
  lga: string;
  lcda: string;
  streetName: string;
  phones: string[];
  whatsapps: string[];
  state: string;
  country: string;
}

function UpdateBusinessProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [LGALCDAs, setLGALCDA] = useState<Lcda[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { business } = useSelector<CentralState, BusinessSliceDTO>((state) => state.business);
  const [formData, setFormData] = useState<FormData>({
    name: business.name || '',
    // email: '',
    lga: business?.lga || '',
    lcda: business?.lcda || '',
    streetName: business?.streetName || '',
    phones: business?.phones,
    whatsapps: business?.whatsapps,
    state: 'LAGOS',
    country: 'NIGERIA',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: [value],
    });
  };

  const handleLGAChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toUpperCase(),
    });
    const currentLCDA = lagosStateLGAs.find((el) => el?.lga === value);
    currentLCDA ? setLGALCDA(currentLCDA?.lcda) : setLGALCDA([]);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   const handleFileUpload = async (base64: string) => {
  //     const uploadImageUrl = await imageUploader(base64);
  //     setFormData({
  //       ...formData,
  //       profileUrl: uploadImageUrl,
  //     });
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let payload = formData;

    if (payload?.phones[0]) {
      payload = { ...payload, phones: [formatPhoneNumber(payload.phones[0])] };
    }

    if (payload?.whatsapps[0]) {
      payload = { ...payload, whatsapps: [formatPhoneNumber(payload.whatsapps[0])] };
    }

    try {
      console.log(formData);
      const response = await UPDATE_BUSINESS_PROFILE(
        {
          ...payload,
          name: payload.name.trim(),
          streetName: payload.streetName.trim(),
        },
        business?.id,
      );
      const res = onSuccess(response);
      if (res && res.success) {
        toast.success('Business profile update was successful');
        dispatch(updateCurrentBusiness({ ...business, ...res.data }));
        navigate(-1);
      } else {
        const msg = res.message || 'An error. Try again';
        toast.error(msg);
      }
      setLoading(false);
      console.log(response);
    } catch (err: unknown | CustomAxiosErrorType) {
      let msg = '';
      const disError = onError(err as CustomAxiosErrorType);
      msg = disError as string;
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="md:flex w-dvw sm:w-full h-dvh ">
        <NavbarDesktop />
        <div className="w-full md:w-3/4 lg:w-4/5 sm:bg-LIGHT_GREY/5  md:overflow-y-scroll ">
          <DesktopHeader searchBar={false} />
          <div className="px-8 pb-10 pt-28 sm:pt-32 w-dvw sm:w-full">
            <div className="flex items-center gap-4 w-full">
              <GoBackButton />
              <h1 className=" w-full font-bold text-2xl md:text-3xl">Update Business</h1>
            </div>
            <form
              action=""
              onSubmit={handleSubmit}
              className="mt-8 w-full md:w-3/4 md:mx-auto relative font-semibold  "
            >
              <div className="md:flex md:gap-8  md:w-full md:pt-8">
                <div className="md:w-full">
                  <Input
                    type="text"
                    id="name"
                    label="Business Name"
                    className=" mt-1 mb-5 "
                    placeholder="Enter business name"
                    onChange={handleChange}
                    value={formData.name}
                    requiredLabel={true}
                    required
                  />
                  <Input
                    type="tel"
                    id="phones"
                    label="Phone Number"
                    minLength={11}
                    maxLength={13}
                    className=" mt-1 mb-5 "
                    placeholder="Enter Phone Number"
                    onChange={handleNumberChange}
                    value={formData.phones[0]}
                  />
                  <Input
                    type="tel"
                    id="whatsapps"
                    label="Whatsapp Number"
                    className=" mt-1 mb-5 "
                    minLength={11}
                    maxLength={13}
                    placeholder="Enter Whatsapp Number"
                    onChange={handleNumberChange}
                    value={formData.whatsapps[0]}
                  />
                </div>

                <div className="md:w-full">
                  <Input
                    type="text"
                    id="streetName"
                    label="Address"
                    className=" mt-1 mb-5 "
                    placeholder="Enter street name"
                    onChange={handleChange}
                    value={formData.streetName}
                    requiredLabel={true}
                    required
                  />
                  <div className="mb-6">
                    <label className="text-xs md:text-sm" htmlFor="lga">
                      LGA <span className="text-RED">*</span>
                    </label>
                    <select
                      name="lga"
                      id="lga"
                      onChange={handleLGAChange}
                      className="w-[100%] form-select py-3 text-xs md:text-sm rounded-md
                 md:h-12 mt-1 text-GREY bg-BACKGROUND/50 px-4 sm:border-0 outline-PRIMARY"
                      required
                    >
                      <option value="--">Please Select</option>
                      {lagosStateLGAs.map((el, index) => (
                        <option key={index} value={el?.lga}>
                          {el?.lga}
                        </option>
                      ))}
                    </select>
                    {business?.lga && (
                      <p className="mt-1 text-xs text-grey-3 font-semibold flex items-center gap-1">
                        <IoIosInformationCircleOutline className="text-PRIMARY text-sm" />
                        {`Current LGA ${business?.lga}`}
                      </p>
                    )}
                  </div>

                  <label className="text-xs md:text-sm" htmlFor="lcda">
                    LCDA <span className="text-RED">*</span>
                  </label>
                  <select
                    name="lcda"
                    id="lcda"
                    onChange={handleSelectChange}
                    className="w-[100%] form-select py-3 text-xs md:text-sm rounded-md
                 md:h-12 mt-1 text-GREY bg-BACKGROUND/50 px-4 sm:border-0 outline-PRIMARY"
                    required
                  >
                    <option value="--">Please Select</option>
                    {LGALCDAs.map((el: Lcda) => (
                      <option key={el?.name} value={el?.name}>
                        {el?.name}
                      </option>
                    ))}
                  </select>
                  {business?.lcda && (
                    <p className="mt-1 text-xs text-grey-3 font-semibold flex items-center gap-1">
                      <IoIosInformationCircleOutline className="text-PRIMARY text-sm" />
                      {`Current LGA ${business?.lcda}`}
                    </p>
                  )}
                  {/* <FileInput onFileUpload={handleFileUpload} /> */}
                </div>
              </div>
              <div className="md:w-2/5 md:mx-auto md:mt-6">
                <button
                  type="submit"
                  className=" h-12 w-full mt-8 bg-PRIMARY 
                      rounded-lg font-semibold text-BACKGROUND"
                >
                  {loading ? <BeatLoader color="white" /> : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBusinessProfile;
