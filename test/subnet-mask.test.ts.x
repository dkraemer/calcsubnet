import { DotDecimal, SubnetMask } from '../src';

// test('SubnetMask(value)', () => {
//   expect(() => {
//     new SubnetMask(-1);
//   }).toThrow(Error);
//   expect(() => {
//     new SubnetMask(0x1ffffffff);
//   }).toThrow(Error);
//   expect(new SubnetMask(1).value).toBe(1);
//   expect(new SubnetMask(0).hexString).toBe('0x00000000');
//   expect(new SubnetMask(0).dotDecimalString).toBe('0.0.0.0');
//   expect(new SubnetMask(2212237532).dotDecimalString).toBe('131.220.16.220');
//   expect(new SubnetMask(0x83dc10dc).dotDecimalString).toBe('131.220.16.220');
//   expect(new SubnetMask(0b10000011110111000001000011011100).dotDecimalString).toBe('131.220.16.220');
// });

test('DotDecimal.parse(SubnetMask,...)', () => {
  expect(DotDecimal.parse(SubnetMask, '') === null).toBe(true);
  expect(DotDecimal.parse(SubnetMask, 'foo') === null).toBe(true);
  expect(DotDecimal.parse(SubnetMask, '256.0.0.0') === null).toBe(true);
  expect(DotDecimal.parse(SubnetMask, '255.0.0.0') !== null).toBe(true);
  expect(DotDecimal.parse(SubnetMask, '0.0.0.0')?.value).toBe(0);
  expect(DotDecimal.parse(SubnetMask, '131.220.16.220')?.value).toBe(0x83dc10dc);
});
