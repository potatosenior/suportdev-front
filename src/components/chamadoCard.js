import React from "react";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const ChamadoCard = ({
  onClick,
  id,
  nome,
  cliente,
  descricao,
  status,
  ...rest
}) => {
  return (
    <div {...rest} onClick={e => onClick(e, id)} className="chamadoCard">
      <h2>{cliente}</h2>
      <h5>{nome}</h5>
      <p>{descricao}</p>

      <ArrowRightAltIcon style={{ alignSelf: "flex-end", fontSize: "30" }} />
    </div>
  );
};

export default ChamadoCard;
