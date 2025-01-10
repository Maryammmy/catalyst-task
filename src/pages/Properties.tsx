import Property from "../components/properties/Property";
import { useGetData } from "../hooks/useGetData";
import { IProperty } from "../interfaces";

export default function Properties() {
  const { data } = useGetData("propertiesList", "properties");
  const properties: IProperty[] = data?.data.slice(0, 50);
  return (
    <div className="p-2 md:p-5 ">
      <h1 className="text-[35px] font-bold pb-5">Properties</h1>
      <div className="flex flex-col md:flex-row flex-wrap  justify-center items-center gap-10">
        {properties?.map((property) => (
          <Property property={property} key={property?.id} />
        ))}
      </div>
    </div>
  );
}
