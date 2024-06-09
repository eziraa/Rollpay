import { useState } from "react";
import { MdCheckBox } from "react-icons/md";
import {
  FlashMessageContent,
  FlashMessageHeader,
  FlashMessageIcon,
  FlashMessageText,
  FlashMessageTitle,
  FlasheMessageContainr,
} from "./flash_message.style";
import { CloseIcon } from "../buttons/close";

export const FlashMessage = () => {
  const [openFlashMessage, setOpenFlashMessage] = useState<boolean>(true);
  if (!openFlashMessage) return;
  return (
    <FlasheMessageContainr>
      <FlashMessageHeader>
        <FlashMessageTitle>User Log in </FlashMessageTitle>
        <CloseIcon
          onClick={() => {
            setOpenFlashMessage(false);
          }}
        />
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
