import { PageContainer, StatusCode, HomeLink, Message } from "./404.style";

// 404 Page Component
const NotFoundPage = () => {
  return (
    <PageContainer className="bg-green-50">
      <StatusCode className="text-slate-400">404</StatusCode>
      <Message className="text-slate-400">Oops! The page you're looking for isn't here.</Message>
      <HomeLink  className="bg-green-600/60 text-slate-100" href="/">Go Home</HomeLink>
    </PageContainer>
  );
};

export default NotFoundPage;
