import React from "react";
import { Link } from "react-router-dom";
function ProfileItems({
  user: { _id, name, avatar },
  status,
  company,
  location,
  skills,
}) {
  console.log(skills);
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>{company}</span>}{" "}
        </p>
        <Link className="btn btn-primary" to={`/viewProfile/${_id}`}>View Profile</Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, idx) => (
          <li key={idx} className="text-primary">
            <i className="fas fa-check"></i>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileItems;
