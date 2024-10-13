import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  AddButton,
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "../employee-allowance/allowance.style";
import {
  ActionBtnsContainer,
  DeleteButton,
} from "../../pages/positions/position.style";
import { ThreeDots } from "../../utils/loading/dots";
import {
  CustomTable,
  HeaderTitle,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
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
    <AllowanceContainer>
      <AllowanceHeader>
        <Outlet />
        <AllowanceTitle>Employee Asset</AllowanceTitle>
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
      </AllowanceHeader>
      {openModel && (
        <DeleteConfirmationModal
          handleClose={handleClose}
          action={handleDelete}
        />
      )}
      <AllowanceBody>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : assets.length === 0 ? (
          <div>
            <NoResult>No assets found</NoResult>
          </div>
        ) : (
          <CustomTable className="shadow-md">
            <thead>
              <TableHeader>
                <HeaderTitle>Asset name</HeaderTitle>

                <HeaderTitle>Action</HeaderTitle>
              </TableHeader>
            </thead>
            <TableBody>
              {assets.map((asset, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{asset.asset_name}</TableData>
                    <TableData>
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
                    </TableData>
                  </TableRow>
                );
              })}
            </TableBody>
          </CustomTable>
        )}
      </AllowanceBody>
    </AllowanceContainer>
  );
};
