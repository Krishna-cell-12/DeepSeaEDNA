import { ColorValue } from 'react-native';

export const colors = {
  // Deep Ocean Theme
  primary: {
    deepBlue: '#0B1426' as ColorValue,
    oceanBlue: '#1E3A8A' as ColorValue,
    teal: '#0F766E' as ColorValue,
    seafoam: '#14B8A6' as ColorValue,
    lightTeal: '#5EEAD4' as ColorValue,
  },
  
  // Secondary Colors
  secondary: {
    coral: '#F97316' as ColorValue,
    plankton: '#10B981' as ColorValue,
    seaweed: '#059669' as ColorValue,
    sand: '#F59E0B' as ColorValue,
  },
  
  // Background Colors
  background: {
    primary: '#0B1426' as ColorValue,
    secondary: '#1E293B' as ColorValue,
    tertiary: '#334155' as ColorValue,
    card: '#1E293B' as ColorValue,
    surface: '#0F172A' as ColorValue,
  },
  
  // Text Colors
  text: {
    primary: '#F8FAFC' as ColorValue,
    secondary: '#CBD5E1' as ColorValue,
    tertiary: '#94A3B8' as ColorValue,
    accent: '#5EEAD4' as ColorValue,
    warning: '#F59E0B' as ColorValue,
    error: '#EF4444' as ColorValue,
    success: '#10B981' as ColorValue,
  },
  
  // Gradient Colors
  gradients: {
    ocean: ['#0B1426', '#1E3A8A', '#0F766E'] as [ColorValue, ColorValue, ColorValue],
    deep: ['#0B1426', '#1E293B', '#334155'] as [ColorValue, ColorValue, ColorValue],
    surface: ['#0F766E', '#14B8A6', '#5EEAD4'] as [ColorValue, ColorValue, ColorValue],
    sunset: ['#1E3A8A', '#7C3AED', '#F97316'] as [ColorValue, ColorValue, ColorValue],
  },
  
  // Status Colors
  status: {
    uploading: '#F59E0B' as ColorValue,
    processing: '#3B82F6' as ColorValue,
    completed: '#10B981' as ColorValue,
    error: '#EF4444' as ColorValue,
  },
  
  // Chart Colors
  chart: {
    colors: [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1',
    ] as ColorValue[],
  },
};
