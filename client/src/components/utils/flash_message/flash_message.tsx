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
import { useAppDispatch, useAppSelector } from "../../../utils/customHook";
import { hideFlashMessage } from "../../../store/notification/flashMesssageSlice";

export const FlashMessage = () => {
  const dispatcher = useAppDispatch();
  const flashMessage = useAppSelector((state) => state.flashMessage);
  if (!flashMessage.status) return;
  return (
    <FlasheMessageContainr
      style={{
        color: flashMessage.color === "green" ? "#02FFC0" : "#FF361B",
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
          color: flashMessage.color === "green" ? "#02FFC0" : "#FF361B",
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
