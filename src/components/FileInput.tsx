import React, { DragEvent, useState } from 'react';

import icon from '../img/document-upload.png';

interface FileUploadProps {
  imageUrl?: string;
  onFileUpload: (base64: string) => void;
}

const FileInput: React.FC<FileUploadProps> = ({ onFileUpload, imageUrl }) => {
  const [fileUpload, setFileUpload] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const fileToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onFileUpload(base64String);
    };
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      fileToBase64(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      fileToBase64(e.target.files[0]);
      setFileUpload(!fileUpload);
    }
  };

  return (
    <>
      <div
        className={`relative border-2 border-dashed px-8 py-4 text-center 
        rounded-lg ${dragActive ? 'border-PRIMARY bg-SECONDARY' : 'border-grey-1'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className={`absolute inset-0 w-full h-full ${!fileUpload && 'opacity-0'} cursor-pointer`}
          onChange={handleChange}
        />
        <div className={`${fileUpload && 'hidden'}`}>
          <div
            className={
              imageUrl
                ? ''
                : 'mx-auto w-10 h-10 rounded-full flex justify-center items-center bg-BACKGROUND'
            }
          >
            <img src={imageUrl || icon} alt="" className={imageUrl ? 'w-full h-full' : ''} />
          </div>
          <p className="pointer-events-none text-PRIMARY">
            <span>Click to Upload</span> or drag and drop
          </p>
          <p className="text-xs text-grey-1 pt-1"> (Max. File size: 25 MB)</p>
        </div>
      </div>
    </>
  );
};

export default FileInput;
