"use client"
import { resetCart } from "@/store/nextSlice";
import { Button } from "@radix-ui/themes";
import { useDispatch } from "react-redux";

const ResetCart = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Are you sure to delete the items in your cart?"
    );
    if (confirmReset) {
      dispatch(resetCart());
    }
  };
  return (
    <Button variant="surface" color="red" size="2"
      onClick={handleResetCart}
    >
      Clear Cart
    </Button>
  );
};

export default ResetCart;
