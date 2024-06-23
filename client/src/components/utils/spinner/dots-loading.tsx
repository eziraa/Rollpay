import styled, { keyframes } from "styled-components";

const moveIn = keyframes`
    0% {
        transform: translate(0, 0) 
    }
    25% {
        transform: translate(50px, 0);
    }
    50% {
        transform: translate(50px, 50px) 
    }
    75% {
        transform: translate(0, 50px);
    }
    100% {
        transform: translate(0, 0) 
    }
`;

const moveOutI = keyframes`
    0% {
        transform: translate(0, 0) 
    }
    25% {
        transform: translate(0, 50px);
    }
    50% {
        transform: translate(-50px, 50px) 
    }
    75% {
        transform: translate(-50px, 0);
    }
    100% {
        transform: translate(0, 0) 
    }
`;

const moveOut = keyframes`
    0% {
        transform: translate(0, 0) 
    }
    25% {
        transform: translate(-50px, 0);
    }
    50% {
        transform: translate(-50px, -50px) 
    }
    75% {
        transform: translate(0, -50px);
    }
    100% {
        transform: translate(0, 0) 
    }
`;

const moveInO = keyframes`
    0% {
        transform: translate(0, 0) 
    }
    25% {
        transform: translate(0, -50px);
    }
    50% {
        transform: translate(50px, -50px) 
    }
    75% {
        transform: translate(50px, 0);
    }
    100% {
        transform: translate(0, 0) 
    }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const LoadingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  height: 100px;
  width: 100px;
  padding: 0;
  margin: 0;
  padding: auto;
  align-items: center;
  justify-items: center;
  animation: ${rotateAnimation} 1s ease-in-out infinite;
`;

const LoadingItemStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: rgba(92, 82, 82, 0.553);
  padding: 0;
  margin: 0;
`;

const LoadingItem1 = styled(LoadingItemStyle)`
  /* animation: ${moveIn} 2s ease-in-out infinite; */
  background-color: #e1a10b;
  translate: transform 1s ease-in-out infinite;
  transform: rotate(360deg);
`;

const LoadingItem2 = styled(LoadingItemStyle)`
  /* animation: ${moveOutI} 2s ease-in-out infinite; */
  background-color: #079e7a;
`;

const LoadingItem3 = styled(LoadingItemStyle)`
  /* animation: ${moveInO} 2s ease-in-out infinite; */
  background-color: rgb(255, 0, 195);
`;

const LoadingItem4 = styled(LoadingItemStyle)`
  /* animation: ${moveOut} 2s ease-in-out infinite; */
  background-color: #3c3c84;
`;

export const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingItem1 />
      <LoadingItem2 />
      <LoadingItem3 />
      <LoadingItem4 />
    </LoadingContainer>
  );
};
