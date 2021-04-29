import "./style/App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route } from "react-router-dom";
import AddPage from "./pages/AddPage";
import ListPage from "./pages/ListPage";
import Header from "./pages/Header";
import clientIcon from "./images/clientIcon.png";
import bankAccountIcon from "./images/bankAccountIcon.jpg";
import transactionIcon from "./images/transactionIcon.png";
function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/list">
        <Header />
      </Route>
      <Route path="/add">
        <Header />
      </Route>
      <Route exact path="/add/:collectionType">
        <AddPage icons={{ clientIcon, bankAccountIcon, transactionIcon }} />
      </Route>
      <Route exact path="/list/:collectionType">
        <ListPage />
      </Route>
    </BrowserRouter>
  );
}

export default App;
