import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const animations = [
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
    ];

    animations.forEach((animation, index) => {
      if (index === 0) {
        animation.start();
      } else {
        setTimeout(() => animation.start(), 1000);
      }
    });
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={colors.gradients.ocean}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* DNA Helix Animation */}
        <Animated.View
          style={[
            styles.dnaContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.dnaStrand}>
            {[...Array(8)].map((_, index) => (
              <View key={index} style={styles.dnaBase}>
                <View style={styles.basePair} />
                <View style={styles.connector} />
              </View>
            ))}
          </View>
        </Animated.View>

        {/* App Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>DeepSea</Text>
          <Text style={styles.subtitle}>eDNA Analysis</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          Exploring the unseen biodiversity of the deep ocean
        </Animated.Text>

        {/* Loading Indicator */}
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.loadingDots}>
            {[...Array(3)].map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.loadingDot,
                  {
                    transform: [
                      {
                        scale: rotateAnim.interpolate({
                          inputRange: [0, 0.33, 0.66, 1],
                          outputRange: [1, 1.2, 1, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dnaContainer: {
    marginBottom: 40,
  },
  dnaStrand: {
    alignItems: 'center',
  },
  dnaBase: {
    alignItems: 'center',
    marginVertical: 2,
  },
  basePair: {
    width: 60,
    height: 4,
    backgroundColor: colors.primary.lightTeal,
    borderRadius: 2,
    shadowColor: colors.primary.lightTeal,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
  connector: {
    width: 2,
    height: 20,
    backgroundColor: colors.primary.seafoam,
    borderRadius: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text.primary,
    textShadowColor: colors.primary.lightTeal,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 24,
    color: colors.text.accent,
    fontWeight: '600',
    marginTop: -8,
  },
  tagline: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: width * 0.8,
    lineHeight: 24,
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary.lightTeal,
    marginHorizontal: 4,
  },
});

export default SplashScreen;
