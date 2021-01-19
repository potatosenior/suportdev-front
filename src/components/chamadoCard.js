import React from "react";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

/**
 * Card com informações de cada chamado
 *
 * @param {*} {
 *   onClick, - função para ser chamada ao clicar no card
 *   id, - id do chamado
 *   nome,
 *   cliente,
 *   descricao,
 *   status,
 *   ...rest - outras props
 * }
 * @return {*} Componente div utilizado para listar e selecionar os chamados
 */
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
