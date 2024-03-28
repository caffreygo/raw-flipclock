class FlipClock {
  main;
  nums;
  // nextNums;
  refs;
  constructor(el) {
    this.main = document.querySelector(el);
  }

  clock() {
    this.getTimes();
    this.creteSectionElement();
    this.getRefs();
  }

  render() {
    this.clock();
    setInterval(() => {
      this.getTimes();
      this.update();
    }, 50);
  }

  update() {
    this.nums.forEach((num, index) => {
      let nextNum = num + 1;
      if (index % 2) {
        nextNum = nextNum > 9 ? 0 : nextNum;
      } else {
        nextNum = nextNum > 5 ? 0 : nextNum;
      }

      const [div1, div2] = this.refs[index];

      if (Number(div1.dataset.before) !== num) {
        div2.classList.add("flipDown");
      }

      div2.addEventListener("animationend", () => {
        div1.dataset.before = num;
        div2.dataset.before = num;
        div1.dataset.after = nextNum;
        div2.dataset.after = nextNum;
        div2.classList.remove("flipDown");
      });
    });
  }

  getTimes() {
    const timeStamp = Date.now();
    this.nums = new Date(timeStamp)
      .toLocaleTimeString()
      .replaceAll(":", "")
      .split("")
      .map((num) => Number(num));
    // this.nextNums = new Date(timeStamp + 1000)
    //   .toLocaleTimeString()
    //   .replaceAll(":", "")
    //   .split("")
    //   .map((num) => Number(num));
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
