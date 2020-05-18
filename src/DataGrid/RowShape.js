import { columnConfig, entityObject } from './commonShapes';
/**
 * Shape of a row to be mounted in the DataGrid.
 * Can't `forbidExtraProps` because of aria attributes.
 */
export const propTypes = {
  columnConfig: columnConfig.isRequired,
  entityObject: entityObject.isRequired,
};

export const defaultProps = {
};
