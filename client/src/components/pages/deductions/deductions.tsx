/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
  PositionListBody,
  PositionListHeader,
  Title,
} from "../positions/position.style";
import { useAppDispatch } from "../../../utils/custom-hook";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { ThreeDots } from "../../utils/loading/dots";
import { NoResult } from "../../utils/no-result/no-result";
import { useDeduction } from "../../../hooks/deduction-hook";
import {
  closeDeductionRequested,
  deleteDeductionRequested,
  listDeductionsRequested,
  openDeductionRequested,
} from "../../../store/deduction/deduction-slice";
import { IoAddOutline } from "react-icons/io5";
import { AddButton } from "../../sections/employee-allowance/allowance.style";
import DeleteConfirmationModal from "../admin/utils/model/ConfirmitionModal";
import { CircularProgress } from "@mui/material";
import { CustomTable } from "../../sections/employee-overtime/table";
export const DeductionPage = () => {
  const dispatcher = useAppDispatch();
  const { task_error, deductions, editing, deleting, loading, curr_deduction } =
    useDeduction();
  const DELETE = "delete";
  const CLOSE = "close";
  const EDIT = "edit";

  const [action, setAction] = useState("");
  const [actionId, setActionId] = useState("-1");
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
    setAction("");
    setActionId("-1");
  };

  const handleDelete = () => {
    dispatcher(deleteDeductionRequested(actionId));
    closeModal();
  };

  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listDeductionsRequested());
  }, [curr_deduction]);

  useEffect(() => {
    !deleting && !editing && setAction("");
    !deleting && !editing && setActionId("-1");
  }, [deleting, editing]);
  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Deductions</Title>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-deduction");
            dispatcher(listDeductionsRequested());
          }}
        >
          <IoAddOutline /> Add New
        </AddButton>
      </PositionListHeader>
      {openModal && (
        <DeleteConfirmationModal
          handleClose={closeModal}
          action={handleDelete}
        />
      )}
      <PositionListBody>
        <Outlet />
        {loading ? (
          <ThreeDots size={1} />
        ) : deductions.length === 0 ? (
          <div>
            <NoResult text="No deductions found" />
          </div>
        ) : (
          <>
            <CustomTable
              className="shadow-lg"
              gridCols="1fr 1fr 1fr 0.5fr 1fr 2fr"
            >
              <thead>
                <tr className="drop-shadow-md shadow-zinc-400">
                  <th>Deduction Name</th>
                  <th>Deduction Rate</th>
                  <th>Date of Start</th>
                  <th>Status</th>

                  <th>Date of End</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deductions.map((deduction, index) => {
                  return (
                    <tr key={index}>
                      <td>{deduction.deduction_type}</td>
                      <td>{deduction.deduction_rate}</td>
                      <td>{deduction.start_at?.split("T")[0]}</td>
                      <td>
                        {deduction.end_at ? (
                          <span
                            style={{
                              color: "#f45",
                              fontStyle: "italic",
                            }}
                          >
                            Closed
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#04d574",
                              fontStyle: "italic",
                            }}
                          >
                            Active
                          </span>
                        )}{" "}
                      </td>
                      {deduction.end_at ? (
                        <td>{deduction.end_at.split("T")[0]}</td>
                      ) : (
                        <td>Not ended</td>
                      )}

                      <td>
                        <ActionBtnsContainer>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setAction(EDIT);
                              navigate(`edit-deduction/${deduction.id}`);
                            }}
                            className="text-green-500 rounded-md font-semibold tracking-wider uppercase  border bg-green-50/50  py-1 px-3 border-green-400 hover:bg-green-500 hover:text-white"
                          >
                            edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setAction(CLOSE);
                              setActionId(deduction.id);
                              deduction.end_at
                                ? dispatcher(
                                    openDeductionRequested(deduction.id)
                                  )
                                : dispatcher(
                                    closeDeductionRequested(deduction.id)
                                  );
                            }}
                            className="text-green-500 rounded-md font-semibold tracking-wider uppercase  border bg-green-50/50  py-1 px-3 border-green-400 hover:bg-green-500 hover:text-white"
                          >
                            {action === CLOSE && actionId == deduction.id ? (
                              <CircularProgress size={16} />
                            ) : deduction.end_at ? (
                              <>open</>
                            ) : (
                              <>close</>
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setAction(DELETE);
                              setActionId(deduction.id);
                              setOpenModal(true);
                            }}
                            className="text-red-500 rounded-md font-semibold tracking-wider uppercase  border bg-red-50/50  py-1 px-3 border-red-400 hover:bg-red-500 hover:text-white"
                          >
                            {action === DELETE &&
                            deduction.id === actionId &&
                            !task_error ? (
                              <CircularProgress />
                            ) : (
                              <>delete</>
                            )}
                          </button>
                        </ActionBtnsContainer>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </CustomTable>
          </>
        )}
      </PositionListBody>
    </MainContainer>
  );
};
