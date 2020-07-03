import { Dumpable } from './dumpable';

enum Radix {
  Dec = 10,
  Hex = 16,
}

export abstract class DotDecimal implements Dumpable {
  public readonly hexString: string;
  public readonly dotDecimalString: string;

  protected constructor(public readonly value: number) {
    if (value < 0 || value > 0xffffffff) {
      throw new Error('Parameter value must be an unsigned integer (32 Bit)');
    }

    this.hexString = this.toHexString();
    this.dotDecimalString = this.toDotDecimalString();
  }

  private static parseOctets(regExp: RegExp, string: string, radix: Radix): number[] | null {
    const regRepExecArray = regExp.exec(string);
    if (!regRepExecArray) {
      return null;
    }

    const octetStrings = regRepExecArray.slice(1);
    if (octetStrings.length !== 4) {
      return null;
    }

    const retVal: number[] = [];
    octetStrings.forEach(e => {
      const result = Number.parseInt(e, radix);
      if (!Number.isNaN(result)) {
        retVal.push(result);
      }
    });

    return retVal.length === 4 ? retVal : null;
  }

  public static parse<T extends DotDecimal>(t: new (value: number) => T, dotDecimalString: string): T | null {
    const regExp = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const octets = this.parseOctets(regExp, dotDecimalString, Radix.Dec);
    if (!octets) {
      return null;
    }

    let hexValue = '0x';
    octets.forEach(e => {
      const octetHex = e.toString(Radix.Hex);
      hexValue += octetHex.length === 1 ? '0' + octetHex : octetHex;
    });

    const value = Number.parseInt(hexValue);
    try {
      return new t(value);
    } catch (error) {
      return null;
    }
  }

  private toHexString(withPrefix: boolean = true): string {
    const prefix = withPrefix ? '0x' : '';
    let hexValue = this.value.toString(Radix.Hex);

    // Ensure a length of 4 bytes (8 chars)
    while (hexValue.length < 8) {
      hexValue = '0' + hexValue;
    }

    return prefix + hexValue;
  }

  private toDotDecimalString(): string {
    const regExp = /^(.{2})(.{2})(.{2})(.{2})$/;
    const hexString = this.toHexString(false);
    const octets = DotDecimal.parseOctets(regExp, hexString, Radix.Hex);
    if (!octets) {
      throw new Error();
    }

    const octetStrings: string[] = [];
    octets.forEach(e => {
      octetStrings.push(e.toFixed());
    });

    return octetStrings.join('.');
  }

  public toString(): string {
    return this.dotDecimalString;
  }

  public dump(): string[] {
    return [`value: ${this.value}`, `hexString: ${this.hexString}`, `dotDecimalString: ${this.dotDecimalString}`];
  }
}
