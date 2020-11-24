import React from "react";

function Alert({ message, messageType}) {
  return (
    <div>
      <div
        className={`alert ${
          messageType !== "error" ? "alert-success" : "alert-danger"
        } `}
        role="alert"
      >
        {message}
      </div>
    </div>
  );
}

export default Alert;
