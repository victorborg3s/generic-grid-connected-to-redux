import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

export const propTypes = forbidExtraProps({
  groupLabel: PropTypes.string.isRequired,
  groupValue: PropTypes.string.isRequired,
  colSpan: PropTypes.number.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapseClick: PropTypes.func.isRequired,
});

export const defaultProps = {};
