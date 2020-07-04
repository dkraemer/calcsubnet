/**
 * Get all possible subnet masks as integer values.
 */
function getAllSubnetMaskValues(): number[] {
  const allValues: number[] = [];
  for (let hostBitCount = 0; hostBitCount <= 32; hostBitCount++) {
    const value = hostBitCount === 32 ? 0 : (0xffffffff << hostBitCount) >>> 0;
    allValues.push(value);
  }
  return allValues;
}

function main(): void {
  getAllSubnetMaskValues().forEach(value => {
    console.log('0x' + value.toString(16).padStart(8,'0') + ',');
  });
}

main();
