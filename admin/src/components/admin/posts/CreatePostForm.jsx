import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { handleOnChange, sendRequest } from "../../../util/util";
import Loading from "../../Loading";

export default function CreatePostForm() {
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
        firstPacoteDiscount: 0,
        secondPacoteNumbers: "",
        secondPacoteDiscount: 0,
        thirdPacoteNumbers: "",
        thirdPacoteDiscount: 0,
        fourthPacoteNumbers: "",
        fourthPacoteDiscount: 0,
        fifthPacoteNumbers: "",
        fifthPacoteDiscount: 0,
        sixthPacoteNumbers: "",
        sixthPacoteDiscount: 0,
        rifaNumbers: "",
      },
      status: {
        success: false,
        errors: {
          title: {
            error: false,
            msg: "Title Error",
          },
          description: {
            error: false,
            msg: "Content Error",
          },
          thumbnail: {
            error: false,
            msg: "Thumbnail Error",
          },
          rifaStatus: {
            error: false,
            msg: "Rifa Status Error",
          },
          rifaDate: {
            error: false,
            msg: "Rifa Date Error",
          },
          price: {
            error: false,
            msg: "Price Error",
          },
          firstPacoteNumbers: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          firstPacoteDiscount: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          secondPacoteNumbers: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          secondPacoteDiscount: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          thirdPacoteNumbers: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          thirdPacoteDiscount: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          fourthPacoteNumbers: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          fourthPacoteDiscount: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          fifthPacoteNumbers: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          fifthPacoteDiscount: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          sixthPacoteNumbers: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          sixthPacoteDiscount: {
            error: false,
            msg: "Numbers Pricing Error",
          },
          rifaNumbers: {
            error: false,
            msg: "Numbers Pricing Error",
          },
        },
      },
    };
  });

  const [isLoading, setIsLoading] = useState(() => false);

  return (
    <form
      className="flex flex-col gap-4 relative"
      encType="multipart/form-data"
      noValidate
      onSubmit={(event) =>
        handleOnSubmit(event, formData, setFormData, setIsLoading)
      }
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-bold text-blue-900 text-2xl">
          Título:
        </label>
        <input
          id="title"
          type="text"
          name="title"
          onChange={(event) => handleOnChange(event.target, setFormData)}
          value={formData.data.title}
          className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
        />

        {formData.status.errors.title.error && (
          <p className="text-base font-medium text-red-500">
            {formData.status.errors.title.msg}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-blue-900 text-2xl">Descrição:</h2>

        <ReactQuill
          name="description"
          theme="snow"
          value={formData.data.description}
          onChange={(description) =>
            handleReactQuillChange(description, setFormData)
          }
        />

        {formData.status.errors.description.error && (
          <p className="text-base font-medium text-red-500">
            {formData.status.errors.description.msg}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-blue-900 text-2xl">Thumbnail:</h2>

        <label
          htmlFor="thumbnail"
          className="text-base font-medium text-tertiary p-2 w-full border cursor-pointer border-customTransparent"
        >
          {formData.data.thumbnail
            ? formData.data.thumbnail.name
            : "Escolher imagem"}
        </label>

        <input
          onChange={(event) => handleOnChange(event.target, setFormData)}
          className="hidden"
          id="thumbnail"
          type="file"
          name="thumbnail"
          accept=".file,.jpeg,.jpg,.webp,.png"
        />

        {formData.status.errors.thumbnail.error && (
          <p className="text-base font-medium text-red-500">
            {formData.status.errors.thumbnail.msg}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="rifa-status"
          className="font-bold text-blue-900 text-2xl"
        >
          Status:
        </label>

        <input
          id="rifa-status"
          type="text"
          name="rifaStatus"
          onChange={(event) => handleOnChange(event.target, setFormData)}
          value={formData.data.rifaStatus}
          className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
        />

        {formData.status.errors.rifaStatus.error && (
          <p className="text-base font-medium text-red-500">
            {formData.status.errors.rifaStatus.msg}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="rifa-date" className="font-bold text-blue-900 text-2xl">
          Data do sorteio:
        </label>

        <input
          id="rifa-date"
          type="text"
          name="rifaDate"
          onChange={(event) => handleOnChange(event.target, setFormData)}
          value={formData.data.rifaDate}
          className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
        />

        {formData.status.errors.rifaDate.error && (
          <p className="text-base font-medium text-red-500">
            {formData.status.errors.rifaDate.msg}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-blue-900 text-2xl">Pacotes:</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <input
                placeholder="Quantidade de Números"
                type="text"
                name="firstPacoteNumbers"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.firstPacoteNumbers}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.firstPacoteNumbers.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.firstPacoteNumbers.msg}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                placeholder="Desconto %"
                type="number"
                name="firstPacoteDiscount"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.firstPacoteDiscount}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.firstPacoteDiscount.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.firstPacoteDiscount.msg}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <input
                placeholder="Quantidade de Números"
                type="text"
                name="secondPacoteNumbers"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.secondPacoteNumbers}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.secondPacoteNumbers.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.secondPacoteNumbers.msg}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                placeholder="Desconto %"
                type="number"
                name="secondPacoteDiscount"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.secondPacoteDiscount}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.secondPacoteDiscount.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.secondPacoteDiscount.msg}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <input
                placeholder="Quantidade de Números"
                type="text"
                name="thirdPacoteNumbers"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.thirdPacoteNumbers}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.thirdPacoteNumbers.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.thirdPacoteNumbers.msg}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                placeholder="Desconto %"
                type="number"
                name="thirdPacoteDiscount"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.thirdPacoteDiscount}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.thirdPacoteDiscount.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.thirdPacoteDiscount.msg}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <input
                placeholder="Quantidade de Números"
                type="text"
                name="fourthPacoteNumbers"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.fourthPacoteNumbers}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.fourthPacoteNumbers.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.fourthPacoteNumbers.msg}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                placeholder="Desconto %"
                type="number"
                name="fourthPacoteDiscount"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.fourthPacoteDiscount}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.fourthPacoteDiscount.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.fourthPacoteDiscount.msg}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <input
                placeholder="Quantidade de Números"
                type="text"
                name="fifthPacoteNumbers"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.fifthPacoteNumbers}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.fifthPacoteNumbers.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.fifthPacoteNumbers.msg}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                placeholder="Desconto %"
                type="number"
                name="fifthPacoteDiscount"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.fifthPacoteDiscount}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.fifthPacoteDiscount.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.fifthPacoteDiscount.msg}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <input
                placeholder="Quantidade de Números"
                type="text"
                name="sixthPacoteNumbers"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.sixthPacoteNumbers}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.sixthPacoteNumbers.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.sixthPacoteNumbers.msg}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <input
                placeholder="Desconto %"
                type="number"
                name="sixthPacoteDiscount"
                onChange={(event) => handleOnChange(event.target, setFormData)}
                value={formData.data.sixthPacoteDiscount}
                className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
              />

              {formData.status.errors.sixthPacoteDiscount.error && (
                <p className="text-base font-medium text-red-500">
                  {formData.status.errors.sixthPacoteDiscount.msg}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="rifa-numbers"
          className="font-bold text-blue-900 text-2xl"
        >
          Quantidade de Números:
        </label>

        <input
          id="rifa-numbers"
          type="number"
          name="rifaNumbers"
          onChange={(event) => handleOnChange(event.target, setFormData)}
          value={formData.data.rifaNumbers}
          className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
        />

        {formData.status.errors.rifaNumbers.error && (
          <p className="text-base font-medium text-red-500">
            {formData.status.errors.rifaNumbers.msg}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="font-bold text-blue-900 text-2xl">
          Preço do número:
        </label>

        <input
          id="price"
          type="number"
          name="price"
          onChange={(event) => handleOnChange(event.target, setFormData)}
          value={formData.data.price}
          className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
        />

        {formData.status.errors.price.error && (
          <p className="text-base font-medium text-red-500">
            {formData.status.errors.price.msg}
          </p>
        )}
      </div>

      <button
        className="p-2 font-bold text-white bg-blue-900 rounded-lg text-base hover:bg-blue-950 transition-all duration-200"
        type="submit"
      >
        Salvar
      </button>

      {formData.status.success && (
        <h3 className="text-lg font-medium text-green-500">
          Nova rifa adicionado com sucesso!
        </h3>
      )}

      {isLoading && (
        <div className="absolute z-10 flex flex-col items-center justify-center top-0 bottom-0 left-0 right-0 bg-transparentBlack">
          <div>
            <Loading />
          </div>
        </div>
      )}
    </form>
  );
}

function handleReactQuillChange(description, setFormData) {
  setFormData((prevFormData) => {
    return {
      ...prevFormData,
      data: {
        ...prevFormData.data,
        description,
      },
    };
  });
}

function handleOnSubmit(event, formData, setFormData, setIsLoading) {
  event.preventDefault();

  setIsLoading(() => true);

  handleRequest(formData, setFormData, setIsLoading);
}

async function handleRequest(formData, setFormData, setIsLoading) {
  const formDataToSend = new FormData();

  formDataToSend.append("title", formData.data.title);
  formDataToSend.append("description", formData.data.description);
  formDataToSend.append("rifaStatus", formData.data.rifaStatus);
  formDataToSend.append("rifaDate", formData.data.rifaDate);
  formDataToSend.append("price", formData.data.price);
  formDataToSend.append("rifaNumbers", formData.data.rifaNumbers);
  formDataToSend.append("firstPacoteNumbers", formData.data.firstPacoteNumbers);
  formDataToSend.append(
    "firstPacoteDiscount",
    formData.data.firstPacoteDiscount
  );
  formDataToSend.append(
    "secondPacoteNumbers",
    formData.data.secondPacoteNumbers
  );
  formDataToSend.append(
    "secondPacoteDiscount",
    formData.data.secondPacoteDiscount
  );
  formDataToSend.append("thirdPacoteNumbers", formData.data.thirdPacoteNumbers);
  formDataToSend.append(
    "thirdPacoteDiscount",
    formData.data.thirdPacoteDiscount
  );
  formDataToSend.append(
    "fourthPacoteNumbers",
    formData.data.fourthPacoteNumbers
  );
  formDataToSend.append(
    "fourthPacoteDiscount",
    formData.data.fourthPacoteDiscount
  );
  formDataToSend.append(
    "fifthPacoteNumbers",
    formData.data.fifthPacoteNumbers
  );
  formDataToSend.append(
    "fifthPacoteDiscount",
    formData.data.fifthPacoteDiscount
  );
  formDataToSend.append(
    "sixthPacoteNumbers",
    formData.data.sixthPacoteNumbers
  );
  formDataToSend.append(
    "sixthPacoteDiscount",
    formData.data.sixthPacoteDiscount
  );

  if (formData.data.thumbnail) {
    formDataToSend.append("thumbnail", formData.data.thumbnail);
  }

  const requestData = {
    method: "POST",
    url: "rifas",
    body: formDataToSend,
    dataForm: true,
  };

  try {
    const response = await sendRequest(requestData);

    if (!response.success) {
      setFormData((prevFormData) => {
        const errors = response.errors;
        const newFormData = { ...prevFormData };

        for (let key in prevFormData.status.errors) {
          if (errors[key]) {
            newFormData.status.errors[key] = {
              error: true,
              msg: errors[key],
            };
          } else {
            newFormData.status.errors[key] = {
              error: false,
              msg: `${key} error.`,
            };
          }
        }

        return newFormData;
      });

      return;
    }

    setTimeout(() => {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          status: {
            ...prevFormData.status,
            success: false,
          },
        };
      });
    }, 5000);
    window.location.href = '/rifas';
  } catch (error) {
    window.alert(`Houve um erro no servidor ${error}`);
  } finally {
    setIsLoading(() => false);
  }
}
