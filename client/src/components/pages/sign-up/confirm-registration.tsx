/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Loader from "./loader"; // Adjust the import based on your project structure
import api from "../../../config/api";
import { useAppDispatch } from "../../../utils/custom-hook";
import { reset } from "../../../store/user/user-slice";
import { useNavigate } from "react-router-dom";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const ConfirmRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    error: "",
    resend: false,
    exist: false,
    message: "",
  });
  const [color, setColor] = useState("");
  const handleResponse = (data: {
    error?: string;
    resend?: boolean;
    exist?: boolean;
    message?: string;
  }) => {
    setColor(data?.message ? "green" : "red");
    setResponse((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const dispatcher = useAppDispatch();
  const pathname = window.location.pathname;
  const [uidb64, token] = pathname.split("/").slice(-2);
  const navigate = useNavigate();
  const confirmRegistration = async () => {
    if (pathname.includes("confirm-registration")) {
      if (uidb64 && token) {
        setIsLoading(true);
        await api
          .post("/user/confirm-registration/" + uidb64 + "/" + token)
          .then(() => {
            navigate("/login");
          })
          .catch((err) => {
            const { response } = err;
            if (response?.data) {
              handleResponse({
                ...response?.data,
                message: "",
              });
            } else {
              handleResponse({
                error: "An error occurred while confirming the registration.",
                message: "",
              });
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        window.location.href = "404";
      }
    }
  };

  const handleResend = async () => {
    if (uidb64) {
      setIsLoading(true);
      await api
        .post("/user/resend-confirm/" + uidb64)
        .then(() => {
          handleResponse({
            error: "",
            resend: false,
            exist: false,
            message: "We sent email,please check and confirm.",
          });
          dispatcher(reset());
        })
        .catch((err) => {
          const { response } = err;
          if (response?.data) {
            handleResponse({
              ...response?.data,
              message: "",
            });
          } else {
            handleResponse({
              error: "An error occurred please check your confirmition link",
              message: "",
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  useEffect(() => {
    confirmRegistration();
  }, []);

  useEffect(() => {});
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      {response && (
        <div className="bg-white p-10  min-w-80 h-72 flex justify-center items-center rounded-lg shadow-lg text-center">
          <div className=" flex-col items-center justify-around space-y-4">
            <h1
              className={`text-2xl font-bold bg-${color}-100 text-${color}-600 p-2 w-full rounded-md mb-4`}
            >
              <FaQuoteLeft className={`mr-2 mb-1 text-${color}-500`} />
              {response.error}
              {response.message}
              <FaQuoteRight className={`ml-2 mr-2 mb-1 text-${color}-500`} />
            </h1>
            {response.resend && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleResend();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Resend link
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmRegistration;
