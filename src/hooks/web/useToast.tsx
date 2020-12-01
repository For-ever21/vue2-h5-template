import Vue from "vue";

// toastTimer:存储toast定时器id; toastVM:存储toast vm;
let [toastTimer, toastVM]: any = [false, null];

// 默认配置
const defaultOption = {
  position: "center", // center top bottom
  duration: "2000",
  wordWrap: false, // 是否换行
  width: "auto",
};
let queue: any = [];
const _Toast = Vue.component("Toast", {
  props: {
    show: Boolean,
    message: [Number, String],
    wordWrap: Boolean,
    position: {
      type: String,
      default: defaultOption.position,
    },
    extStyle: {
      type: Object,
      default: () => {
        return {
          width: defaultOption.width,
        };
      },
    },
  },
  render(h: any) {
    if (!this.show) {
      return false;
    }
    return h("div", {
      class: ["lx-toast", `lx-toast-${this.position}`, this.wordWrap ? "lx-word-wrap" : ""],
      show: this.show,
      style: this.extStyle,
      domProps: {
        innerHTML: this.message,
      },
    });
  },
});
function isInDocument(element: HTMLElement) {
  return document.body.contains(element);
}
function createInstance() {
  queue = queue.filter(function (item: any) {
    return !item.$el.parentNode || isInDocument(item.$el);
  });
  if (!queue.length) {
    const toast = new (Vue.extend(_Toast))({
      el: document.createElement("div"),
    });
    queue.push(toast);
  }
  return queue[queue.length - 1];
}

export function Toast(options: any) {
  if (typeof options === "string") {
    options = { message: options };
  }
  Object.assign(options, defaultOption);

  toastVM = createInstance();

  if (toastTimer) {
    // 如果toast还在，则取消上次消失时间
    clearTimeout(toastTimer);
    toastVM.show = false;
  }

  const tpl = toastVM.$mount().$el;
  document.body.appendChild(tpl);
  toastVM.message = options.message;
  toastVM.wordWrap = options.wordWrap;
  toastVM.type = options.type;
  toastVM.show = true;

  toastTimer = setTimeout(() => {
    toastVM.show = toastTimer = false;
  }, options.duration);
}

Toast.install = function () {
  Vue.prototype.$toast = Toast;
};
