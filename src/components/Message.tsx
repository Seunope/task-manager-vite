type MessageProps = {
  response: {
    message: string;
    status: string;
  };
  handleClose?: () => void;
};

const Message = ({ response, handleClose }: MessageProps) => {
  return (
    response?.status && (
      <div
        className={`p-2 rounded-md border-2 my-4 relative 
                ${
                  response?.status === 'success'
                    ? 'border-PRIMARY'
                    : response?.status === 'error'
                      ? 'border-RED'
                      : ''
                }`}
      >
        {response?.status === 'error' && (
          <p className="text-RED text-center max-w-3/5 mx-auto">{response?.message as string}</p>
        )}
        {response?.status === 'success' && (
          <p className="text-PRIMARY text-center text-lg">{response?.message as string}</p>
        )}
        <p
          className="absolute top-0 right-2 text-lg cursor-pointer"
          onClick={() => handleClose && handleClose()}
        >
          x
        </p>
      </div>
    )
  );
};

export default Message;
