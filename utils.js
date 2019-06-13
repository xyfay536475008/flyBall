const utils = (function () {
  //=>检测当前元素中是否包含某一个样式类名
  let hasClass = (ele, str) => ele.className.trim().split(/ +/).indexOf(str) >= 0;

  //=>给当前元素增加样式类名
  let addClass = (ele, str) => {
    let isExit = hasClass(ele, str);
    if (isExit) return;
    ele.className += ` ${str}`;
  };

  //=>给当前元素移除样式类名
  let removeClass = (ele, str) => {
    let isExit = hasClass(ele, str);
    if (!isExit) return;
    let ary = ele.className.trim().split(/ +/);
    ary = ary.filter(item => item !== str);
    ele.className = ary.join(' ');
  };

  //=>给当前元素清空样式类名
  let clearClass = (ele) => {
    ele.className = '';
  };
  return {
    hasClass,
    addClass,
    removeClass,
    clearClass
  };
})();
