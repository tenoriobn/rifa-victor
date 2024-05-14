import Cotas from "./components/Cotas";
import Hero from "./components/Hero";
import Informations from "./components/Information";
import Pricing from "./components/Pricing";
import Payment from "./components/Payment";

import { sendRequest } from "../../util/util";
import { useState, useEffect } from "react";
import HomeFooter from "./components/HomeFooter";

export default function Home() {
  const [formData, setFormData] = useState(() => {
    return {
      data: {
        title: "",
        description: "",
        thumbnail: null,
        rifaStatus: "",
        rifaDate: "",
        price: "",
        firstPacoteNumbers: "",
        firstPacoteDiscount: "",
        secondPacoteNumbers: "",
        secondPacoteDiscount: "",
        thirdPacoteNumbers: "",
        thirdPacoteDiscount: "",
        fourthPacoteNumbers: "",
        fourthPacoteDiscount: "",
      },
    };
  });

  const [contentIsLoading, setContentIsLoading] = useState(() => false);

  const [paymentData, setPaymentData] = useState(() => {
    return {
      showPaymentContainer: false,
      isPaying: false,
      rifaNumbers: 0,
      price: formData.data.price,
      phoneNumber: 0,
    };
  });

  const [cotasData, setCotasData] = useState(() => {
    return {
      showPaymentContainer: false,
      isPaying: false,
      rifaNumbers: 10,
      price: 0,
      valueToPay: 0,
      phoneNumber: 0,
    };
  });

  useEffect(() => {
    getPostData(setContentIsLoading, setFormData, setCotasData);
  }, []);

  return (
    <>
      <Hero rifaData={formData.data} />

      <Pricing
        rifaData={formData.data}
        openPaymentContainer={(rifaNumbers, price) =>
          openPaymentContainer(setPaymentData, rifaNumbers, price)
        }
      />

      <Cotas
        originalCotas={() => originalCotas(setCotasData)}
        rifaNumbers={cotasData.rifaNumbers}
        handleCotas={(numbers, operator = "plus") =>
          handleCotas(setCotasData, numbers, operator)
        }
      />

      <Informations rifaData={formData.data} />

      <Payment
        rifaNumbers={paymentData.rifaNumbers}
        price={paymentData.price}
        isPaying={paymentData.isPaying}
        showPaymentContainer={paymentData.showPaymentContainer}
        phoneNumber={paymentData.phoneNumber}
        closePaymentContainer={() => closePaymentContainer(setPaymentData)}
        rifaTitle={formData.data.title}
      />

      <HomeFooter
        openPaymentContainer={() =>
          openPaymentContainer(
            setPaymentData,
            cotasData.rifaNumbers,
            cotasData.valueToPay
          )
        }
        rifaPrice={cotasData.valueToPay}
      />
    </>
  );
}

async function getPostData(setContentIsLoading, setFormData, setCotasData) {
  const requestData = {
    method: "GET",
    url: `public-rifas/latest`,
  };

  try {
    setContentIsLoading(() => true);

    const response = await sendRequest(requestData);

    if (!response.success) {
      return;
    }

    const responsePostData = response.data;

    setFormData((prevFormData) => {
      const newFormData = {
        title: responsePostData.title,
        description: responsePostData.description,
        rifaStatus: responsePostData.rifaStatus,
        rifaDate: responsePostData.rifaDate,
        price: responsePostData.price,
        firstPacoteNumbers: responsePostData.firstPacoteNumbers,
        firstPacoteDiscount: responsePostData.firstPacoteDiscount,
        secondPacoteNumbers: responsePostData.secondPacoteNumbers,
        secondPacoteDiscount: responsePostData.secondPacoteDiscount,
        thirdPacoteNumbers: responsePostData.thirdPacoteNumbers,
        thirdPacoteDiscount: responsePostData.thirdPacoteDiscount,
        fourthPacoteNumbers: responsePostData.fourthPacoteNumbers,
        fourthPacoteDiscount: responsePostData.fourthPacoteDiscount,
        thumbnail: responsePostData.thumbnail,
      };

      return {
        ...prevFormData,

        data: {
          ...prevFormData.data,
          ...newFormData,
        },
      };
    });

    setCotasData((prevCotasData) => {
      return {
        ...prevCotasData,
        price: responsePostData.price,
        valueToPay: responsePostData.price * 10,
      };
    });
  } catch (error) {
    window.alert(`Houve um erro no servidor ${error}`);
  } finally {
    setContentIsLoading(() => false);
  }
}

function openPaymentContainer(setPaymentData, rifaNumbers, price) {
  setPaymentData((prevPaymentData) => {
    return {
      ...prevPaymentData,
      rifaNumbers,
      price,
      showPaymentContainer: true,
    };
  });
}

function closePaymentContainer(setPaymentData) {
  setPaymentData((prevPaymentData) => {
    return {
      ...prevPaymentData,
      showPaymentContainer: false,
    };
  });
}

function handleCotas(setCotasData, numbers, operator = "plus") {
  setCotasData((prevCotasData) => {
    const prevNumbers = prevCotasData.rifaNumbers;
    const actualNumbersPlus = prevNumbers + numbers;

    let menusNumbers = prevNumbers - 1;

    if (menusNumbers < 1) {
      menusNumbers = 1;
    }

    const numbersPrice = prevCotasData.price;

    return {
      ...prevCotasData,
      rifaNumbers: operator === "plus" ? actualNumbersPlus : menusNumbers,
      valueToPay:
        operator === "plus"
          ? actualNumbersPlus * numbersPrice
          : menusNumbers * numbersPrice,
    };
  });
}

function originalCotas(setCotasData) {
  setCotasData((prevCotasData) => {
    return {
      ...prevCotasData,
      rifaNumbers: 10,
      valueToPay: prevCotasData.price * 10,
    };
  });
}
