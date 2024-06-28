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
  FileInput,
  Icon,
  InputButton,
  ProfileContainer,
} from "./employee-profile.style";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { tryingToDelete } from "../../../store/employee/employee-slice";
import { getCurrEmpPaymentInfo } from "../../../store/salary/salary-slice";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ThreeDots } from "../loading/dots";
import { Profile } from "../../../typo/employee/response";

// import Placeholder from "../../../assets/placeholde.jpg";
import axios from "axios";
import { Label } from "../form-elements/form.style";

export const EmployeeProfile = () => {
  const { curr_emp, loading } = useAppSelector((state) => state.salary);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [data, setData] = useState<Profile>({ profile_picture: "" });
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
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
    if (curr_emp_id) {
      const url = `http://127.0.0.1:8000/user/profile/${curr_emp_id}`;
      axios
        .get<Profile>(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [profilePicture]);

  useEffect(() => {
    const curr_emp_id = localStorage.getItem("curr_emp_id");
    if (profilePicture && curr_emp_id) {
      const url = `http://127.0.0.1:8000/user/profile/${curr_emp_id}`;
      const formData = new FormData();
      formData.append("profile_picture", profilePicture);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .put(url, formData, config)
        .then((response) => {
          setData({ ...data, profile_picture: response.data.profile_picture });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [profilePicture]);
  useEffect(() => {
    const curr_emp_id = localStorage.getItem("curr_emp_id");
    curr_emp_id && dispatcher(getCurrEmpPaymentInfo(curr_emp_id));
  }, [dispatcher]);
  return (
    <EmployeeeProfileContainer>
      <ProfileContainer
        profile={"http://127.0.0.1:8000/" + data.profile_picture}
      >
        <Label>
          <InputButton type="submit" onClick={handleClick}>
            <Icon>
              <RiPencilLine />
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
            navigate("/employees");
          }}
        >
          <MdModeEditOutline /> Edit
        </Button>
      </ActionBtnsContainer>
    </EmployeeeProfileContainer>
  );
};
