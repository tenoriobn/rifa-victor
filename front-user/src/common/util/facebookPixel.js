import ReactPixel from 'react-facebook-pixel';

export const initFacebookPixel = (pixelId) => {
  ReactPixel.init(pixelId);
  ReactPixel.pageView(); 
};
