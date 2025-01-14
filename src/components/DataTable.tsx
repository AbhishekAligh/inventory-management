import { useEffect, useState } from "react";
import { FaEye, FaPencil, FaTrash } from "react-icons/fa6";

export default function DataTable() {
  //   const data = [
  //     {
  //       name: "Bluetooth",
  //       category: "Electronic",
  //       value: "$150",
  //       quantity: 5,
  //       price: "$30",
  //     },
  //     {
  //       name: "Edifier M43560",
  //       category: "Electronic",
  //       value: "0",
  //       quantity: 0,
  //       price: "$0",
  //     },
  //     {
  //       name: "Sony 4k ultra 55 inch TV",
  //       category: "Electronic",
  //       value: "$1190",
  //       quantity: 17,
  //       price: "$70",
  //     },
  //     {
  //       name: "Samsumg 55 inch TV",
  //       category: "Electronic",
  //       value: "$600",
  //       quantity: 50,
  //       price: "$12",
  //     },
  //     {
  //       name: "samsumg S34 Ultra",
  //       category: "phone",
  //       value: "$0",
  //       quantity: 0,
  //       price: "$0",
  //     },
  //   ];

  const tableHeaders = [
    "Name",
    "Category",
    "Value",
    "Quantity",
    "Price",
    "Action",
  ];
  interface IProducts {
    name: string;
    category: string;
    value: number;
    quantity: number;
    price: number;
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  if (data && data.length > 0) {
    return (
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
            {data.map((item: IProducts, index) => (
              <tr
                key={index}
                className="grid grid-cols-6  h-14 border-y border-gray-600 items-center"
              >
                <td className="">{item.name}</td>
                <td className="">{item.category}</td>
                <td className="">{item.value}</td>
                <td className="">{item.quantity}</td>
                <td className="">{item.price}</td>
                <td className="flex  gap-4 text-gray-500">
                  <button onClick={() => console.log("Meow")}>
                    <FaPencil />
                  </button>
                  <button>
                    <FaEye />
                  </button>
                  <button>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div> No Data</div>;
  }
}
