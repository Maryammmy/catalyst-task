import { Fragment } from "react/jsx-runtime";
import { IBooking } from "../../interfaces";
import { convertDateToWords, truncateText } from "../../utils/utils";
import Carsoul from "../ui/Carsoul";
import Image from "../ui/Image";
import { BASE_URL } from "../../utils/constants";

interface IProps {
  booking: IBooking;
}
export default function Booking({ booking }: IProps) {
  const imagesArray = booking?.property?.images
    ? JSON.parse(booking?.property.images)
    : [];
  const mediaItems = [
    ...imagesArray.map((image: string) => ({ type: "image", src: image })),
    { type: "video", src: booking?.property?.video },
  ];
  console.log(booking);
  return (
    <div className="block w-[300px]">
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
        <h3 className=" font-bold">
          {truncateText(booking?.property?.name, 15)}
        </h3>
        <p className="text-stone-500 font-medium">
          {booking?.property?.price && Math.round(+booking?.property?.price)}EGP
          night
        </p>
      </div>
      <div className="text-stone-500 font-medium flex justify-between">
        <p> {convertDateToWords(booking?.start_date)}</p>
        <p> {convertDateToWords(booking?.end_date)}</p>
      </div>
      <p className="text-stone-500 font-bold">{booking?.status}</p>
    </div>
  );
}
