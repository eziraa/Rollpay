import {
  CloseIcon,
  FlashMessageBody,
  FlashMessageIcon,
  FlashMessageText,
  FlashMessageTitle,
  FlasheMessageContainr,
} from "./flash-message.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { hideFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const FlashMessage = () => {
  const dispatcher = useAppDispatch();
  const flashMessage = useAppSelector((state) => state.flashMessage);
  if (!flashMessage.status) return;
  return (
    <FlasheMessageContainr
      style={{
        borderColor: flashMessage.type === "success" ? "#04b97f" : "#f9ba46",
        backgroundColor:
          flashMessage.type === "success"
            ? addOpacityToColor(0.1, "#04b97f")
            : addOpacityToColor(0.2, "#a55e25"),
      }}
    >
      <FlashMessageIcon>
        {flashMessage.type === "success" ? (
          <FaCheckCircle
            style={{
              color: "#04b97f",
            }}
          />
        ) : (
          <IoIosWarning
            style={{
              color: "#f9ba46",
            }}
          />
        )}
      </FlashMessageIcon>
      <FlashMessageBody>
        <FlashMessageTitle>{flashMessage.title}</FlashMessageTitle>
        <FlashMessageText> {flashMessage.desc} </FlashMessageText>
      </FlashMessageBody>
      <CloseIcon
        onClick={() => {
          dispatcher(hideFlashMessage());
        }}
      />
    </FlasheMessageContainr>
  );
};
