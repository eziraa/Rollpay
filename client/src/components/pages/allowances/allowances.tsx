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
import { MdOutlineClose, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAllowance } from "../../../hooks/allowance-hook";
import {
  closeAllowanceRequested,
  deleteAllowanceRequested,
  listAllowancesRequested,
  openAllowanceRequested,
} from "../../../store/allowance/allowance-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { IoAddOutline, IoOpenOutline } from "react-icons/io5";

/**
 * This is a page to show list allowances
 *
 * @return {Component}
 */
export const AllowancePage = () => {
  /**
   * Calling hooks ang getting nucessary data redux store and context api
   */
  const dispatcher = useAppDispatch();
  const { allowances, editing, loading, deleting } = useAllowance();
  const DELETE = "delete";
  const CLOSE = "close";
  const navigate = useNavigate();

  /**
   * Defining state to set the action type and the allowance id responed to the currntt action
   */
  const [action, setAction] = useState("");
  const [actionId, setActionId] = useState("-1");
  /**
   * Defining useEffect to get allowance list
   */
  useEffect(() => {
    dispatcher(listAllowancesRequested());
  }, [dispatcher]);

  /**
   * Defining useEffect to to reset local states adter action finished
   *
   * */

  useEffect(() => {
    !editing && !deleting && setAction("");
    !editing && !deleting && setActionId("-1");
  }, [editing, deleting]);

  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Allowance</Title>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-allowance");
          }}
        >
          <IoAddOutline /> Add New
        </AddButton>
      </PositionListHeader>
      <PositionListBody>
        <Outlet />
        {loading ? (
          <ThreeDots size={1} />
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
                        }}
                      >
                        <MdOutlineEdit />
                      </EditButton>
                      <SuspendButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAction(CLOSE);
                          setActionId(allowance.id);
                          allowance.end_at
                            ? dispatcher(openAllowanceRequested(allowance.id))
                            : dispatcher(closeAllowanceRequested(allowance.id));
                        }}
                      >
                        {action === CLOSE &&
                        !editing &&
                        actionId === allowance.id ? (
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
                          setActionId(allowance.id);
                          dispatcher(deleteAllowanceRequested(allowance.id));
                        }}
                      >
                        {action === DELETE &&
                        allowance.id === actionId &&
                        deleting ? (
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
