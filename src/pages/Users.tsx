import User from "../components/users/User";
import { useGetData } from "../hooks/useGetData";
import { IUser } from "../interfaces";

export default function Users() {
  const { data } = useGetData("usersList", "users");
  const users: IUser[] = data?.data.slice(0, 50);
  return (
    <div className="p-2 md:p-5">
      <h1 className="text-[35px] font-bold pb-5">Users</h1>
      <div className="flex flex-col md:flex-row flex-wrap  justify-center items-center gap-10">
        {users?.map((user) => (
          <User user={user} key={user?.id} />
        ))}
      </div>
    </div>
  );
}
