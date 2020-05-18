import React from 'react';
import uniqid from 'uniqid';

import DefaultTableHeader from './DefaultTableHeader';
import DefaultGroupHeader from './DefaultGroupHeader';
import DefaultRow from './DefaultRow';
import { propTypes, defaultProps } from './DataGridShape';
import fromArrayToGroupOfArrays from './fromArrayToGroupOfArrays';
import './DataGrid.css';

function DataGrid({
  label,
  columnConfig,
  data,
  gridRender,
}) {
  const labelId = uniqid('tableLabelId-');
  const TableHeader = gridRender?.tableHeaderRender || DefaultTableHeader;
  const GroupHeader = gridRender?.groupHeaderRender || DefaultGroupHeader;
  const Row = gridRender?.rowRender || DefaultRow;
  const dataGroups = (data[0]?.rows instanceof Array)
    ? data
    : fromArrayToGroupOfArrays(data, columnConfig.groupBy);

  return (
    <div className="data-grid">
      <table aria-labelledby={labelId} aria-rowcount={data.length}>
        <caption id={labelId}>{label}</caption>
        <TableHeader columnConfig={columnConfig} />
        {
          dataGroups.map((group) => {
            const groupLabel = columnConfig.columns.find(
              (c) => c.key === columnConfig.groupBy,
            ).label;
            return [
              <GroupHeader
                key={`thead-${group.value}`}
                groupLabel={groupLabel}
                groupValue={group.value}
                collapsed={gridRender.groupsCollapsed.includes(group.value)}
                onCollapseClick={() => gridRender.onGroupCollapseToggle(group.value)}
                colSpan={columnConfig.columns.length}
              />,
              <tbody
                key={`tbody-${group.value}`}
                className={gridRender.groupsCollapsed.includes(group.value)
                  ? 'collapsed'
                  : undefined}
              >
                {
                  group.rows.map((row, idx) => (
                    <Row
                      aria-rowindex={idx}
                      key={row.id}
                      label={label}
                      columnConfig={columnConfig}
                      entityObject={row}
                    />
                  ))
                }
              </tbody>,
            ];
          })
        }
      </table>
    </div>
  );
}

DataGrid.propTypes = propTypes;
DataGrid.defaultProps = defaultProps;

export default DataGrid;
