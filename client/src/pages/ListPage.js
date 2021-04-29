import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import localForage from "localforage";
import "../style/listPage.css";
import Table from "../components/Table";
import bankAccountIcon from "../images/bankAccountIcon.jpg";
import clientIcon from "../images/clientIcon.png";
import transactionIcon from "../images/transactionIcon.png";
const ListPage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [collection, setCollection] = useState(null);
  const { collectionType } = useParams();
  console.log(collectionType);

  useEffect(() => {
    const loader = async () => {
      console.log(collectionType);
      const currentCollection = (await axios.get(`/api/${collectionType}`))
        .data;
      console.log(currentCollection);
      await localForage.setItem(collectionType, currentCollection);
      setCollection(currentCollection);
      setLoaded(true);
    };
    if (!loaded) {
      loader();
    }
  }, [collectionType, loaded]);

  return (
    <div>
      <div className="aboveTable">
        <h1 className="listHeader">
          {collectionType.toUpperCase()} collection
        </h1>
        <img
          alt="icon"
          src={
            collectionType !== "clients"
              ? collectionType !== "bankaccounts"
                ? transactionIcon
                : bankAccountIcon
              : clientIcon
          }
        />
      </div>
      {loaded && collection.length > 0 && <Table collection={collection} />}
    </div>
  );
};
export default ListPage;
