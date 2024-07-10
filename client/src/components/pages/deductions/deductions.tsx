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
import { useDeduction } from "../../../hooks/deduction-hook";
import {
  deleteDeductionRequested,
  listDeductionsRequested,
} from "../../../store/deduction/deduction-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { IoAddOutline } from "react-icons/io5";
export const DeductionPage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { task_error, task_finished, deductions, curr_deduction } =
    useDeduction();
  const DELETE = "delete";
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listDeductionsRequested());
  }, [curr_deduction]);
  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Deduction</Title>
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
      <PositionListBody>
        <Outlet />
        {!employee.task_finished ? (
          <ThreeDots size={2} />
        ) : deductions.length === 0 ? (
          <div>
            <NoResult text="No deductions found" />
          </div>
        ) : (
          <CustomTable>
            <Caption>List of Deductions</Caption>
            <TableHeader>
              <HeaderTitle>Deduction Name</HeaderTitle>
              <HeaderTitle>Deduction Rate</HeaderTitle>
              <HeaderTitle>Date of Start</HeaderTitle>
              <HeaderTitle>Date of End</HeaderTitle>
              <HeaderTitle>Actions</HeaderTitle>
            </TableHeader>
            <TableBody>
              {deductions.map((deduction, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{deduction.deduction_type}</TableData>
                    <TableData>{deduction.deduction_rate}</TableData>
                    <TableData>
                      {deduction.date_of_start?.split("T")[0]}
                    </TableData>
                    {deduction.date_of_end ? (
                      <TableData>{deduction.date_of_end}</TableData>
                    ) : (
                      <TableData>Not ended</TableData>
                    )}

                    <ActionBtnsContainer>
                      <EditButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`edit-deduction/${deduction.id}`);
                          dispatcher(listDeductionsRequested());
                        }}
                      >
                        <MdOutlineEdit />
                      </EditButton>
                      <DeleteButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAction(DELETE);
                          dispatcher(deleteDeductionRequested(deduction.id));
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
