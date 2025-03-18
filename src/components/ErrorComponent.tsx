import ErrorImg from '../img/error-img.png';

const ErrorComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full text-RED font-bold py-8">
      <img src={ErrorImg} />
      <p className="text-center text-[2rem]">Oops an error occurred</p>
    </div>
  );
};

export default ErrorComponent;
