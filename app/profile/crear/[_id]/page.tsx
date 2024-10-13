import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/Pressrelease-model";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PressRelease {
  _id: string;
  title: string;
  content: string;
  mediaType: string;
  topic: string;
  location: string;
  reach: string;
  distributionDate?: string;
  status: string;
  email: string;
  image?: string;
  createdAt: string;
}

export default async function orderPage({ params }: { params: { _id: string } }) {
  const _id = params._id;

  await dbConnect();
  const orderDocs = await OrderModel.findOne({ _id });
  const order = JSON.parse(JSON.stringify(orderDocs));

  return (
    <div className="min-w-full mx-auto p-6">
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Image - 40% of the space */}
          {order.image && (
            <div className="relative lg:col-span-2 w-full h-96">
              <Image
                src={order.image}
                alt="Imagen del order"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}

          {/* Content - 60% of the space */}
          <div className="flex flex-col justify-center space-y-4 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-5xl font-bold">{order.title}</CardTitle>
              <CardDescription className="text-lg text-gray-500">
                Publicado el {new Date(order.createdAt).toLocaleDateString("es-ES")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700">{order.content}</p>

              {/* Badges with increased size */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Badge className="text-sm py-2 px-3">{order.mediaType}</Badge>
                <Badge className="text-sm py-2 px-3">{order.topic}</Badge>
                <Badge className="text-sm py-2 px-3">{order.location}</Badge>
                <Badge className="text-sm py-2 px-3">{order.reach}</Badge>
              </div>
              {order.distributionDate && (
                <p className="text-sm text-gray-500">
                  Fecha de distribución:{" "}
                  {new Date(order.distributionDate).
                  toLocaleDateString("es-ES")}
                </p>
              )}

              <p className="text-lg text-gray-500 my-6">Publicado por: {order.email}</p>
            </CardContent>

            {/* Volver Button */}
            <div className="m-6 justify-center">
              <Link href="/profile/main">
                <Button className="px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-black transition">
                <ArrowLeft className="w-4 h-4" />Volver
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Helper function for status colors
function getStatusColor(status: string) {
  switch (status) {
    case "draft":
      return "bg-gray-200";
    case "scheduled":
      return "bg-yellow-200";
    case "sent":
      return "bg-green-200";
    default:
      return "";
  }
}
