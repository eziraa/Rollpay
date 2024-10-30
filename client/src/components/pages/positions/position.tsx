/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
  PositionListBody,
  PositionListHeader,
  Title,
} from "./position.style";
import {
  closePositionRequested,
  deletePositionRequested,
  listPositionsRequested,
  openPositionRequested,
} from "../../../store/position/position-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { ThreeDots } from "../../utils/loading/dots";
import { usePosition } from "../../../hooks/position-hook";
import { NoResult } from "../../utils/no-result/no-result";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { IoAddOutline } from "react-icons/io5";

import { AddButton } from "../../sections/employee-allowance/allowance.style";
import DeleteConfirmationModal from "../admin/utils/model/ConfirmitionModal";
import { CustomTable } from "../../sections/employee-overtime/table";

export const PositionPage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { task_error, task_finished, positions, curr_position } = usePosition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState("");

  const handleDelete = () => {
    setAction(DELETE);
    dispatcher(deletePositionRequested(selected));
    handleClose();
  };

  const handleClose = () => {
    setAction("");
    setShowDeleteModal(false);
  };
  const DELETE = "delete";
  const CLOSE = "close";
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listPositionsRequested());
  }, [curr_position]);
  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Postions</Title>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-position");
            dispatcher(listPositionsRequested());
          }}
        >
          <IoAddOutline /> New
        </AddButton>
      </PositionListHeader>
      {showDeleteModal && (
        <DeleteConfirmationModal
          handleClose={handleClose}
          action={handleDelete}
        />
      )}
      <PositionListBody>
        <Outlet />
        {!employee.task_finished ? (
          <ThreeDots size={2} />
        ) : positions.length === 0 ? (
          <div>
            <NoResult text="Not Positions found" />
          </div>
        ) : (
          <>
            <CustomTable
              className="shadow-lg px-3 py-4"
              gridCols="2fr 1fr 1fr 1fr 1fr 2fr"
            >
              <thead>
                <tr>
                  <th>Position Name</th>
                  <th>Initial Salary</th>
                  <th>Date of Start</th>
                  <th>Status</th>
                  <th>Date of End</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position, index) => {
                  return (
                    <tr className="px-4 " key={index}>
                      <td>{position.position_name}</td>
                      <td>{position.basic_salary}</td>
                      <td>{position.start_date?.split("T")[0]} </td>
                      <td>
                        {position.end_date ? (
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
                            Open
                          </span>
                        )}
                      </td>
                      <td>
                        {position.end_date ? (
                          position.end_date.split("T")[0]
                        ) : (
                          <i>Not Endded</i>
                        )}
                      </td>
                      <td>
                        <ActionBtnsContainer>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigate(`edit-position/${position.id}`);
                              dispatcher(listPositionsRequested());
                            }}
                            className="text-green-500 rounded-md font-semibold tracking-wider uppercase  border bg-green-50/50 py-1 px-3 border-green-400 hover:bg-green-500 hover:text-white"
                          >
                            edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setAction(CLOSE);
                              position.end_date
                                ? dispatcher(openPositionRequested(position.id))
                                : dispatcher(
                                    closePositionRequested(position.id)
                                  );
                            }}
                            className="text-green-500 rounded-md font-semibold tracking-wider uppercase  border bg-green-50/50 py-1 px-3 border-green-400 hover:bg-green-500 hover:text-white"
                          >
                            {action === CLOSE &&
                            !task_error &&
                            !task_finished ? (
                              <SmallSpinner />
                            ) : position.end_date ? (
                              <>open</>
                            ) : (
                              <>close</>
                            )}
                          </button>

                          {
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowDeleteModal(true);
                                setSelected(position.id);
                              }}
                              className="text-red-500 rounded-md font-semibold tracking-wider uppercase  border bg-red-50/50 py-1 px-3 border-red-400 hover:bg-red-500 hover:text-white"
                            >
                              DELETE
                            </button>
                          }
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
