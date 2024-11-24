import axios from "axios";
import React, { useEffect, useState } from "react";
import Other from "../components/Other";

function Others() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      const token = localStorage.getItem("token");
      const myReq = await axios.get("http://localhost:3000/others", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setResult(myReq.data.others);
    };
    getResult();
  }, []);

  return (
    <div className="others">
      {result.map((data) => (
        <Other data={data} key={data.id} />
      ))}
    </div>
  );
}

export default Others;
