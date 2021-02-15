import React from "react";

const PlayerInfoRow = ({playerName, level}) => {
  return (
    <tr>
      <td className="font-weight-bold text-success">{playerName}</td>
      <td>{level} LvL</td>
    </tr>
  )
}

export default PlayerInfoRow;
