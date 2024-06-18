import {
  PageContainer,
  ContentContainer,
  Title,
  Button,
  Message,
} from "./access-denied.style";

// AccessDenied component
const AccessDenied = () => (
  <PageContainer>
    <ContentContainer>
      <Title>Access Denied</Title>
      <Message>Sorry, you don't have permission to view this page.</Message>
      <Button href="/home-page">Go Home</Button>
    </ContentContainer>
  </PageContainer>
);

export default AccessDenied;
