import React, { useCallback } from 'react';
import { View, FlatList, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

const GistsView = ({ gists, loading, loadMoreData }) => {
  // Memoized component to avoid unnecessary re-renders
  const renderItem = useCallback(({ item }) => (
    <View style={styles.listItem}>
      {/* User profile image */}
      <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
      {/* File name */}
      <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="tail">
        {item.file_name}
      </Text>
    </View>
  ), []);

  const renderFooter = () => {
    return loading ? <View style={styles.footer}><ActivityIndicator /></View> : null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={gists}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 71, // Set the height of each cell to 71px
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    margin: 10,
  },
  fileName: {
    marginLeft: 16,
    marginRight: 16, // Add right padding for 16px
    fontFamily: 'Helvetica Neue', // Set font family
    fontSize: 15, // Set font size
    lineHeight: 17.89, // Set line height
    letterSpacing: -0.016, // Set letter spacing
    textAlign: 'left', // Set text alignment
    color: '#000000', // Retaining color for consistency
    flex: 1, // Allow the text to take available space
  },
  footer: {
    margin: 10,
  },
});

export default GistsView;
