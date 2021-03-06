import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = state => ({
  isRegistered: state.user.isRegistered
});

class InitialPage extends PureComponent {
  componentDidMount() {
    const { navigation, isRegistered } = this.props;

    navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: isRegistered ? 'MainTab' : 'Onboarding'
          })
        ]
      })
    );
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps)(InitialPage);
