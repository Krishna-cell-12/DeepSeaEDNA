import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { ColorValue } from 'react-native';

const { width } = Dimensions.get('window');

interface TaxonomicData {
  phylum: string;
  percentage: number;
  color: ColorValue;
}

interface BiodiversityMetrics {
  shannonIndex: number;
  simpsonIndex: number;
  speciesRichness: number;
  evenness: number;
}

const ResultsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'taxonomy' | 'insights' | 'network'>('overview');
  const navigation = useNavigation<any>();

  // Mock data - in real app this would come from API
  const taxonomicData: TaxonomicData[] = [
    { phylum: 'Proteobacteria', percentage: 35, color: colors.chart.colors[0] },
    { phylum: 'Bacteroidetes', percentage: 25, color: colors.chart.colors[1] },
    { phylum: 'Firmicutes', percentage: 20, color: colors.chart.colors[2] },
    { phylum: 'Actinobacteria', percentage: 12, color: colors.chart.colors[3] },
    { phylum: 'Others', percentage: 8, color: colors.chart.colors[4] },
  ];

  const biodiversityMetrics: BiodiversityMetrics = {
    shannonIndex: 3.45,
    simpsonIndex: 0.78,
    speciesRichness: 156,
    evenness: 0.82,
  };

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      {[
        { key: 'overview', label: 'Overview', icon: '📊' },
        { key: 'taxonomy', label: 'Taxonomy', icon: '🧬' },
        { key: 'insights', icon: '🤖', label: 'AI Insights' },
        { key: 'network', icon: '🕸️', label: 'Network' },
      ].map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab,
          ]}
          onPress={() => setActiveTab(tab.key as any)}
        >
          <Text style={styles.tabIcon}>{tab.icon}</Text>
          <Text style={[
            styles.tabLabel,
            activeTab === tab.key && styles.activeTabLabel,
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Sample Analysis Summary</Text>
        <Text style={styles.summaryDescription}>
          Deep-sea sediment sample from Mariana Trench (depth: 2,000m) analyzed successfully using AI-driven pipeline.
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{biodiversityMetrics.speciesRichness}</Text>
          <Text style={styles.metricLabel}>Species Richness</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{biodiversityMetrics.shannonIndex.toFixed(2)}</Text>
          <Text style={styles.metricLabel}>Shannon Index</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{biodiversityMetrics.simpsonIndex.toFixed(2)}</Text>
          <Text style={styles.metricLabel}>Simpson Index</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{biodiversityMetrics.evenness.toFixed(2)}</Text>
          <Text style={styles.metricLabel}>Evenness</Text>
        </View>
      </View>

      <View style={styles.novelSpeciesCard}>
        <Text style={styles.novelSpeciesTitle}>🚀 Novel Species Detection</Text>
        <Text style={styles.novelSpeciesText}>
          AI analysis identified <Text style={styles.highlight}>23 sequences</Text> with low similarity to reference databases, 
          potentially representing novel taxa. These sequences show unique genetic signatures 
          characteristic of deep-sea adaptations.
        </Text>
      </View>
    </View>
  );

  const renderTaxonomy = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Taxonomic Composition</Text>
      
      <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
          {taxonomicData.map((item, index) => (
            <View
              key={item.phylum}
              style={[
                styles.pieSlice,
                {
                  backgroundColor: item.color,
                  transform: [{ rotate: `${(index * 72)}deg` }],
                },
              ]}
            />
          ))}
        </View>
        <View style={styles.legend}>
          {taxonomicData.map((item) => (
            <View key={item.phylum} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>
                {item.phylum} ({item.percentage}%)
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.taxonomicDetails}>
        <Text style={styles.sectionTitle}>Detailed Classification</Text>
        <View style={styles.taxonomicTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Phylum</Text>
            <Text style={styles.tableHeaderText}>Class</Text>
            <Text style={styles.tableHeaderText}>Abundance</Text>
          </View>
          {[
            { phylum: 'Proteobacteria', class: 'Gammaproteobacteria', abundance: 'High' },
            { phylum: 'Bacteroidetes', class: 'Bacteroidia', abundance: 'Medium' },
            { phylum: 'Firmicutes', class: 'Clostridia', abundance: 'Medium' },
          ].map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.phylum}</Text>
              <Text style={styles.tableCell}>{item.class}</Text>
              <Text style={styles.tableCell}>{item.abundance}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderAIInsights = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>AI-Generated Insights</Text>
      
      <View style={styles.insightCard}>
        <Text style={styles.insightIcon}>🔍</Text>
        <Text style={styles.insightTitle}>High Protist Diversity</Text>
        <Text style={styles.insightDescription}>
          This sample shows exceptional protist diversity, with unique clades at 2000m depth. 
          The AI model predicts this represents a previously undocumented microbial community 
          adapted to extreme pressure conditions.
        </Text>
        <Text style={styles.insightConfidence}>Confidence: 94%</Text>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightIcon}>⚠️</Text>
        <Text style={styles.insightTitle}>Potential Invasive Species</Text>
        <Text style={styles.insightDescription}>
          AI detected genetic markers consistent with invasive species patterns. 
          Recommend further investigation and monitoring of this location for 
          conservation purposes.
        </Text>
        <Text style={styles.insightConfidence}>Confidence: 87%</Text>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightIcon}>🌊</Text>
        <Text style={styles.insightTitle}>Depth-Specific Adaptations</Text>
        <Text style={styles.insightDescription}>
          Genetic analysis reveals adaptations specific to deep-sea conditions, 
          including pressure resistance and low-temperature metabolism genes. 
          This suggests long-term evolutionary adaptation to the environment.
        </Text>
        <Text style={styles.insightConfidence}>Confidence: 91%</Text>
      </View>

      <View style={styles.recommendationsCard}>
        <Text style={styles.recommendationsTitle}>📋 Conservation Recommendations</Text>
        <View style={styles.recommendationItem}>
          <Text style={styles.recommendationBullet}>•</Text>
          <Text style={styles.recommendationText}>
            Establish monitoring program for potential invasive species spread
          </Text>
        </View>
        <View style={styles.recommendationItem}>
          <Text style={styles.recommendationBullet}>•</Text>
          <Text style={styles.recommendationText}>
            Consider this area for marine protected area designation
          </Text>
        </View>
        <View style={styles.recommendationItem}>
          <Text style={styles.recommendationBullet}>•</Text>
          <Text style={styles.recommendationText}>
            Conduct follow-up sampling to track community changes
          </Text>
        </View>
      </View>
    </View>
  );

  const renderNetwork = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Ecological Network Analysis</Text>
      
      <View style={styles.networkCard}>
        <Text style={styles.networkTitle}>Community Interaction Network</Text>
        <Text style={styles.networkDescription}>
          AI-predicted ecological interactions between detected species based on 
          genetic similarity and functional annotations.
        </Text>
        
        <View style={styles.networkStats}>
          <View style={styles.networkStat}>
            <Text style={styles.networkStatValue}>24</Text>
            <Text style={styles.networkStatLabel}>Species</Text>
          </View>
          <View style={styles.networkStat}>
            <Text style={styles.networkStatValue}>156</Text>
            <Text style={styles.networkStatLabel}>Interactions</Text>
          </View>
          <View style={styles.networkStat}>
            <Text style={styles.networkStatValue}>8</Text>
            <Text style={styles.networkStatLabel}>Modules</Text>
          </View>
        </View>

        <View style={styles.interactionTypes}>
          <Text style={styles.interactionTypesTitle}>Interaction Types:</Text>
          <View style={styles.interactionTypeItem}>
            <View style={[styles.interactionDot, { backgroundColor: colors.secondary.coral }]} />
            <Text style={styles.interactionTypeText}>Predation (45%)</Text>
          </View>
          <View style={styles.interactionTypeItem}>
            <View style={[styles.interactionDot, { backgroundColor: colors.secondary.plankton }]} />
            <Text style={styles.interactionTypeText}>Competition (32%)</Text>
          </View>
          <View style={styles.interactionTypeItem}>
            <View style={[styles.interactionDot, { backgroundColor: colors.secondary.seaweed }]} />
            <Text style={styles.interactionTypeText}>Symbiosis (23%)</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'taxonomy':
        return renderTaxonomy();
      case 'insights':
        return renderAIInsights();
      case 'network':
        return renderNetwork();
      default:
        return renderOverview();
    }
  };

  return (
    <LinearGradient
      colors={colors.gradients.deep}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Analysis Results</Text>
        <Text style={styles.subtitle}>
          Sample: Mariana_Trench_Sediment_001
        </Text>
      </View>

      {renderTabBar()}
      {renderTabContent()}

      {/* Footer Navigation */}
      <View style={styles.footerNav}>
        <TouchableOpacity
          style={[styles.navButton, styles.backButton]}
          onPress={() => navigation.navigate('Upload')}
          activeOpacity={0.9}
        >
          <Text style={styles.navButtonText}>← Back to Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={() => setActiveTab('insights')}
          activeOpacity={0.9}
        >
          <Text style={styles.navButtonText}>Continue to Insights →</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: String(colors.primary.teal) + '30',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: colors.primary.lightTeal,
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.background.tertiary,
    backgroundColor: String(colors.background.surface) + 'AA',
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
    backgroundColor: colors.background.card,
  },
  nextButton: {
    marginLeft: 8,
    backgroundColor: colors.primary.lightTeal,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  summaryCard: {
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  summaryDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    width: (width - 50) / 2,
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary.lightTeal,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  novelSpeciesCard: {
    backgroundColor: String(colors.primary.teal) + '20',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.lightTeal,
  },
  novelSpeciesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  novelSpeciesText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  highlight: {
    color: colors.primary.lightTeal,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 20,
  },
  pieChartContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  pieChart: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  pieSlice: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    opacity: 0.8,
  },
  legend: {
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  taxonomicDetails: {
    marginTop: 20,
  },
  taxonomicTable: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary.teal,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.tertiary,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: colors.text.secondary,
  },
  insightCard: {
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  insightIcon: {
    fontSize: 24,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  insightConfidence: {
    fontSize: 12,
    color: colors.primary.lightTeal,
    fontWeight: '500',
  },
  recommendationsCard: {
    backgroundColor: String(colors.primary.teal) + '20',
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  recommendationBullet: {
    fontSize: 16,
    color: colors.primary.lightTeal,
    marginRight: 12,
    fontWeight: 'bold',
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  networkCard: {
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 16,
  },
  networkTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  networkDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  networkStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  networkStat: {
    alignItems: 'center',
  },
  networkStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary.lightTeal,
    marginBottom: 4,
  },
  networkStatLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  interactionTypes: {
    marginTop: 20,
  },
  interactionTypesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  interactionTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  interactionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  interactionTypeText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});

export default ResultsScreen;
