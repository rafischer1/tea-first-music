import { shallowMount } from "@vue/test-utils";
import About from "@/views/About.vue";

describe("About Component", () => {
  test("Contains text 'ABOUT'", () => {
    const wrapper = shallowMount(About);
    expect(wrapper.text()).toContain("ABOUT");
  });
});
