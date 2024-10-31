/* eslint-disable react-hooks/exhaustive-deps */
import {
  AddButton,
  Body,
  Container,
  Header,
  Title,
} from "../employee-allowance/allowance.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../../pages/salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { ThreeDots } from "../../utils/loading/dots";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useYearMonthPagination } from "../../../hooks/year-month-pagination-hook";
import { useEffect, useState } from "react";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { removeSalaryAssetRequested } from "../../../store/employee/employee-slice";
import { stringDay } from "../../utils/day/string-day";
import { IoAddOutline } from "react-icons/io5";
import { useAuth } from "../../../hooks/auth-hook";
import DeleteConfirmationModal from "../../pages/admin/utils/model/ConfirmitionModal";
import { Caption } from "../../utils/custom-table/caption";
import { CustomTable } from "../employee-overtime/table";

export const EmployeeDeduction = () => {
  //Calling hooks and getting nucessary information
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
          asset_type: "deduction",
          asset_id: removeId,
          qury_string: `?year=${paymentMonth.split("-")[0]}&month=${
            paymentMonth.split("-")[1]
          }`,
        })
      );
  };
  //Getting current monthand year
  const now = new Date(Date.now());
  const current_year = now.getFullYear();
  const current_month = now.getMonth() + 1;
  // Getting necessary information
  const baseUrl = query_year
    ? pathname.slice(0, pathname.indexOf("/" + query_year + "/"))
    : pathname;
  // Defining use effect to navigate when there is chnage in the year and month
  useEffect(() => {
    if (!year && !month) return;
    !year && changeYear(current_year);
    !month && changeMonth(current_month);
    year && month && navigate(`${baseUrl}/${year}/${month}`);
  }, [year, month]);

  // Defining use effect to fetch employee information when there is chnage in the year and month
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
    <Container>
      <Outlet />
      <Header>
        <Title>Employee Deductio</Title>
        {user?.role === "Clerk" && (
          <AddButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate("add-deduction");
            }}
          >
            <IoAddOutline /> New
          </AddButton>
        )}
      </Header>
      {openModel && (
        <DeleteConfirmationModal
          handleClose={closeModal}
          action={handleRemove}
        />
      )}
      <Body>
        {!task_finished ? (
          <ThreeDots size={1} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.deductions.length === 0
          ) ? (
          <div>
            <NoResult>No deductions found </NoResult>
          </div>
        ) : (
          curr_emp?.employee.payments.map((payment, index) => {
            return payment.deductions.length > 0 ? (
              <>
                <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
                <CustomTable
                  key={index}
                  className="shadow-md"
                  gridCols="1fr 1fr 2fr 1fr"
                >
                  <thead>
                    <tr>
                      <th>Deductio Name</th>
                      <th>Deductio Value</th>
                      <th>Date of Given</th>
                      {user?.employee.position === "Clerk" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {payment.deductions.map((deduction, index) => {
                      return (
                        <tr key={index}>
                          <td>{deduction.deduction_type}</td>
                          <td className="italic">
                            {deduction.deduction_rate}%
                          </td>
                          <td>
                            {stringDay(new Date(deduction.date_of_given))}
                          </td>
                          <td>
                            {user?.employee.position === "Clerk" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRemoveId(deduction.id);
                                  setOpenModal(true);
                                  setPaymentMonth(payment.month);
                                }}
                                className="text-red-500 rounded-md font-bold tracking-wider uppercase text-xl  border bg-red-50/50 py-2 px-4 border-red-400 hover:bg-red-500 hover:text-white transition-all duration-500"
                              >
                                remove
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
                <NoResult>No </NoResult>
              </div>
            );
          })
        )}
      </Body>
    </Container>
  );
};
