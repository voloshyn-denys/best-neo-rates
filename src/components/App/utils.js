import { ExportToCsv } from 'export-to-csv';
import { MULTIPLY } from '../../constants';
import { dijkstra } from '../../utils/graph';
import { CONVERT_FROM } from './constants';

export const generateCsv = (nodes, graph, amount) => {
    const options = { 
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: false,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      };
  
      const csvExporter = new ExportToCsv(options);
  
      const data = nodes.map(({ value: code, name: country }) => {
        if ([CONVERT_FROM, 'BBD', 'KYD'].includes(code)) {
          return {};
        };
    
        const { cost: rate, path } = dijkstra(graph, CONVERT_FROM, code, MULTIPLY);
    
        return {
          code,
          country,
          amount: rate * amount,
          path
        };
      }).filter(({ code }) => code);
   
      csvExporter.generateCsv(data);
};