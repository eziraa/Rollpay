/* eslint-disable react-hooks/exhaustive-deps */
import {
  LeftMenuContainer,
  MenuItem,
  MenuItemText,
  LogoContainer,
  LogoImage,
  SubMenuContainer,
  SubMenuItem,
  ColapseExpand,
  Close,
} from "./left-menu.style";
import { useLocation, useNavigate } from "react-router";
import Image from "../../../assets/logo.png";
import { Title } from "../add_employee/add-employee.style";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useRefs } from "../../../hooks/refs-hook";
import { MenuItemInterface } from "../../../typo/menu/props";

function LeftMenu({ menu_items }: { menu_items: MenuItemInterface[] }) {
  const navigate = useNavigate();
  const { refs, setRefs } = useRefs();
  const leftMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setRefs({ ...refs, leftMenuRef });
  }, []);

  const { pathname } = useLocation();
  return (
    <div
      className="left-menu-modal"
      ref={leftMenuRef}
      onClick={() => {
        leftMenuRef &&
          leftMenuRef.current &&
          leftMenuRef.current.classList.toggle("collapsed");
      }}
    >
      <LeftMenuContainer
        className="left-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <Close
          className="close"
          onClick={(e) => {
            e.stopPropagation();
            leftMenuRef &&
              leftMenuRef.current &&
              leftMenuRef.current.classList.toggle("collapsed");
          }}
        />
        <LogoContainer>
          <LogoImage src={Image} />
          <Title>
            Pay
            <span
              style={{
                color: "#1e8054",
              }}
            >
              roll
            </span>
          </Title>
        </LogoContainer>
        {menu_items.map((item) => (
          <div key={item.path}>
            <MenuItem
              key={item.path}
              active={
                item?.sub_menu_items?.some((item) =>
                  pathname.startsWith(item.path)
                ) || pathname === item.path
                  ? true
                  : false
              }
              onClick={(e) => {
                e.stopPropagation();
                item.exapandItems
                  ? item.exapandItems(!item.items_expanded)
                  : navigate(item.path);
              }}
            >
              {item.icon}
              <MenuItemText>{item.title} </MenuItemText>
              {item.exapandItems && (
                <ColapseExpand>
                  {item.items_expanded ? <MdExpandLess /> : <MdExpandMore />}
                </ColapseExpand>
              )}
            </MenuItem>
            {item.items_expanded && (
              <SubMenuContainer>
                {item.sub_menu_items?.map(({ title, path }) => (
                  <SubMenuItem
                    key={title}
                    active={pathname.startsWith(path)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(path);
                    }}
                  >
                    <MenuItemText>{title}</MenuItemText>
                  </SubMenuItem>
                ))}
              </SubMenuContainer>
            )}
          </div>
        ))}
      </LeftMenuContainer>
    </div>
  );
}

export default LeftMenu;
