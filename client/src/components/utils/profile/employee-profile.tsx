/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import {
  DataLabel,
  DataValue,
  EmployeeData,
  EmployeeInfoContainer,
  EmployeeeProfileContainer,
  FileInput,
  Icon,
  InputButton,
  ProfileContainer,
} from "./employee-profile.style";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ThreeDots } from "../loading/dots";

import { Label } from "../form-elements/form.style";
import { RiPencilLine } from "react-icons/ri";
import { ImageCard } from "../profile-card/profile-card";
import { baseURL } from "../../../config/api";
import { CurrEmpPayments } from "../../../typo/payment/response";
import { CURRENT_USER } from "../../../constants/token-constants";

export const EmployeeProfile = ({
  employee,
}: {
  employee: CurrEmpPayments;
}) => {
  const { curr_emp, loading } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const curr_user_id = JSON.parse(
    localStorage.getItem(CURRENT_USER) || "[]"
  ).id;
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  useEffect(() => {
    const curr_emp_id = localStorage.getItem("curr_emp_id");
    curr_emp_id && dispatcher(getCurrEmpPaymentInfo(curr_emp_id));
  }, [dispatcher]);

  const closeImageCard = () => {
    setProfilePicture(null);
  };
  return (
    <EmployeeeProfileContainer>
      <ProfileContainer profile={baseURL + curr_emp?.employee.profile_picture}>
        {curr_user_id === employee.id && (
          <form onSubmit={() => {}}>
            <Label>
              <InputButton
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                {
                  <Icon>
                    <RiPencilLine />
                  </Icon>
                }
              </InputButton>
            </Label>
            <FileInput
              accept="image/*"
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
            />
            {profilePicture && (
              <ImageCard picture={profilePicture} action={closeImageCard} />
            )}
          </form>
        )}
      </ProfileContainer>
      {loading ? (
        <ThreeDots size={1} />
      ) : (
        <EmployeeInfoContainer>
          <EmployeeData>
            <DataLabel>Full Name</DataLabel>
            <DataValue>
              {employee?.first_name + " " + employee?.last_name}
            </DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Gender</DataLabel>
            <DataValue>{employee?.gender}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Email</DataLabel>
            <DataValue>{employee?.email}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Phone Number</DataLabel>
            <DataValue>{employee?.phone_number}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Role</DataLabel>
            <DataValue>{employee?.position}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Salary</DataLabel>
            <DataValue>{employee?.salary}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Birth Date</DataLabel>
            <DataValue>{employee?.date_of_birth}</DataValue>
          </EmployeeData>
          <EmployeeData>
            <DataLabel>Date of Hire</DataLabel>
            <DataValue>{employee?.date_of_hire}</DataValue>
          </EmployeeData>
        </EmployeeInfoContainer>
      )}
    </EmployeeeProfileContainer>
  );
};
