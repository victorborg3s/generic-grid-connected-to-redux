import DataGrid from './DataGrid';
import { columnTypes } from './commonShapes';
import * as tableHeader from './TableHeaderShape';
import * as groupHeader from './GroupHeaderShape';
import * as row from './RowShape';

const shape = {
  tableHeader,
  groupHeader,
  row,
};

export {
  DataGrid as Grid,
  columnTypes as type,
  shape,
};
