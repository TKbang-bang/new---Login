import axios from "axios";
import React, { useEffect, useState } from "react";
import Other from "../components/Other";

function Others() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/others").then((res) => {
        setResult(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
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
