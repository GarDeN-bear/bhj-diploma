/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw 'In AccountsWidget constructor element is empty';
    }
    this.element = element;
    this.update();
    this.registerEvents();
  }

  /**
   * Устанавливает текущий активный идентификатор счёта.
   * */
  static setCurrent(accountId) {
    this.activeAccountId = accountId;
  }

  /**
   * Возвращает текущий активный идентификатор счёта.
   * */
  static current() {
    return this.activeAccountId;
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.querySelector('.create-account')
        .addEventListener('click', () => {
          App.getModal('createAccount').open();
        });
    // TODO Пробовал добавить addEventListener, но не вышло.
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (!User.current()) {
      return;
    }
    Account.list(User.current(), (err, response) => {
      if (response.success) {
        this.clear();
        for (let i = 0; i < response.data.length; ++i) {
          this.renderItem(response.data[i]);
        }
      }
    });
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    Array.from(this.element.querySelectorAll('.account')).forEach(el => {
      el.remove();
    });
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    if (this.activeElement) {
      this.activeElement.classList.remove('active');
    }
    element.classList.add('active');
    App.showPage('transactions', {account_id: element.getAttribute('data-id')});
    this.activeElement = element;
    AccountsWidget.setCurrent(element.getAttribute('data-id'));
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    let li = document.createElement('li');
    li.classList.add('account');
    li.setAttribute('data-id', item.id);
    li.innerHTML = `<a href="#">
                        <span>${item.name}</span> /
                        <span>${item.sum} ₽</span>
                    </a>`;
    li.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.onSelectAccount(li);
    })
    return li;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    this.element.insertAdjacentElement('beforeend', this.getAccountHTML(data));
  }
}
