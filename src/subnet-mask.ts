import { DotDecimal } from './dot-decimal';
// import { Radix } from './radix';

export class SubnetMask extends DotDecimal {
  // public readonly prefixLength: number;
  // public readonly hostBitCount: number;
  // public readonly hostAddressCount: number;
  // public readonly usableHostAddressCount: number;
  // public readonly remark: string;

  /**
   * Create a new instance of SubnetMask.
   * @param value The integer value of the subnet mask to create.
   */
  public constructor(value: number) {
    super(value);
  }

  /**
   * Get all possible subnet masks as integer values.
   */
  public static getAllValues(): number[] {
    const allValues: number[] = [];
    for (let hostBitCount = 0; hostBitCount <= 32; hostBitCount++) {
      const value = hostBitCount === 32 ? 0 : (0xffffffff << hostBitCount) >>> 0;
      allValues.push(value);
    }
    return allValues;
  }

  /**
   * Get the prefix length for a subnet mask.
   * @param value The integer value of the subnet mask.
   */
  public static getPrefixLength(value: number): number {
    if (!this.getAllValues().includes(value)) {
      throw new Error();
    }
    // Convert value to binary string and count how many bits are set
    return value.toString(2).split('1').length - 1;
  }
}

// SubnetMask.getAllValues().forEach(e => {
//   console.log(`${e.toString(16).padStart(8,'0')} => ${SubnetMask.getPrefixLength(e)}`);
// });
