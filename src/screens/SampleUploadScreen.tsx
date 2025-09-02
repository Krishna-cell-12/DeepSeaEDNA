import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface SampleMetadata {
  name: string;
  type: 'sediment' | 'water';
  latitude: string;
  longitude: string;
  depth: string;
  region: string;
  date: string;
  description: string;
}

const SampleUploadScreen: React.FC = () => {
  const [metadata, setMetadata] = useState<SampleMetadata>({
    name: '',
    type: 'sediment',
    latitude: '',
    longitude: '',
    depth: '',
    region: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFilePick = () => {
    // In a real app, this would integrate with expo-document-picker
    Alert.alert(
      'File Selection',
      'Select your sequencing file',
      [
        { text: 'FASTA (.fasta)', onPress: () => setSelectedFile('sample.fasta') },
        { text: 'FASTQ (.fastq)', onPress: () => setSelectedFile('sample.fastq') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleUpload = () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }

    if (!metadata.name || !metadata.latitude || !metadata.longitude || !metadata.depth) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          Alert.alert('Success', 'Sample uploaded successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const updateMetadata = (field: keyof SampleMetadata, value: string) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

  const renderFileSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sequencing File</Text>
      <TouchableOpacity
        style={[styles.filePicker, selectedFile && styles.fileSelected]}
        onPress={handleFilePick}
      >
        <Text style={styles.filePickerIcon}>📁</Text>
        <Text style={styles.filePickerText}>
          {selectedFile || 'Select FASTA/FASTQ file'}
        </Text>
        <Text style={styles.filePickerSubtext}>
          {selectedFile ? 'Tap to change' : 'Tap to browse'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderMetadataSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sample Metadata</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sample Name *</Text>
        <TextInput
          style={styles.input}
          value={metadata.name}
          onChangeText={(text) => updateMetadata('name', text)}
          placeholder="Enter sample name"
          placeholderTextColor={colors.text.tertiary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sample Type *</Text>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              metadata.type === 'sediment' && styles.typeButtonActive,
            ]}
            onPress={() => updateMetadata('type', 'sediment')}
          >
            <Text style={[
              styles.typeButtonText,
              metadata.type === 'sediment' && styles.typeButtonTextActive,
            ]}>
              Sediment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              metadata.type === 'water' && styles.typeButtonActive,
            ]}
            onPress={() => updateMetadata('type', 'water')}
          >
            <Text style={[
              styles.typeButtonText,
              metadata.type === 'water' && styles.typeButtonTextActive,
            ]}>
              Water
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={styles.label}>Latitude *</Text>
          <TextInput
            style={styles.input}
            value={metadata.latitude}
            onChangeText={(text) => updateMetadata('latitude', text)}
            placeholder="e.g., 12.3456"
            placeholderTextColor={colors.text.tertiary}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={styles.label}>Longitude *</Text>
          <TextInput
            style={styles.input}
            value={metadata.longitude}
            onChangeText={(text) => updateMetadata('longitude', text)}
            placeholder="e.g., -45.6789"
            placeholderTextColor={colors.text.tertiary}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={styles.label}>Depth (m) *</Text>
          <TextInput
            style={styles.input}
            value={metadata.depth}
            onChangeText={(text) => updateMetadata('depth', text)}
            placeholder="e.g., 2000"
            placeholderTextColor={colors.text.tertiary}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={metadata.date}
            onChangeText={(text) => updateMetadata('date', text)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.text.tertiary}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Region</Text>
        <TextInput
          style={styles.input}
          value={metadata.region}
          onChangeText={(text) => updateMetadata('region', text)}
          placeholder="e.g., Mariana Trench, Pacific Ocean"
          placeholderTextColor={colors.text.tertiary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={metadata.description}
          onChangeText={(text) => updateMetadata('description', text)}
          placeholder="Additional notes about the sample..."
          placeholderTextColor={colors.text.tertiary}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  const renderUploadSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upload & Analysis</Text>
      
      {isUploading && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>Uploading...</Text>
            <Text style={styles.progressPercentage}>{uploadProgress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${uploadProgress}%` },
              ]}
            />
          </View>
          <Text style={styles.progressStatus}>
            {uploadProgress < 50 ? 'Preprocessing...' : 
             uploadProgress < 100 ? 'Analyzing with AI...' : 'Complete!'}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.uploadButton,
          (!selectedFile || isUploading) && styles.uploadButtonDisabled,
        ]}
        onPress={handleUpload}
        disabled={!selectedFile || isUploading}
      >
        <Text style={styles.uploadButtonText}>
          {isUploading ? 'Processing...' : 'Start Analysis'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={colors.gradients.deep}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Upload Sample</Text>
          <Text style={styles.subtitle}>
            Upload your sequencing files for AI-powered biodiversity analysis
          </Text>
        </View>

        {renderFileSection()}
        {renderMetadataSection()}
        {renderUploadSection()}
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
  title: {
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 20,
  },
  filePicker: {
    borderWidth: 2,
    borderColor: colors.background.tertiary,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    backgroundColor: colors.background.card,
  },
  fileSelected: {
    borderColor: colors.primary.lightTeal,
    borderStyle: 'solid',
    backgroundColor: String(colors.primary.teal) + '20',
  },
  filePickerIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  filePickerText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  filePickerSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  inputGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.background.tertiary,
  },
  textArea: {
    height: 100,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.background.tertiary,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: colors.primary.teal,
    borderColor: colors.primary.lightTeal,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  typeButtonTextActive: {
    color: colors.text.primary,
  },
  progressContainer: {
    backgroundColor: colors.background.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary.lightTeal,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.tertiary,
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.lightTeal,
    borderRadius: 4,
  },
  progressStatus: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: colors.primary.lightTeal,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.primary.lightTeal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadButtonDisabled: {
    backgroundColor: colors.background.tertiary,
    shadowOpacity: 0,
    elevation: 0,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.background.primary,
  },
});

export default SampleUploadScreen;
