import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div>
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          style={{ objectFit: "cover" }}
          className="w-96 h-80 object-cover rounded-lg"
        />
        <div className="font-medium">
          <h1 className="text-lg">{name}</h1>
          <p className="text-sm text-primary">
            Price: {unit_amount !== null ? formatPrice(unit_amount) : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}
