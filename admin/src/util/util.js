async function sendRequest(requestData) {
  const url = `https://api.vitaobarbeiro.com/api/v1/${requestData.url}`;
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
    targetValue = target.files;
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

function formatDate(date) {
  const dateTime = new Date(date);
  const day = String(dateTime.getDate()).padStart(2, '0');
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const year = dateTime.getFullYear();
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;
  return `${formattedDate} às ${formattedTime}`;
}

function formatPrice(price) {
  return Number(price).toFixed(2).replace(".", ",");
}

export { sendRequest, handleOnChange, formatDate, formatPrice };
