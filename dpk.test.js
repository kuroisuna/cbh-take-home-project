const TEST_ENCRYPTED = 'secret';
const dpk = require('./dpk');
const { deterministicPartitionKey } = dpk;

jest.spyOn(dpk, 'encryptKey').mockImplementation(() => TEST_ENCRYPTED);

describe('deterministicPartitionKey', () => {
  describe('input settings', () => {
    it("Returns the literal '0' when given no input", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe('0');
      expect(dpk.encryptKey).not.toHaveBeenCalled();
    });

    it('Returns the provided partition key', () => {
      const event = {
        partitionKey: '1',
      };
      const trivialKey = deterministicPartitionKey(event);
      expect(dpk.encryptKey).not.toHaveBeenCalled();
      expect(trivialKey).toBe('1');
    });

    it.each`
      type        | value           | expected
      ${'number'} | ${1}            | ${'1'}
      ${'array'}  | ${[1]}          | ${'[1]'}
      ${'object'} | ${{ key: 'A' }} | ${'{"key":"A"}'}
    `(
      'Returns the partition key as string when a $type is passed',
      ({ value, expected }) => {
        const event = { partitionKey: value };
        const trivialKey = deterministicPartitionKey(event);
        expect(dpk.encryptKey).not.toHaveBeenCalled();
        expect(trivialKey).toBe(expected);
      }
    );
  });

  describe('encryption', () => {
    beforeEach(() => {
      dpk.encryptKey.mockClear();
    });

    it('Encrypts the provided data if no partition key is passed', () => {
      const event = ['A', 'B'];
      const trivialKey = deterministicPartitionKey(event);
      expect(trivialKey).toBe(TEST_ENCRYPTED);
    });

    it('Encrypts the provided data if no partition key is passed', () => {
      const event = ['A', 'B'];
      const trivialKey = deterministicPartitionKey(event);

      expect(trivialKey).toBe(TEST_ENCRYPTED);
      expect(dpk.encryptKey).toHaveBeenCalledWith(JSON.stringify(event));
    });

    it('Encrypts the provided data if no partition key is passed', () => {
      const event = ['A', 'B'];
      const trivialKey = deterministicPartitionKey(event);

      expect(trivialKey).toBe(TEST_ENCRYPTED);
      expect(dpk.encryptKey).toHaveBeenCalledWith(JSON.stringify(event));
    });

    it('Encrypts the partition key if the lenght is longer than supported', () => {
      const event = {
        partitionKey: 'A'.repeat(dpk.MAX_PARTITION_KEY_LENGTH + 1),
      };

      const trivialKey = deterministicPartitionKey(event);
      expect(trivialKey).toBe(TEST_ENCRYPTED);
      expect(dpk.encryptKey).toHaveBeenCalledWith(event.partitionKey);
    });
  });
});
