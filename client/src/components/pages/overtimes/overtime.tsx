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
import { useOvertime } from "../../../hooks/overtime-hook";
import { listOvertimesRequested } from "../../../store/overtime/overtime-slice";
  export const OvertimePage = () => {
    const employee = useAppSelector((state) => state.employee);
    const dispatcher = useAppDispatch();
    const overtime = useOvertime();
    const navigate = useNavigate();
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
            Add overtime
          </AddButton>
        </PositionListHeader>
        <PositionListBody>
          <Outlet />
          {!employee.task_finished ? (
            <ThreeDots size={2} />
          ) : overtime.overtimes.length === 0 ? (
            <div>
              <NoResult text="No overtimes found" />
            </div>
          ) : (
            <CustomTable>
              <thead>
                <tr>
                  <Caption>List of Overtimes</Caption>
                </tr>
              </thead>
              <TableHeader>
                <HeaderTitle>Overtime Name</HeaderTitle>
                <HeaderTitle>Overtime Rate</HeaderTitle>

                <HeaderTitle>Actions</HeaderTitle>
              </TableHeader>
              <TableBody>
                {overtime.overtimes.map((overtime, index) => {
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
                          Edit
                        </EditButton>
                        <DeleteButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // position.deletePosition(position.id);
                            dispatcher(listOvertimesRequested());
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
  