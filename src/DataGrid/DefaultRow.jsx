import React from 'react';

import { propTypes, defaultProps } from './RowShape';
import * as Util from '../util';

function DefaultRow({
  columnConfig, entityObject,
}) {
  return (
    <tr>
      {
        columnConfig.columns.map((col) => (
          <td
            key={col.key}
            className={`${col.key} ${col.type}`}
          >
            {
              col.formatter
                ? col.formatter.format(entityObject[col.key])
                : Util.formatters[col.type].format(entityObject[col.key])
            }
          </td>
        ))
      }
    </tr>
  );
}

DefaultRow.propTypes = propTypes;
DefaultRow.defaultProps = defaultProps;

export default DefaultRow;
