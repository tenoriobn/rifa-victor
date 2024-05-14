import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <main>
      <section>
        <div className="login-container min-h-screen p-3 pt-10 pb-10 flex flex-col items-center justify-center">
          <article className="bg-white max-w-[40rem] w-full rounded-3xl flex flex-col items-center justify-center gap-8 sm:gap-10 p-3 pt-20 pb-20">
            <h1 className="text-2xl text-center font-bold text-primary sm:text-3xl lg:text-4xl">
              Bem-vindo admin
            </h1>

            <LoginForm />
          </article>
        </div>
      </section>
    </main>
  );
}
