/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account';

  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback) {
    createRequest(
        {url: Account.URL + '/' + id, method: 'GET', callback: callback});
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest(
        {url: Account.URL, method: 'PUT', data: data, callback: callback});
  }
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback) {
    createRequest(
        {url: Account.URL, method: 'GET', data: data, callback: callback});
  }
}
