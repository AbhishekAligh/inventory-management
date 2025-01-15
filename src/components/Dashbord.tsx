import Header from "./Header";
import WidgetCard from "./WidgetCard";
import DataTable from "./DataTable";
import useInventoryStore from "../store/inventoryStore";
import {
  FaCartShopping,
  FaCircleDollarToSlot,
  FaShapes,
  FaShopSlash,
} from "react-icons/fa6";
function Dashboard() {
  const {
    totalProducts = () => 0,
    totalStoreValue = () => 0,
    outOfStock = () => 0,
    noOfCategories = () => 0,
  } = useInventoryStore();

  return (
    <div>
      <Header />
      <h1 className="text-4xl">Inventory Stats</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-4">
        <WidgetCard
          title="Total Products"
          count={totalProducts()}
          icon={FaCartShopping}
        />
        <WidgetCard
          title="Total Store Value"
          count={Number(totalStoreValue())}
          icon={FaCircleDollarToSlot}
        />
        <WidgetCard
          title="Out of Stock"
          count={Number(outOfStock())}
          icon={FaShopSlash}
        />
        <WidgetCard
          title="No. of Categories"
          count={Number(noOfCategories())}
          icon={FaShapes}
        />
      </div>
      <DataTable />
    </div>
  );
}

export default Dashboard;
