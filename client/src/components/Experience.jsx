import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { mapUserAndProfileToProps } from "../redux/mapStateToProps";
import { deleteExperiencne} from "../redux/actions/profleAction";
import Spinner from "./common/Spinner";

class Experience extends Component {
  handleDeleteExperience = async (id, e) => {
    const { deleteExperiencne, history } = this.props;
    console.log(id);
    try {
      const message = await deleteExperiencne(id);
    } catch (err) {
      if (err.includes("Authentication failed")) {
        history.push("/login");
        return;
      }
      // Internal server error
    }
  };
  render() {
    const { profile, profileFetching } = this.props;
    return (
      <Fragment>
        <h2 className="my-2">Experience Credentials</h2>

        {!profileFetching && profile.experience.length? (
          <table className="table">
            <thead>
              <tr>
                <th>Comapany</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Year</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {profile.experience.map((exp) => {
                return (
                  <tr key={exp._id}>
                    <td>{exp.company}</td>
                    <td>{exp.title}</td>
                    <td className="hide-sm">
                      <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
                      {exp.to ? (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                      ) : (
                        "NOW"
                      )}
                    </td>
                    <td>
                      <button
                        onClick={this.handleDeleteExperience.bind(
                          this,
                          exp._id
                        )}
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
          <h4 className="text-center text-danger">No Experience is added</h4>
        )}
      </Fragment>
    );
  }
}

export default connect(mapUserAndProfileToProps, { deleteExperiencne })(
  Experience
);
