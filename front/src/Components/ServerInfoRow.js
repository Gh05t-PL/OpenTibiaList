import React from "react";

const ServerInfoRow = ({label, value}) => {
  return (
    <tr>
      <td className="font-weight-bold">{label}:</td>
      <td>{value}</td>
    </tr>
  )
}

export default ServerInfoRow;
