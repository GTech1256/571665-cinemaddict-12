import Abstract from "../view/abstract";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFORE: `before`
};


const render = (container, element, place = RenderPosition.BEFOREEND, targetElement) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  if (targetElement instanceof Abstract) {
    targetElement = targetElement.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFORE:
      container.insertBefore(element, targetElement);
  }
};

const renderTemplate = (container, template, place = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export {
  RenderPosition,
  render,
  renderTemplate,
  createElement,
  replace,
  remove
};
