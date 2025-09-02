import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { ColorValue } from 'react-native';

const { width } = Dimensions.get('window');

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: [ColorValue, ColorValue, ColorValue];
  onPress: () => void;
}

const DashboardScreen: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const dashboardCards: DashboardCard[] = [
    {
      id: 'new-analysis',
      title: 'New Analysis',
      description: 'Upload raw sequencing files (FASTA/FASTQ) for AI-powered analysis',
      icon: '🧬',
      gradient: colors.gradients.ocean,
      onPress: () => console.log('New Analysis pressed'),
    },
    {
      id: 'sample-explorer',
      title: 'Sample Explorer',
      description: 'Browse samples by location, depth, and sample type',
      icon: '🌊',
      gradient: colors.gradients.deep,
      onPress: () => console.log('Sample Explorer pressed'),
    },
    {
      id: 'biodiversity-insights',
      title: 'Biodiversity Insights',
      description: 'View richness, abundance, and novel taxa predictions',
      icon: '📊',
      gradient: colors.gradients.surface,
      onPress: () => console.log('Biodiversity Insights pressed'),
    },
    {
      id: 'saved-projects',
      title: 'Saved Projects',
      description: 'Access previously analyzed datasets and results',
      icon: '📌',
      gradient: colors.gradients.sunset,
      onPress: () => console.log('Saved Projects pressed'),
    },
  ];

  const renderCard = (card: DashboardCard) => {
    const isSelected = selectedCard === card.id;
    
    return (
      <TouchableOpacity
        key={card.id}
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => {
          setSelectedCard(card.id);
          card.onPress();
        }}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={card.gradient}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardIcon}>{card.icon}</Text>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
          </View>
          
          <View style={styles.cardOverlay}>
            <View style={styles.cardShine} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderQuickStats = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Quick Overview</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Active Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Samples Analyzed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Novel Taxa Found</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Research Papers</Text>
        </View>
      </View>
    </View>
  );

  const renderRecentActivity = () => (
    <View style={styles.activityContainer}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Text style={styles.activityIconText}>🧬</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Sample Analysis Completed</Text>
            <Text style={styles.activityDescription}>
              Deep-sea sediment sample from Mariana Trench analyzed successfully
            </Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
        
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Text style={styles.activityIconText}>🐋</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Novel Species Detected</Text>
            <Text style={styles.activityDescription}>
              3 potentially new species identified in hydrothermal vent samples
            </Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={colors.gradients.deep}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back, Researcher</Text>
          <Text style={styles.subtitle}>
            Ready to explore the deep ocean biodiversity?
          </Text>
        </View>

        {/* Main Cards */}
        <View style={styles.cardsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.cardsGrid}>
            {dashboardCards.map(renderCard)}
          </View>
        </View>

        {/* Quick Stats */}
        {renderQuickStats()}

        {/* Recent Activity */}
        {renderRecentActivity()}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 20,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 50) / 2,
    height: 160,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.primary.deepBlue,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  cardSelected: {
    transform: [{ scale: 0.95 }],
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardContent: {
    alignItems: 'center',
    padding: 20,
    zIndex: 2,
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  cardShine: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    bottom: -50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 100,
    transform: [{ rotate: '45deg' }],
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 50) / 2,
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary.deepBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary.lightTeal,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  activityContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: colors.background.card,
    padding: 16,
    borderRadius: 16,
    shadowColor: colors.primary.deepBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityIconText: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  activityTime: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
});

export default DashboardScreen;
