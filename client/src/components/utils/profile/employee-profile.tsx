import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import {
  ActionBtnsContainer,
  Button,
  DataLabel,
  DataValue,
  DeleteButton,
  EmployeeData,
  EmployeeInfoContainer,
  EmployeeeProfileContainer,
  ProfileImage,
} from "./employee-profile.style";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { tryingToDelete } from "../../../store/employee/employee-slice";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ThreeDots } from "../loading/dots";

export const EmployeeProfile = () => {
  const { curr_emp, loading } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { employee_id } = useParams();

  useEffect(() => {
    employee_id && dispatcher(getCurrEmpPaymentInfo(employee_id));
  }, []);
  return (
    <EmployeeeProfileContainer>
      <ProfileImage />
      {loading ? (
        <ThreeDots size={1} />
      ) : (
        <EmployeeInfoContainer>
          <EmployeeData>
            <DataLabel>Full Name</DataLabel>
            <DataValue>
              {curr_emp?.employee?.first_name +
                " " +
                curr_emp?.employee?.last_name}
            </DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Gender</DataLabel>
            <DataValue>{curr_emp?.employee?.gender}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Email</DataLabel>
            <DataValue>{curr_emp?.employee?.email}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Phone Number</DataLabel>
            <DataValue>{curr_emp?.employee?.phone_number}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Role</DataLabel>
            <DataValue>{curr_emp?.employee?.position}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Salary</DataLabel>
            <DataValue>{curr_emp?.employee?.salary}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Birth Date</DataLabel>
            <DataValue>{curr_emp?.employee?.date_of_birth}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Date of Hire</DataLabel>
            <DataValue>{curr_emp?.employee?.date_of_hire}</DataValue>
          </EmployeeData>
        </EmployeeInfoContainer>
      )}
      <ActionBtnsContainer
        style={{
          gap: "2rem",
        }}
      >
        <DeleteButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatcher(tryingToDelete());
          }}
        >
          <RiDeleteBin6Line /> Delete
        </DeleteButton>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("/employees/employee/edit-employee");
          }}
        >
          <MdModeEditOutline /> Edit
        </Button>
      </ActionBtnsContainer>
    </EmployeeeProfileContainer>
  );
};
