export const mapAlertToProps = (reduxState) => {
  return {
    alert: reduxState.alertState,
  };
};

export const mapUserAndProfileToProps = (reduxState) => {
  return {
    user: reduxState.userState.user,
    profile: reduxState.profileState.userProfile,
    repos:reduxState.profileState.repos,
    repoLoading:reduxState.profileState.repoLoading,
    profileFetching: reduxState.profileState.fetchProfile,
    alert: reduxState.alertState,
    profiles:reduxState.profileState.profiles,
    loading:reduxState.profileState.loading,
  };
};

export const mapStateToPropsPost=(reduxState)=>{
  return {
    post: reduxState.postState.post,
    posts:reduxState.postState.posts,
    postLoading:reduxState.postState.loading,
    authUser:reduxState.userState.user,
    alert: reduxState.alertState,
  }
}
