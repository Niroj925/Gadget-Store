
import OrderMap from "../pages/dashboard/order/OrderMap";
import Delivery from "../pages/delivery/Delivery";
import DeliveryInfo from "../pages/delivery/DeliveryInfo";
import ProtectedDeliveryRoute from "./ProtectedDeliveryRoute";

const DeliveryRoutes = {
    path: "delivery",
    children: [
      {
        path: "",
        element: (
          <ProtectedDeliveryRoute>
            <Delivery/>
          </ProtectedDeliveryRoute>
        ),
      },
      {
        path: "order-info",
        element: <DeliveryInfo/>
      },
      {
        path: "order-map",
        element: <OrderMap/>
      },
    ]
}

export default DeliveryRoutes;