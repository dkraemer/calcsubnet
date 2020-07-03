import { DotDecimal, IpAddress } from '../src';

test('IpAddress(value)', () => {
  expect(() => {
    new IpAddress(-1);
  }).toThrow(Error);
  expect(() => {
    new IpAddress(0x1ffffffff);
  }).toThrow(Error);
  expect(new IpAddress(1).value).toBe(1);
  expect(new IpAddress(0).hexString).toBe('0x00000000');
  expect(new IpAddress(11259375).hexString).toBe('0x00abcdef');
  expect(new IpAddress(0).dotDecimalString).toBe('0.0.0.0');
  expect(new IpAddress(2212237532).dotDecimalString).toBe('131.220.16.220');
  expect(new IpAddress(0x83dc10dc).dotDecimalString).toBe('131.220.16.220');
  expect(new IpAddress(0b10000011110111000001000011011100).dotDecimalString).toBe('131.220.16.220');
});

test('DotDecimal.parse(IpAddress,...)', () => {
  expect(DotDecimal.parse(IpAddress, '') === null).toBe(true);
  expect(DotDecimal.parse(IpAddress, 'foo') === null).toBe(true);
  expect(DotDecimal.parse(IpAddress, '256.0.0.0') === null).toBe(true);
  expect(DotDecimal.parse(IpAddress, '255.0.0.0') !== null).toBe(true);
  expect(DotDecimal.parse(IpAddress, '0.0.0.0')?.value).toBe(0);
  expect(DotDecimal.parse(IpAddress, '131.220.16.220')?.value).toBe(0x83dc10dc);
});
