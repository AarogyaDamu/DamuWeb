export type HealthEventType =
  | 'SYMPTOM'
  | 'VITAL'
  | 'LAB_RESULT'
  | 'MEDICATION'
  | 'PRESCRIPTION'
  | 'DIAGNOSIS'
  | 'APPOINTMENT'
  | 'WEARABLE_MEASUREMENT'
  | 'DOCUMENT_UPLOAD'
  | 'SLEEP_LOG';

export type SourceType =
  | 'MANUAL'
  | 'OCR'
  | 'WEARABLE'
  | 'DOCTOR'
  | 'ABDM'
  | 'EKA'
  | 'WEARABLE_SYNC';

export type StateCategory =
  | 'STABLE'
  | 'EMERGING_CHANGE'
  | 'PERSISTENT_CHANGE'
  | 'IMPROVING'
  | 'WORSENING'
  | 'INSUFFICIENT_DATA';

export type DamuState =
  | 'READY'
  | 'IDLE'
  | 'LISTENING'
  | 'TRANSCRIBING'
  | 'THINKING'
  | 'ASKING'
  | 'CONFIRMING'
  | 'EXECUTING'
  | 'RESPONDING'
  | 'SPEAKING'
  | 'ERROR';

export interface HealthObservation {
  id: string;
  metric: string;
  value: number;
  unit: string;
  observedAt: string;
  sourceType: SourceType;
  sourceName: string;
  baseline: { low: number; high: number; personalAvg: number };
  status: 'NORMAL' | 'DEVIATION' | 'ATTENTION';
}

export interface DynamicHealthSignal {
  metric: string;
  domain: string;
  currentValue: number;
  unit: string;
  baselineValue: number;
  velocity: string;
  persistenceScore: number;
  evidenceLevel: 'HIGH' | 'MODERATE' | 'LOW';
  confidence: number;
}

export interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
}
