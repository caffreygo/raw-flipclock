class FlipClock extends FlipNumber {
  main;
  refs;

  constructor(options) {
    super(options);
    this.main = document.querySelector(options.el);
  }

  clock() {
    this.getNums();
    this.creteSectionElement();
    this.getRefs();
  }

  render() {
    this.clock();
    setInterval(() => {
      this.getNums();
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
    });
  }
}

const instance = new FlipClock({
  el: "#clock",
  type: "timing",
  timing: {
    // hour: 2,
    minute: 2,
    second: 11
  }
});

instance.render();

