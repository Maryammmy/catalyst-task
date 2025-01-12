import Carsoul from "../ui/Carsoul";
import { truncateText } from "../../utils/utils";
import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { BASE_URL } from "../../utils/constants";
import Button from "../ui/Button";
import { IProperty } from "../../interfaces/propertyInterface";

interface IProps {
  property: IProperty;
  handleUpdate: (id: number) => void;
  handleDelete: (id: number) => void;
}

function Property({ property, handleUpdate, handleDelete }: IProps) {
  const imagesArray = Array.isArray(property?.images)
    ? property.images
    : JSON.parse(property?.images || "[]");
  return (
    <div className="shadow-md rounded-md overflow-hidden">
      <Link to={`/properties/${property?.id}`} className="block w-[300px]">
        <div className="w-full h-[300px] overflow-hidden">
          <Carsoul>
            {imagesArray?.map((item: string, index: number) => (
              <Image
                key={index}
                imageUrl={item?.startsWith("https:") ? item : BASE_URL + item}
                alt={`Slide ${index}`}
                className="w-full h-[300px] object-cover"
              />
            ))}
          </Carsoul>
        </div>
        <div className="px-2">
          <div className="flex items-center justify-between pt-2">
            <h3 className=" font-bold">{truncateText(property?.name, 15)}</h3>
            <p className="text-stone-500 font-medium">
              {property?.price && Math.round(+property?.price)}EGP night
            </p>
          </div>
          <p className="text-stone-500 font-medium">
            {truncateText(property?.description, 30)}
          </p>
          <p className="text-stone-500 font-medium">
            {truncateText(property?.location, 20)}
          </p>
        </div>
      </Link>
      <div className="flex flex-row justify-between px-2 py-4">
        <Button
          onClick={() => handleUpdate(property?.id)}
          className=" bg-blue-600 hover:bg-blue-400 text-white py-1 w-[80px] rounded-md font-medium"
        >
          Update
        </Button>
        <Button
          onClick={() => handleDelete(property?.id)}
          className="bg-red-600 hover:bg-red-400 text-white py-1  w-[80px] rounded-md font-medium"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Property;
