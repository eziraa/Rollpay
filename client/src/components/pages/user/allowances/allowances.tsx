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
} from "../../positions/position.style";
import { useAppDispatch, useAppSelector } from "../../../../utils/custom-hook";
import { MainContainer } from "../../../utils/pages-utils/containers.style";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { ThreeDots } from "../../../utils/loading/dots";
import { NoResult } from "../../../utils/no-result/no-result";
import {
  Caption,
  CustomTable,
  HeaderTitle,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from "../../../utils/custom-table/custom-table";
import { MdOutlineClose, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAllowance } from "../../../../hooks/allowance-hook";
import {
  closeAllowanceRequested,
  deleteAllowanceRequested,
  listAllowancesRequested,
  openAllowanceRequested,
} from "../../../../store/allowance/allowance-slice";
import { SmallSpinner } from "../../../utils/spinner/spinner";
import { IoAddOutline, IoOpenOutline } from "react-icons/io5";

export const AllowancePage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { task_error, task_finished, allowances, curr_allowance } =
    useAllowance();
  const DELETE = "delete";
  const CLOSE = "close";
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listAllowancesRequested());
  }, [curr_allowance]);
  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Allowance</Title>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-allowance");
            dispatcher(listAllowancesRequested());
          }}
        >
          <IoAddOutline /> Add New
        </AddButton>
      </PositionListHeader>
      <PositionListBody>
        <Outlet />
        {!employee.task_finished ? (
          <ThreeDots size={2} />
        ) : allowances.length === 0 ? (
          <div>
            <NoResult text="No allowances found" />
          </div>
        ) : (
          <CustomTable>
            <Caption>List of Allowances</Caption>
            <TableHeader>
              <HeaderTitle>Allowance Name</HeaderTitle>
              <HeaderTitle>Allowance Rate</HeaderTitle>
              <HeaderTitle>Date of Start</HeaderTitle>
              <HeaderTitle>Status</HeaderTitle>

              <HeaderTitle>Date of End</HeaderTitle>
              <HeaderTitle>Actions</HeaderTitle>
            </TableHeader>
            <TableBody>
              {allowances.map((allowance, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{allowance.allowance_type}</TableData>
                    <TableData>{allowance.allowance_rate}</TableData>
                    <TableData>{allowance.start_at?.split("T")[0]}</TableData>
                    <TableData>
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
                    </TableData>
                    {allowance.end_at ? (
                      <TableData>{allowance.end_at}</TableData>
                    ) : (
                      <TableData>Not ended</TableData>
                    )}

                    <ActionBtnsContainer>
                      <EditButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`edit-allowance/${allowance.id}`);
                          dispatcher(listAllowancesRequested());
                        }}
                      >
                        <MdOutlineEdit />
                      </EditButton>
                      <SuspendButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAction(CLOSE);
                          allowance.end_at
                            ? dispatcher(openAllowanceRequested(allowance.id))
                            : dispatcher(closeAllowanceRequested(allowance.id));
                        }}
                      >
                        {action === CLOSE && !task_error && !task_finished ? (
                          <SmallSpinner />
                        ) : allowance.end_at ? (
                          <>
                            <IoOpenOutline />
                          </>
                        ) : (
                          <>
                            <MdOutlineClose />
                          </>
                        )}
                      </SuspendButton>
                      <DeleteButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAction(DELETE);
                          dispatcher(deleteAllowanceRequested(allowance.id));
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
