import { DotDecimal } from '../src';

class DotDecimalMock extends DotDecimal {
  constructor(value: number) {
    super(value);
  }
}

test('DotDecimal(value)', () => {
  expect(() => {
    new DotDecimalMock(-1);
  }).toThrow(Error);
  expect(() => {
    new DotDecimalMock(0x1ffffffff);
  }).toThrow(Error);
  expect(new DotDecimalMock(1).value).toBe(1);
  expect(new DotDecimalMock(0).hexString).toBe('0x00000000');
  expect(new DotDecimalMock(11259375).hexString).toBe('0x00abcdef');
  expect(new DotDecimalMock(0).dotDecimalString).toBe('0.0.0.0');
  expect(new DotDecimalMock(2212237532).dotDecimalString).toBe('131.220.16.220');
  expect(new DotDecimalMock(0x83dc10dc).dotDecimalString).toBe('131.220.16.220');
  expect(new DotDecimalMock(0b10000011110111000001000011011100).dotDecimalString).toBe('131.220.16.220');
});

test('DotDecimal.parse(DotDecimalMock, ...)', () => {
  expect(DotDecimal.parse(DotDecimalMock, '') === null).toBe(true);
  expect(DotDecimal.parse(DotDecimalMock, 'foo') === null).toBe(true);
  expect(DotDecimal.parse(DotDecimalMock, '256.0.0.0') === null).toBe(true);
  expect(DotDecimal.parse(DotDecimalMock, '255.0.0.0') !== null).toBe(true);
  expect(DotDecimal.parse(DotDecimalMock, '0.0.0.0')?.value).toBe(0);
  expect(DotDecimal.parse(DotDecimalMock, '131.220.16.220')?.value).toBe(0x83dc10dc);
});
