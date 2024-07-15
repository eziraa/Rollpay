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
import { useAppDispatch } from "../../../utils/custom-hook";
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
  //Defing hokks and getting necessary informations
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { overtimes, loading, deleting } = useOvertime();

  // Defining state to set the current overtime responsible to action
  const [actionId, setActionId] = useState("-1");
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    dispatcher(listOvertimesRequested());
  }, []);

  useEffect(() => {
    !deleting && setActionId("-1");
    !deleting && setIsDeleting(false);
  }, [deleting]);
  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Overtime</Title>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-overtime");
          }}
        >
          <IoAddOutline /> Add New
        </AddButton>
      </PositionListHeader>
      <PositionListBody>
        <Outlet />
        {loading ? (
          <ThreeDots size={1} />
        ) : overtimes.length === 0 ? (
          <div>
            <NoResult text="No overtimes found" />
          </div>
        ) : (
          <CustomTable>
            <thead>
              <tr>
                <Caption>List of Overtimes</Caption>
              </tr>
              <TableHeader>
                <HeaderTitle>Overtime Name</HeaderTitle>
                <HeaderTitle>Overtime Rate</HeaderTitle>

                <HeaderTitle>Actions</HeaderTitle>
              </TableHeader>
            </thead>
            <TableBody>
              {overtimes.map((overtime, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{overtime.overtime_type}</TableData>
                    <TableData>{overtime.overtime_rate}</TableData>

                    <TableData>
                      <ActionBtnsContainer>
                        <EditButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActionId(overtime.id);
                            navigate(`edit-overtime/${overtime.id}`);
                          }}
                        >
                          <MdOutlineEdit />
                        </EditButton>
                        <DeleteButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActionId(overtime.id);
                            setIsDeleting(true);
                            dispatcher(deleteOvertimeRequested(overtime.id));
                          }}
                        >
                          {actionId === overtime.id &&
                          isDeleting &&
                          !deleting ? (
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
