import React from 'react';
import { FlatList as RFlatList, View, Text, ActivityIndicator } from 'react-native';
import GridView from '../../../modules/react-native-super-grid';
import stylesheet from './stylesheet';
import { Button } from '../';

export const FlatList = ({ emptyText, data, type, ...props }) => {
  if (emptyText && (!data || data.length == 0)) {
    const styles = stylesheet.styles();
    const { refreshing = false, onRefresh, ListHeaderComponent } = props;
    return (
      <View style={styles.emptyContainer}>
        {ListHeaderComponent}
        <View style={styles.emptyContainer}>
          {!refreshing && <Text style={styles.emptyText}>{emptyText}</Text>}
          {onRefresh && !refreshing && <Button type="primary gradient" style={styles.emptyButton} text="Reload" onPress={onRefresh} />}
          {onRefresh && refreshing && <ActivityIndicator size="large" />}
        </View>
      </View>
    );
  }
  if (type === 'grid') {
    return <GridView items={data} {...props} />;
  }
  return <RFlatList keyExtractor={(item, i) => i.toString()} data={data} keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive" {...props} />;
};
