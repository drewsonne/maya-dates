import * as fs from 'fs';
import * as path from 'path';

export interface CorrelationData {
  maya_long_count: string;
  event: string;
  calendar_round: string;
  correlation_jdn: number;
  western_calendar: 'gregorian' | 'julian';
  western_date: string;
  direct_in_source: boolean;
  source_western_date: string | null;
  source: string;
}

export interface CorrelationMetadata {
  generated_at: string;
  description: string;
  calendars: {
    gregorian: string;
    julian: string;
  };
  correlation_constants: number[];
  sources: Record<string, {
    id: string;
    title: string;
    author: string;
    publisher: string;
    url: string;
    notes: string;
  }>;
  fields: Record<string, string>;
}

export interface CorrelationTestData {
  metadata: CorrelationMetadata;
  data: CorrelationData[];
}

/**
 * Module-level cache for correlation data.
 * The JSON file is large (3600+ entries) so we cache it after first load
 * to avoid repeated filesystem reads during test execution.
 */
let correlationData: CorrelationTestData | null = null;

/**
 * Loads the Maya date correlation test data from JSON file
 */
export function loadCorrelationData(): CorrelationTestData {
  if (!correlationData) {
    const jsonPath = path.join(__dirname, 'maya_date_correlations.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    correlationData = JSON.parse(rawData) as CorrelationTestData;
  }
  return correlationData;
}

/**
 * Get correlation data filtered by correlation constant (JDN)
 */
export function getDataByCorrelation(correlationJdn: number): CorrelationData[] {
  const data = loadCorrelationData();
  return data.data.filter(item => item.correlation_jdn === correlationJdn);
}

/**
 * Get correlation data filtered by western calendar type
 */
export function getDataByCalendar(calendar: 'gregorian' | 'julian'): CorrelationData[] {
  const data = loadCorrelationData();
  return data.data.filter(item => item.western_calendar === calendar);
}

/**
 * Get correlation data for a specific Maya Long Count
 */
export function getDataByLongCount(longCount: string): CorrelationData[] {
  const data = loadCorrelationData();
  return data.data.filter(item => item.maya_long_count === longCount);
}

/**
 * Get correlation data that comes directly from the source (not computed)
 */
export function getDirectSourceData(): CorrelationData[] {
  const data = loadCorrelationData();
  return data.data.filter(item => item.direct_in_source);
}

/**
 * Get data for GMT correlation (584285) - most commonly used
 */
export function getGMTCorrelationData(): CorrelationData[] {
  return getDataByCorrelation(584285);
}

/**
 * Get unique Long Count dates from the dataset
 */
export function getUniqueLongCounts(): string[] {
  const data = loadCorrelationData();
  const longCounts = new Set<string>();
  data.data.forEach(item => longCounts.add(item.maya_long_count));
  return Array.from(longCounts).sort();
}

/**
 * Get available correlation constants from the dataset
 */
export function getAvailableCorrelations(): number[] {
  const data = loadCorrelationData();
  return data.metadata.correlation_constants;
}

/**
 * Helper to find specific correlation by criteria
 */
export function findCorrelation(criteria: Partial<CorrelationData>): CorrelationData | undefined {
  const data = loadCorrelationData();
  return data.data.find(item => {
    return Object.keys(criteria).every(key => 
      item[key as keyof CorrelationData] === criteria[key as keyof CorrelationData]
    );
  });
}

/**
 * Helper to find all correlations matching criteria
 */
export function findCorrelations(criteria: Partial<CorrelationData>): CorrelationData[] {
  const data = loadCorrelationData();
  return data.data.filter(item => {
    return Object.keys(criteria).every(key => 
      item[key as keyof CorrelationData] === criteria[key as keyof CorrelationData]
    );
  });
}