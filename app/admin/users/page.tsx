import { Toaster } from 'react-hot-toast';
import dbConnect from '@/lib/db-connect';
import UserModel from '@/lib/user-model';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SearchBox from '@/components/dashboard/user/search';
import UserTable from '@/components/dashboard/user/userTable';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


export default async function UserDashboard({ searchParams }:any) {
  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/");
  }

  const query = searchParams.query || '';
  await dbConnect();

  let usersDocs;
  if (query) {
    usersDocs = await UserModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
      
      ]
    }).sort({ _id: -1 });
  } else {
    usersDocs = await UserModel.find().sort({ _id: -1 });
  }

  const users = JSON.parse(JSON.stringify(usersDocs));
  const totalusers = await UserModel.countDocuments({});

  return (
    <div className="w-full p-4 lg:gap-6 lg:p-6 h-full">
    <Breadcrumb className=" ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Users</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 className=" md:text-3xl sm:text-2xl text-xl font-medium my-2">
      All Users{" "}
    </h1>
     <Toaster />
            <SearchBox defaultQuery={query} /> {/* Pass query as default */}
            Total users: {totalusers}
          <div className="overflow-x-auto">
            <UserTable users={users} />
          </div>
      </div>
  );
}
