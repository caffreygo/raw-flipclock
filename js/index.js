class FlipClock extends FlipNumber {
  main;
  refs;
  timer;

  constructor(options) {
    super(options);
    this.main = document.querySelector(options.el);
    this.main.classList.add("flip-clock");

    if (options.style) {
      this.injectStyle(options.style)
    }
  }

  clock() {
    this.getNums();
    this.creteSectionElement();
    this.getRefs();
  }

  injectStyle(theme) {
    this.main.insertAdjacentHTML("beforeend", `<link rel="stylesheet" type="text/css" href="./style/${theme}.css" />`)
  }

  render() {
    this.clock();
    this.timer = setInterval(() => {
      this.getNums();
      this.updateDivNumber();

      if (this.nums.every((num) => num === 0)) {
        this.stop();
      }
    }, 50);
  }

  stop() {
    clearInterval(this.timer);
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

  getRefs() {
    this.refs = Array.from(this.main.querySelectorAll("section")).map(
      (section) => section.querySelectorAll("div")
    );
  }

  creteSectionElement() {
    this.nums.forEach((num, idx) => {
      const { before, after } = this.getNextNum(idx);
      this.main.insertAdjacentHTML(
        "beforeend",
        `
      <section>
        <div data-before="${before}" data-after="${after}"></div>
        <div data-before="${before}" data-after="${after}"></div>
      </section>
      `
      );

      if (idx % 2 & (idx < this.nums.length - 1)) {
        this.main.insertAdjacentHTML("beforeend", "<p></p>");
      }

      if (!this.hasHour) {
        this.main.classList.add("hour-hidden");
      }
    });
  }
}
