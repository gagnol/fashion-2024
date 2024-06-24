
import { Button } from "@radix-ui/themes";
import Clearcart from "../components/Cart/ClearCartPaid";
import Link from "next/link";


const SuccessPage = async () => {

    
  return (
    <>
      <div className='a_page'>
        <Clearcart/>
        
        <div className=' w-[400px] xl:w-[800px] h-[800px] justify-center items-center text-center'>
          <h1 className="pb-10 text-2xl text-center font-bold ">Thank you for purchase
          , your order is preparing</h1>
          <div className=" xl:flex justify-between w-full ">
            <Link href="/" >
            <Button variant="classic">Continue Shopping</Button>
            </Link>
            <Link href="/profile" >
            <Button variant="classic">Order details</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default SuccessPage