export default function Cotas(props) {
  const cotasNumbers = getCotasNumbers();

  const cotasNumbersElements = cotasNumbers.map((cotas) => {
    return (
      <CotasNumbersContainer
        handleCotas={props.handleCotas}
        key={cotas.id}
        numbers={cotas.numbers}
      />
    );
  });

  return (
    <section>
      <div className="flex flex-col gap-4">
        <article className="flex gap-1 items-end">
          <h2 className="font-bold text-base sm:text-lg">⚡ Cotas</h2>
          <mark className="font-normal text-sm sm:text-base bg-transparent text-white">
            Escolha sua sorte
          </mark>
        </article>

        <div className="p-4 flex flex-col gap-4 bg-darkerBlue rounded-xl w-full">
          <h2 className="text-center text-sm sm:text-base font-normal">
            Selecione a quantidade de números
          </h2>

          <div className="grid grid-cols-2 gap-3">{cotasNumbersElements}</div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => props.handleCotas(-1, "menus")}
              type="button"
              className="cursor-pointer"
            >
              <i className="icon-minus-circle text-2xl sm:text-3xl"> </i>
            </button>

            <mark className="py-1 px-2 w-full max-w-64 text-base bg-customGray text-secondary rounded-lg text-center">
              {props.rifaNumbers}
            </mark>

            <button
              onClick={() => props.handleCotas(1, "plus")}
              type="button"
              className="cursor-pointer"
            >
              <i className="icon-plus-circle text-2xl sm:text-3xl"> </i>
            </button>
          </div>

          <button
            onClick={() => props.originalCotas()}
            type="button"
            className="p-2 w-full rounded-lg bg-lightRed cursor-pointer text-base font-bold normal-transition hover:bg-darkRed"
          >
            REDEFINIR NÚMEROS
          </button>
        </div>
      </div>
    </section>
  );
}

function CotasNumbersContainer(props) {
  return (
    <button
      onClick={() => props.handleCotas(props.numbers, "plus")}
      type="button"
      className="flex flex-col items-center gap-1 p-4 bg-purple normal-transition hover:bg-darkPurple rounded-md cursor-pointer"
    >
      <mark className="bg-transparent text-white font-bold text-base sm:text-lg">
        +{props.numbers}
      </mark>

      <p className="font-normal text-xs sm:text-base">SELECIONAR</p>
    </button>
  );
}

function getCotasNumbers() {
  return [
    {
      id: 1,
      numbers: 10,
    },
    {
      id: 2,
      numbers: 50,
    },
    {
      id: 3,
      numbers: 100,
    },
    {
      id: 4,
      numbers: 500,
    },
  ];
}
