import { CLOUDINARY_URL } from '../api/global';
type CloudinaryResponse = {
  secure_url: string;
};

async function imageUploader(image: string) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'xb37jxxa');

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    const responseData: CloudinaryResponse = await response.json();
    return responseData.secure_url;
  } catch (error) {
    console.error('Image Upload Error:', error);
  }
}

export default imageUploader;
