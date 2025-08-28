import GenericMenuList from "../components/GenericMenuList";

const MenuCard = () => {
  return (
    <GenericMenuList
      endpoint="/FalconQRScan/GetposItem?"
      title="Check Our FALCON Menu"
    />
  );
};

export default MenuCard;
