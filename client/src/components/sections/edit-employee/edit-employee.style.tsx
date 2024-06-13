import styled from "styled-components";
import Profile from "../../../assets/profile.png";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
export const EditEmployeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 3rem;
  position: relative;
`;

export const EditEmployeeContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 80%;
  gap: 10rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const EmployeeeProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 22%;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  height: 90%;
  padding: 1rem;
  gap: 2rem;
`;

export const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  padding: 0rem;
  background: url(${Profile}), linear-gradient(90deg, #60565596, #6866619d);
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const EmployeeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 60%;
  padding: 1rem;
  gap: 1rem;
`;

export const EditEmployeeBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 100%;
  padding: 1rem;
  gap: 1rem;
`;
export const EmployeeData = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  width: 100%;
`;

export const DataLabel = styled.h5`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  flex: 1;
  text-align: left;
`;

export const DataValue = styled.h5`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => addOpacityToColor(0.5, theme.colors.primary)};
  flex: 1;
`;

export const EditButton = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SaveButton = styled.button`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  padding: 1rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
`;

export const CancelButton = styled.button`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.backgrounds.primary};
  border-radius: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.backgrounds.secondary};
  }
`;
