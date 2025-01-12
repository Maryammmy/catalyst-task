import { truncateText } from "../../utils/utils";
import { Link } from "react-router-dom";
import Image from "../ui/Image";
import { BASE_URL } from "../../utils/constants";
import Button from "../ui/Button";
import { IUser } from "../../interfaces/userInterface";

interface IProps {
  user: IUser;
  handleUpdate: (id: number) => void;
  handleDelete: (id: number) => void;
}

function User({ user, handleUpdate, handleDelete }: IProps) {
  return (
    <div className="shadow-md rounded-md overflow-hidden">
      <Link to={`/users/${user?.id}`} className="block w-[300px]">
        <div className="w-full h-[300px] overflow-hidden">
          <Image
            imageUrl={
              user?.profile_image?.startsWith("https:")
                ? user?.profile_image
                : BASE_URL + user?.profile_image
            }
            alt="Slide"
            className="w-full h-full object-bottom"
          />
        </div>
        <div className="px-2">
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
        </div>
      </Link>
      <div className="flex flex-row justify-between px-2 py-4">
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
