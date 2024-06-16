/* eslint-disable react-hooks/rules-of-hooks */
import {
  CloseIcon,
  FlashMessageBody,
  FlashMessageIcon,
  FlashMessageText,
  FlashMessageTitle,
  FlashMessageItem,
  FlasheMessageContainer,
} from "./flash-message.style";
import { hideFlashMessage } from "../../../store/notification/flash-messsage-slice";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import { FlashMessageItem as FlashMsg } from "../../../store/notification/flash-messsage-slice";
export const FlashMessage = () => {
  const { flashMessages } = useAppSelector((state) => state.flashMessage);
  const dispatcher = useAppDispatch();
  if (flashMessages.length < 1) return;
  return (
    <FlasheMessageContainer>
      {flashMessages.map((flashMessage: FlashMsg, index: number) => (
        <FlashMessageItem
          key={index}
          style={{
            borderColor:
              flashMessage.type === "success" ? "#04b97f" : "#f9ba46",
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
            <FlashMessageText>{flashMessage.desc}</FlashMessageText>
          </FlashMessageBody>
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation();
              dispatcher(hideFlashMessage(flashMessage));
            }}
          />
        </FlashMessageItem>
      ))}
    </FlasheMessageContainer>
  );
};
