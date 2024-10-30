import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  AddButton,
  Body,
  Container,
  Header,
  Title,
} from "../employee-allowance/allowance.style";
import {
  ActionBtnsContainer,
  DeleteButton,
} from "../../pages/positions/position.style";
import { ThreeDots } from "../../utils/loading/dots";
import { useEffect, useState } from "react";
import {
  deleteAssetRequested,
  listAssetsRequested,
} from "../../../store/asset/asset-slice";
import { useAsset } from "../../../hooks/asset-hook";

import { RiDeleteBin6Line } from "react-icons/ri";
import { NoResult } from "../../utils/containers/containers.style";
import DownloadPDF from "../../utils/download/download";
import { IoAddOutline } from "react-icons/io5";
import { useAuth } from "../../../hooks/auth-hook";
import DeleteConfirmationModal from "../../pages/admin/utils/model/ConfirmitionModal";
import { CustomTable } from "../employee-overtime/table";

export const EmployeeAsset = () => {
  const navigate = useNavigate();
  const { curr_user: user } = useAuth();
  const { employee_id } = useParams();
  const dispatcher = useAppDispatch();
  const { task_finished, assets } = useAsset();
  const [deleteAsset, setDeleteAsset] = useState("");
  const [openModel, setOpenModal] = useState(false);
  const handleDelete = () => {
    if (deleteAsset) {
      dispatcher(deleteAssetRequested(deleteAsset));
      setOpenModal(false);
    }
  };
  const handleClose = () => {
    setDeleteAsset("");
    setOpenModal(false);
  };
  useEffect(() => {
    if (employee_id) dispatcher(listAssetsRequested(employee_id));
  }, [dispatcher, employee_id]);

  return (
    <Container>
      <Header>
        <Outlet />
        <Title>Employee Asset</Title>
        {user?.role === "Clerk" && (
          <AddButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate("add-asset");
              if (employee_id) dispatcher(listAssetsRequested(employee_id));
            }}
          >
            <IoAddOutline /> New
          </AddButton>
        )}
      </Header>
      {openModel && (
        <DeleteConfirmationModal
          handleClose={handleClose}
          action={handleDelete}
        />
      )}
      <Body>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : assets.length === 0 ? (
          <div>
            <NoResult>No assets found</NoResult>
          </div>
        ) : (
          <CustomTable className="shadow-md" gridCols="1fr 1fr">
            <thead>
              <tr>
                <th>Asset name</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => {
                return (
                  <tr key={index}>
                    <td>{asset.asset_name}</td>
                    <td>
                      <ActionBtnsContainer>
                        {user?.employee.position === "Clerk" && (
                          <DeleteButton
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setDeleteAsset(asset.id);
                              setOpenModal(true);
                            }}
                          >
                            <RiDeleteBin6Line />
                          </DeleteButton>
                        )}

                        <DownloadPDF
                          file_url={asset.asset_value}
                          file_name={asset.asset_name}
                        />
                      </ActionBtnsContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </CustomTable>
        )}
      </Body>
    </Container>
  );
};
