import React from "react";

function ProfileEducation({
  institution,
  fieldOfStudy,
  from,
  to,
  description,
  current,
  degree,
}) {
  let FromDate = new Date(from);
  let ToDate;
  if (to) {
    ToDate = new Date(to);
  }
  console.log(degree);
  console.log(to);
  return (
    <div>
      <h3 class="text-dark"> {institution} </h3>

      <p>
        {FromDate.toLocaleString("default", { month: "long" })}{" "}
        {FromDate.getFullYear()} -{" "}
        {to ? (
         ToDate.toLocaleString("default", { month: "long" })
        ) : (
            <span> Current </span>
        //   
        )}
      </p>

      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Filed Of Study: </strong>
        {fieldOfStudy}
      </p>
      <p>
        <strong>description</strong>
        {description}
      </p>
    </div>
  );
}

export default ProfileEducation;
