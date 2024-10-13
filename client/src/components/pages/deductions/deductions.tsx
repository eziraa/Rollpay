/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
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
import { useDeduction } from "../../../hooks/deduction-hook";
import {
  closeDeductionRequested,
  deleteDeductionRequested,
  listDeductionsRequested,
  openDeductionRequested,
} from "../../../store/deduction/deduction-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { IoAddOutline, IoOpenOutline } from "react-icons/io5";
import { AddButton } from "../../sections/employee-allowance/allowance.style";
import DeleteConfirmationModal from "../admin/utils/model/ConfirmitionModal";
export const DeductionPage = () => {
  const dispatcher = useAppDispatch();
  const { task_error, deductions, editing, deleting, loading, curr_deduction } =
    useDeduction();
  const DELETE = "delete";
  const CLOSE = "close";
  const EDIT = "edit";

  const [action, setAction] = useState("");
  const [actionId, setActionId] = useState("-1");
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
    setAction("");
    setActionId("-1");
  };

  const handleDelete = () => {
    dispatcher(deleteDeductionRequested(actionId));
    closeModal();
  };

  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listDeductionsRequested());
  }, [curr_deduction]);

  useEffect(() => {
    !deleting && !editing && setAction("");
    !deleting && !editing && setActionId("-1");
  }, [deleting, editing]);
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
      {openModal && (
        <DeleteConfirmationModal
          handleClose={closeModal}
          action={handleDelete}
        />
      )}
      <PositionListBody>
        <Outlet />
        {loading ? (
          <ThreeDots size={2} />
        ) : deductions.length === 0 ? (
          <div>
            <NoResult text="No deductions found" />
          </div>
        ) : (
          <CustomTable className="shadow-lg">
            <thead>
              <tr>
                <Caption>List of Deductions</Caption>
              </tr>
              <TableHeader>
                <HeaderTitle>Deduction Name</HeaderTitle>
                <HeaderTitle>Deduction Rate</HeaderTitle>
                <HeaderTitle>Date of Start</HeaderTitle>
                <HeaderTitle>Status</HeaderTitle>

                <HeaderTitle>Date of End</HeaderTitle>
                <HeaderTitle>Actions</HeaderTitle>
              </TableHeader>
            </thead>
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
                      <TableData>{deduction.end_at.split("T")[0]}</TableData>
                    ) : (
                      <TableData>Not ended</TableData>
                    )}

                    <TableData>
                      <ActionBtnsContainer>
                        <EditButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setAction(EDIT);
                            navigate(`edit-deduction/${deduction.id}`);
                          }}
                        >
                          <MdOutlineEdit />
                        </EditButton>
                        <SuspendButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setAction(CLOSE);
                            setActionId(deduction.id);
                            deduction.end_at
                              ? dispatcher(openDeductionRequested(deduction.id))
                              : dispatcher(
                                  closeDeductionRequested(deduction.id)
                                );
                          }}
                        >
                          {action === CLOSE && actionId == deduction.id ? (
                            <SmallSpinner />
                          ) : deduction.end_at ? (
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
                            setActionId(deduction.id);
                            setOpenModal(true);
                          }}
                        >
                          {action === DELETE &&
                          deduction.id === actionId &&
                          !task_error ? (
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
