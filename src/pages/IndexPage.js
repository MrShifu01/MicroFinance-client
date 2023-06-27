import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setClients } from "../redux/clientsSlice";
import { setLoans } from "../redux/loansSlice";
import ClientTable from "../components/ClientTable";

const IndexPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
        try {
          const clientResponse = await axios.get("/clients");
          const loanResponse = await axios.get("/loans");

          dispatch(setClients(clientResponse.data));
          dispatch(setLoans(loanResponse.data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };
    getData();
  }, [dispatch]);

  return (
    <div>
      <ClientTable />
    </div>
  );
};

export default IndexPage;
