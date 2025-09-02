import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { colors } from './src/theme/colors';

// Components
import SplashScreen from './src/components/SplashScreen';
import OnboardingScreen from './src/components/OnboardingScreen';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <SplashScreen />
      </View>
    );
  }

  if (!hasSeenOnboarding) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
