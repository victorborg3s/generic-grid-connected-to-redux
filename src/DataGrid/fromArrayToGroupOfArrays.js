export default function fromArrayToGroupOfArrays(array, groupBy) {
  let currentGroupValue;
  return array.reduce((acc, cur) => {
    if (currentGroupValue && currentGroupValue === cur[groupBy]) {
      acc[acc.length - 1].rows.push(cur);
      return acc;
    }
    currentGroupValue = cur[groupBy];
    acc.push(
      {
        value: cur[groupBy],
        rows: [
          cur,
        ],
      },
    );
    return acc;
  }, []);
}
