export interface Sample {
  id: string;
  name: string;
  type: 'sediment' | 'water';
  location: {
    latitude: number;
    longitude: number;
    depth: number;
    region: string;
  };
  date: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  fileSize?: number;
  uploadProgress?: number;
}

export interface AnalysisResult {
  id: string;
  sampleId: string;
  sampleName: string;
  timestamp: string;
  taxonomicComposition: TaxonomicComposition[];
  biodiversityIndices: BiodiversityIndices;
  novelSpecies: NovelSpecies[];
  ecologicalInsights: EcologicalInsight[];
  communityNetwork: CommunityInteraction[];
}

export interface TaxonomicComposition {
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
  abundance: number;
  percentage: number;
}

export interface BiodiversityIndices {
  shannonIndex: number;
  simpsonIndex: number;
  speciesRichness: number;
  evenness: number;
}

export interface NovelSpecies {
  sequence: string;
  similarity: number;
  predictedPhylum: string;
  confidence: number;
}

export interface EcologicalInsight {
  type: 'high_diversity' | 'novel_taxa' | 'invasive_species' | 'depth_specific';
  description: string;
  confidence: number;
  recommendations: string[];
}

export interface CommunityInteraction {
  source: string;
  target: string;
  interactionType: 'predation' | 'competition' | 'symbiosis' | 'unknown';
  strength: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: 'researcher' | 'admin' | 'viewer';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  samples: Sample[];
  collaborators: User[];
  createdAt: string;
  updatedAt: string;
}
