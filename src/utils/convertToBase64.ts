export const convertFileToBase64 = async (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64 string.'));
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const fileToBinaryString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const binaryString = Array.from(new Uint8Array(reader.result))
          .map((byte) => String.fromCharCode(byte))
          .join('');
        resolve(binaryString);
      } else {
        reject(new Error('Failed to read file as binary string.'));
      }
    };

    reader.onerror = () => reject(reader.error);

    reader.readAsArrayBuffer(file);
  });
};
