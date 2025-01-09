import { Fragment } from "react/jsx-runtime";
import { IUser } from "../../interfaces";
import Carsoul from "../ui/Carsoul";

interface IProps {
  user: IUser;
}

function User({ user }: IProps) {
  const mediaItems = [
    { type: "image", src: user?.profile_image },
    { type: "video", src: user?.intro_video },
  ];

  return (
    <div className="w-[300px]">
      <div className="w-full h-[300px] overflow-hidden rounded-md">
        <Carsoul>
          {mediaItems.map((item, index) => (
            <Fragment key={index}>
              {item.type === "image" ? (
                <img
                  src={item.src}
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
        <h3 className=" font-bold">{user?.name}</h3>
        <p className="text-stone-500 font-medium">{user?.role}</p>
      </div>
      <p className="text-stone-500 font-medium">{user?.phone}</p>
      <p className="text-stone-500 font-medium">{user?.email}</p>
    </div>
  );
}

export default User;
