import AbstractComponent from "./abstractComponent.js";

const createNoFilmsTemplate = () => (`<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`);

export default class NoFilmsComponent extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}
