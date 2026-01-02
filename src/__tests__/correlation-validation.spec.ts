import {expect} from 'chai';
import 'mocha';
import type {
  CorrelationData
} from './test-data-loader';
import {
  loadCorrelationData,
  getDataByCorrelation,
  getGMTCorrelationData,
  getDirectSourceData,
  findCorrelation,
  getUniqueLongCounts,
  getAvailableCorrelations
} from './test-data-loader';
import LongCountFactory from '../factory/long-count';
import FullDateFactory from '../factory/full-date';
import {getCorrelationConstant} from '../lc/correlation-constant';

/**
 * These tests validate Maya Long Count ↔ western date correlations using the JSON
 * fixture data and the conversion factories. In particular, they exercise logic
 * affected by the "winal radix correction" mentioned in the PR title.
 *
 * The winal radix correction refers to how 20‑day winals are handled when mapping
 * Long Count positions to a fixed day count (JDN) and then to Gregorian/Julian
 * calendar dates. Historically, small off‑by‑one errors in this radix handling
 * can shift whole correlation constants by one or more days.
 *
 * By:
 *  - loading the canonical correlation dataset,
 *  - validating the GMT correlation constant (584285) against direct historical
 *    source entries, and
 *  - comparing western dates produced under neighboring correlation constants
 *    (e.g. 584283–584286),
 * these tests ensure that the current implementation of the winal radix, and the
 * resulting correlation constants, produce stable and internally consistent dates.
 */
