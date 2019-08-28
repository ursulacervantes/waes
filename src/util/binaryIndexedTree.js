export default function BinaryIndexedTree(arg) {
  let sumTree;

  if (typeof arg == 'number') {
    if (arg < 0 || Math.floor(arg) !== arg) throw new Error('Illegal argument');
    sumTree = [];
    for (let i = 0; i < arg; i++) sumTree.push(0);
  } else if (arg instanceof Array) {
    sumTree = arg.slice();
    sumTree.forEach(function(val, i) {
      // For each consecutive 1 in the lowest order bits of i
      for (let j = 1; (i & j) !== 0; j <<= 1) val += sumTree[i ^ j];
      sumTree[i] = val;
    });
  } else {
    throw new Error('Illegal argument');
  }

  Object.defineProperty(this, 'length', {
    get: function() {
      return sumTree.length;
    },
    enumerable: true
  });

  this.get = function(index) {
    if (!(0 <= index && index < sumTree.length))
      throw new Error('Index out of bounds');
    let result = sumTree[index];
    // For each consecutive 1 in the lowest order bits of index
    for (let i = 1; (index & i) !== 0; i <<= 1) result -= sumTree[index ^ i];
    return result;
  };

  this.set = function(index, val) {
    if (!(0 <= index && index < sumTree.length))
      throw new Error('Index out of bounds');
    this.add(index, val - this.get(index));
  };

  this.add = function(index, delta) {
    if (!(0 <= index && index < sumTree.length))
      throw new Error('Index out of bounds');
    do {
      sumTree[index] += delta;
      index |= index + 1; // Set lowest 0 bit; strictly increasing
    } while (index < sumTree.length);
  };

  this.getTotal = function() {
    return this.getPrefixSum(sumTree.length);
  };

  this.getPrefixSum = function(end) {
    if (!(0 <= end && end <= sumTree.length))
      throw new Error('Index out of bounds');
    let result = 0;
    while (end > 0) {
      result += sumTree[end - 1];
      end &= end - 1; // Clear lowest 1 bit; strictly decreasing
    }
    return result;
  };

  this.getRangeSum = function(start, end) {
    if (!(0 <= start && start <= end && end <= sumTree.length))
      throw new Error('Index out of bounds');
    return this.getPrefixSum(end) - this.getPrefixSum(start);
  };
}
