export interface MenuItemInterface {
  title: string;
  path: string;
  icon: JSX.Element;
  items_expanded?: boolean;
  exapandItems?: (bol: boolean) => void;
  sub_menu_items?: MenuItemInterface[];
}
