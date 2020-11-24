import React from "react";

function ProfileExperence({
  current,
  title,
  company,
  location,
  from,
  to,
  description,
}) {
  let FromDate = new Date(from);
  let ToDate;
  if (to) {
    ToDate = new Date(to);
  }
  return (
     
      <div>
        <h3 class="text-dark"> {company} </h3>
        {current ? (
          <p>
            {FromDate.toLocaleString("default", { month: "long" })}{" "}
            {FromDate.getFullYear()} - Current{" "}
          </p>
        ) : (
          <p>
            {FromDate.toLocaleString("default", { month: "long" })}{" "}
            {FromDate.getFullYear()} -{" "}
            {ToDate.toLocaleString("default", { month: "long" })}{" "}
            {ToDate.getFullYear()}{" "}
          </p>
        )}

        <p>
          <strong>Position: </strong>
          {title}
        </p>
        <p>
          <strong>Description: </strong>{description}
        </p>
      </div>
  );
}

export default ProfileExperence;
