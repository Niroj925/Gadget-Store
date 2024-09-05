
import Delivery from "../pages/delivery/Delivery";
import DeliveryInfo from "../pages/delivery/DeliveryInfo";



const DeliveryRoutes = {
    path: "delivery",
    children: [
      {
        path: "",
        element: <Delivery/>,
      },
      {
        path: "order-info",
        element: <DeliveryInfo/>
      },
    ]
}

export default DeliveryRoutes;