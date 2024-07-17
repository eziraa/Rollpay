/* eslint-disable react-hooks/exhaustive-deps */
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
  WelcomeMessageContainer,
} from "./header.style";
import { useUser } from "../../../hooks/user-hook";
import { BlurredText, MidBlurredText } from "../../utils/titles/titles";
import { stringDay } from "../../utils/day/string-day";
import { DropDown } from "./profile-drop-down";
import { HamburgerMenu } from "../../pages/home/home-page.style";
import { HiMenu } from "react-icons/hi";
import { useRefs } from "../../../hooks/refs-hook";
import { baseURL } from "../../../config/api";
import { useEffect, useState } from "react";
import UserAPI from "../../../services/user-api";

export const Header = () => {
  const { user } = useUser();
  const leftMenuRef = useRefs().refs?.leftMenuRef;
  const [date, setDate] = useState<Date | null>(null);
  const initializeTimer = (serverTime: Date) => {
    setInterval(function () {
      // Increment the serverTime by 1 second
      serverTime.setSeconds(serverTime.getSeconds() + 1);
      setDate(serverTime);
    }, 1000);
  };
  useEffect(() => {
    UserAPI.getServerTime().then((res) => {
      if (res.status === 200) {
        initializeTimer(new Date(res.data.server_time));
      } else {
        initializeTimer(new Date(Date.now()));
      }
    });
  }, []);
  return (
    <>
      <HeaderContainer>
        <HamburgerMenu
          className="hamburger-menu"
          onClick={() => {
            leftMenuRef &&
              leftMenuRef.current &&
              leftMenuRef.current.classList.toggle("collapsed");
          }}
        >
          <HiMenu />
        </HamburgerMenu>
        <WelcomeMessageContainer>
          <BlurredText>
            Welcome,{user?.employee.gender === "F" ? " Ms" : " Mr"}.{" "}
            {user?.employee.first_name}
          </BlurredText>
          <MidBlurredText>
            Today is {date && stringDay(date)}
            <span className="success">
              {date &&
                ` ${date.getHours().toString().padStart(2, "0")}:${date
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}:${date
                  .getSeconds()
                  .toString()
                  .padStart(2, "0")}`}
            </span>
          </MidBlurredText>
        </WelcomeMessageContainer>
        <ProfileContainer>
          <ProfileImage profile={baseURL + user?.profile_picture} />
          <DropDown />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
