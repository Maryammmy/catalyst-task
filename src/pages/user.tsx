import { useGetData } from "../hooks/useGetData";
import { useParams } from "react-router-dom";
import Image from "../components/ui/Image";
import { BASE_URL } from "../utils/constants";
import { IUser } from "../interfaces/userInterface";
import SingleSkeleton from "../components/skeleton/SingleSkeleton";

function User() {
  const { id } = useParams();
  const { data, isPending } = useGetData(`user/${id}`, `/users/${id}`);
  const user: IUser = data?.data;
  return (
    <>
      {!user && isPending ? (
        <SingleSkeleton cards={1} />
      ) : (
        <div className="p-2 md:p-5 container mx-auto">
          <h2 className="font-bold text-2xl">{user?.name}</h2>
          <p className="font-bold text-2xl pb-5">Role: {user?.role}</p>
          <div className="flex flex-col md:flex-row flex-wrap gap-5">
            <div className="w-full lg:w-[300px] xl:w-[400px] h-[250px] md:h-[400px] overflow-hidden">
              <Image
                className="w-full lg:w-[300px] xl:w-[400px] h-[250px] md:h-[400px] rounded-md object-bottom"
                imageUrl={
                  user?.profile_image?.startsWith("https:")
                    ? user?.profile_image
                    : BASE_URL + user?.profile_image
                }
                alt="User profile"
              />
            </div>
            <div className="w-full lg:w-[600px] xl:w-[700px] h-[250px] md:h-[400px] overflow-hidden">
              <video
                src={user?.intro_video}
                controls
                autoPlay
                muted
                className="w-full lg:w-[600px] xl:w-[700px] h-[250px] md:h-[400px] rounded-md object-cover"
              ></video>
            </div>
          </div>
          <p className="text-stone-500 font-medium pt-4 text-lg">
            <span className="text-stone-500 font-bold">Email: </span>
            {user?.email}
          </p>
          <p className="text-stone-500 font-medium text-lg">
            <span className="text-stone-500 font-bold">Phone: </span>
            {user?.phone}
          </p>
        </div>
      )}
    </>
  );
}

export default User;
