class FlipNumber {
  nums;
  nextNums;
  options;
  endTime;
  hasHour = true;

  constructor(options) {
    this.options = Object.assign(
      {
        type: "clock",
      },
      options
    );

    if (this.options.type === "clock") return;

    this.endTime = dayjs();
    this.endTimestamp = this.endTime.valueOf();

    Object.entries(this.options.timing).forEach(([type, num]) => {
      this.endTime = this.endTime.add(num, type);
    });
  }

  getNextNum(index) {
    return { before: this.nums[index], after: this.nextNums[index] };
  }

  getNums() {
    return this.options.type === "clock"
      ? this.getClockNums()
      : this.getTimingNums();
  }

  formatNums(time) {
    return time
      .format("HHmmss")
      .split("")
      .map((num) => Number(num));
  }

  getClockNums() {
    const now = dayjs();
    this.nums = this.formatNums(now);
    this.nextNums = this.formatNums(now.add(1, "second"));
  }

  calculateDiffNums(time) {
    let hour = this.endTime.diff(time, "hour");
    let minute = this.endTime.diff(time.add(hour, "hour"), "minute");
    let second = this.endTime.diff(
      time.add(hour, "hour").add(minute, "minute"),
      "second"
    );

    this.hasHour = hour > 0;

    hour = hour > 9 ? hour : `0${hour}`;
    minute = minute > 9 ? minute : `0${minute}`;
    second = second > 9 ? second : `0${second}`;

    return `${hour}${minute}${second}`.split("").map((num) => Number(num));
  }

  getTimingNums() {
    const now = dayjs();
    const later = now.add(1, "second");
    this.nums = this.calculateDiffNums(now);
    this.nextNums = this.calculateDiffNums(later);
  }
}
