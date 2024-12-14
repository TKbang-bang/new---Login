import axios from "axios";
import React from "react";

function Other({ data }) {
  const handleAdding = () => {
    try {
      axios
        .post("http://localhost:3000/adding", { to: data.id })
        .then((res) => {
          res.data.ok ? window.location.reload() : console.log("retry");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="other">
      <img src="../../public/vite.svg" alt="" />
      <div className="extended">
        <h3>{data.name}</h3>
        <button onClick={handleAdding}>Add</button>
      </div>
    </div>
  );
}

export default Other;
