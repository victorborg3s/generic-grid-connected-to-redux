import PropTypes from 'prop-types';

export const entityObject = PropTypes.shape(
  {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  },
);

export const columnTypes = {
  currency: 'currency',
  date: 'date',
  dateAndTime: 'dateAndTime',
  input: 'input',
  number: 'number',
  string: 'string',
};

const columnType = PropTypes.oneOf(Object.keys(columnTypes));

/**
 * @example
 * columnConfig: [
 *    {
 *      key: 'id',
 *      label: '#',
 *      type: 'number',
 *    },
 *    {
 *      key: 'login',
 *      label: 'Login',
 *      type: 'string',
 *    },
 *    {
 *      key: 'salary',
 *      label: 'Salary $',
 *      type: 'money',
 *    },
 * ]
 */
export const columnConfig = PropTypes.shape({
  groupBy: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    type: columnType,
  })),
});
