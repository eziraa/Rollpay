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
import { useEffect } from "react";
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
import { useAllowance } from "../../../hooks/allowance-hook";
import { listAllowancesRequested } from "../../../store/allowance/allowance-slice";
export const AllowancePage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const allowance = useAllowance();
  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listAllowancesRequested());
  }, []);
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
          Add Allowance
        </AddButton>
      </PositionListHeader>
      <PositionListBody>
        <Outlet />
        {!employee.task_finished ? (
          <ThreeDots size={2} />
        ) : allowance.allowances.length === 0 ? (
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
              <HeaderTitle>Date of End</HeaderTitle>
              <HeaderTitle>Actions</HeaderTitle>
            </TableHeader>
            <TableBody>
              {allowance.allowances.map((allowance, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{allowance.allowance_type}</TableData>
                    <TableData>{allowance.allowance_rate}</TableData>
                    <TableData>{allowance.date_of_start?.split('T')[0]}</TableData>
                    {allowance.date_of_end ? (
                      <TableData>{allowance.date_of_end}</TableData>
                    ) : (
                      <TableData>Not ended</TableData>
                    )}

                    <ActionBtnsContainer>
                      <EditButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/edit-allowance/${allowance.id}`);
                          dispatcher(listAllowancesRequested());
                        }}
                      >
                        <MdOutlineEdit />
                        Edit
                      </EditButton>
                      <DeleteButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // position.deletePosition(position.id);
                          dispatcher(listAllowancesRequested());
                        }}
                      >
                        <RiDeleteBin6Line />
                        Delete
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
