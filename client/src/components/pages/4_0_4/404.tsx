import { PageContainer, StatusCode, HomeLink, Message } from "./404.style";

// 404 Page Component
const NotFoundPage = () => {
  return (
    <PageContainer>
      <StatusCode>404</StatusCode>
      <Message>Oops! The page you're looking for isn't here.</Message>
      <HomeLink href="/">Go Home</HomeLink>
    </PageContainer>
  );
};

export default NotFoundPage;
