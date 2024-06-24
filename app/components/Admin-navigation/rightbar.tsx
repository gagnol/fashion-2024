import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";

const Rightbar = ({ productsCount, usersCount,productsData }: any) => {
  return (
    <div className="border-l-2 border-neutral-500 max-lg:hidden">
      <div className="p-5 border-md mb-5 relative">
       <div className="absolute right-0 bottom-0 w-[50%] h-[100%]">
        </div>
        <div className="flex flex-col gap-6">
          <Text size="6"> Available Now</Text>
          <div className="w-[300px] m-2 p-5 rounded-md border-2 shadow-xl">
            <div className="flex gap-3 text-center">
              <Text size="4" >{productsCount} </Text>
              <Text size="4">Products</Text>
            </div>
            <Button variant="surface" size="2" asChild >
              <Link href="/admin/products" className="hover:text-primary">
                View products
              </Link>
            </Button>
          </div>
          <div className="w-[300px] m-2 p-5 rounded-md border-2 shadow-xl">
          <div className="flex gap-3 text-center">
            <Text size="4">{usersCount} </Text>
            <Text size="4">Users</Text>
            </div>
            <Button variant="surface" size="2" asChild >
              <Link href="/admin/users" className="hover:text-primary">
                View users
              </Link>
            </Button>
          </div>
          <div className="w-[300px] m-2 p-5 rounded-md border-2 shadow-xl">
             <Text size="5" className="mb-4" >Categories</Text>
                <table className="">
                  <thead>
                    <tr className="justify-between text-center">
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    {productsData.map((item: any) => (
                      <tr key={item.category}>
                        <td >
                          <Text size="4" className="text-start ">{item.category}
                          ({item.totalProducts})  &nbsp;</Text>
                        </td>
                        <td>
                          <span className="text-end mx-5"> {item.percentage.toFixed(2)}%</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
      <div className="p-5 border-md mb-5 relative">
        <div className="flex flex-col gap-6">
          <span className="font-bold">Coming Soon</span>
          <h3 >
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className="text-[12px]" >Boost your productivity</span>
          <p className="text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="btn btn-primary btn-outline">
            <MdReadMore />
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
