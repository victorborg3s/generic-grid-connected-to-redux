import React from 'react';
import {
  cleanup, fireEvent, render,
} from '@testing-library/react';
import uniqid from 'uniqid';

import DataGrid from './DataGrid';
import { columnTypes } from './commonShapes';
import * as formatters from '../util/formatters';

describe('<DataGrid />', () => {
  const mockedRowDrawer = jest.fn(({ entityObject }) => (
    <tr key={entityObject.id}>
      <td>
        {entityObject.id}
      </td>
    </tr>
  ));
  const mockedOnGroupCollapse = jest.fn();
  const mustNotBeDrawnValue = uniqid('hiddenValue-');
  const pickRandom = (array) => array[Math.round(Math.random() * (array.length - 1))];
  const mountFakeData = (numOfReg, maxRowsPerGroup) => {
    const array = [];
    let groupByColumnValue;
    for (let i = 0; i < numOfReg; i += 1) {
      if (i % maxRowsPerGroup === 0) groupByColumnValue = uniqid('column1-');
      array.push({
        id: uniqid(),
        groupByColumn: groupByColumnValue,
        dateColumn: '2020-05-12',
        numberColumn: Math.random() * 99,
        aHiddenColumn: mustNotBeDrawnValue,
      });
    }
    return array;
  };
  const newGroupEvery = 3;
  const dataArray = mountFakeData(10 + Math.round(Math.random() * 10), newGroupEvery);
  const columnConfig = {
    groupBy: 'groupByColumn',
    columns: [
      {
        key: 'id',
        label: '#',
        type: columnTypes.string,
      },
      {
        key: 'groupByColumn',
        label: 'String Column',
        type: columnTypes.string,
      },
      {
        key: 'dateColumn',
        label: 'Date Column',
        type: columnTypes.date,
      },
      {
        key: 'numberColumn',
        label: 'Number Column',
        type: columnTypes.number,
      },
    ],
  };
  const tableLabel = 'Sample Object';
  const defaultDataGrid = (
    <DataGrid
      label={tableLabel}
      data={dataArray}
      columnConfig={columnConfig}
      gridRender={{
        groupsCollapsed: [],
        onGroupCollapseToggle: mockedOnGroupCollapse,
      }}
    />
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(cleanup);

  it('draws one line for each object in data array', () => {
    const { getByRole } = render(defaultDataGrid);
    const randomObject = pickRandom(dataArray);
    const rowValue = `${randomObject.id} `
      + `${randomObject.groupByColumn} `
      + `${formatters.date.format(randomObject.dateColumn)} `
      + `${formatters.number.format(randomObject.numberColumn)}`;
    expect(getByRole('row', { name: rowValue }))
      .not.toBeNull();
  });
  it('displays column headers accordingly to columnConfig', () => {
    const { getByRole } = render(defaultDataGrid);
    columnConfig.columns.forEach((column) => {
      expect(getByRole('columnheader', { name: column.label })).not.toBeNull();
    });
  });
  it('accepts a component into rowComponent that will draw lines ', () => {
    const { getAllByRole } = render(
      <DataGrid
        label={tableLabel}
        data={dataArray}
        columnConfig={columnConfig}
        gridRender={{
          groupsCollapsed: [],
          onGroupCollapseToggle: mockedOnGroupCollapse,
          rowRender: mockedRowDrawer,
        }}
      />,
    );
    const randomObject = pickRandom(dataArray);
    expect(getAllByRole(
      'row', { name: randomObject.id },
    )).toHaveLength(1);
  });
  it(
    'shows columns based on columnsConfig and pass it to rowComponent',
    () => {
      const { queryAllByText } = render(
        <DataGrid
          label={tableLabel}
          data={dataArray}
          columnConfig={columnConfig}
          gridRender={{
            groupsCollapsed: [],
            onGroupCollapseToggle: mockedOnGroupCollapse,
            rowRender: mockedRowDrawer,
          }}
        />,
      );
      expect(queryAllByText(mustNotBeDrawnValue)).toHaveLength(0);
      expect(mockedRowDrawer).toHaveBeenCalledTimes(dataArray.length);
    },
  );

  it(
    'groups lines accordingly to "groupBy" and if previous row changed',
    () => {
      const { getByRole } = render(defaultDataGrid);
      for (let i = 0; i < dataArray.length; i += newGroupEvery) {
        expect(getByRole(
          'columnheader',
          { name: `${columnConfig.columns[1].label}: ${dataArray[i].groupByColumn}` },
        )).not.toBeNull();
      }
    },
  );
  it('collapse groups', () => {
    const { getByRole } = render(
      <DataGrid
        label={tableLabel}
        data={dataArray}
        columnConfig={columnConfig}
        gridRender={{
          groupsCollapsed: [],
          onGroupCollapseToggle: mockedOnGroupCollapse,
          rowRender: mockedRowDrawer,
        }}
      />,
    );
    const randomObject = pickRandom(dataArray);
    const groupCollapseButton = getByRole(
      'button',
      { name: `Collapse ${columnConfig.columns[1].label}: ${randomObject.groupByColumn}` },
    );
    fireEvent.click(groupCollapseButton);
    expect(mockedOnGroupCollapse).toHaveBeenCalled();
  });
  it('accepts already grouped data (array of groups)', () => {
    const { getByRole } = render(
      <DataGrid
        label={tableLabel}
        data={[
          {
            value: 'Group 1',
            rows: dataArray.slice(0, 3),
          },
          {
            value: 'Group 2',
            rows: dataArray.slice(3, 6),
          },
        ]}
        columnConfig={columnConfig}
        gridRender={{
          groupsCollapsed: [],
          onGroupCollapseToggle: mockedOnGroupCollapse,
          rowRender: mockedRowDrawer,
        }}
      />,
    );
    const randomIndex = Math.round(Math.random() * 5);
    expect(getByRole('row', { name: dataArray[randomIndex].id }))
      .toBeTruthy();
  });
  it('mounts with empty data array', () => {
    const { getByRole } = render(
      <DataGrid
        label={tableLabel}
        data={[]}
        columnConfig={columnConfig}
        gridRender={{
          groupsCollapsed: [],
          onGroupCollapseToggle: mockedOnGroupCollapse,
        }}
      />,
    );
    expect(getByRole('table', { name: tableLabel }))
      .toBeTruthy();
  });
});
