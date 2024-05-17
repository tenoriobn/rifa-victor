export default function Buyers() {
  return (
    <>
      <section>
        <div className="flex justify-end">
          <button
            class="cursor-pointer mb-4 h-full p-2 pr-5 pl-5 inline-block rounded-lg bg-blue-900 hover:opacity-90"
            type="submit"
          >
            <i class="icon-search text-lg text-white"></i>
          </button>
        </div>
        <div className="border-2 border-black p-3	">
          <div className="flex gap-3">
            <div>
              <label className="font-bold text-lg mb-2 block" htmlFor="tel">
                Telefone
              </label>
              <input
                type="text"
                name="tel"
                className="p-2 pl-4 pr-4 text-base border-2 border-gray-300 text-tertiary w-full"
              />
            </div>
            <div>
                <div>
                  <label
                    className="font-bold text-lg mb-2 block"
                    htmlFor="cota"
                  >
                    Cota
                  </label>
                  <input
                    type="text"
                    name="cota"
                    className="p-2 pl-4 pr-4 text-base border-2 border-gray-300 text-tertiary w-full"
                  />
                </div>
           
            </div>
          </div>
          <div className="flex">
            <div className="">
              <label className="font-bold text-lg mb-2 block" htmlFor="id">
                Id Compra
              </label>
              <input
                type="text"
                name="id"
                className="p-2 pl-4 pr-4 text-base border-2 border-gray-300 text-tertiary w-full"
              />
            </div>
          </div>
          <div>
            <button>Buscar</button>
            <button>Limpar Busca</button>
          </div>
        </div>
      </section>
      <section>
        <h1>Compradores</h1>
      </section>
    </>
  );
}
