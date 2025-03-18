import { useState } from 'react';
import { PiChats } from 'react-icons/pi';
import { SlGlobe } from 'react-icons/sl';
import { LiaFacebook } from 'react-icons/lia';
import { FaChevronLeft, FaInstagram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

import FAQ from './FAQ';

type HelpCenterProps = {
  onSetMenuOptions: () => void;
};

const HelpCenter = ({ onSetMenuOptions }: HelpCenterProps) => {
  const [helpTab, setHelpTab] = useState<string>('contact');
  return (
    <div className="h-dvh sm:h-4/5 pt-24 pb-10 md:pt-0 px-8 sm:w-3/4 mx-auto md:w-full overflow-auto">
      <div className="w-full md:hidden flex items-center mb-10 ">
        <div
          className="w-6 h-6 border-2 flex items-center justify-center rounded-md"
          onClick={onSetMenuOptions}
        >
          <FaChevronLeft className="text-xs" />
        </div>
        <p className="font-bold w-full text-center">Help Center</p>
      </div>
      <div className="w-3/5 mx-auto flex items-center justify-between font-bold text-GREY mb-10">
        <p
          className={`border-b-2 border-GREY p-1 
            ${helpTab === 'contact' && 'text-PRIMARY border-PRIMARY'} cursor-pointer `}
          onClick={() => setHelpTab('contact')}
        >
          Contact us
        </p>
        <p
          className={`border-b-2 border-GREY p-1 
            ${helpTab === 'faq' && 'text-PRIMARY border-PRIMARY'} cursor-pointer `}
          onClick={() => setHelpTab('faq')}
        >
          FAQ
        </p>
      </div>
      {helpTab === 'contact' ? (
        <div className=" space-y-3">
          <p className="flex items-center gap-3 py-4 px-4 bg-BACKGROUND/70 text-sm font-semibold">
            <PiChats className="text-xl" />
            Customer Service
          </p>
          <p className="flex items-center gap-3 py-4 px-4 bg-BACKGROUND/70 text-sm font-semibold">
            <FaWhatsapp className="text-xl" />
            Whatsapp
          </p>
          <p className="flex items-center gap-3 py-4 px-4 bg-BACKGROUND/70 text-sm font-semibold">
            <SlGlobe className="text-xl" />
            Website
          </p>
          <p className="flex items-center gap-3 py-4 px-4 bg-BACKGROUND/70 text-sm font-semibold">
            <LiaFacebook className="text-2xl" />
            Facebook
          </p>
          <p className="flex items-center gap-3 py-4 px-4 bg-BACKGROUND/70 text-sm font-semibold">
            <FaXTwitter className="text-xl" />
            Twitter
          </p>
          <p className="flex items-center gap-3 py-4 px-4 bg-BACKGROUND/70 text-sm font-semibold">
            <FaInstagram className="text-xl" />
            Instagram
          </p>
        </div>
      ) : helpTab === 'faq' ? (
        <FAQ />
      ) : null}
    </div>
  );
};

export default HelpCenter;
