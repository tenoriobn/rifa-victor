export default function Informations(props) {
  return (
    <section className="py-5">
      <div className="flex flex-col gap-4">
        <article className="flex flex-col gap-4">
          <h2 className="font-bold text-base sm:text-lg">📄 Informações</h2>

          <article className="p-4 flex flex-col gap-4 bg-darkerBlue rounded-xl w-full">
            <h3 className="text-base sm:text-lg font-bold">
              LAMBORGHINI AVENTADOR
            </h3>

            <div
              dangerouslySetInnerHTML={{ __html: props.rifaData.description }}
            />
          </article>
        </article>
      </div>
    </section>
  );
}
