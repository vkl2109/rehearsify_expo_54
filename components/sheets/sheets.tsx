import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import AddSheet from './addSheet';
import AddSongSheet from './addSongSheet';
import AuthSheet from './authSheet';
import EditSetListSheet from './editSetlistSheet';
import FilterSheet from './filterSheet';
import ReorderSetlistSheet from './reorderSetlistSheet';
import SetlistSheet from './setlistSheet';

registerSheet('AddSheet', AddSheet);
registerSheet('FilterSheet', FilterSheet);
registerSheet('AuthSheet', AuthSheet);
registerSheet('SetlistSheet', SetlistSheet);
registerSheet('EditSetlistSheet', EditSetListSheet);
registerSheet('AddSongSheet', AddSongSheet);
registerSheet('ReorderSetlistSheet', ReorderSetlistSheet);

 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'FilterSheet': SheetDefinition;
    'AddSheet': SheetDefinition;
    'AuthSheet': SheetDefinition;
    'SetlistSheet': SheetDefinition;
    'EditSetlistSheet': SheetDefinition;
    'AddSongSheet': SheetDefinition;
    'ReorderSetlistSheet': SheetDefinition;
  }
}