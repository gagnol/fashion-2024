
import ProductModel from "@/lib/product-model";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox"
import SigninTool from "./SigninTool";
import FavoriteList from "./FavoriteList";
import All from "./All";
import { getServerSession } from "next-auth";
import CartTool from "./CartTool";

const Navbar = async () => {
  const session = await getServerSession();
  const productDocs = (await ProductModel.find())
  const product = JSON.parse(JSON.stringify(productDocs));


  return (
    <div className="max-w-screen-2xl mx-auto py-2 overflow-hidden h-20  text-light top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex items-center justify-center xl:justify-between 
             gap-1 mdl:gap-3 px-4">
        <Link
          href={"/"}
          className="px-2 border border-transparent cursor-pointer
          duration-300 flex items-center justify-center h-[70%]">
          <Image className="min-h-[50px] object-cover mt-1"
            src="/logo1.jpg" alt="logo" width={50} height={50}
             style={{ width: 50, height: "auto" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </Link>
     
       
        {/* search */}
        <div className="flex-1 h-10 hidden md:inline-flex items-center xl:justify-center  relative">
         
          {/*  Searchfield  */}
          <SearchBox />
        </div>
        <SigninTool />
        <FavoriteList />
          <CartTool/>
        {/* Theme */}
        
      </div>
    </div>
  )

}

export default Navbar;