async function sendRequest(requestData) {
  const url = `http://127.0.0.1:8000/api/v1/${requestData.url}`;
  const method = requestData.method;
  let body = requestData.body;

  const headers = {
    Accept: "application/json",
  };

  if (!requestData.dataForm) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  if (localStorage.getItem("adminToken")) {
    const adminToken = localStorage.getItem("adminToken");

    headers["Authorization"] = `Bearer ${adminToken}`;
  }

  try {
    const responseData = await fetch(url, {
      method,
      body: body,
      headers,
    });

    const response = await responseData.json();

    return response;
  } catch (error) {
    return {
      success: false,
      msg: error,
    };
  }
}

function handleOnChange(target, setFormData) {
  const inputType = target.type;

  const targetName = target.name;

  if (inputType === "checkbox") {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        data: {
          ...prevFormData.data,
          quizz: {
            ...prevFormData.data.quizz,
            isActive: target.checked,
          },
        },
      };
    });

    return;
  }

  let targetValue = "";

  if (inputType !== "file") {
    targetValue = target.value;
  } else {
    targetValue = target.files[0];
  }

  setFormData((prevFormData) => {
    return {
      ...prevFormData,
      data: {
        ...prevFormData.data,

        [targetName]: targetValue,
      },
    };
  });
}

export { sendRequest, handleOnChange };
