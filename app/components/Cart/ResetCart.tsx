"use client"
import { resetCart } from "@/store/nextSlice";
import { useDispatch } from "react-redux";

const ResetCart = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Are you sure to delete the items in tour cart?"
    );
    if (confirmReset) {
      dispatch(resetCart());
    }
  };
  return (
    <button
      onClick={handleResetCart}
      className="w-32 h-10 font-semibold
       btn btn-error btn-outline 
       hover:bg-red-600 hover:text-white duration-300"
    >
      Clear Cart
    </button>
  );
};

export default ResetCart;
