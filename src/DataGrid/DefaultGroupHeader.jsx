import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { propTypes, defaultProps } from './GroupHeaderShape';

function DefaultGroupHeader({
  groupLabel, groupValue, colSpan, collapsed, onCollapseClick,
}) {
  return (
    <thead>
      <tr>
        <th colSpan={colSpan}>
          <Button
            aria-label={`
              ${collapsed ? 'Expand' : 'Collapse'}
              ${groupLabel}: ${groupValue}
            `}
            variant="link"
            onClick={() => onCollapseClick()}
          >
            <FontAwesomeIcon icon={collapsed ? faPlus : faMinus} />
          </Button>
          {`${groupLabel}: ${groupValue}`}
        </th>
      </tr>
    </thead>
  );
}

DefaultGroupHeader.propTypes = propTypes;
DefaultGroupHeader.defaultProps = defaultProps;

export default DefaultGroupHeader;
