const usePhoneFormat = () => {
  const formatPhone = (phone) => {
    if (!phone) return "";

    const cleanedPhone = phone.replace(/\D/g, '');

    const phoneWithoutCountryCode = cleanedPhone.startsWith('55') ? cleanedPhone.slice(2) : cleanedPhone;

    return phoneWithoutCountryCode;
  };

  return { formatPhone };
};

export default usePhoneFormat;
