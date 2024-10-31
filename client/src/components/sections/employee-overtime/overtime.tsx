/* eslint-disable react-hooks/exhaustive-deps */

import {
  AddButton,
  OvertimeBody,
  OvertimeContainer,
  OvertimeHeader,
  OvertimeTitle,
} from "./overtime.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../../pages/salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { ThreeDots } from "../../utils/loading/dots";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { removeSalaryAssetRequested } from "../../../store/employee/employee-slice";
import { stringDatetine } from "../../utils/day/string-day";
import { IoAddOutline } from "react-icons/io5";
import { useAuth } from "../../../hooks/auth-hook";
import DeleteConfirmationModal from "../../pages/admin/utils/model/ConfirmitionModal";
import { CustomTable } from "./table";
import { Caption } from "../../utils/custom-table/caption";

export const EmployeeOvertime = () => {
  //Callig hooks and getting necessary information
  const { curr_emp, task_finished } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { year, month, changeYear, changeMonth } = useYearMonthPagination();
  const { year: query_year, month: query_month, employee_id } = useParams();
  const { curr_user: user } = useAuth();
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
          asset_type: "overtime",
          asset_id: removeId,
          qury_string: `?year=${paymentMonth.split("-")[0]}&month=${
            paymentMonth.split("-")[1]
          }`,
        })
      );
  };
  // Getting the current month and year
  const now = new Date(Date.now());
  const current_year = now.getFullYear();
  const current_month = now.getMonth() + 1;
  // Getting the base URL
  const baseUrl = query_year
    ? pathname.slice(0, pathname.indexOf("/" + query_year + "/"))
    : pathname;
  // Defining a ue effect to naviagate when there is a month or year change
  useEffect(() => {
    if (!year && !month) return;
    !year && changeYear(current_year);
    !month && changeMonth(current_month);
    year && month && navigate(`${baseUrl}/${year}/${month}`);
  }, [year, month]);

  //Defining a use effect to fetch an employee information based on the year and month
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
    <OvertimeContainer>
      <OvertimeHeader>
        <Outlet />
        <OvertimeTitle>Employee Overtime</OvertimeTitle>
        {user?.role === "Clerk" && (
          <AddButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate("add-overtime");
            }}
          >
            <IoAddOutline /> New
          </AddButton>
        )}
      </OvertimeHeader>
      {openModel && (
        <DeleteConfirmationModal
          handleClose={closeModal}
          action={handleRemove}
        />
      )}
      <OvertimeBody>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.overtimes.length === 0
          ) ? (
          <div>
            <NoResult>No overtimes found </NoResult>
          </div>
        ) : (
          curr_emp?.employee.payments.map((payment, index) => {
            return payment.overtimes.length > 0 ? (
              <>
                <Caption
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  {getFormattedMonth(new Date(payment.month))}
                </Caption>
                <CustomTable
                  key={index}
                  className="shadow-md"
                  gridCols="1fr  1fr 1.6fr 1.6fr 1fr"
                >
                  <thead>
                    <tr>
                      <th>Overtime Name</th>
                      <th>Length of Time</th>
                      <th>Start at</th>
                      <th>End at</th>
                      {user?.employee.position === "Clerk" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {payment.overtimes.map((overtime, index) => {
                      return (
                        <tr key={index}>
                          <td>{overtime.overtime_type}</td>
                          <td className="center-text italic">
                            {overtime.overtime_rate}
                          </td>
                          <td
                            style={{
                              flex: 1.5,
                            }}
                          >
                            {stringDatetine(new Date(overtime.start_time))}
                          </td>
                          <td
                            style={{
                              flex: 1.5,
                            }}
                          >
                            {stringDatetine(new Date(overtime.end_time))}
                          </td>
                          <td
                            style={{
                              flex: 1,
                            }}
                          >
                            {user?.employee.position === "Clerk" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPaymentMonth(payment.month);
                                  setRemoveId(overtime.id);
                                  setOpenModal(true);
                                }}
                                className="text-red-500 rounded-md font-bold tracking-wider uppercase text-xl  border bg-red-50/50 py-2 px-4 border-red-400 hover:bg-red-500 hover:text-white transition-all duration-500"
                              >
                                <span className=" ">Remove</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </CustomTable>
              </>
            ) : (
              <div>
                <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
                <NoResult>No Overtime</NoResult>
              </div>
            );
          })
        )}
      </OvertimeBody>
    </OvertimeContainer>
  );
};
