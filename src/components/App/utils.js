import { ExportToCsv } from 'export-to-csv';
import { MULTIPLY } from '../../constants';
import { dijkstra } from '../../utils/graph';
import { CONVERT_FROM, CSV_OPTIONS } from './constants';

export const generateCsv = (nodes, graph, amount) => {
  const csvExporter = new ExportToCsv(CSV_OPTIONS);

  const data = nodes
    // Exclude CAD from the list because
    .filter(({ value }) => value !== CONVERT_FROM)
    // Generate rows with shortest path for each currency
    .map(({ value: code, name: country }) => {    
      const { cost: rate, path } = dijkstra(graph, CONVERT_FROM, code, MULTIPLY);
      const currencyAmount = rate * amount;

      return { code, country, currencyAmount, path };
  });

  csvExporter.generateCsv(data);
};