import { DotDecimal } from './dot-decimal';

const MAX_PREFIX_LENGTH: number = 32;

export class SubnetMask extends DotDecimal {
  public readonly prefixLength: number;
  public readonly hostBitCount: number;
  public readonly hostAddressCount: number;
  public readonly usableHostAddressCount: number;
  public readonly remark: string;

  private constructor(subnetMask: number, prefixLength: number, hostBitCount: number) {
    super(subnetMask);
    this.prefixLength = prefixLength;
    this.hostBitCount = hostBitCount;
    this.hostAddressCount = Math.pow(2, hostBitCount);
    this.usableHostAddressCount = this.hostAddressCount - 2;

    switch (prefixLength) {
      case 32:
        this.remark = '(Host route)';
        this.usableHostAddressCount = 1;
        break;
      case 31:
        this.remark = '(Point-to-point links (RFC 3021))';
        this.usableHostAddressCount = 2;
        break;
      case 30:
        this.remark = '(Point-to-point links (glue network))';
        break;
      case 8:
        this.remark = '(Largest IANA block allocation)';
        break;
      default:
        this.remark = '';
        break;
    }
  }

  public dump(): string[] {
    let retVal: string[] = super.dump();
    retVal.push(
      `prefixLength: ${this.prefixLength}`,
      `hostBitCount: ${this.hostBitCount}`,
      `hostAddressCount: ${this.hostAddressCount}`,
      `usableHostAddressCount: ${this.usableHostAddressCount}`,
      `remark: ${this.remark}`
    );
    return retVal;
  }

  private static checkPrefixLength(prefixLength: number): number {
    prefixLength = Math.round(prefixLength);
    if (prefixLength > MAX_PREFIX_LENGTH || prefixLength < 0) {
      throw new Error('Argument prefixLength ist out of range');
    }
    return prefixLength;
  }

  public static create(prefixLength: number): SubnetMask {
    this.checkPrefixLength(prefixLength);
    let hostBitCount = MAX_PREFIX_LENGTH - prefixLength;
    let subnetMask = prefixLength === 0 ? 0 : (Number.MAX_SAFE_INTEGER << hostBitCount) >>> 0;

    return new SubnetMask(subnetMask, prefixLength, hostBitCount);
  }

  public static getAll(startPrefixLength: number = 32, endPrefixLength: number = 0): SubnetMask[] {
    this.checkPrefixLength(startPrefixLength);
    this.checkPrefixLength(endPrefixLength);

    let subnetMasks: Array<SubnetMask> = [];
    let prefixLength: number = startPrefixLength;
    while (true) {
      subnetMasks.push(this.create(prefixLength));
      if (prefixLength === endPrefixLength) {
        break;
      }
      prefixLength--;
    }

    return subnetMasks;
  }
}
