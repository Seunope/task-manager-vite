import { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa6';

const FAQ = () => {
  const [faqTab, setFaqTab] = useState<string>('general');
  return (
    <div>
      <div
        className="font-semibold text-xs sm:text-sm flex items-center justify-center
      gap-2 lg:gap-3 w-full overflow-auto no-scrollbar"
      >
        <p
          className={`py-2 w-[23%] text-center border-2 border-PRIMARY rounded-xl
             text-PRIMARY ${faqTab === 'general' && 'bg-PRIMARY text-WHITE'} cursor-pointer `}
          onClick={() => setFaqTab('general')}
        >
          General
        </p>
        <p
          className={`py-2 w-[23%] text-center border-2 border-PRIMARY rounded-xl
             text-PRIMARY ${faqTab === 'account' && 'bg-PRIMARY text-WHITE'} cursor-pointer `}
          onClick={() => setFaqTab('account')}
        >
          Account
        </p>
        <p
          className={`py-2 w-[23%] text-center border-2 border-PRIMARY rounded-xl
             text-PRIMARY ${faqTab === 'service' && 'bg-PRIMARY text-WHITE'} cursor-pointer `}
          onClick={() => setFaqTab('service')}
        >
          Service
        </p>
        <p
          className={`py-2 w-[23%] text-center border-2 border-PRIMARY rounded-xl
             text-PRIMARY ${faqTab === 'payment' && 'bg-PRIMARY text-WHITE'} cursor-pointer `}
          onClick={() => setFaqTab('payment')}
        >
          Payment
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <div className="px-6 py-6 bg-green-3">
          <div className="flex items-center justify-between">
            <p className="font-bold">What Is Open Retail</p>
            <FaChevronUp />
          </div>
          <div className="mt-4 pt-4 border-t-2 border-grey-1 text-xs font-semibold leading-7">
            <p>
              We are the true B2B marketplace connecting convenience stores, wholesalers and
              logistic providers of fast moving consumer goods in Nigeria. WAZOBIA means ‘come’ in
              the 3 major tribes of Nigeria, and it is a symbol of unity.
            </p>
          </div>
        </div>
        <div className="px-6 py-6 bg-green-3">
          <div className="flex items-center justify-between">
            <p className="font-bold">What We Do</p>
            <FaChevronUp />
          </div>
        </div>
        <div className="px-6 py-6 bg-green-3">
          <div className="flex items-center justify-between">
            <p className="font-bold">Who We Are</p>
            <FaChevronUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
