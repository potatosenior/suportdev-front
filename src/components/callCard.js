import React from "react";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Link } from "react-router-dom";

const CallCard = ({ call, client, ...rest }) => {
  return (
    <Link
      className="a"
      style={{ textDecoration: "none" }}
      to={"/calls/view/" + call.id}
    >
      <div {...rest} className="callCard sh-sm">
        <h2>{client.name}</h2>
        <h5>{call.name}</h5>
        <p>{call.description}</p>

        <ArrowRightAltIcon style={{ alignSelf: "flex-end", fontSize: "30" }} />
      </div>
    </Link>
  );
};

export default CallCard;
