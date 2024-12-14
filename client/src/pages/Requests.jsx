import React from "react";
import axios from "axios";

function Requests() {
  axios.get("http://localhost:3000/requests").then((res) => {
    console.log(res.data.data);
  });

  return (
    <div>
      <h1>Requests</h1>
    </div>
  );
}

export default Requests;
