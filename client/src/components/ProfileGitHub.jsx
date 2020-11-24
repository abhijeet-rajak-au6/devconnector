import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "./common/Spinner";
import { getGitHubRepos } from "../redux/actions/profleAction";
import { mapUserAndProfileToProps } from "../redux/mapStateToProps";
import { withRouter } from "react-router-dom";
function ProfileGitHub({ getGitHubRepos, username, repos, repoLoading }) {
  useEffect(() => {
    console.log("hello");
    const getRepos = async () => {
      try {
        const message = await getGitHubRepos(username);
      } catch (err) {
        console.log(err);
      }
    };
    getRepos();
  }, []);
  return repos.length && !repoLoading
    ? repos.map(({ id, ...otherProps }) => (
        <div className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a
                href={otherProps.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {otherProps.name}
              </a>
            </h4>
            <p>{otherProps.description}</p>
          </div>
        </div>
      ))
    : null;
}

export default connect(mapUserAndProfileToProps, { getGitHubRepos })(
  ProfileGitHub
);
