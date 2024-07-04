/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
  AddButton,
  DeleteButton,
  EditButton,
  PositionListBody,
  PositionListHeader,
  Title,
} from "./position.style";
import {
  deletePositionRequested,
  listPositionsRequested,
} from "../../../store/position/position-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import { useEffect } from "react";
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
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SmallSpinner } from "../../utils/spinner/spinner";
export const PositionPage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { task_error, task_finished, positions } = usePosition();
  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listPositionsRequested());
  }, []);
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
          Add Position
        </AddButton>
      </PositionListHeader>
      <PositionListBody>
        <Outlet />
        {!employee.task_finished ? (
          <ThreeDots size={2} />
        ) : positions.length === 0 ? (
          <div>
            <NoResult text="Not Positions found" />
          </div>
        ) : (
          <CustomTable>
            <Caption>List of Positions</Caption>
            <TableHeader>
              <HeaderTitle>Position Name</HeaderTitle>
              <HeaderTitle>Initial Salary</HeaderTitle>
              <HeaderTitle>Date of Start</HeaderTitle>
              <HeaderTitle>Actions</HeaderTitle>
            </TableHeader>
            <TableBody>
              {positions.map((position, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{position.position_name}</TableData>
                    <TableData>{position.basic_salary}</TableData>
                    <TableData>No Date</TableData>
                    <ActionBtnsContainer>
                      <EditButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/edit-position/${position.id}`);
                          dispatcher(listPositionsRequested());
                        }}
                      >
                        <MdOutlineEdit />
                        Edit
                      </EditButton>
                      <DeleteButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatcher(deletePositionRequested(position.id));
                        }}
                      >
                        {!task_error && !task_finished ? (
                          <SmallSpinner />
                        ) : (
                          <>
                            <RiDeleteBin6Line />
                            Delete
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
