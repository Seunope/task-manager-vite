export const handleCopyLink = async (
  url: string,
  successCallback: () => void,
  deviceErrorCallBack: () => void,
  failedErrorCallBack: () => void,
): Promise<void> => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        successCallback();
      })
      .catch(() => deviceErrorCallBack());
  } else {
    failedErrorCallBack();
  }
};
