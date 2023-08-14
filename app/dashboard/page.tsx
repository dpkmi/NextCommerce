import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);

  if (!user) {
    return null;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
      status: "complete",
    },
    include: {
      products: true,
    },
  });
  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  if (orders === null) {
    return <div>You need to ben logged in</div>;
  }

  if (orders.length === 0) {
    return <div>You have no orders</div>;
  }

  return (
    <div>
      {orders.length === 0 ? (
        <h1 className="text-lg">You have no orders</h1>
      ) : (
        <h1 className="text-lg">Your orders</h1>
      )}

      <div className="font-medium lg:grid grid-cols-3 gap-8">
        {orders.map((order) => (
          // Order reference
          <div
            key={order.id}
            className="rounded-lg p-8 my-4 space-y-2 bg-base-200"
          >
            <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
            {/* Status */}
            <p className="text-xs py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orage-500"
                } text-white py-1 rounded-md px-2 mx-2 text-xs`}
              >
                {order.status}
              </span>
            </p>
            {/* Date */}
            <p>{new Date(order.createdDate).toDateString()}</p>
            <p className="text-xs">Total: {formatPrice(order.amount)}</p>
            <div className="text-sm lg:flex lg:gap-8 items-center">
              {order.products.map((product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image!}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover"
                    />
                    <div className="gap-4">
                      <p>{formatPrice(product.unit_amount)}</p>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
