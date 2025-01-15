import Header from "./components/Header";
import WidgetCard from "./components/WidgetCard";
import {
  FaCartShopping,
  FaCircleDollarToSlot,
  FaShapes,
  FaShopSlash,
} from "react-icons/fa6";
import DataTable from "./components/DataTable";

function App() {
  return (
    <>
      <div>
        <Header />
        <h1 className="text-4xl">Inventory Stats</h1>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-4">
          <WidgetCard title="Total Products" count="9" icon={FaCartShopping} />
          <WidgetCard
            title="Total Store Value"
            count="30,550"
            icon={FaCircleDollarToSlot}
          />
          <WidgetCard title="Out of Stock" count="2" icon={FaShopSlash} />
          <WidgetCard title="No. of Category" count="2" icon={FaShapes} />
        </div>
        <DataTable />
      </div>
    </>
  );
}

export default App;
