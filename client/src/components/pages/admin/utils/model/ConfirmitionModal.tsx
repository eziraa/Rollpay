import useOutsideClick from "../../../../../hooks/useOutsideClick";

const DeleteConfirmationModal = ({
  handleClose,
  action,
}: {
  handleClose: () => void;
  action: () => void;
}) => {
  const { ref } = useOutsideClick({ close: handleClose });
  return (
    <>
      {
        <div
          className="fixed inset-0 backdrop-blur-sm flex justify-center items-center "
          style={{
            zIndex: 1000,
          }}
        >
          <div
            ref={ref}
            className="bg-white rounded-lg p-10 relative shadow-2xl  w-full max-w-md"
          >
            {/* Modal Header */}
            <div className="flex justify-between  items-center mb-4">
              <h3 className="text-xl font-semibold text-slate-600">
                Confirm Deletion
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-500 absolute top-6 right-7 text-2xl hover:text-gray-800 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => action()}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default DeleteConfirmationModal;
