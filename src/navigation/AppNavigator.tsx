import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../theme/colors';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import SampleUploadScreen from '../screens/SampleUploadScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="SampleUpload" component={SampleUploadScreen} />
    <Stack.Screen name="Results" component={ResultsScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background.primary as string,
            borderTopColor: colors.background.tertiary as string,
            borderTopWidth: 1,
            paddingBottom: 10,
            paddingTop: 10,
            height: 80,
          },
          tabBarActiveTintColor: colors.primary.lightTeal as string,
          tabBarInactiveTintColor: colors.text.tertiary as string,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginBottom: 4,
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🏠</Text>
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Upload"
          component={SampleUploadScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>📤</Text>
            ),
            tabBarLabel: 'Upload',
          }}
        />
        <Tab.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>📊</Text>
            ),
            tabBarLabel: 'Results',
          }}
        />
        <Tab.Screen
          name="Projects"
          component={DashboardScreen} // Placeholder
          options={{
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>📁</Text>
            ),
            tabBarLabel: 'Projects',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={DashboardScreen} // Placeholder
          options={{
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>👤</Text>
            ),
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
