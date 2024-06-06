import { useState } from "react";
import { MdCheckBox } from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import {
  FlashMessageClose,
  FlashMessageContent,
  FlashMessageHeader,
  FlashMessageIcon,
  FlashMessageText,
  FlashMessageTitle,
  FlasheMessageContainr,
} from "./flash_message.style";

export const FlashMessage = () => {
  const [openFlashMessage, setOpenFlashMessage] = useState<boolean>(true);
  if (!openFlashMessage) return;
  return (
    <FlasheMessageContainr>
      <FlashMessageHeader>
        <FlashMessageTitle>User Log in </FlashMessageTitle>
        <FlashMessageClose
          onClick={() => {
            setOpenFlashMessage(false);
          }}
        >
          <RiCloseFill />
        </FlashMessageClose>
      </FlashMessageHeader>
      <FlashMessageContent>
        <FlashMessageIcon>
          <MdCheckBox />
          <FlashMessageText>You are signed in succefully</FlashMessageText>
        </FlashMessageIcon>
      </FlashMessageContent>
    </FlasheMessageContainr>
  );
};
