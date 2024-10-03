import React, { useEffect, memo } from 'react';
import { Animated, StyleSheet, Image } from 'react-native';

const FadeImage = memo(({ uri, onFadeOut }) => {
  const fadeAnim = new Animated.Value(0); 

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });

    fadeIn.start(() => {
      const timer = setTimeout(() => {
        fadeOut.start(onFadeOut);
      }, 500); 

      return () => clearTimeout(timer); 
    });
  }, [uri, fadeAnim, onFadeOut]); 

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <Image source={{ uri }} style={styles.image} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  image: {
    width: 200, 
    height: 200,
  },
});

export default FadeImage;
