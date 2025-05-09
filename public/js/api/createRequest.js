/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      options.callback(null, xhr.response);
    } else {
      options.callback(
        new Error(`Request failed with status ${xhr.status}`),
        xhr.response
      );
    }
  };
  xhr.onerror = function () {
    console.error("Ошибка сети или сервер недоступен");
  };

  try {
    if (options.method === "GET") {
      let url = options.url;
      if (options.data) {
        const queryString = Object.keys(options.data)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                options.data[key]
              )}`
          )
          .join("&");
        url += `?${queryString}`;
      }
      xhr.open(options.method, url, true);
      xhr.send();
    } else if (
      options.method === "POST" ||
      options.method === "PUT" ||
      options.method === "DELETE"
    ) {
      const formData = new FormData();
      if (options.data) {
        for (let key in options.data) {
          if (options.data.hasOwnProperty(key)) {
            formData.append(key, options.data[key]);
          }
        }
      }
      xhr.open(options.method, options.url, true);
      xhr.send(formData);
    } else {
      throw new Error(`Unsupported HTTP method: ${options.method}`);
    }
  } catch (error) {
    options.callback(error, null);
  }
};
