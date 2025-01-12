import { useGetData } from "../hooks/useGetData";
import { Link, useParams } from "react-router-dom";
import Image from "../components/ui/Image";
import { BASE_URL } from "../utils/constants";
import { IProperty } from "../interfaces/propertyInterface";
import { useState } from "react";
import AddModal from "../components/properties/AddModal";
import Button from "../components/ui/Button";
import SingleSkeleton from "../components/skeleton/SingleSkeleton";

function Property() {
  const [isAddModal, setIsAddModal] = useState(false);
  const { id } = useParams();
  const { data, isPending } = useGetData(`property/${id}`, `/properties/${id}`);
  const property: IProperty = data?.data;
  const imagesArray = Array.isArray(property?.images)
    ? property.images
    : JSON.parse(property?.images || "[]");
  return (
    <>
      {!property && isPending ? (
        <SingleSkeleton cards={1} />
      ) : (
        <div className="p-2 md:p-5 container mx-auto">
          <div className="flex flex-row items-center justify-between pb-5">
            <h2 className="font-bold text-2xl">{property?.name}</h2>
            <Button
              onClick={() => setIsAddModal(true)}
              className="bg-blue-600 hover:bg-blue-400 mt-4 font-medium text-white py-1 w-[170px] md:w-[200px] rounded-md"
            >
              Add Property
            </Button>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap gap-5">
            <div className="w-full lg:w-[700px] h-[250px] md:h-[400px] overflow-hidden">
              <video
                src={property?.video}
                controls
                autoPlay
                muted
                className="w-full lg:w-[700px] h-[250px] md:h-[400px] rounded-md object-cover"
              ></video>
            </div>
            {imagesArray?.map((image: string, i: number) => (
              <div
                key={i}
                className="w-full lg:w-[340px] xl:w-[360px] h-[250px] md:h-[400px] overflow-hidden"
              >
                <Image
                  className="w-full lg:w-[340px] xl:w-[360px] h-[250px] md:h-[400px] rounded-md object-cover"
                  imageUrl={
                    image?.startsWith("https:") ? image : BASE_URL + image
                  }
                  alt={`Image ${i + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:justify-between">
            <p className="pt-4 text-lg font-medium">{property?.location}</p>
            <p className="md:pt-4 text-lg font-medium xl:pe-3 2xl:pe-10">
              {property?.price && Math.round(+property?.price)} EGP night
            </p>
          </div>

          <p className="text-stone-500 font-medium max-w-5xl pt-3">
            {property?.description}
          </p>

          <div className="flex justify-center pt-10 gap-10">
            <Button className="block w-[100px] md:w-[200px] text-center py-2 font-medium rounded-md bg-blue-600 text-white">
              Book Now
            </Button>
            <Link
              to="/properties"
              className="block w-[100px] md:w-[200px] text-center py-2 font-medium rounded-md bg-blue-600 text-white"
            >
              Back
            </Link>
          </div>
        </div>
      )}

      <AddModal
        id={property?.user_id}
        isOpen={isAddModal}
        close={() => setIsAddModal(false)}
      />
    </>
  );
}

export default Property;
