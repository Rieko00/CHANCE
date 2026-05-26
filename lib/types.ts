// Shared types for CXR scan detection
export interface Detection {
  x1: number; y1: number; x2: number; y2: number;
  confidence: number;
  class: 'nodule_mass';
  classId: number;
}

export interface FileResult {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'done' | 'error';
  detections?: Detection[];
  origWidth?: number;
  origHeight?: number;
  imageUrl?: string;
  annotatedUrl?: string;
  error?: string;
}
