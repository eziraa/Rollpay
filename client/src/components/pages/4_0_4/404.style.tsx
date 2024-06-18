import styled from "styled-components";

// Styled components
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

export const StatusCode = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  color: #333;
`;

export const Message = styled.p`
  font-size: 1.5rem;
  margin: 20px 0;
`;

export const HomeLink = styled.a`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: #0056b3;
  }
`;
