import Image from "next/image";
import { SearchParamsTypes } from "@/types/SearchParamsTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";

// Getting the search params from the query object
export default async function Product({ searchParams }: SearchParamsTypes) {
  return (
    // Main div with elements
    <div className="flex flex-col lg:flex-row items-center gap-24 pt-12">
      {/* Getting image with dynamic url and alt from Stripe */}
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={800}
        height={800}
        style={{ objectFit: "cover" }}
        className="md:w-full lg:w-full h-96 object-cover rounded-lg"
      />
      {/* Div with content like title description price and button */}
      <div className="flex flex-col gap-12">
        {/* Getting title and metadata */}
        <h1 className="text-4xl ">{searchParams.name}</h1>
        <p>{searchParams.features}</p>
        {/* Getting the formatted price */}
        <p className="font-bold text-primary">
          {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
        </p>
        {/* Added a button  */}
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
