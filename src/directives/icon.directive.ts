import { DirectiveBinding } from "vue";

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding<any>) {
    let iconClass = "";
    binding.arg === "full"
      ? (iconClass = binding.value)
      : (iconClass = `fa fa-${binding.value}`);

    if (binding.modifiers) {
      binding.modifiers.right ? (iconClass += " float-right ") : iconClass;
      binding.modifiers.teal ? (iconClass += " text-teal-600 ") : iconClass;
      binding.modifiers.xl ? (iconClass += " text-xl ") : iconClass;
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
