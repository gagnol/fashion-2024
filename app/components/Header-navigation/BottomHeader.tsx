
import Link from "next/link";
import SideNavigation from "./SideNavigation";
import All from "./All";
import SearchInput from "./SearchBox";

const BottomHeader = ({product}:any) => {

  return (
    <div className="max-w-screen-2xl mx-auto py-2 overflow-hidden h-10 text-sm px-4 flex items-center">
      <SideNavigation />
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
      <Link href={`/search?discount>`} >
       Today&apos;s Deals
        </Link>
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <Link href="/customer">
          Customer Service
        </Link>
      </p>
     
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
      <Link href={`/products/557`} >
       Gift  
        </Link>
      </p>
     
    </div>
  );
};

export default BottomHeader;
