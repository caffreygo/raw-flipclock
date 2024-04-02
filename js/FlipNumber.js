class FlipNumber {
  nums;

  getNextNum(index) {
    return this.getClockNumber(index);
  }

  getTimingNumber(index) {}

  getClockNumber(index) {
    const before = this.nums[index];
    let after = before + 1;
    if (index % 2) {
      after = after > 9 ? 0 : after;
    } else {
      after = after > 5 ? 0 : after;
    }
    return { before, after };
  }
}
