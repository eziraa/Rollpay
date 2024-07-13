import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../utils/custom-hook";
import { useUser } from "../../../hooks/user-hook";
import {
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "../employee-allowance/allowance.style";
import {
  ActionBtnsContainer,
  AddButton,
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

import { SmallSpinner } from "../../utils/spinner/spinner";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NoResult } from "../../utils/containers/containers.style";

export const EmployeeAsset = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { employee_id } = useParams();
  const dispatcher = useAppDispatch();
  const { task_error, task_finished, assets } = useAsset();
  const DELETE = "delete";
  const [action, setAction] = useState("");
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
            Add
          </AddButton>
        )}
      </AllowanceHeader>
      <AllowanceBody>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : assets.length === 0 ? (
          <div>
            <NoResult>No assets found</NoResult>
          </div>
        ) : (
          <CustomTable>
            <TableHeader>
              <HeaderTitle>Asset name</HeaderTitle>
              <HeaderTitle>Action</HeaderTitle>
            </TableHeader>

            <TableBody>
              {assets.map((asset, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{asset.asset_name}</TableData>
                    <TableData>
                      <ActionBtnsContainer>
                        <DeleteButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setAction(DELETE);
                            dispatcher(deleteAssetRequested(asset.id));
                          }}
                        >
                          {action === DELETE &&
                          !task_error &&
                          !task_finished ? (
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
      </AllowanceBody>
    </AllowanceContainer>
  );
};
