// type BlobType = {
//   data: BlobPart;
//   headers: { [x: string]: unknown };
// };

// export const downloadFile = (blobResponse: BlobType, filename: string) => {
//   const blob = new Blob([blobResponse.data], { type: blobResponse.data.type });
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;

//   // get original file name
//   const contentDisposition = blobResponse.headers['content-disposition'];
//   let fileName = filename;
//   if (contentDisposition) {
//     const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
//     if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
//   }
//   //set file name
//   link.setAttribute('download', fileName);
//   document.body.appendChild(link);
//   link.click();
//   link.remove();
//   window.URL.revokeObjectURL(url);
// };

type BlobType = {
  data: Blob;
  headers: Record<string, unknown>;
};

export const downloadFile = (blobResponse: BlobType, filename: string) => {
  const blob = new Blob([blobResponse.data], { type: blobResponse.data.type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  // Get original file name
  const contentDisposition = blobResponse.headers['content-disposition'] as string | undefined;
  let fileName = filename;

  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="(.+?)"/);
    if (fileNameMatch?.[1]) fileName = fileNameMatch[1];
  }

  // Set file name and download
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
