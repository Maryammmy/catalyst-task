import { convertDateToWords, truncateText } from "../../utils/utils";
import Carsoul from "../ui/Carsoul";
import Image from "../ui/Image";
import { BASE_URL } from "../../utils/constants";
import Button from "../ui/Button";
import { IBooking } from "../../interfaces/bookingInterface";

interface IProps {
  booking: IBooking;
  handleUpdate: (id: number, status: string) => void;
  handleDelete: (id: number, status: string) => void;
}
export default function Booking({
  booking,
  handleUpdate,
  handleDelete,
}: IProps) {
  const imagesArray = Array.isArray(booking?.property?.images)
    ? booking?.property.images
    : JSON.parse(booking?.property?.images || "[]");
  return (
    <div className="block w-[300px] shadow-md rounded-md overflow-hidden">
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
          <h3 className=" font-bold">
            {truncateText(booking?.property?.name, 15)}
          </h3>
          <p className="text-stone-500 font-medium">
            {booking?.property?.price && Math.round(+booking?.property?.price)}
            EGP night
          </p>
        </div>
        <div className="text-stone-500 font-medium flex justify-between">
          <p> {convertDateToWords(booking?.start_date)}</p>
          <p> {convertDateToWords(booking?.end_date)}</p>
        </div>
        <p className="text-stone-500 font-bold">{booking?.status}</p>
      </div>
      <div className="flex flex-row justify-between px-2 py-4">
        <Button
          onClick={() => handleUpdate(booking?.id, booking?.status)}
          className=" bg-blue-600 hover:bg-blue-400 text-white py-1 w-[80px] rounded-md font-medium"
        >
          Update
        </Button>
        <Button
          onClick={() => handleDelete(booking?.id, booking?.status)}
          className="bg-red-600 hover:bg-red-400 text-white py-1  w-[80px] rounded-md font-medium"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
