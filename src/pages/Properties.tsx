import { useState } from "react";
import Property from "../components/properties/Property";
import { useGetData } from "../hooks/useGetData";
import DeleteModal from "../components/properties/DeleteModal";
import UpdateModal from "../components/properties/UpdateModal";
import { IProperty } from "../interfaces/propertyInterface";
import Pagination from "../components/pagination/Pagination";
import CardSkeleton from "../components/skeleton/CardSkeleton";

const ITEMS_PER_PAGE = 50; // Number of items per page

export default function Properties() {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [id, setId] = useState<null | number>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isPending } = useGetData("propertiesList", "properties");
  const properties: IProperty[] = data?.data || [];

  // Pagination logic
  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedProperties = properties.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(properties.length / ITEMS_PER_PAGE);

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const openDeleteModal = (id: number) => {
    setIsDeleteModal(true);
    setId(id);
  };

  const openUpdateModal = (id: number) => {
    setIsUpdateModal(true);
    setId(id);
  };

  return (
    <>
      {!properties && isPending ? (
        <CardSkeleton cards={20} />
      ) : properties?.length ? (
        <div className="p-2 md:p-5">
          <div className="mx-10 lg:mx-1 xl:mx-20">
            <h1 className="text-[35px] font-bold pb-5">Properties</h1>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-10">
            {paginatedProperties.map((property) => (
              <Property
                property={property}
                key={property?.id}
                handleUpdate={openUpdateModal}
                handleDelete={openDeleteModal}
              />
            ))}
          </div>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[50vh] text-[#AFAFAF] w-full">
          No Properties Found
        </div>
      )}

      {id && isUpdateModal && (
        <UpdateModal
          isOpen={isUpdateModal}
          close={() => setIsUpdateModal(false)}
          id={id}
        />
      )}
      {id && isDeleteModal && (
        <DeleteModal
          isOpen={isDeleteModal}
          close={() => setIsDeleteModal(false)}
          id={id}
        />
      )}
    </>
  );
}
