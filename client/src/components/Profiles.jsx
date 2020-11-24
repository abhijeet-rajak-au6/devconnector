import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../redux/actions/profleAction";
import { mapUserAndProfileToProps } from '../redux/mapStateToProps';
import Spinner from '../components/common/Spinner';
import ProfileItems from '../components/ProfileItems';

class Profiles extends Component {
  async componentDidMount() {
    const { getProfiles } = this.props;

    try {
      const message = await getProfiles();
      console.log(message);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { profiles, loading } = this.props;
    return profiles.length && !loading ?   (
      <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
              <i className="fab fa-connectdevelop"></i>
              Browse and connect with developers
          </p>
          <div className="profiles">
              { profiles.map(({_id,...others})=>{
                 return  <ProfileItems key={_id} {...others} />
              }) }
          </div>
      </Fragment>
    ):(<Spinner/>);
  }
}
export default connect(mapUserAndProfileToProps, { getProfiles })(Profiles);