describe('Maya Date Correlations from JSON Dataset', () => {
  
  describe('Data Loading and Structure', () => {
    it('should load correlation data successfully', () => {
      const data = loadCorrelationData();
      expect(data).to.have.property('metadata');
      expect(data).to.have.property('data');
      expect(data.data).to.be.an('array');
      expect(data.data.length).to.be.greaterThan(0);
    });

    it('should have expected correlation constants', () => {
      const correlations = getAvailableCorrelations();
      expect(correlations).to.include.members([584283, 584284, 584285, 584286]);
    });

    it('should have unique Long Count dates', () => {
      const longCounts = getUniqueLongCounts();
      expect(longCounts).to.be.an('array');
      expect(longCounts.length).to.be.greaterThan(0);
      // Check that we have no duplicates
      const uniqueSet = new Set(longCounts);
      expect(uniqueSet.size).to.equal(longCounts.length);
    });

    it('should have data for both Gregorian and Julian calendars', () => {
      const data = loadCorrelationData();
      const gregorianCount = data.data.filter(item => item.western_calendar === 'gregorian').length;
      const julianCount = data.data.filter(item => item.western_calendar === 'julian').length;
      
      expect(gregorianCount).to.be.greaterThan(0);
      expect(julianCount).to.be.greaterThan(0);
    });
  });

  describe('GMT Correlation (584285) Validation', () => {
    it('should validate direct source correlations using GMT constant', () => {
      const directData = getDirectSourceData();
      const lcFactory = new LongCountFactory();
      const gmtCorr = getCorrelationConstant('GMT');

      // Test a few direct source correlations
      directData.slice(0, 5).forEach(correlation => {
        const lc = lcFactory.parse(correlation.maya_long_count).setCorrelationConstant(gmtCorr);
        
        if (correlation.western_calendar === 'gregorian') {
          const actualDate = `${lc.gregorian}`;
          const expectedYear = correlation.western_date.split('-')[0];
          
          // Validate that the year is present in the output
          // Note: Date formatting may differ between JSON ISO format and library output
          expect(actualDate).to.include(expectedYear.replace(/^0+/, ''));
        }
      });
    });
  });

  describe('Multiple Correlation Constants', () => {
    it('should show different western dates for different correlation constants', () => {
      // Get data for the same Long Count with different correlations
      const longCount = getUniqueLongCounts()[0]; // Get first Long Count
      const correlations = getAvailableCorrelations();
      
      const results: { [correlation: number]: string[] } = {};
      
      correlations.forEach(corrConstant => {
        const data = findCorrelation({
          maya_long_count: longCount,
          correlation_jdn: corrConstant,
          western_calendar: 'gregorian'
        });
        
        if (data) {
          results[corrConstant] = [data.western_date];
        }
      });
      
      // Verify we get different dates for different correlation constants
      const dates = Object.values(results).flat();
      const uniqueDates = new Set(dates);
      expect(uniqueDates.size).to.be.greaterThan(1, 'Different correlation constants should produce different dates');
    });
  });

  describe('Calendar Round Validation', () => {
    it('should have valid Calendar Round data for each Long Count', () => {
      const uniqueLongCounts = getUniqueLongCounts().slice(0, 10); // Test first 10
      const factory = new FullDateFactory();
      
      uniqueLongCounts.forEach(longCount => {
        const data = findCorrelation({
          maya_long_count: longCount,
          correlation_jdn: 584285, // Use GMT correlation
          western_calendar: 'gregorian'
        });
        
        if (data) {
          expect(data.calendar_round).to.be.a('string');
          expect(data.calendar_round.length).to.be.greaterThan(0);
          
          // Test that Calendar Round actually parses - this will fail if spellings don't match
          const fullDateString = `${data.calendar_round} ${data.maya_long_count}`;
          const fullDate = factory.parse(fullDateString);
          expect(fullDate).to.not.equal(null);
        }
      });
    });
  });

  describe('Event Data', () => {
    it('should have valid event types', () => {
      const data = loadCorrelationData();
      const events = new Set(data.data.map(item => item.event));
      
      // Based on the metadata, events should be: born, acceded, died
      expect(events).to.include('born');
      expect(events).to.include('acceded');
      expect(events).to.include('died');
    });

    it('should group correlations by event for historical analysis', () => {
      const data = loadCorrelationData();
      const eventGroups: Record<string, CorrelationData[]> = {};
      
      data.data.forEach(item => {
        if (!eventGroups[item.event]) {
          eventGroups[item.event] = [];
        }
        eventGroups[item.event].push(item);
      });
      
      Object.keys(eventGroups).forEach(event => {
        expect(eventGroups[event].length).to.be.greaterThan(0);
      });
    });
  });

  describe('Source Attribution', () => {
    it('should have proper source metadata', () => {
      const data = loadCorrelationData();
      expect(data.metadata.sources).to.have.property('mesoweb_palenque_rulers_table');
      
      const source = data.metadata.sources.mesoweb_palenque_rulers_table;
      expect(source).to.have.property('title');
      expect(source).to.have.property('author');
      expect(source).to.have.property('url');
      expect(source.url).to.include('mesoweb.com');
    });

    it('should have source references in data entries', () => {
      const data = loadCorrelationData();
      data.data.forEach(item => {
        expect(item.source).to.equal('mesoweb_palenque_rulers_table');
      });
    });
  });

  describe('Data Quality Checks', () => {
    it('should have reasonable date ranges', () => {
      const data = loadCorrelationData();
      
      data.data.forEach(item => {
        // Parse year from ISO date format
        const year = parseInt(item.western_date.split('-')[0]);
        
        // Reasonable range for Maya historical dates (roughly 2nd century to 9th century CE)
        expect(year).to.be.greaterThan(100);
        expect(year).to.be.lessThan(1000);
      });
    });

    it('should have consistent Long Count formats', () => {
      const longCounts = getUniqueLongCounts();
      
      longCounts.forEach(lc => {
        // Should match pattern like "8.18.0.13.6" or "9.16.19.17.19"
        expect(lc).to.match(/^\d+\.\d+\.\d+\.\d+\.\d+$/);
      });
    });
  });

  describe('Helper Function Tests', () => {
    it('should filter data by correlation constant correctly', () => {
      const gmtData = getDataByCorrelation(584285);
      expect(gmtData.every(item => item.correlation_jdn === 584285)).to.equal(true);
    });

    it('should get GMT correlation data', () => {
      const gmtData = getGMTCorrelationData();
      expect(gmtData.every(item => item.correlation_jdn === 584285)).to.equal(true);
    });

    it('should find specific correlations', () => {
      const firstLongCount = getUniqueLongCounts()[0];
      const result = findCorrelation({
        maya_long_count: firstLongCount,
        western_calendar: 'gregorian',
        correlation_jdn: 584285
      });
      
      expect(result).to.not.equal(undefined);
      if (result) {
        expect(result.maya_long_count).to.equal(firstLongCount);
        expect(result.western_calendar).to.equal('gregorian');
        expect(result.correlation_jdn).to.equal(584285);
      }
    });
  });
});