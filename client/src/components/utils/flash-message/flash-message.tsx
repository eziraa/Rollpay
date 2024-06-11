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
import { hideFlashMessage } from "../../../store/notification/flashMesssageSlice";

export const FlashMessage = () => {
  const dispatcher = useAppDispatch();
  const flashMessage = useAppSelector((state) => state.flashMessage);
  if (!flashMessage.status) return;
  return (
    <FlasheMessageContainr
      style={{
        color: "#0f0f0f",
      }}
    >
      <FlashMessageHeader>
        <FlashMessageTitle> {flashMessage.title} </FlashMessageTitle>
        <CloseIcon
          onClick={() => {
            dispatcher(hideFlashMessage());
          }}
        />
      </FlashMessageHeader>
      <FlashMessageContent
        style={{
          color: flashMessage.color === "green" ? "rgb(0, 120, 16)" : "#ff0000",
        }}
      >
        <FlashMessageIcon>
          <MdCheckBox />
          <FlashMessageText> {flashMessage.desc} </FlashMessageText>
        </FlashMessageIcon>
      </FlashMessageContent>
    </FlasheMessageContainr>
  );
};
