import { useStatistics } from "../../../hooks/statistics-hook";
import { getNamedMonth } from "../../pages/salary/utils";
import { stringDay } from "../day/string-day";
import { ThreeDots } from "../loading/dots";
import { BlurredText } from "../titles/titles";
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
  const { loadding_payment_stat, payment_stat } = useStatistics();
  return (
    <PaymentCardContainer>
      <PaymentCardHeader>
        <BlurredText>Payment statistics</BlurredText>
      </PaymentCardHeader>
      {!loadding_payment_stat ? (
        <>
          <PaymentTable>
            <PaymentRow>
              <PaymentCell>Payment Date</PaymentCell>
              <PaymentCell>Total Net Payment</PaymentCell>
              <PaymentCell>Total Allowance</PaymentCell>
              <PaymentCell>Total Overtime</PaymentCell>
              <PaymentCell>Toal Deduction</PaymentCell>
              <PaymentCell>Month</PaymentCell>
              <PaymentCell>Payment Status</PaymentCell>
              <PaymentCell>Is approved</PaymentCell>
            </PaymentRow>
          </PaymentTable>
          <PaymentTable>
            {payment_stat.map((payment, index) => {
              return (
                <PaymentRow key={index}>
                  <PaymentCell>
                    {stringDay(new Date(payment.payment_date))}
                  </PaymentCell>
                  <PaymentCell className="blue">
                    {payment.total_amount_of_payment} ETB
                  </PaymentCell>
                  <PaymentCell>
                    {payment.total_allowances_payment} ETB
                  </PaymentCell>
                  <PaymentCell>
                    {payment.total_overtimes_payment} ETB
                  </PaymentCell>
                  <PaymentCell className="success">
                    {payment.total_deductions_payment} ETB
                  </PaymentCell>
                  <PaymentCell>
                    {getNamedMonth(new Date(payment.month))}
                  </PaymentCell>
                  <PaymentCell>
                    {payment.payment_date ? (
                      <PostiveText>Paid</PostiveText>
                    ) : (
                      <NegativeText>Not Paid</NegativeText>
                    )}
                  </PaymentCell>
                  <PaymentCell>
                    {payment.payment_date ? (
                      <PostiveText>Approved</PostiveText>
                    ) : (
                      <NegativeText>Not approved</NegativeText>
                    )}
                  </PaymentCell>
                </PaymentRow>
              );
            })}
          </PaymentTable>
        </>
      ) : (
        <ThreeDots size={1} />
      )}
    </PaymentCardContainer>
  );
};
