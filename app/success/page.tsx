
import Clearcart from "../components/Cart/ClearCartPaid";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const SuccessPage = async () => {
  const session = await getServerSession();

  if( !session)    
    {
      redirect("/")
    }
    
  return (
    <>
      <div className='a_page'>
        <Clearcart/>
        <ul className="steps pb-10 sm:mx-5">
          <li data-content="✓" className="step step-primary text-white">Purchase success!!!</li>
          <li className="step step-primary flex text-white">Preparing Order <span className="animate-ping">...</span></li>
          <li className="step step-primary flex text-white">Shipping <span className="animate-ping">...</span></li>
          <li className="step step-primary flex text-white">Order Deliver <span className="animate-ping">...</span></li>
        </ul>
        <div className=' w-[400px] xl:w-[800px] h-[800px] justify-center items-center text-center'>
          <h1 className="pb-10 text-2xl text-center font-bold text-white">Thank you for purchase
          , your order is preparing</h1>
          <div className=" xl:flex justify-between w-full ">
            <Link href="/" >
            <button className="btn btn-primary m-5">Continue Shopping</button>
            </Link>
            <Link href="/profile" >
            <button className="btn btn-primary m-5">Order details</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default SuccessPage