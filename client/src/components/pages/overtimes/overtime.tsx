/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
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
import { Caption } from "../../utils/custom-table/custom-table";
import { useOvertime } from "../../../hooks/overtime-hook";
import {
  deleteOvertimeRequested,
  listOvertimesRequested,
} from "../../../store/overtime/overtime-slice";
import { IoAddOutline } from "react-icons/io5";
import { AddButton } from "../../sections/employee-allowance/allowance.style";
import DeleteConfirmationModal from "../admin/utils/model/ConfirmitionModal";
import { CustomTable } from "../../sections/employee-overtime/table";
export const OvertimePage = () => {
  //Defing hokks and getting necessary informations
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { overtimes, loading, deleting } = useOvertime();

  // Defining state to set the current overtime responsible to action
  const [actionId, setActionId] = useState("-1");
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
    setActionId("-1");
  };

  const handleDelete = () => {
    dispatcher(deleteOvertimeRequested(actionId));
    closeModal();
  };

  useEffect(() => {
    dispatcher(listOvertimesRequested());
  }, []);

  useEffect(() => {
    !deleting && setActionId("-1");
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
      {openModal && (
        <DeleteConfirmationModal
          handleClose={closeModal}
          action={handleDelete}
        />
      )}
      <PositionListBody>
        <Outlet />
        {loading ? (
          <ThreeDots size={1} />
        ) : overtimes.length === 0 ? (
          <div>
            <NoResult text="No overtimes found" />
          </div>
        ) : (
          <>
            <Caption>List of Overtimes</Caption>
            <CustomTable className="shadow-lg" gridCols="1fr 1fr 1fr">
              <thead>
                <tr>
                  <th>Overtime Name</th>
                  <th>Overtime Rate</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {overtimes.map((overtime, index) => {
                  return (
                    <tr key={index}>
                      <td>{overtime.overtime_type}</td>
                      <td>{overtime.overtime_rate}</td>

                      <td>
                        <ActionBtnsContainer>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActionId(overtime.id);
                              navigate(`edit-overtime/${overtime.id}`);
                            }}
                            className="text-green-500 rounded-md font-semibold tracking-wider uppercase  border bg-green-50/50 py-1  px-3 border-green-400 hover:bg-green-500 hover:text-white"
                          >
                            edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActionId(overtime.id);
                              setOpenModal(true);
                            }}
                            className="text-red-500 rounded-md font-semibold tracking-wider uppercase  border bg-red-50/50 py-1  px-3 border-red-400 hover:bg-red-500 hover:text-white"
                          >
                            <>delete</>
                          </button>
                        </ActionBtnsContainer>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </CustomTable>
          </>
        )}
      </PositionListBody>
    </MainContainer>
  );
};
