/* eslint-disable react-hooks/exhaustive-deps */
import {
  HeaderContainer,
  ProfileContainer,
  ProfileImage,
  WelcomeMessageContainer,
} from "./header.style";
import { BlurredText, MidBlurredText } from "../../utils/titles/titles";
import { stringDay } from "../../utils/day/string-day";
import { DropDown } from "./profile-drop-down";
import { HamburgerMenu } from "../../pages/home/home-page.style";
import { HiMenu } from "react-icons/hi";
import { useRefs } from "../../../hooks/refs-hook";
import { baseURL } from "../../../config/api";
import { useEffect, useState } from "react";
import UserAPI from "../../../services/user-api";
import { useAuth } from "../../../hooks/auth-hook";

export const Header = () => {
  const leftMenuRef = useRefs().refs?.leftMenuRef;
  const { curr_user } = useAuth();
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    UserAPI.getServerTime().then((res) => {
      if (res.status === 200) {
        initializeTimer(new Date(res.data.server_time));
      } else {
        initializeTimer(new Date());
      }
    });

    // Store the interval ID
    let intervalId: string | number | NodeJS.Timeout | undefined;

    const initializeTimer = (serverTime: Date) => {
      intervalId = setInterval(function () {
        const newTime = new Date(serverTime.getTime() + 1000);
        serverTime = newTime;
        setDate(newTime);
      }, 1000);
    };

    // Cleanup function to clear the interval
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []); // Ensure this effect runs only once upon mounting
  return (
    <>
      <HeaderContainer className="shadow-md drop-shadow-md shadow-green-100">
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
          <BlurredText
            style={{
              fontSize: "2rem",
            }}
          >
            Welcome,{curr_user?.employee.gender === "F" ? " Ms" : " Mr"}.{" "}
            {curr_user?.employee.first_name}
          </BlurredText>
          <MidBlurredText>
            Today is {date && stringDay(date)}
            <span className="success">
              {date &&
                ` ${(date.getHours() % 12).toString().padStart(2, "0")}:${date
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}:${date
                  .getSeconds()
                  .toString()
                  .padStart(2, "0")}  ${date.getHours() > 12 ? "PM" : "AM"}`}
            </span>
          </MidBlurredText>
        </WelcomeMessageContainer>
        <ProfileContainer>
          <ProfileImage profile={baseURL + curr_user?.profile_picture} />
          <DropDown />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};
