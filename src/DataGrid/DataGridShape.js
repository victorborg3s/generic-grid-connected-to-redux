import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import { columnConfig, entityObject } from './commonShapes';

export const propTypes = forbidExtraProps({
  label: PropTypes.string,
  columnConfig: columnConfig.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(entityObject),
    PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      rows: PropTypes.arrayOf(PropTypes.object),
    })),
  ]).isRequired,
  gridRender: PropTypes.shape({
    tableHeaderRender: PropTypes.elementType,
    groupHeaderRender: PropTypes.elementType,
    rowRender: PropTypes.elementType,
    groupsCollapsed: PropTypes.arrayOf.isRequired,
    onGroupCollapseToggle: PropTypes.func.isRequired,
  }).isRequired,
});

export const defaultProps = {
};
