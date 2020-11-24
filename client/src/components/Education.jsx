import React, { Component, Fragment } from "react";
import { connect, } from "react-redux";
import { withRouter } from 'react-router-dom';
import Moment from "react-moment";
import { mapUserAndProfileToProps } from "../redux/mapStateToProps";
import { deleteEducation } from "../redux/actions/profleAction";
import Spinner from "./common/Spinner";
class Education extends Component {
  handleDeleteEducation = async (id, e) => {
    const { deleteEducation, history } = this.props;
    try {
      console.log(id);
      await deleteEducation(id);
    } catch (err) {
      if (err.includes("Authentication failed")) {
        history.push("/login");
        return;
      }
      // internal server error
    }
  };
  render() {
    const { profile, profileFetching } = this.props;
    return (
      <Fragment>
        <h2 className="my-2">Education Credentials</h2>

        {!profileFetching && profile.education.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Institution</th>
                <th className="hide-sm">Degree</th>
                <th className="hide-sm">Year</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {profile.education.map((edu) => {
                return (
                  <tr key={edu._id}>
                    <td>{edu.institution}</td>
                    <td>{edu.degree}</td>
                    <td className="hide-sm">
                      <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                      {edu.to ? (
                        <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                      ) : (
                        "NOW"
                      )}
                    </td>
                    <td>
                      <button
                        onClick={this.handleDeleteEducation.bind(this, edu._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h4 className="text-center text-danger">No Education is added</h4>
        )}
      </Fragment>
    );
  }
}

export default connect(mapUserAndProfileToProps, { deleteEducation })(
  withRouter(Education)
);
