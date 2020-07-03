import { Dumpable } from './dumpable';

const HEX_RADIX: number = 16;

export abstract class DotDecimal implements Dumpable {
  public readonly hexString: string;
  public readonly dotDecimalString: string;

  protected constructor(public readonly value: number) {
    this.hexString = DotDecimal.toHexString(value);
    this.dotDecimalString = DotDecimal.toDotDecimalString(value);
  }

  private static toHexString(value: number): string {
    return '0x' + (value === 0 ? '00000000' : value.toString(HEX_RADIX));
  }

  private static toDotDecimalString(value: number): string {
    let hexString = this.toHexString(value);
    let regEx = /^(0x)(.{2})(.{2})(.{2})(.{2})$/;
    let regExMatches = regEx.exec(hexString);

    if (!regExMatches || regExMatches.length !== 6) {
      console.error('RegEx mismatch!');
      return '';
    }

    let FirstOctet: string = regExMatches[1] + regExMatches[2];
    let SecondOctet: string = regExMatches[1] + regExMatches[3];
    let ThirdOctet: string = regExMatches[1] + regExMatches[4];
    let FourthOctet: string = regExMatches[1] + regExMatches[5];

    let decimalStrings: string[] = [
      Number.parseInt(FirstOctet, HEX_RADIX).toFixed(),
      Number.parseInt(SecondOctet, HEX_RADIX).toFixed(),
      Number.parseInt(ThirdOctet, HEX_RADIX).toFixed(),
      Number.parseInt(FourthOctet, HEX_RADIX).toFixed(),
    ];

    return decimalStrings.join('.');
  }

  public toString(): string {
    return this.dotDecimalString;
  }

  public dump(): string[] {
    let retVal: string[] = [
      `value: ${this.value}`,
      `hexString: ${this.hexString}`,
      `dotDecimalString: ${this.dotDecimalString}`,
    ];

    return retVal;
  }
}
