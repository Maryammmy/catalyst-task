import { useGetData } from "../hooks/useGetData";
import { Link, useParams } from "react-router-dom";
import { IProperty } from "../interfaces";
import Image from "../components/ui/Image";
import { BASE_URL } from "../utils/constants";

function Property() {
  const { id } = useParams();
  const { data } = useGetData(`property/${id}`, `/properties/${id}`);
  const property: IProperty = data?.data;
  const imagesArray = property?.images ? JSON.parse(property.images) : [];
  return (
    <div className="p-2 md:p-5 container mx-auto">
      <h2 className="font-bold text-2xl pb-5">{property?.name}</h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-5">
        <video
          src={property?.video}
          controls
          autoPlay
          muted
          className="w-full lg:w-[700px] h-[250px] md:h-[400px] rounded-md object-cover"
        ></video>
        {imagesArray?.map((image: string, i: number) => (
          <Image
            key={i}
            className="w-full lg:w-[340px] xl:w-[360px] h-[250px] md:h-[400px] bg-slate-300 rounded-md object-cover"
            imageUrl={BASE_URL + image}
            alt={`Image ${i + 1}`}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <p className="pt-4 text-lg font-medium">{property?.location}</p>
        <p className="md:pt-4 text-lg font-medium xl:pe-3 2xl:pe-10">
          {property?.price && Math.round(+property?.price)}EGP night
        </p>
      </div>
      <p className="text-stone-500 font-medium max-w-5xl pt-3">
        {property?.description}
      </p>

      <div className="flex  justify-center pt-10 gap-10">
        <Link
          to="/booking"
          className="block w-[100px] md:w-[200px] text-center py-2 font-medium rounded-md bg-blue-600 text-white"
        >
          Book Now
        </Link>
        <Link
          to="/properties"
          className="block w-[100px] md:w-[200px]  text-center  py-2 font-medium rounded-md bg-blue-600 text-white"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default Property;
