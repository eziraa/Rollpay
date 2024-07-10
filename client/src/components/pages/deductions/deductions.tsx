/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
  AddButton,
  DeleteButton,
  EditButton,
  PositionListBody,
  PositionListHeader,
  SuspendButton,
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
  closeDeductionRequested,
  deleteDeductionRequested,
  listDeductionsRequested,
  openDeductionRequested,
} from "../../../store/deduction/deduction-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { IoAddOutline } from "react-icons/io5";
import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";
export const DeductionPage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { task_error, task_finished, deductions, curr_deduction } =
    useDeduction();
  const DELETE = "delete";
  const CLOSE = "close";

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
              <HeaderTitle>Status</HeaderTitle>

              <HeaderTitle>Date of End</HeaderTitle>
              <HeaderTitle>Actions</HeaderTitle>
            </TableHeader>
            <TableBody>
              {deductions.map((deduction, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{deduction.deduction_type}</TableData>
                    <TableData>{deduction.deduction_rate}</TableData>
                    <TableData>{deduction.start_at?.split("T")[0]}</TableData>
                    <TableData>
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
                    </TableData>
                    {deduction.end_at ? (
                      <TableData>{deduction.end_at}</TableData>
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
                      <SuspendButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAction(CLOSE);
                          deduction.end_at
                            ? dispatcher(openDeductionRequested(deduction.id))
                            : dispatcher(closeDeductionRequested(deduction.id));
                        }}
                      >
                        {action === CLOSE && !task_error && !task_finished ? (
                          <SmallSpinner />
                        ) : deduction.end_at ? (
                          <>
                            <VscDebugStart />
                          </>
                        ) : (
                          <>
                            <CiPause1 />
                          </>
                        )}
                      </SuspendButton>
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
