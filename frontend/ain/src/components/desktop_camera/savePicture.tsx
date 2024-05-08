// savePicture.ts
export const savePicture = (image: string) => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'captured_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };