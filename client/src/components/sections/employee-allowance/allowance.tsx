/* eslint-disable react-hooks/exhaustive-deps */
import {
  Caption,
  CustomTable,
  HeaderTitle,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import {
  AddButton,
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "./allowance.style";
import { getFormattedMonth } from "../../pages/salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { ThreeDots } from "../../utils/loading/dots";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useSalary } from "../../../hooks/salary-hook";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../utils/custom-hook";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { removeSalaryAssetRequested } from "../../../store/employee/employee-slice";
import { stringDay } from "../../utils/day/string-day";
import { IoAddOutline } from "react-icons/io5";
import { useAuth } from "../../../hooks/auth-hook";
import DeleteConfirmationModal from "../../pages/admin/utils/model/ConfirmitionModal";

export const EmployeeAllowance = () => {
  //--- Calling hooks and getting necessary information ---
  const { curr_emp, task_finished } = useSalary();
  const navigate = useNavigate();
  const dispatcher = useAppDispatch();
  const { pathname } = useLocation();
  const { curr_user: user } = useAuth();

  //Getting current year and month
  const now = new Date(Date.now());
  const current_year = now.getFullYear();
  const current_month = now.getMonth() + 1;

  const { year, month, changeYear, changeMonth } = useYearMonthPagination();

  const { year: query_year, month: query_month, employee_id } = useParams();

  const [removeId, setRemoveId] = useState("");
  const [paymentMonth, setPaymentMonth] = useState("");
  const [openModel, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
    setRemoveId("");
    setPaymentMonth("");
  };

  const handleRemove = () => {
    if (curr_emp)
      dispatcher(
        removeSalaryAssetRequested({
          employee_id: curr_emp.employee.id,
          asset_type: "allowance",
          asset_id: removeId,
          qury_string: `?year=${paymentMonth.split("-")[0]}&month=${
            paymentMonth.split("-")[1]
          }`,
        })
      );
  };
  const baseUrl = query_year
    ? pathname.slice(0, pathname.indexOf("/" + query_year + "/"))
    : pathname;
  useEffect(() => {
    if (!year && !month) return;
    !year && changeYear(current_year);
    !month && changeMonth(current_month);
    year && month && navigate(`${baseUrl}/${year}/${month}`);
  }, [year, month]);

  useEffect(() => {
    if (query_year && query_month) {
      dispatcher(
        getCurrEmpPaymentInfo(`${employee_id}/${query_year}/${query_month}`)
      );
    } else {
      employee_id &&
        dispatcher(
          getCurrEmpPaymentInfo(
            `${employee_id}/${current_year}/${current_month}`
          )
        );
    }
  }, [query_year, query_month]);
  return (
    <AllowanceContainer>
      <AllowanceHeader>
        <Outlet />
        <AllowanceTitle>Employee Allowance</AllowanceTitle>
        {user?.role === "Clerk" && (
          <AddButton
            className="rounded-md "
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate("add-allowance");
            }}
          >
            <IoAddOutline /> New
          </AddButton>
        )}
      </AllowanceHeader>
      {openModel && (
        <DeleteConfirmationModal
          handleClose={closeModal}
          action={handleRemove}
        />
      )}
      <AllowanceBody>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.allowances.length === 0
          ) ? (
          <div>
            <NoResult>No allowances found </NoResult>
          </div>
        ) : (
          curr_emp?.employee.payments.map((payment, index) => {
            return payment.allowances.length > 0 ? (
              <CustomTable key={index} className="shadow-md">
                <thead>
                  <tr>
                    <Caption className="shadow-md mb-3">
                      {getFormattedMonth(new Date(payment.month))}
                    </Caption>
                  </tr>
                  <TableHeader className="shadow-lg">
                    <HeaderTitle>Allowance Name</HeaderTitle>
                    <HeaderTitle>Allowance Value</HeaderTitle>
                    <HeaderTitle>Date of Given</HeaderTitle>
                    {user?.employee.position === "Clerk" && (
                      <HeaderTitle>Action</HeaderTitle>
                    )}
                  </TableHeader>
                </thead>
                <TableBody>
                  {payment.allowances.map((allowance, index) => {
                    return (
                      <TableRow key={index}>
                        <TableData>{allowance.allowance_type}</TableData>
                        <TableData className=" italic">
                          {allowance.allowance_rate}%
                        </TableData>
                        <TableData className=" italic">
                          {stringDay(new Date(allowance.date_of_given))}
                        </TableData>
                        <TableData>
                          {user?.employee.position === "Clerk" && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setPaymentMonth(payment.month);
                                setRemoveId(allowance.id);
                                setOpenModal(true);
                              }}
                            >
                              <span className="fail">Remove</span>
                            </span>
                          )}
                        </TableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </CustomTable>
            ) : (
              <div>
                <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
                <NoResult>No Allowance</NoResult>
              </div>
            );
          })
        )}
      </AllowanceBody>
    </AllowanceContainer>
  );
};
