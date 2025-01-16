import {
  FaEye,
  FaEyeSlash,
  FaPencil,
  FaTrash,
  FaTriangleExclamation,
} from "react-icons/fa6";
import useUserStore from "../store/userRole";
import useInventoryStore, { IItem } from "../store/inventoryStore";
import EditForm from "./EditForm";
import { useState } from "react";

export default function DataTable() {
  const tableHeaders = [
    "Name",
    "Category",
    "Price",
    "Quantity",
    "Value",
    "Action",
  ];

  const userStore = useUserStore();
  const inventoryStore = useInventoryStore();
  const [isOpen, setIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<IItem | null>(null);

  const onCloseHandler = () => {
    setIsOpen(false);
    setItemToEdit(null);
  };

  const onEditHandler = (item: IItem) => {
    setItemToEdit(item);
    setIsOpen(true);
  };
  const onSaveHandler = (updatedItem: IItem | null) => {
    if (updatedItem) {
      inventoryStore.editItem(updatedItem.name, updatedItem);
    }
    onCloseHandler();
  };

  if (inventoryStore.items && inventoryStore.items.length > 0) {
    return (
      <>
        <div className="mt-4 bg-[#252528] rounded-lg p-4 overflow-x-auto">
          <table className="divide-y divide-gray-700 w-full">
            <thead className="">
              <tr className="grid grid-cols-6  h-14">
                {tableHeaders.map((header, index) => (
                  <th key={index} className="text-left text-[#9DA758]">
                    <h6 className="bg-black rounded-lg p-2 max-w-fit text-xs">
                      {header}
                    </h6>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {inventoryStore.items.map((item, index) => (
                <tr
                  key={index}
                  className={`grid grid-cols-6 h-14 border-y border-gray-600 items-center ${
                    item.disabled ? "text-gray-500" : ""
                  }`}
                >
                  <td className="">{item.name}</td>
                  <td className="">{item.category}</td>
                  <td className="">{item.price}</td>
                  <td className="">{item.quantity}</td>
                  <td className="">{item.value}</td>
                  <td className="flex  gap-4 text-gray-500">
                    <button
                      disabled={!userStore.isAdmin}
                      onClick={() => onEditHandler(item)}
                    >
                      <FaPencil
                        className={
                          userStore.isAdmin && !item.disabled
                            ? "text-green-500"
                            : "text-gray-600"
                        }
                      />
                    </button>
                    <button
                      onClick={() => inventoryStore.disableItem(item.name)}
                      disabled={!userStore.isAdmin}
                    >
                      {userStore.isAdmin && !item.disabled ? (
                        <FaEye
                          className={
                            userStore.isAdmin
                              ? "text-purple-500"
                              : "text-gray-600"
                          }
                        />
                      ) : (
                        <FaEyeSlash
                          className={
                            userStore.isAdmin
                              ? "text-purple-500"
                              : "text-gray-600"
                          }
                        />
                      )}
                    </button>
                    <button
                      disabled={!userStore.isAdmin}
                      onClick={() => inventoryStore.deleteItem(item.name)}
                    >
                      <FaTrash
                        className={
                          userStore.isAdmin ? "text-red-500" : "text-gray-600"
                        }
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <EditForm
          onClose={onCloseHandler}
          isOpen={isOpen}
          initialState={itemToEdit}
          onSave={onSaveHandler}
        />
      </>
    );
  } else {
    return (
      <div className="flex justify-center items-center gap-2 text-3xl h-[80dvh]">
        <FaTriangleExclamation />
        No Data
      </div>
    );
  }
}
