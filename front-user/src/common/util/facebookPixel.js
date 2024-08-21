import ReactPixel from 'react-facebook-pixel';

export const initFacebookPixel = (pixelId) => {
  ReactPixel.init(pixelId);
  ReactPixel.pageView(); 
};

// Registra um evento de pagamento
export const trackPurchase = (value, currency, contentIds) => {
  ReactPixel.track('Purchase', {
    value: value,
    currency: currency,
    content_ids: contentIds,
    content_type: 'product', 
  });

  console.log('aqui', value, currency, contentIds)
};