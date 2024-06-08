import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
export const AddEmployeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  box-shadow: 0 0 3rem ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;
  height: auto;
  width: 100%;
  margin: 0;
  gap: 3rem;
`;

export const AddEmployeeForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  width: 15vw;
`;

export const GenderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  row-gap: 1rem;
`;

export const Title = styled.h1`
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const StyledPhoneInput = styled(PhoneInput)`
  & input {
    width: 100% !important;
    padding: 10px;
    border: 1px solid #e22323;
    border-radius: 4px;
  }
`;
