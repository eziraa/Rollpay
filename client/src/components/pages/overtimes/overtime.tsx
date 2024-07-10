/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
  AddButton,
  DeleteButton,
  EditButton,
  PositionListBody,
  PositionListHeader,
  Title,
} from "../positions/position.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { ThreeDots } from "../../utils/loading/dots";
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
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useOvertime } from "../../../hooks/overtime-hook";
import {
  deleteOvertimeRequested,
  listOvertimesRequested,
} from "../../../store/overtime/overtime-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { IoAddOutline } from "react-icons/io5";
export const OvertimePage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { task_error, task_finished, overtimes } = useOvertime();
  const DELETE = "delete";
  const [action, setAction] = useState("");
  useEffect(() => {
    dispatcher(listOvertimesRequested());
  }, []);
  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Overtime</Title>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-overtime");
            dispatcher(listOvertimesRequested());
          }}
        >
          <IoAddOutline /> Add New
        </AddButton>
      </PositionListHeader>
      <PositionListBody>
        <Outlet />
        {!employee.task_finished ? (
          <ThreeDots size={2} />
        ) : overtimes.length === 0 ? (
          <div>
            <NoResult text="No overtimes found" />
          </div>
        ) : (
          <CustomTable>
            <Caption>List of Overtimes</Caption>
            <TableHeader>
              <HeaderTitle>Overtime Name</HeaderTitle>
              <HeaderTitle>Overtime Rate</HeaderTitle>

              <HeaderTitle>Actions</HeaderTitle>
            </TableHeader>
            <TableBody>
              {overtimes.map((overtime, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{overtime.overtime_type}</TableData>
                    <TableData>{overtime.overtime_rate}</TableData>

                    <ActionBtnsContainer>
                      <EditButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`edit-overtime/${overtime.id}`);
                          dispatcher(listOvertimesRequested());
                        }}
                      >
                        <MdOutlineEdit />
                      </EditButton>
                      <DeleteButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAction(DELETE);
                          dispatcher(deleteOvertimeRequested(overtime.id));
                        }}
                      >
                        {action === DELETE && !task_error && !task_finished ? (
                          <SmallSpinner />
                        ) : (
                          <>
                            <RiDeleteBin6Line />
                          </>
                        )}
                      </DeleteButton>
                    </ActionBtnsContainer>
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
