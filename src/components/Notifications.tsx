import { BiSolidMessageError } from 'react-icons/bi';
import { FaChevronLeft } from 'react-icons/fa6';

const alerts = [
  {
    message: 'Package from your order #1982345 has arrived.',
    time: '9:20 AM',
  },
  {
    message: "FLASH Sale starting tomorrow. Don't forget to check it out.",
    time: 'Yesterday',
  },
  {
    message: 'Package from your order #1982345 has arrived.',
    time: '28 Apr',
  },
  {
    message: 'Package from your order #1982345 has arrived.',
    time: '20 Apr',
  },
  {
    message: 'Package from your order #1982345 has arrived.',
    time: '10 Apr',
  },
];

type NotificationsProps = {
  onSetMenuOptions: () => void;
};

const Notifications = ({ onSetMenuOptions }: NotificationsProps) => {
  return (
    <div
      className="h-dvh sm:h-4/5 pt-24 pb-10 md:pt-0 
    px-8 overflow-y-auto space-y-3 sm:w-3/4 mx-auto md:w-full"
    >
      <div className="w-full md:hidden flex items-center mb-10 ">
        <div
          className="w-6 h-6 border-2 flex items-center justify-center rounded-md"
          onClick={onSetMenuOptions}
        >
          <FaChevronLeft className="text-xs" />
        </div>
        <p className="font-bold w-full text-center">Notification</p>
      </div>

      {alerts.map((el, index) => (
        <div key={index} className="flex items-center gap-6 w-full md:px-2">
          <div className="p-3 bg-SECONDARY/30 inline-block rounded-full">
            <BiSolidMessageError className="text-xl text-YELLOW" />
          </div>
          <div className="flex items-center justify-between w-full text-xs font-semibold">
            <p className="w-4/6">{el.message}</p>
            <p>{el.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
