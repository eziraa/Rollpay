/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
  DeleteButton,
  EditButton,
  PositionListBody,
  PositionListHeader,
  SuspendButton,
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
import {
  Caption,
  CustomTable,
  HeaderTitle,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { MdOutlineEdit } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { BsLock } from "react-icons/bs";
import { BsUnlock } from "react-icons/bs";

import { AddButton } from "../../sections/employee-allowance/allowance.style";
import DeleteConfirmationModal from "../admin/utils/model/ConfirmitionModal";

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
          <CustomTable className="shadow-lg px-3 py-4">
            <thead>
              <tr>
                <Caption>List of Positions</Caption>
              </tr>
              <TableHeader>
                <HeaderTitle>Position Name</HeaderTitle>
                <HeaderTitle>Initial Salary</HeaderTitle>
                <HeaderTitle>Date of Start</HeaderTitle>
                <HeaderTitle>Status</HeaderTitle>
                <HeaderTitle>Date of End</HeaderTitle>
                <HeaderTitle>Actions</HeaderTitle>
              </TableHeader>
            </thead>
            <TableBody>
              {positions.map((position, index) => {
                return (
                  <TableRow className="px-4 " key={index}>
                    <TableData>{position.position_name}</TableData>
                    <TableData>{position.basic_salary}</TableData>
                    <TableData>{position.start_date?.split("T")[0]} </TableData>
                    <TableData>
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
                    </TableData>
                    <TableData>
                      {position.end_date ? (
                        position.end_date.split("T")[0]
                      ) : (
                        <i>Not Endded</i>
                      )}
                    </TableData>
                    <TableData>
                      <ActionBtnsContainer>
                        <EditButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate(`edit-position/${position.id}`);
                            dispatcher(listPositionsRequested());
                          }}
                        >
                          <MdOutlineEdit />
                        </EditButton>
                        <SuspendButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setAction(CLOSE);
                            position.end_date
                              ? dispatcher(openPositionRequested(position.id))
                              : dispatcher(closePositionRequested(position.id));
                          }}
                        >
                          {action === CLOSE && !task_error && !task_finished ? (
                            <SmallSpinner />
                          ) : position.end_date ? (
                            <>
                              <BsLock />
                            </>
                          ) : (
                            <>
                              <BsUnlock />
                            </>
                          )}
                        </SuspendButton>
                        <DeleteButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowDeleteModal(true);
                            setSelected(position.id);
                          }}
                        >
                          {action === DELETE &&
                          !task_error &&
                          !task_finished ? (
                            <SmallSpinner />
                          ) : (
                            <>
                              <RiDeleteBin6Line />
                            </>
                          )}
                        </DeleteButton>
                      </ActionBtnsContainer>
                    </TableData>
                  </TableRow>
                );
              })}
            </TableBody>
          </CustomTable>
        )}
      </PositionListBody>
    </MainContainer>
  );
};
