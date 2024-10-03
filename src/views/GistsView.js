import React, { useCallback, useState } from 'react';
import { View, FlatList, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import FadeImage from '../components/FadeImage';

const GistsView = ({ gists, loading, loadMoreData }) => {
  const [selectedImageUri, setSelectedImageUri] = useState(null); 

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        setSelectedImageUri(item?.avatar_url); 
      }}
    >

      <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
      <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="tail">
        {item.file_name}
      </Text>
    </TouchableOpacity>
  ), []);

  const renderFooter = () => {
    return loading ? <View style={styles.footer}><ActivityIndicator /></View> : null;
  };

  const handleFadeOut = () => {
    setSelectedImageUri(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={gists}
        keyExtractor={(item, index) => `${item.id}-${index}`} 
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
      {selectedImageUri && (
        <FadeImage uri={selectedImageUri} onFadeOut={handleFadeOut} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 71,
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
    marginRight: 16,
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    lineHeight: 17.89,
    letterSpacing: -0.016,
    textAlign: 'left',
    color: '#000000',
    flex: 1,
  },
  footer: {
    margin: 10,
  },
});

export default GistsView;
