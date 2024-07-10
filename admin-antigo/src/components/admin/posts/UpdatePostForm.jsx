import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { handleOnChange, sendRequest } from "../../../util/util";
import Loading from "../../Loading";
import { useParams, Navigate } from "react-router-dom";
import ContentLoading from "../../ContentLoading";
import { useNavigate } from "react-router-dom";

export default function UpdatePostForm() {
  const postId = useParams().id;
  const navigate = useNavigate();

  
  validateId(postId);

  const [isLoading, setIsLoading] = useState(() => false);
  const [postData, setPostData] = useState(() => ({}));
  const [contentIsLoading, setContentIsLoading] = useState(() => true);

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
        maxNums: "",
        minNums: "",
      },
      status: {
        success: false,
        errors: {
          maxNums: {
            error: false,
            msg: "Max Error"
          },
          minNums: {
            error: false,
            msg: "Min Error"
          },
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

  function fileNames(fileList) {
    let str = "";
    if (fileList.name) {
      return fileList.name;
    }
    for(let index = 0; index < fileList.length; index += 1) {
      const currentFile = fileList[index];
      if (index === fileList.length - 1) {
        str = str + currentFile.name;
      } else {
        str = str + currentFile.name + ", ";
      }
    }
    return str;
  }

  useEffect(() => {
    getPostData(postId, setPostData, setContentIsLoading, setFormData);
  }, []);

  if (!validateId(postId)) {
    return <Navigate to="/not-found" replace />;
  }

  return Object.keys(postData).length >= 1 ? (
    <form
      className="flex flex-col gap-4 relative"
      encType="multipart/form-data"
      noValidate
      onSubmit={(event) =>
        handleOnSubmit(event, formData, setFormData, setIsLoading, postId)
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
            ? fileNames(formData.data.thumbnail)
            : "Escolher imagem"}
        </label>

        <input
          onChange={(event) => handleOnChange(event.target, setFormData)}
          className="hidden"
          id="thumbnail"
          type="file"
          multiple={true}
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
        <label
          htmlFor="min-numbers"
          className="font-bold text-blue-900 text-2xl"
        >
          Quantidade Minima de Números:
        </label>

        <input
          id="min-numbers"
          type="number"
          name="minNums"
          onChange={(event) => handleOnChange(event.target, setFormData)}
          value={formData.data.minNums}
          className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
        />

        {formData.status.errors.minNums.error && (
          <p className="text-base font-medium text-red-500">
            {formData.status.errors.minNums.msg}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="max-numbers"
          className="font-bold text-blue-900 text-2xl"
        >
          Quantidade Máxima de Números:
        </label>

        <input
          id="max-numbers"
          type="number"
          name="maxNums"
          onChange={(event) => handleOnChange(event.target, setFormData)}
          value={formData.data.maxNums}
          className="p-2 text-tertiary font-normal text-base border border-customTransparent rounded-lg"
        />

        {formData.status.errors.maxNums.error && (
          <p className="text-base font-medium text-red-500">
            {formData.status.errors.maxNums.msg}
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
          Nova rifa atualizada com sucesso!
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
  ) : (
    <div className="pt-10 pb-10 flex flex-col items-center justify-center">
      {contentIsLoading ? (
        <ContentLoading />
      ) : (
        <h1 className="text-lg font-bold text-center text-red-500 sm:text-2xl">
          Rifa não encontrada
        </h1>
      )}
    </div>
  );
}

function validateId(postId) {
  const idValidated = parseInt(postId);
  if (Number.isNaN(idValidated) || idValidated <= 0) {
    return false;
  }

  return true;
}

async function getPostData(
  postId,
  setPostData,
  setContentIsLoading,
  setFormData
) {
  const requestData = {
    method: "GET",
    url: `rifas/${postId}`,
  };

  try {
    setContentIsLoading(() => true);

    const response = await sendRequest(requestData);

    if (!response.success) {
      return;
    }

    const responsePostData = response.data;

    setPostData(() => responsePostData);

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
        fifthPacoteNumbers: responsePostData.fifthPacoteNumbers,
        fifthPacoteDiscount: responsePostData.fifthPacoteDiscount,
        sixthPacoteNumbers: responsePostData.sixthPacoteNumbers,
        sixthPacoteDiscount: responsePostData.sixthPacoteDiscount,
        rifaNumbers: responsePostData.rifaNumbers,
        minNums: responsePostData.minNumbers,
        maxNums: responsePostData.maxNumbers,
        thumbnail: { name: responsePostData.thumbnail, notImage: true },
      };

      return {
        ...prevFormData,

        data: {
          ...prevFormData.data,
          ...newFormData,
        },
      };
    });
  } catch (error) {
    window.alert(`Houve um erro no servidor ${error}`);
  } finally {
    setContentIsLoading(() => false);
  }
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

function handleOnSubmit(event, formData, setFormData, setIsLoading, postId) {
  event.preventDefault();

  setIsLoading(() => true);

  handleRequest(formData, setFormData, setIsLoading, postId);
}

async function handleRequest(formData, setFormData, setIsLoading, postId) {
  const formDataToSend = new FormData();

  formDataToSend.append("title", formData.data.title);
  formDataToSend.append("description", formData.data.description);
  formDataToSend.append("rifaStatus", formData.data.rifaStatus);
  formDataToSend.append("rifaDate", formData.data.rifaDate);
  formDataToSend.append("price", formData.data.price);
  formDataToSend.append("rifaNumbers", formData.data.rifaNumbers);
  formDataToSend.append("firstPacoteNumbers", formData.data.firstPacoteNumbers);
  formDataToSend.append("minNumbers", formData.data.minNums);
  formDataToSend.append("maxNumbers", formData.data.maxNums);
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
    if (formData.data.thumbnail.notImage) {
    } else {

      for (let index = 0; index < formData.data.thumbnail.length; index += 1) {
        formDataToSend.append("thumbnail[]", formData.data.thumbnail[index]);
      }
    }
  }

  const requestData = {
    method: "POST",
    url: `rifas/${postId}`,
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
    window.location.href = '/rifas';
    // setFormData((prevFormData) => {
    //   return {
    //     ...prevFormData,
    //     status: {
    //       success: true,
    //       errors: {
    //         title: {
    //           error: false,
    //           msg: "Title Error",
    //         },
    //         description: {
    //           error: false,
    //           msg: "Content Error",
    //         },
    //         thumbnail: {
    //           error: false,
    //           msg: "Thumbnail Error",
    //         },
    //         rifaStatus: {
    //           error: false,
    //           msg: "Rifa Status Error",
    //         },
    //         rifaDate: {
    //           error: false,
    //           msg: "Rifa Date Error",
    //         },
    //         price: {
    //           error: false,
    //           msg: "Price Error",
    //         },
    //         firstPacoteNumbers: {
    //           error: false,
    //           msg: "Numbers Pricing Error",
    //         },
    //         firstPacoteDiscount: {
    //           error: false,
    //           msg: "Numbers Pricing Error",
    //         },
    //         secondPacoteNumbers: {
    //           error: false,
    //           msg: "Numbers Pricing Error",
    //         },
    //         secondPacoteDiscount: {
    //           error: false,
    //           msg: "Numbers Pricing Error",
    //         },
    //         thirdPacoteNumbers: {
    //           error: false,
    //           msg: "Numbers Pricing Error",
    //         },
    //         thirdPacoteDiscount: {
    //           error: false,
    //           msg: "Numbers Pricing Error",
    //         },
    //         fourthPacoteNumbers: {
    //           error: false,
    //           msg: "Numbers Pricing Error",
    //         },
    //         fourthPacoteDiscount: {
    //           error: false,
    //           msg: "Numbers Pricing Error",
    //         },
    //         rifaNumbers: {
    //           error: false,
    //           msg: "Numbers Pricing Error",
    //         },
    //       },
    //     },
    //   };
    // });

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
  } catch (error) {
    window.alert(`Houve um erro no servidor ${error}`);
  } finally {
    setIsLoading(() => false);
  }
}
