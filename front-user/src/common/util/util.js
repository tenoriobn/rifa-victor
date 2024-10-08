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

function formatPrice(price) {
  return Number(price).toFixed(2).replace(".", ",");
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

export { sendRequest, formatPrice, formatDate };
