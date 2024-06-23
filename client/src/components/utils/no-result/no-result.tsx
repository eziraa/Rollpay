import { NoResultContainer, NoResultText } from "./no-result.style";

export const NoResult = ({ text }: { text: string }) => {
  return (
    <NoResultContainer>
      <NoResultText>{text}</NoResultText>
    </NoResultContainer>
  );
};
