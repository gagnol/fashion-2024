import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import PressReleaseDirectory from "@/components/User-navigation/directorio";
import dbConnect from "@/lib/db-connect";
import PressModel from '@/lib/Pressrelease-model';
import Tabmenu from "@/components/User-navigation/tabmenu";
import PeriodistaModel, { Periodista } from '@/lib/periodista-model';
import ComunicadorModel, { Comunicador } from '@/lib/slider-model';

// Type guards para distinguir tipos de usuarios
function isPeriodista(user: any): user is Periodista {
  return (user as Periodista)?.topics !== undefined;
}

function isComunicador(user: any): user is Comunicador {
  return (user as Comunicador)?.sector !== undefined;
}

export default async function ProfileScreen() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/signin");
  }

  await dbConnect();

  const comunicador = await ComunicadorModel.findOne({ email: session.user.email }).lean() as Comunicador | null;
  const periodista = await PeriodistaModel.findOne({ email: session.user.email }).lean() as Periodista | null;

  const noRegistrado = !comunicador && !periodista;

  const ordersDocs = await PressModel.find({ status: "sent" }).sort({ _id: -1 });
  const orders = JSON.parse(JSON.stringify(ordersDocs));

  return (
    <div className="bg-[#F6F6F6] p-4 lg:gap-6 lg:p-6 h-full w-full">
      <main className="bg-white w-full h-full rounded-t-[12px] rounded-b-[12px] shadow-lg">
        <Tabmenu />

        {noRegistrado ? (
          <div className="text-center p-6 text-indigo-500">
            <p>Usted no está todavía registrado en nuestras bases de búsqueda.</p>
          </div>
        ) : (
          <div className="p-6 flex flex-wrap gap-6">
            {/* Primera columna: Información principal */}
            <div className="flex-1 min-w-[250px]">
            <p className="text-green-600 font-semibold mb-2">
                {isPeriodista(periodista) ? "Periodista Registrado" : "Comunicador Registrado"}
              </p>

              <h2><strong> {comunicador?.name ?? periodista?.name ?? "No disponible"} </strong></h2>
                    
            </div>
           
           
          </div>
        )}
        <PressReleaseDirectory orders={orders} />
      </main>
    </div>
  );
}