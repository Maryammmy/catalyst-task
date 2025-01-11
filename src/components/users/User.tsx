import { Fragment } from "react/jsx-runtime";
import { IUser } from "../../interfaces";
import Carsoul from "../ui/Carsoul";
import { truncateText } from "../../utils/utils";
import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { BASE_URL } from "../../utils/constants";
import Button from "../ui/Button";

interface IProps {
  user: IUser;
  handleUpdate: (id: number) => void;
  handleDelete: (id: number) => void;
}

function User({ user, handleUpdate, handleDelete }: IProps) {
  const mediaItems = [
    { type: "image", src: user?.profile_image },
    { type: "video", src: user?.intro_video },
  ];
  return (
    <div>
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
      <div className="flex flex-row justify-between pt-2">
        <Button
          onClick={() => handleUpdate(user?.id)}
          className=" bg-blue-600 hover:bg-blue-400 text-white py-1 w-[80px] rounded-md font-medium"
        >
          Update
        </Button>
        <Button
          onClick={() => handleDelete(user?.id)}
          className="bg-red-600 hover:bg-red-400 text-white py-1  w-[80px] rounded-md font-medium"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default User;
