import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // get user
      const user = await getServerSession(req, res, authOptions);

      if (!user) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const orders = await prisma.order.findMany({
        where: {
          userId: user?.user?.id,
        },
        include: {
          products: true,
        },
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }else{
        res.setHeader("Allow", "GET")
        res.status(405).end("Method not allowed")
    }
  }
}
