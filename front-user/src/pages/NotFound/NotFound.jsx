import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <div className="flex flex-col justify-between gap-4 min-content-height">
        <article className="h-full flex flex-col items-center justify-center gap-4 m-auto text-white">
          <article className="flex flex-col">
            <h2 className="text-center text-2xl font-medium">
              Página não encontrada!
            </h2>
            <h1 className="text-center text-[4rem] font-bold">Erro 404!</h1>
          </article>

          <Link
            to="/"
            className="w-full py-3 rounded-lg bg-customBlue text-center font-medium text-base normal-transition hover:bg-primary"
          >
            Início
          </Link>
        </article>
      </div>
    </section>
  );
}
