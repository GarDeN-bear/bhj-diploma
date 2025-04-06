/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  constructor() {
    super(URL);
    Entity.URL = '/account';
  }

  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback) {
    createRequest(
        {url: Entity.URL + '/' + id, method: 'GET', callback: callback});
  }
}
