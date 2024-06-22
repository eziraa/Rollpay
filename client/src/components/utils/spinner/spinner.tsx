import { Loading } from "./dots-loading";
import { Spinner, SpinnerContainer } from "./spinner.style";

const LoadingSpinner = () => (
  <SpinnerContainer>
    <Loading />
  </SpinnerContainer>
);
export const SmallSpinner = () => (
  <div style={{ width: "2rem", height: "2rem", margin: "auto" }}>
    <Spinner
      length={5}
      style={{
        width: "2rem",
        height: "2rem",
        display: "inline-block",
        margin: "auto",
      }}
    />
  </div>
);

export default LoadingSpinner;
