import React from 'react';

import { propTypes, defaultProps } from './TableHeaderShape';

function DefaultTableHeader({ columnConfig }) {
  return (
    <thead>
      <tr>
        {
          columnConfig.columns.map((column) => (
            <th
              key={column.key}
              className={`${column.key} ${column.type}`}
            >
              {column.label}
            </th>
          ))
        }
      </tr>
    </thead>
  );
}

DefaultTableHeader.propTypes = propTypes;
DefaultTableHeader.defaultProps = defaultProps;

export default DefaultTableHeader;
