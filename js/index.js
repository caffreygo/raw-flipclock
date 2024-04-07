class FlipClock extends FlipNumber {
  main;
  refs;

  constructor(el) {
    super();
    this.main = document.querySelector(el);
  }

  clock() {
    this.getTimes();
    this.creteSectionElement();
    this.getRefs();
    console.log(this);
  }

  render() {
    this.clock();
    setInterval(() => {
      this.getTimes();
      this.updateDivNumber();
    }, 50);
  }

  updateDivNumber() {
    this.refs.forEach(([div1, div2], index) => {
      const { before, after } = this.getNextNum(index);
      if (Number(div2.dataset.before) !== before) {
        div2.classList.add("flipDown");
      }

      div2.addEventListener("animationend", () => {
        div2.classList.remove("flipDown");
        div1.dataset.after = div2.dataset.after = after;
        div1.dataset.before = div2.dataset.before = before;
      });
    });
  }

  getTimes() {
    this.nums = dayjs()
      .format("HHmmss")
      .split("")
      .map((num) => Number(num));
  }

  getRefs() {
    this.refs = Array.from(this.main.querySelectorAll("section")).map(
      (section) => section.querySelectorAll("div")
    );
  }

  creteSectionElement() {
    this.nums.forEach((num, idx) => {
      this.main.insertAdjacentHTML(
        "beforeend",
        `
      <section>
        <div data-before="${num}" data-after="${num + 1}"></div>
        <div data-before="${num}" data-after="${num + 1}"></div>
      </section>
      `
      );

      if (idx % 2 & (idx < this.nums.length - 1)) {
        this.main.insertAdjacentHTML("beforeend", "<p></p>");
      }
    });
  }
}

const instance = new FlipClock("#clock");
instance.render();

const endTime = dayjs().add(188 * 60 + 12, "second");
let hour = endTime.diff(dayjs(), "hour");
let minute = endTime.diff(dayjs().add(hour, "hour"), "minute");
let second = endTime.diff(
  dayjs().add(hour, "hour").add(minute, "minute"),
  "second"
);

hour = hour > 9 ? hour : `0${hour}`;
minute = minute > 9 ? minute : `0${minute}`;
second = second > 9 ? second : `0${second}`;

console.log(hour, minute, second);
