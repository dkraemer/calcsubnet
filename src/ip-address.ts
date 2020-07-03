import { DotDecimal } from './dot-decimal';

export class IpAddress extends DotDecimal {
  constructor(
    ipAddress: number,
    public readonly isNetworkAddress: boolean = false,
    public readonly isBroadcastAddress: boolean = false
  ) {
    super(ipAddress);
  }

  public dump(): string[] {
    let retVal: string[] = super.dump();
    retVal.push(`isNetworkAddress: ${this.isNetworkAddress}`, `isBroadcastAddress: ${this.isBroadcastAddress}`);

    return retVal;
  }
}
