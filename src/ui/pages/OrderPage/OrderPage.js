import React, { PureComponent } from 'react';
import { Text, View, KeyboardAvoidingView, FlatList } from 'react-native';
import stylesheet from './stylesheet';
import { Image, Button, NavBar, Input, CheckBox, Section } from '../../components';
import resources from '../../resources';

export default class OrderPage extends PureComponent {
  static navigationOptions = {
    tabBarIcon: 'icon_orders'
  };

  render() {
    const styles = stylesheet.styles();
    const data = [
      { name: 'John Doe', orders: [{ detail: 'Fried Fish Porridge', subdetail: '- Less Chilli' }] },
      {
        orders: [
          { detail: 'Fried Fish Porridge', subdetail: '- Less Chilli' },
          { detail: 'Fried Chicken Porridge', subdetail: '' },
          { detail: 'Steamed Chicken Porridge', subdetail: '' }
        ]
      },
      { orders: [{ detail: 'Steamed Chicken Porridge', subdetail: '- Less Chilli' }] }
    ];
    return (
      <View style={styles.container}>
        <NavBar title={this.props.navigation.state.routeName} />
        <FlatList
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, i) => i.toString()}
          data={data}
          renderItem={({ item }) => (
            <Section style={styles.itemContainer}>
              {item.name && (
                <View style={styles.iconContainer}>
                  <Image style={styles.iconImage} />
                  <Text style={styles.iconText}>{item.name}</Text>
                </View>
              )}
              <View style={styles.ordersContainer}>
                {item.orders.map((o, i) => (
                  <View key={i} style={styles.orderContainer}>
                    <Text style={styles.detail}>{o.detail}</Text>
                    {(o.subdetail || '').length > 0 && <Text style={styles.subdetail}>{o.subdetail}</Text>}
                  </View>
                ))}
              </View>
              <CheckBox style={styles.checkbox} />
            </Section>
          )}
        />
      </View>
    );
  }
}
