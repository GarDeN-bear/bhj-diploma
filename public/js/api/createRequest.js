/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest;
  xhr.responseType = 'json';

  if (options.method === 'GET') {
    let url = options.data ? options.url + '?mail=' + options.data.mail +
            '&password=' + options.data.password :
                             options.url;
    xhr.open(options.method, url);
    xhr.send();
  } else if (options.method === 'POST') {
    let formData = new FormData();

    formData.append('name', options.data.name);
    formData.append('email', options.data.mail);
    formData.append('password', options.data.password);
    formData.append('id', options.data.id);
    formData.append('account_id', options.data.account_id);

    xhr.open('POST', options.url);
    xhr.send(formData);
  } else if (options.method === 'PUT') {
    let formData = new FormData();

    formData.append('name', options.data.name);
    formData.append('type', options.data.name);
    formData.append('sum', options.data.name);
    formData.append('account_id', options.data.name);

    xhr.open(options.method, options.url);
    xhr.send(formData);
  } else if (options.method === 'DELETE') {
    let formData = new FormData();

    formData.append('id', options.data.id);
    xhr.open(options.method, options.url);

    xhr.send(formData);
  }

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        options.callback(null, xhr.response);
      } else {
        options.callback(
            new Error(`Request failed with status ${xhr.status}`),
            xhr.response);
      }
    }
  });
};
