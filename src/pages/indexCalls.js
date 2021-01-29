import React, { useState, useEffect } from "react";
import CallCard from "../components/callCard";
import Navbar from "../components/navbar";
import "../css/createCall.css";
import url from "../services/api";

const IndexCalls = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    fetch(url + "/calls/index", {
      method: "GET",
    }).then(async response => {
      await response.json().then(rawCalls => {
        let parsedCalls = [];

        rawCalls.forEach(async (call, idx) => {
          let client = await fetch(url + "/clients/index/" + call.client_id, {
            method: "GET",
          }).then(async response => await response.json());

          parsedCalls.push({ ...call, client });

          if (idx === rawCalls.length - 1) setCalls(parsedCalls);
        });
      });
    });
  }, []);

  return (
    <div className="pg-container">
      <Navbar></Navbar>

      <div className="pg-content">
        <div className="fl fl-cl jf-center al-center">
          {calls.length ? (
            calls.map(item => (
              <CallCard key={item.id} call={item} client={item.client} />
            ))
          ) : (
            <div>
              <h4 style={{ textAlign: "center" }}>
                Você ainda não tem nenhum chamado :(
              </h4>
              <a href="/calls/create">Criar um novo chamado</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default IndexCalls;
