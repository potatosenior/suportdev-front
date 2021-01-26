import React from "react";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const CallCard = ({
  onClick,
  id,
  name,
  client,
  description,
  status,
  ...rest
}) => {
  return (
    <div {...rest} onClick={e => onClick(e, id)} className="callCard">
      <h2>{client}</h2>
      <h5>{name}</h5>
      <p>{description}</p>

      <ArrowRightAltIcon style={{ alignSelf: "flex-end", fontSize: "30" }} />
    </div>
  );
};

export default CallCard;
