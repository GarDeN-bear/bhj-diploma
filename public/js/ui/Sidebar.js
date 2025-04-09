/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let sidebar = document.getElementsByClassName('sidebar-mini').item(0);
    document.getElementsByClassName('sidebar-toggle')
        .item(0)
        .addEventListener('click', (ev) => {
          ev.preventDefault();

          if (sidebar.classList.contains('sidebar-open')) {
            sidebar.classList.remove('sidebar-mini', 'sidebar-open');
          } else {
            sidebar.classList.add('sidebar-mini', 'sidebar-open');
          }
        });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let menuItem =
        document.getElementsByClassName('menu-item_register').item(0);
    if (menuItem) {
      menuItem.addEventListener('click', (ev) => {
        ev.preventDefault();

        App.getModal('register').open();
      });
    }

    menuItem = document.getElementsByClassName('menu-item_login').item(0);
    if (menuItem) {
      menuItem.addEventListener('click', (ev) => {
        ev.preventDefault();

        App.getModal('login').open();
      });
    }

    menuItem = document.getElementsByClassName('menu-item_logout').item(0);
    if (menuItem) {
      menuItem.addEventListener('click', (ev) => {
        ev.preventDefault();
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState('init');
          }
        })
      });
    }
  }
}
