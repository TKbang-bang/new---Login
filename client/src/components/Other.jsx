import axios from "axios";
import React, { useEffect, useState } from "react";

function Other({ data }) {
  const [added, setAdded] = useState(false);

  const handleAdding = async () => {
    setAdded(true);
    try {
      const token = localStorage.getItem("token");
      const addReq = await axios.post(
        "http://localhost:3000/adding",
        { to: data.id },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="other">
      <img src="../../public/vite.svg" alt="" />
      <div className="extended">
        <h3>{data.name}</h3>
        {added ? (
          <button onClick={() => setAdded(!added)}>Cancel</button>
        ) : (
          <button onClick={handleAdding}>Add</button>
        )}
      </div>
    </div>
  );
}

export default Other;
