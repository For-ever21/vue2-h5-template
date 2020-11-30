import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // !这里只引入静态模块, 动态模块不要引入,动态模块直接import相应模块即可
});
