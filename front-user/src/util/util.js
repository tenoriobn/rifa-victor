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

export { sendRequest };
