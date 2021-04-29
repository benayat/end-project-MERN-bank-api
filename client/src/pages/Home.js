import ActionCard from "../components/ActionCard";
import "../style/home.css";
import clientIcon from "../images/clientIcon.png";
import bankAccountIcon from "../images/bankAccountIcon.jpg";
import transactionIcon from "../images/transactionIcon.png";
const Home = (props) => {
  return (
    <div>
      <h1 className="mainHeader">BANK-API USER INTERFACE</h1>
      <div className="container">
        <ActionCard key="client" headline="Clients" icon={clientIcon} />
        <ActionCard
          key="account"
          headline="Bank accounts"
          icon={bankAccountIcon}
        />
        <ActionCard
          key="transfer"
          headline="Transactions"
          icon={transactionIcon}
        />
      </div>
    </div>
  );
};
export default Home;
