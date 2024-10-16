/* eslint-disable react-hooks/rules-of-hooks */
import {
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
          className="flex items-center p-4 max-w-sm w-full bg-white shadow-lg rounded-lg border-l-4 border-green-500"
        >
          <FlashMessageIcon className="inline-flex items-center justify-center h-10 w-10 text-green-500 bg-green-100 rounded-full">
            {flashMessage.type === "success" ? (
              <FaCheckCircle
                style={{
                  color: "#00af78",
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
            <FlashMessageTitle
              style={{
                color: flashMessage.type === "success" ? "#00af78" : "#f9ba46",
              }}
              className="font-semibold text-gray-800"
            >
              {flashMessage.title}
            </FlashMessageTitle>
            <FlashMessageText className="text-sm text-gray-600">
              {flashMessage.desc}
            </FlashMessageText>
          </FlashMessageBody>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatcher(hideFlashMessage(flashMessage));
            }}
            className="ml-auto text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </FlashMessageItem>
      ))}
    </FlasheMessageContainer>
  );
};
