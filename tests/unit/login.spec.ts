import { shallowMount } from "@vue/test-utils";
import UserLogin from "@/views/userLogin.vue";

// const factory = (values = {}) => {
//   return shallowMount(App, {
//     data() {
//       return {
//         ...values,
//       };
//     },
//   });
// };

describe("userLogin.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(UserLogin, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
