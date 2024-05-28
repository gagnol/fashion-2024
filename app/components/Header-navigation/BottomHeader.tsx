
import Link from "next/link";
import SideNavigation from "./SideNavigation";
import All from "./All";
import SearchInput from "./SearchBox";
import { Text, TextField } from "@radix-ui/themes";
import SigninTool from "./SigninTool";
import FavoriteList from "./FavoriteList";
import CartTool from "./CartTool";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const BottomHeader = ({product}:any) => {

  return (
    <div className="max-w-screen-2xl mx-auto py-2 overflow-hidden 
    h-10 text-sm px-4 flex items-center">
      <SideNavigation />
      <form action="" method="GET" 
      className=" h-10 lg:hidden inline-flex items-center justify-center relative"
      >
                <TextField.Root  name="query"
                    placeholder="Search products…">
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </form>
      <div className=" h-10 md:hidden inline-flex items-center mx-auto relative">
         <SigninTool />
        <FavoriteList />
          <CartTool/>
          </div>
      <Text size="3" className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
      <Link href={`/search?discount>`} >
       Today&apos;s Deals
        </Link>
      </Text>
      <Text size="3" className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <Link href="/customer">
          Customer Service
        </Link>
      </Text>
     
      <Text  size="3" className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
      <Link href={`/products/557`} >
       Gift  
        </Link>
      </Text>
     
    </div>
  );
};

export default BottomHeader;
