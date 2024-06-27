/* eslint-disable react-hooks/rules-of-hooks */

import {
  Button,
  BackButton,
  DataLabel,
  DataValue,
  SeeEmployeeContainer,
  EditEmployeeContent,
  EmployeeData,
  EmployeeInfoContainer,
  EmployeeeProfileContainer,
  NavBar,
  NavItem,
  Title,
  SeeEmployeeHeader,
  TitleContainer,
  ActionBtnsContainer,
  DeleteButton,
  ProfileContainer,
  InputButton,
  Icon,
  FileInput,
} from "./see-employee.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { IoChevronBackCircleOutline } from "react-icons/io5";
// import {
//   EDIT_EMP,
//   LIST_EMP_S,
//   SEE_EMP_ALLOWANCE,
//   SEE_EMP_DEDUCTION,
//   SEE_EMP_OVERTIME,
// } from "../../../constants/tasks";
import { MdModeEditOutline } from "react-icons/md";
import { EmployeeAllowance } from "../employee-allowance/allowance";
import {
  resetCurrEmployee,
  tryingToDelete,
  // updateProfileRequest,
} from "../../../store/employee/employee-slice";
import { EditEmployee } from "../edit-employee/edit-employee";
import { EmployeeOvertime } from "../employee-overtime/overtime";
import { EmployeeDeduction } from "../employee-deduction/deduction";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { DisplayContext } from "../../../contexts/display-context";
import { Label } from "../profile/profile.style";
import { FiCamera } from "react-icons/fi";
import axios from "axios";
import { Profile } from "../../../typo/employee/response";
import Placeholder from "../../../assets/placeholde.jpg";

export const SeeEmployee = () => {
  const { curr_emp: current_employee } = useAppSelector(
    (state) => state.employee
  );
  const { display, setDisplay } = useContext(DisplayContext);
  const dispatcher = useAppDispatch();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [data, setData] = useState<Profile>({ profile_picture: Placeholder });
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (hiddenFileInput && hiddenFileInput.current) {
      hiddenFileInput?.current.click();
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      setProfilePicture(event.target.files[0]);

      // dispatcher(
      //   updateProfileRequest({
      //     employee_id: current_employee?.id || "",
      //     profile_url: event.target?.files[0],
      //   })
      // );
    }
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const url = `http://127.0.0.1:8000/user/profile/${current_employee?.id}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Profile>(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url, current_employee?.id, profilePicture]);

  const formData = new FormData();
  if (profilePicture) {
    formData.append("profile_picture", profilePicture);
  }
  axios
    .put(url, formData, config)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <SeeEmployeeContainer>
      <SeeEmployeeHeader>
        <TitleContainer>
          <BackButton
            onClick={() => {
              setDisplay({
                ...display,
                see_employee: false,
                list_employees: true,
              });
              dispatcher(resetCurrEmployee());
            }}
          >
            <IoChevronBackCircleOutline />
          </BackButton>
          <Title>Edit Employee</Title>
        </TitleContainer>
        <NavBar>
          <NavItem
            active={display.see_employee_allowance}
            onClick={(e) => {
              e.preventDefault();
              setDisplay({
                ...display,
                see_employee_allowance: true,
                see_employee_overtime: false,
                see_employee_deduction: false,
                edit_employee: false,
              });
            }}
          >
            Allowances
          </NavItem>
          <NavItem
            active={display.see_employee_overtime}
            onClick={(e) => {
              e.preventDefault();
              setDisplay({
                ...display,
                see_employee_overtime: true,
                see_employee_allowance: false,
                see_employee_deduction: false,
                edit_employee: false,
              });
            }}
          >
            Overtimes
          </NavItem>
          <NavItem
            active={display.see_employee_deduction}
            onClick={(e) => {
              e.preventDefault();
              setDisplay({
                ...display,
                see_employee_deduction: true,
                see_employee_allowance: false,
                see_employee_overtime: false,
                edit_employee: false,
              });
            }}
          >
            Deductions
          </NavItem>
        </NavBar>
      </SeeEmployeeHeader>
      <EditEmployeeContent>
        <EmployeeeProfileContainer>
          <ProfileContainer
            profile={"http://127.0.0.1:8000/" + data.profile_picture}
          >
            <Label>
              <InputButton onClick={handleClick}>
                <Icon>
                  <FiCamera />
                </Icon>
              </InputButton>
            </Label>

            <FileInput
              accept="image/*"
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
            />
          </ProfileContainer>
          <EmployeeInfoContainer>
            <EmployeeData>
              <DataLabel>Full Name</DataLabel>
              <DataValue>
                {current_employee?.first_name +
                  " " +
                  current_employee?.last_name}
              </DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Gender</DataLabel>
              <DataValue>{current_employee?.gender}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Email</DataLabel>
              <DataValue>{current_employee?.email}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Phone Number</DataLabel>
              <DataValue>{current_employee?.phone_number}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Role</DataLabel>
              <DataValue>{current_employee?.position}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Salary</DataLabel>
              <DataValue>{current_employee?.salary}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Birth Date</DataLabel>
              <DataValue>{current_employee?.date_of_birth}</DataValue>
            </EmployeeData>
            <EmployeeData>
              <DataLabel>Date of Hire</DataLabel>
              <DataValue>{current_employee?.date_of_hire}</DataValue>
            </EmployeeData>
          </EmployeeInfoContainer>
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
                setDisplay({
                  ...display,
                  edit_employee: true,
                  list_employees: false,
                  see_employee_allowance: false,
                  see_employee_deduction: false,
                  see_employee_overtime: false,
                });
                // dispatcher(setMajorTask(EDIT_EMP));
              }}
              disabled={display.edit_employee}
              style={{
                cursor: display.edit_employee ? "not-allowed" : "pointer",
              }}
            >
              <MdModeEditOutline /> Edit
            </Button>
          </ActionBtnsContainer>
        </EmployeeeProfileContainer>
        {display.edit_employee && <EditEmployee />}
        {display.see_employee_allowance && <EmployeeAllowance />}
        {display.see_employee_overtime && <EmployeeOvertime />}
        {display.see_employee_deduction && <EmployeeDeduction />}
      </EditEmployeeContent>
    </SeeEmployeeContainer>
  );
};
