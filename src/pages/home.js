import "../App.css";
import React, { useState, useEffect } from "react";
import CreateCall from "../components/createCall";
import CallCard from "../components/callCard";
import CallCardView from "../components/callCardView";
import url from "../services/api";

const Home = () => {
  const [calls, setCalls] = useState([]);
  const [callView, setCallView] = useState(null);

  useEffect(() => {
    fetch(url + "/calls/index", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async response => {
      await response.json().then(result => {
        setCalls(result);
      });
    });
  }, []);

  const getMessages = async id => {
    return await fetch(url + "/calls/messages/index?callId=" + id, {
      method: "GET",
    })
      .then(async response => {
        return await response.json().then(result => {
          return result;
        });
      })
      .catch(e => {
        console.error("error: ", e);
        throw new Error(e);
      });
  };

  const callCardClick = async (e, id) => {
    e.preventDefault();
    const call = calls.find(elem => elem.id === id);
    const msgs = await getMessages(id);
    var result = { ...call, msg: msgs };
    setCallView(result);
  };

  return (
    <main>
      <CreateCall calls={calls} setCalls={setCalls} />

      <div className="calls">
        {calls.length ? (
          calls.map(item => (
            <CallCard
              key={item.id}
              id={item.id}
              onClick={callCardClick}
              name={item.name}
              client={item.client}
              description={item.description}
              status={item.status}
            />
          ))
        ) : (
          <h4>Você ainda não tem nenhum chamado!</h4>
        )}
      </div>

      {callView ? (
        <div className="callView">
          <>
            <CallCardView
              callView={callView}
              setCallView={setCallView}
              calls={calls}
              setCalls={setCalls}
            />
          </>
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default Home;
