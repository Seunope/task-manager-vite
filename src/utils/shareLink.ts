export const shareLink = (
  url: string,
  successCallback: () => void,
  deviceErrorCallBack: () => void,
  failedErrorCallBack: () => void,
): void => {
  if (navigator.share) {
    navigator
      .share({
        title: 'Analytics',
        text: 'My reports',
        url,
      })
      .then(() => successCallback())
      .catch(() => failedErrorCallBack());
  } else {
    deviceErrorCallBack();
  }
};

export const handleShareFile = async (selectedFile: File) => {
  console.log({ selectedFile });
  if (selectedFile) {
    if (navigator.share && navigator.canShare({ files: [selectedFile] })) {
      try {
        await navigator.share({
          title: 'Check out this file',
          text: 'Sharing a file via the Web Share API',
          files: [selectedFile],
        });
        console.log('File shared successfully!');
      } catch (error) {
        console.error('Error sharing file:', error);
      }
    } else {
      alert("This file format can't be shared or your browser doesn't support sharing.");
    }
  }
};
