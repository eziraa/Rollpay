export interface MenuItemInterface {
  title: string;
  path: string;
  icon: JSX.Element;
  sub_menu_items?: MenuItemInterface[];
}
