class rewardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() {
    return ["title", "pledge", "description", "rewards"];
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal === newVal) {
      return;
    }
    if (attr === "title") {
      this.title = newVal;
    }
    if (attr === "pledge" && oldVal !== newVal) {
        this.pledge = newVal;
    }
    if (attr === "description") {
        this.description = newVal;
    }
    if (attr === "rewards") {
      this.rewards = newVal;
    }
  }
  getTemplate() {
    const template = document.createElement("template");
    const sectionClass = this.rewards === '0' ? 'no-rewards' : '';
    const buttonClass = this.rewards === '0' ? 'button-no-rewards' : '';
    const buttonText = this.rewards === '0' ? 'Out of Stock' : 'Select Reward';
    template.innerHTML= `
      <section class="${sectionClass}">
        <div class="title-container">
          <h3>${this.title}</h3>
          <h3 class="pledge">${this.pledge}</h3>
        </div>
        <p>${this.description}</p>
        <div class="button-container">
          <p id="rewards-left">${this.rewards}<span>left</span></p>
          <button class="${buttonClass}">${buttonText}</button>
        </div>
      </section>
      ${this.getStyles()}
    `;
    return template;
  }
  getStyles() {
    return `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@100..900&display=swap');

        section {
          width: 100%;
          height: auto;
          background-color: white;
          margin: auto;
          margin-bottom: 30px;
          padding: 0 20px;
          box-sizing: border-box;
          border: 1px solid var(--dark-grey);
          border-radius: 8px;
          font-size: 0.8rem;
        }

        section .pledge {
          position: relative;
          top: -10px;
          color: var(--moderate-cyan);
        }

        section p {
          color: var(--dark-grey);
          line-height: 1.8;
        }

        #rewards-left {
          position: relative;
          top: -20px;
          font-size: 2rem;
          font-weight: bold;
          color: var(--black);
          vertical-align: middle;
        }

        #rewards-left span {
          font-size: 1rem;
          font-weight: 400;
          vertical-align: middle;
          color: var(--dark-grey);
          position: relative;
          top: -4px;
          margin-left: 8px;
        }

        button {
          all: unset;
          width: 160px;
          height: 50px;
          font-family: 'Commissioner', sans-serif;
          background-color: var(--moderate-cyan);
          color: white;
          font-weight: bold;
          font-size: 0.9rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50px;
          margin-bottom: 20px;
          margin-top: -36px;
        }

        .no-rewards {
          opacity: 0.4;
        }

        .button-no-rewards {
          background-color: var(--dark-grey);
        }

        @media (min-width: 675px) {
          .title-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .title-container .pledge {
            margin-top: 28px;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: -20px;
          }

          .button-container button {
            margin-top: 18px;
          }

          .button-container button:hover {
            cursor: pointer;
            background-color: var(--dark-cyan);
          }
        }
      </style>
    `;
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define("reward-component", rewardComponent);