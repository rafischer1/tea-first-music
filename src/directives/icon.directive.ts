import { DirectiveBinding } from "vue";

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding<any>) {
    let iconClass = "";
    binding.arg === "full"
      ? (iconClass = binding.value)
      : (iconClass = `fa fa-${binding.value}`);

    binding.modifiers
      ? binding.modifiers.right
        ? (iconClass += " float-right ")
        : iconClass
      : iconClass;

    binding.modifiers
      ? binding.modifiers.teal
        ? (iconClass += " text-teal-600 ")
        : iconClass
      : iconClass;

    binding.modifiers
      ? binding.modifiers.xl
        ? (iconClass += " text-xl ")
        : iconClass
      : iconClass;

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
