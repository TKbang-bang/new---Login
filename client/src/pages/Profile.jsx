import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  const handleShown = () => {
    document.querySelector(".yn").classList.remove("not-shown");
  };

  return (
    <div className="profile">
      <div className="info">
        <div className="img">
          <img src="../../public/vite.svg" alt="" />
          <div className="choices">
            <div className="btns">
              <Link>Change profile»</Link>
              <button onClick={handleShown}>Delete profile</button>
            </div>
            <div className="yn not-shown">
              <p>Are you sure?</p>
              <div className="yn-btns ">
                <button>Yes</button>
                <button
                  onClick={() =>
                    document.querySelector(".yn").classList.add("not-shown")
                  }
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="credentials">
          <p>Name: user name</p>
          <p>email: user email</p>
        </div>
        <div className="logout">
          <button>Close session</button>
          <button>Delete account</button>
        </div>
      </div>
      <div className="pubs"></div>
    </div>
  );
}

export default Profile;
