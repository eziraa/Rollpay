import { MdCheckBox } from "react-icons/md";
import {
  FlashMessageContent,
  FlashMessageHeader,
  FlashMessageIcon,
  FlashMessageText,
  FlashMessageTitle,
  FlasheMessageContainr,
} from "./flash-message.style";
import { CloseIcon } from "../buttons/close";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { hideFlashMessage } from "../../../store/notification/flash-messsage-slice";

export const FlashMessage = () => {
  const dispatcher = useAppDispatch();
  const flashMessage = useAppSelector((state) => state.flashMessage);
  if (!flashMessage.status) return;
  return (
    <FlasheMessageContainr
      style={{
        color: flashMessage.color === "green" ? "rgb(23, 236, 52)" : "#E75454",
      }}
    >
      <FlashMessageHeader>
        <FlashMessageTitle> {flashMessage.title} </FlashMessageTitle>
        <CloseIcon
          onClick={() => {
            dispatcher(hideFlashMessage());
          }}
          style={{
            color: "white",
          }}
        />
      </FlashMessageHeader>
      <FlashMessageContent>
        <FlashMessageIcon>
          <MdCheckBox />
          <FlashMessageText> {flashMessage.desc} </FlashMessageText>
        </FlashMessageIcon>
      </FlashMessageContent>
    </FlasheMessageContainr>
  );
};
