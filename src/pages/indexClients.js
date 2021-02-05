import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import url from "../services/api";
import Table from "../components/table";
import phoneMask from "../utils/masks/phone";
import cpfMask from "../utils/masks/cpf";
import "../css/createCall.css";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    flex: 1,
    headerName: "Nome",
    // width: 160
  },
  {
    field: "cpf",
    headerName: "CPF",
    // width: 150,
    flex: 1,
    valueFormatter: ({ value }) => cpfMask(value),
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    // width: 150,
  },
  {
    field: "phone",
    headerName: "Número",
    // width: 150,
    flex: 1,
    valueFormatter: ({ value }) => phoneMask(value),
  },
  {
    field: "birthday",
    headerName: "Data de Nascimento",
    type: "date",
    flex: 1,
    valueFormatter: ({ value }) => new Date(value),
    // width: 170,
  },
];

const IndexClients = () => {
  const [clients, setClients] = useState([]);
  let history = useHistory();

  useEffect(() => {
    fetch(url + "/clients/index", {
      method: "GET",
    }).then(async response => {
      await response.json().then(result => {
        setClients(result);
      });
    });
  }, []);

  const clickHandler = props => {
    history.push("/clients/view/" + props.row.id);
  };

  return (
    <div className="pg-container">
      <Navbar></Navbar>

      <div className="pg-content">
        <div className="fl fl-cl jf-center al-center">
          {clients.length ? (
            <div style={{ overflowX: "auto", width: "80vw" }}>
              <Table
                clickHandler={clickHandler}
                columns={columns}
                rows={clients}
              ></Table>
            </div>
          ) : (
            <div>
              <h4 style={{ textAlign: "center" }}>
                Nenhum cliente cadastrado :(
              </h4>

              <Link to="/clients/create">Cadastrar um novo cliente</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default IndexClients;
