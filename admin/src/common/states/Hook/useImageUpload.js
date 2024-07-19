import { useCallback } from 'react';

const useImageUpload = (setNovoGanhador, novoGanhador) => {
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNovoGanhador({ ...novoGanhador, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }, [novoGanhador, setNovoGanhador]);

  return {
    handleFileChange
  };
};

export default useImageUpload;
