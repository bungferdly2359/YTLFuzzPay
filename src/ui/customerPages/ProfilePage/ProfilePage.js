import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import stylesheet from './stylesheet';
import { getUser } from '../../../redux/api';
import { Image, Button, NavBar, Cell } from '../../components';
import { colors } from '../../../constants';

const mapStateToProps = ({ user }) => ({ user });

class ProfilePage extends Component {
  static navigationOptions = {
    tabBarIcon: 'icon_account'
  };

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const styles = stylesheet.styles();
    const { displayName, email, photoURL } = this.props.user;
    return (
      <View style={styles.container}>
        <NavBar title="Profile" rightButtons={[{ text: 'Edit', onPress: this.edit }]} />
        <ScrollView>
          <LinearGradient colors={[colors.lightOrange, colors.orange]} style={styles.profileContainer}>
            <Image style={styles.image} source={photoURL} />
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{email}</Text>
          </LinearGradient>
          <Cell disclosure>
            <Text style={styles.cellText}>About FuzzPay</Text>
          </Cell>
          <Cell disclosure>
            <Text style={styles.cellText}>Privacy Policy</Text>
          </Cell>
          <Cell>
            <Text style={[styles.cellText, styles.logout]}>Logout</Text>
          </Cell>
          <Button text="Update" onPress={this.update} />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  { getUser }
)(ProfilePage);
