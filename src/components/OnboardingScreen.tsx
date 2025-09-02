import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { ColorValue } from 'react-native';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: [ColorValue, ColorValue, ColorValue];
}

const onboardingData: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Explore the Unseen',
    description: 'Discover deep ocean biodiversity through AI-driven eDNA analysis without dependency on limited databases',
    icon: '🌊',
    gradient: colors.gradients.ocean,
  },
  {
    id: '2',
    title: 'AI-Powered Insights',
    description: 'Get ecological insights, species abundance, and conservation metrics through advanced machine learning',
    icon: '🧬',
    gradient: colors.gradients.deep,
  },
  {
    id: '3',
    title: 'Conservation Ready',
    description: 'Identify novel taxa and understand ecological interactions for better marine conservation strategies',
    icon: '🐋',
    gradient: colors.gradients.surface,
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onComplete();
    }
  };

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const titleScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const descriptionOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp',
    });

    const iconScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1.2, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slide}>
        <LinearGradient colors={item.gradient} style={styles.slideGradient}>
          <View style={styles.slideContent}>
            <Animated.Text
              style={[
                styles.icon,
                {
                  transform: [{ scale: iconScale }],
                },
              ]}
            >
              {item.icon}
            </Animated.Text>
            
            <Animated.Text
              style={[
                styles.title,
                {
                  transform: [{ scale: titleScale }],
                },
              ]}
            >
              {item.title}
            </Animated.Text>
            
            <Animated.Text
              style={[
                styles.description,
                {
                  opacity: descriptionOpacity,
                },
              ]}
            >
              {item.description}
            </Animated.Text>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.paginationDot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={slidesRef}
        data={onboardingData}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={16}
      />
      
      {renderPagination()}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={scrollTo}>
          <Text style={styles.buttonText}>
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
        
        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={onComplete}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  slide: {
    width,
    height,
  },
  slideGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    fontSize: 120,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 40,
  },
  description: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: width * 0.8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary.lightTeal,
    marginHorizontal: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary.lightTeal,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: colors.primary.lightTeal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 12,
  },
  skipButtonText: {
    color: colors.text.tertiary,
    fontSize: 16,
  },
});

export default OnboardingScreen;
