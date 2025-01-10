import { Fragment } from "react/jsx-runtime";
import { IUser } from "../../interfaces";
import Carsoul from "../ui/Carsoul";
import { truncateText } from "../../utils/utils";
import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { BASE_URL } from "../../utils/constants";

interface IProps {
  user: IUser;
}

function User({ user }: IProps) {
  const mediaItems = [
    { type: "image", src: user?.profile_image },
    { type: "video", src: user?.intro_video },
  ];

  return (
    <Link to={`/users/${user?.id}`} className="block w-[300px]">
      <div className="w-full h-[300px] overflow-hidden rounded-md">
        <Carsoul>
          {mediaItems.map((item, index) => (
            <Fragment key={index}>
              {item.type === "image" ? (
                <Image
                  imageUrl={
                    item.src.startsWith("https:")
                      ? item.src
                      : BASE_URL + item.src
                  }
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
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
        <h3 className=" font-bold">{truncateText(user?.name, 10)}</h3>
        <p className="text-stone-500 font-medium">{user?.role}</p>
      </div>
      <p className="text-stone-500 font-medium">
        {truncateText(user?.phone, 15)}
      </p>
      <p className="text-stone-500 font-medium">
        {truncateText(user?.email, 15)}
      </p>
    </Link>
  );
}

export default User;
