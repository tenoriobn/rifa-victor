/* eslint-disable react/prop-types */
export default function Pricing(props) {
  const pricingData = getPricingData(props.rifaData);

  const pricingContent = pricingData.map((pricing) => {
    return (
      <PricingContainer
        key={pricing.id}
        numbers={pricing.numbers}
        price={pricing.price}
        popular={pricing.popular}
        openPaymentContainer={props.openPaymentContainer}
      />
    );
  });

  return (
    <section className="py-5">
      <div className="flex flex-col gap-5">
        <article className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-center">
            🏆 Top comprador de Hoje
          </h2>

          <article className="p-5 sm:px-8 bg-darkerBlue flex items-center justify-between rounded-lg">
            <i className="icon-trophy text-5xl sm:text-[4rem]"></i>

            <article className="flex flex-col">
              <h3 className="text-sm font-bold sm:text-base">MATHEUS</h3>
              <h4 className="text-sm font-bold sm:text-base">(44)9999-*****</h4>
              <h5 className="font-bold text-[8px] sm:text-sm">
                160 NÚMEROS COMPRADOS
              </h5>
            </article>
          </article>
        </article>

        <div className="flex flex-col gap-4">
          <article className="flex gap-1 items-end">
            <h2 className="font-bold text-base sm:text-lg">📣 Promoção</h2>
            <mark className="font-normal text-sm sm:text-base bg-transparent text-white">
              Compre mais barato!
            </mark>
          </article>

          <div className="p-4 bg-darkerBlue rounded-xl flex flex-wrap gap-5">
            {pricingContent}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingContainer(props) {
  return (
    <a
      href="#"
      onClick={() => props.openPaymentContainer(props.numbers, props.price)}
      className={`${
        props.popular ? "bg-yellowOrange" : "bg-lightGreen"
      } rounded-lg flex-grow relative hover:scale-105 duration-300 transition-all`}
    >
      <article
        className={` ${
          // eslint-disable-next-line react/prop-types
          props.popular ? "bg-darkerYellow" : "bg-darkGreen"
        } flex flex-col items-center justify-center font-bold gap-1 p-2 w-full rounded-t-lg rounded-b-3xl`}
      >
        <h3 className="text-base sm:text-lg">{props.numbers}</h3>
        <h2 className="text-base sm:text-lg">Números</h2>
      </article>

      <article className="flex flex-col items-center justify-center gap-2 p-2">
        <article className="flex flex-col items-center justify-center font-bold">
          <h2 className="text-sm font-medium sm:text-base">POR APENAS</h2>
          <h3 className="text-lg font-bold sm:text-2xl">R$ {props.price}</h3>
        </article>

        <button
          type="button"
          onClick={() => props.openPaymentContainer(props.numbers, props.price)}
          className={`py-1 px-2 ${
            props.popular ? "bg-white" : "bg-customYellow"
          } text-lighterGreen rounded-xl font-medium w-full text-sm sm:text-base normal-transition hover:bg-darkYellow`}
        >
          COMPRAR AGORA
        </button>
      </article>

      {props.popular && (
        <mark className="absolute top-0 right-0 text-[.5rem] sm:text-[.7rem] p-2 bg-red-600 text-white rounded-md font-medium">
          Top de Vendas
        </mark>
      )}
    </a>
  );
}

function getPricingData(rifaData) {
  const formatPrice = (price) => {
    return price.toFixed(2).replace(".", ",");
  };

  return [
    {
      id: 1,
      numbers: rifaData.firstPacoteNumbers,
      price: formatPrice(
        rifaData.firstPacoteNumbers * rifaData.price -
          rifaData.firstPacoteNumbers *
            rifaData.price *
            (rifaData.firstPacoteDiscount / 100)
      ),
      popular: false,
    },
    {
      id: 2,
      numbers: rifaData.secondPacoteNumbers,
      price: formatPrice(
        rifaData.secondPacoteNumbers * rifaData.price -
          rifaData.secondPacoteNumbers *
            rifaData.price *
            (rifaData.secondPacoteDiscount / 100)
      ),
      popular: false,
    },
    {
      id: 3,
      numbers: rifaData.thirdPacoteNumbers,
      price: formatPrice(
        rifaData.thirdPacoteNumbers * rifaData.price -
          rifaData.thirdPacoteNumbers *
            rifaData.price *
            (rifaData.thirdPacoteDiscount / 100)
      ),
      popular: true,
    },
    {
      id: 4,
      numbers: rifaData.fourthPacoteNumbers,
      price: formatPrice(
        rifaData.fourthPacoteNumbers * rifaData.price -
          rifaData.fourthPacoteNumbers *
            rifaData.price *
            (rifaData.fourthPacoteDiscount / 100)
      ),
      popular: false,
    },
    {
      id: 5,
      numbers: rifaData.fifthPacoteNumbers,
      price: formatPrice(
        rifaData.fifthPacoteNumbers * rifaData.price -
          rifaData.fifthPacoteNumbers *
            rifaData.price *
            (rifaData.fifthPacoteDiscount / 100)
      ),
      popular: false,
    },
    {
      id: 6,
      numbers: rifaData.sixthPacoteNumbers,
      price: formatPrice(
        rifaData.sixthPacoteNumbers * rifaData.price -
          rifaData.sixthPacoteNumbers *
            rifaData.price *
            (rifaData.sixthPacoteDiscount / 100)
      ),
      popular: false,
    },
    {
      id: 7,
      numbers: rifaData.seventhPacoteNumbers,
      price: formatPrice(
        rifaData.seventhPacoteNumbers * rifaData.price -
          rifaData.seventhPacoteNumbers *
            rifaData.price *
            (rifaData.seventhPacoteDiscount / 100)
      ),
      popular: false,
    },
    {
      id: 8,
      numbers: rifaData.eighthPacoteNumbers,
      price: formatPrice(
        rifaData.eighthPacoteNumbers * rifaData.price -
          rifaData.eighthPacoteNumbers *
            rifaData.price *
            (rifaData.eighthPacoteDiscount / 100)
      ),
      popular: false,
    },
  ];
}
