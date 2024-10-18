
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db-connect';
import UserModel from '@/lib/user-model';
import PeriodistaModel from '@/lib/periodista-model';
import UserUpdate from '@/components/User-navigation/update-user';
import EditAvatar from '@/components/User-navigation/editavatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import EditPeriodista from '@/components/User-navigation/editperiodista';


export default async function SettingsScreen() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/signin');
  }

  await dbConnect();
  const userDocs = await UserModel.findOne({ email: session.user.email });
  const users = JSON.parse(JSON.stringify(userDocs));

  const periodistaDocs = await PeriodistaModel.findOne({ email: session.user.email });
  const periodista = JSON.parse(JSON.stringify(periodistaDocs)); 
 
  return (
    <div className="container max-w-screen-xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* User Info Card */}
        <Card className="md:col-span-1 p-0 shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">Tu cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-lg font-semibold text-center">
              {session?.user?.name}
            </h2>
            <p className="text-sm text-center text-gray-500">
              {session?.user?.email}
            </p>
            <Separator className="my-4" />
            <EditAvatar user={users}/>
          </CardContent>
        </Card>
        {/* User Update Section */}
        <div className="md:col-span-3">
          <Card className="p-6 shadow-md">
            <CardContent>
              <UserUpdate session={session}/>
          {/*<EditPeriodista user={users} periodista={periodista}/>*/}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
