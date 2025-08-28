import GenericMenuList from "../components/GenericMenuList";

const RestaurantMenuList = () => {
  return (
    <GenericMenuList
      endpoint="/FalconQRScan/GetRestaurantMenuList?"
      title="Check Our Restaurant Menu"
    />
  );

};

export default RestaurantMenuList;
