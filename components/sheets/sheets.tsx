import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import AddSheet from './addSheet';
import AuthSheet from './authSheet';
import FilterSheet from './filterSheet';

registerSheet('AddSheet', AddSheet);
registerSheet('FilterSheet', FilterSheet);
registerSheet('AuthSheet', AuthSheet);

 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'FilterSheet': SheetDefinition;
    'AddSheet': SheetDefinition;
    'AuthSheet': SheetDefinition;
  }
}