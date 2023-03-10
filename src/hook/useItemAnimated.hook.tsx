import React, { useRef } from 'react';
import { Animated } from 'react-native';

function useItemAnimated(index: number) {
  const rightValue = useRef(new Animated.Value(1000)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const close = () => {
    Animated.timing(rightValue, {
      toValue: 1000,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const start = () => {
    Animated.timing(rightValue, {
      toValue: 0,
      duration: index * 200 + 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return { start, close, rightValue, fadeAnim };
}

export default useItemAnimated;
