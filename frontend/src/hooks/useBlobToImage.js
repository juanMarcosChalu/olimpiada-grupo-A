import { useEffect, useState } from 'react';

const useImageURL = (blob, typeMime) => {
  const [src, setSrc] = useState(" ");

  useEffect(() => {
    if (!blob || !typeMime) {
      setSrc(null);
      return;
    }
    const imagenSrc = `data:${typeMime};base64,${blob}`
    setSrc(imagenSrc);

  }, [blob, typeMime]);

  return src;
};

export default useImageURL;
