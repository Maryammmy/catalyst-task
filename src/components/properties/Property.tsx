import { Fragment } from "react/jsx-runtime";
import { IProperty } from "../../interfaces";
import Carsoul from "../ui/Carsoul";
import { truncateText } from "../../utils/utils";
import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { BASE_URL } from "../../utils/constants";

interface IProps {
  property: IProperty;
}

function Property({ property }: IProps) {
  const imagesArray = property?.images ? JSON.parse(property.images) : [];
  const mediaItems = [
    ...imagesArray.map((image: string) => ({ type: "image", src: image })),
    { type: "video", src: property?.video },
  ];

  return (
    <Link to={`/properties/${property?.id}`} className="block w-[300px]">
      <div className="w-full h-[300px] overflow-hidden rounded-md">
        <Carsoul>
          {mediaItems.map((item, index) => (
            <Fragment key={index}>
              {item.type === "image" ? (
                <Image
                  imageUrl={BASE_URL + item.src}
                  alt={`Slide ${index}`}
                  className="w-full h-[300px] object-cover"
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  autoPlay
                  muted
                  className="w-full h-[300px] object-cover"
                ></video>
              )}
            </Fragment>
          ))}
        </Carsoul>
      </div>
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
    </Link>
  );
}

export default Property;
