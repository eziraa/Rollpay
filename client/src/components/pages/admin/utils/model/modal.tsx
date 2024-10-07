import { ReactNode } from "react";

const CustomModal = ({
  handleClose,
  isOpen = false,
  children,
  noColor = true,
}: {
  handleClose: () => void;
  isOpen?: boolean;
  children: ReactNode;
  noColor: boolean;
}) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={handleClose}
          className={`fixed inset-0 ${
            noColor ? "" : "bg-black bg-opacity-50"
          } flex justify-center items-center `}
          style={{
            zIndex: 1000,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default CustomModal;
