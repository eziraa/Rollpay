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
import { Caption } from "../../utils/custom-table/custom-table";
import { useAllowance } from "../../../hooks/allowance-hook";
import {
  closeAllowanceRequested,
  deleteAllowanceRequested,
  listAllowancesRequested,
  openAllowanceRequested,
} from "../../../store/allowance/allowance-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { IoAddOutline } from "react-icons/io5";
import { AddButton } from "../../sections/employee-allowance/allowance.style";
import DeleteConfirmationModal from "../admin/utils/model/ConfirmitionModal";
import { CircularProgress } from "@mui/material";
import { CustomTable } from "../../sections/employee-overtime/table";

/**
 * This is a page to show list allowances
 *
 * @return {Component}
 */
export const AllowancePage = () => {
  /**
   * Calling hooks ang getting nucessary data redux store and context api
   */
  const dispatcher = useAppDispatch();
  const { allowances, editing, loading, deleting } = useAllowance();
  const DELETE = "delete";
  const CLOSE = "close";
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
    setAction("");
    setActionId("-1");
  };

  const handleDelete = () => {
    dispatcher(deleteAllowanceRequested(actionId));
    closeModal();
  };

  /**
   * Defining state to set the action type and the allowance id responed to the currntt action
   */
  const [action, setAction] = useState("");
  const [actionId, setActionId] = useState("-1");
  /**
   * Defining useEffect to get allowance list
   */
  useEffect(() => {
    dispatcher(listAllowancesRequested());
  }, [dispatcher]);

  /**
   * Defining useEffect to to reset local states adter action finished
   *
   * */

  useEffect(() => {
    !editing && !deleting && setAction("");
    !editing && !deleting && setActionId("-1");
  }, [editing, deleting]);

  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Allowance</Title>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-allowance");
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
        ) : allowances.length === 0 ? (
          <div>
            <NoResult text="No allowances found" />
          </div>
        ) : (
          <>
            <Caption>List of Allowances</Caption>
            <CustomTable
              className="shadow-lg"
              gridCols="1fr 1fr 1fr 0.5fr 1fr 2fr"
            >
              <thead>
                <tr>
                  <th>Allowance Name</th>
                  <th>Allowance Rate</th>
                  <th>Date of Start</th>
                  <th>Status</th>

                  <th>Date of End</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allowances.map((allowance, index) => {
                  return (
                    <tr key={index}>
                      <td>{allowance.allowance_type}</td>
                      <td>{allowance.allowance_rate}</td>
                      <td>{allowance.start_at?.split("T")[0]}</td>
                      <td>
                        {allowance.end_at ? (
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
                      {allowance.end_at ? (
                        <td>{allowance.end_at.split("T")[0]}</td>
                      ) : (
                        <td>Not ended</td>
                      )}

                      <td>
                        <ActionBtnsContainer>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigate(`edit-allowance/${allowance.id}`);
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
                              setActionId(allowance.id);
                              allowance.end_at
                                ? dispatcher(
                                    openAllowanceRequested(allowance.id)
                                  )
                                : dispatcher(
                                    closeAllowanceRequested(allowance.id)
                                  );
                            }}
                            className="text-green-500 rounded-md font-semibold tracking-wider uppercase  border bg-green-50/50  py-1 px-3 border-green-400 hover:bg-green-500 hover:text-white"
                          >
                            {action === CLOSE &&
                            !editing &&
                            actionId === allowance.id ? (
                              <CircularProgress size={16} />
                            ) : allowance.end_at ? (
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
                              setActionId(allowance.id);
                              setOpenModal(true);
                            }}
                            className="text-red-500 rounded-md font-semibold tracking-wider uppercase  border bg-red-50/50  py-1 px-3 border-red-400 hover:bg-red-500 hover:text-white"
                          >
                            {action === DELETE &&
                            allowance.id === actionId &&
                            deleting ? (
                              <SmallSpinner />
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
