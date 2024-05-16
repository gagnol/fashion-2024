

const FormattedPrice = ({ discountPrice }:any) => {
  const formattedAmount = new Number(discountPrice).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return <span>{formattedAmount}</span>;
};

export default FormattedPrice;
