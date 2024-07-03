import { Link } from "react-router-dom";
import { useState } from "react";
import { sendRequest } from "../../util/util";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState(() => {
    return {
      data: {
        email: "",
        password: "",
      },
      status: {
        success: false,
        errors: {
          authError: false,
          msg: "Email ou Senha inválidos.",
        },
      },
    };
  });

  const [isLoading, setIsLoading] = useState(() => false);

  const navigate = useNavigate();

  return (
    <form
      className="w-full max-w-72"
      noValidate
      onSubmit={(event) =>
        handleOnSubmit(event, formData, setFormData, setIsLoading, navigate)
      }
    >
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <div className="w-full flex flex-col gap-1">
          <div className="p-2 pr-3 pl-3 rounded-2xl w-full max-w-72 bg-white border border-blue-900 flex justify-start items-center gap-2">
            <i className="icon-user-tie text-lg text-blue-900"></i>

            <input
              onChange={(event) => handleOnChange(event, setFormData)}
              name="email"
              type="email"
              value={formData.data.email}
              className="w-full font-normal text-base text-tertiary"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="p-2 pr-3 pl-3 rounded-2xl w-full max-w-72 bg-white border border-blue-900 flex justify-start items-center gap-2">
            <i className="icon-locked text-lg text-blue-900"></i>

            <input
              onChange={(event) => handleOnChange(event, setFormData)}
              name="password"
              type="password"
              value={formData.data.password}
              className="w-full font-normal text-base text-tertiary "
              placeholder="Senha"
            />
          </div>

          {formData.status.errors.authError && (
            <p className="text-medium text-red-400 text-base">
              {formData.status.errors.msg}
             </p>
          )}
        </div>

            <div className="self-end">
          <Link
            className="text-sm font-medium text-secondary hover:text-primary transition-all duration-200 cursor-pointer"
            to="/recuperar-senha"
          >
            Esqueci a Senha
          </Link>
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="font-medium inline-block p-2 pr-20 pl-20 w-full rounded-2xl text-base text-white bg-secondary hover:bg-primary transition-all duration-200"
          >
            Entrar
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="fixed z-10 bg-transparentBlack top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center">
          <Loading />
        </div>
      )}
    </form>
  );
}

function handleOnSubmit(event, formData, setFormData, setIsLoading, navigate) {
  event.preventDefault();

  setIsLoading(() => true);

  handleRequest(formData, setFormData, setIsLoading, navigate);
}

async function handleRequest(formData, setFormData, setIsLoading, navigate) {
  const requestData = {
    method: "POST",
    body: formData.data,
    url: "login",
  };

  try {
    const response = await sendRequest(requestData);

    if (!response.success) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          status: {
            ...prevFormData.status,
            errors: {
              ...prevFormData.status.errors,
              authError: true,
            },
          },
        };
      });

      return;
    }

    localStorage.setItem("adminUser", JSON.stringify(response.data.adminUser));
    localStorage.setItem("adminToken", response.data.token);

    navigate("/rifas");
  } catch (error) {
    window.alert(
      `Houve um erro no servidor, por favor, tente novamente mais tarde. Erro: ${error}`
    );
  } finally {
    setIsLoading(() => false);
  }
}

function handleOnChange(event, setFormData) {
  const target = event.target;
  const targetName = target.name;

  setFormData((prevFormData) => {
    return {
      ...prevFormData,
      data: {
        ...prevFormData.data,
        [targetName]: target.value,
      },
    };
  });
}
