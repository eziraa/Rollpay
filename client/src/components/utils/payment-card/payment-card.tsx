import { stringDay } from "../day/string-day";
import { BlurredText } from "../titles/titles";
import { payment_mock_data } from "./payment";
import {
  PaymentCell,
  PaymentTable,
  PaymentCardContainer,
  PaymentCardHeader,
  PaymentRow,
  PostiveText,
  NegativeText,
} from "./payment-card.style";

export const PaymentCard = () => {
  return (
    <PaymentCardContainer>
      <PaymentCardHeader>
        <BlurredText>Payment statistics</BlurredText>
      </PaymentCardHeader>
      <PaymentTable>
        <PaymentRow>
          <PaymentCell>Payment Date</PaymentCell>
          <PaymentCell>Amount</PaymentCell>
          <PaymentCell>Month</PaymentCell>
          <PaymentCell>Payment Status</PaymentCell>
          <PaymentCell>Is approved</PaymentCell>
        </PaymentRow>
      </PaymentTable>
      <PaymentTable>
        {payment_mock_data.map((payment, index) => {
          return (
            <PaymentRow key={index}>
              <PaymentCell>
                {stringDay(new Date(payment.payment_date))}
              </PaymentCell>
              <PaymentCell>{payment.amount}</PaymentCell>
              <PaymentCell>{payment.month}</PaymentCell>
              <PaymentCell>
                {payment.status ? (
                  <PostiveText>Paid</PostiveText>
                ) : (
                  <NegativeText>Not Paid</NegativeText>
                )}
              </PaymentCell>
              <PaymentCell>
                {payment.approved ? (
                  <PostiveText>Approved</PostiveText>
                ) : (
                  <NegativeText>Not approved</NegativeText>
                )}
              </PaymentCell>
            </PaymentRow>
          );
        })}
      </PaymentTable>
    </PaymentCardContainer>
  );
};
