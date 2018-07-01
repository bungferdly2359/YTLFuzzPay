import React, { Component } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import stylesheet from './stylesheet';
import { getUser, logout } from '../../../redux/user';
import { Image, NavBar, Cell } from '../../components';
import { colors } from '../../../constants';

const mapStateToProps = ({ user }) => ({ user });

class ProfilePage extends Component {
  static navigationOptions = {
    tabBarIcon: 'icon_account'
  };

  componentDidMount() {
    this.props.getUser();
  }

  logout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () =>
          this.props.logout().then(() =>
            this.props.navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Onboarding' })],
                key: null
              })
            )
          )
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  render() {
    const styles = stylesheet.styles();
    const { displayName, email, photoURL } = this.props.user;
    return (
      <View style={styles.container}>
        <NavBar title="Profile" rightButtons={[{ text: 'Edit', onPress: () => this.props.navigation.navigate('ProfileEdit') }]} />
        <ScrollView>
          <LinearGradient colors={[colors.lightOrange, colors.orange]} style={styles.profileContainer}>
            <Image style={styles.image} source={photoURL} />
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{email}</Text>
          </LinearGradient>
          <Cell disclosure onPress={() => this.props.navigation.navigate('About')}>
            <Text style={styles.cellText}>About FuzzPay</Text>
          </Cell>
          <Cell disclosure onPress={() => this.props.navigation.navigate('Privacy')}>
            <Text style={styles.cellText}>Privacy Policy</Text>
          </Cell>
          <Cell onPress={this.logout}>
            <Text style={[styles.cellText, styles.logout]}>Logout</Text>
          </Cell>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { getUser, logout }
)(ProfilePage);
