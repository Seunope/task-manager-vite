import { BeatLoader } from 'react-spinners';

type LoaderProps = {
  color?: string;
};

const Loader = ({ color = '#FFFFFF' }: LoaderProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <BeatLoader color={color} />
    </div>
  );
};

export default Loader;
