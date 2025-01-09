import User from "../components/users/User";
import { IUser } from "../interfaces";
import { getUsers } from "../services/usersService";

export default function Users() {
  const { data } = getUsers();
  const users: IUser[] = data?.data.slice(0, 50);
  return (
    <div className="p-5 md:p-10">
      <h1 className="text-[35px] font-bold pb-5">Users</h1>
      <div className="flex flex-col md:flex-row flex-wrap  gap-10">
        {users?.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}
