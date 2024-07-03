import { Link } from "react-router-dom";
import CreatePostForm from "../../../components/admin/posts/CreatePostForm";

export default function CreatePost() {
  return (
    <section>
      <div className="flex flex-col gap-10">
        <div>
          <Link
            className="p-2 pr-10 pl-10 text-white bg-primary font-medium rounded-lg cursor-pointer hover:bg-blue-900 transition-all duration-200"
            to="/rifas"
          >
            Voltar
          </Link>
        </div>

        <article className="flex flex-col gap-6">
          <h1 className="text-2xl text-center text-blue-900 font-bold sm:text-3xl lg:text-4xl">
            Criar Rifa
          </h1>

          <CreatePostForm />
        </article>
      </div>
    </section>
  );
}
