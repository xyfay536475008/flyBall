class DragBall extends Subscribe {
  constructor(el) {
    // 继承Subscribe的构造函数
    super();
    // 把当前元素挂载到FlyingBall的实例对象上
    this._el = el;
    this.DOWN = this.mouseDownHandle.bind(this);
    this.MOVE = this.mouseMoveHandle.bind(this);
    this.UP = this.mouseUpHandle.bind(this);
    this.TOUCHDOWN = this.touchStartHandle.bind(this);
    this.TOUCHMOVE = this.touchMoveHandle.bind(this);
    this.TOUCHUP = this.touchEndHandle.bind(this);

    // 给当前元素绑定鼠标按下、抬起事件监听。通过bind让事件内的this指向实例
    el.addEventListener('mousedown', this.DOWN);
    el.addEventListener('mouseup', this.UP);
    el.addEventListener('touchstart', this.TOUCHDOWN);
    el.addEventListener('touchend', this.TOUCHUP);

    // 给三个鼠标事件分别创建计划表，并且都挂载到实例上
    this.subDown = new Subscribe();
    this.subMove = new Subscribe();
    this.subUp = new Subscribe();
  }

  // 鼠标按下事件
  mouseDownHandle(e) {
    // this 指向实例
    let el = this._el;
    // 计算鼠标按下的点距离元素上、左边缘的距离
    this.diffLeft = e.clientX - el.offsetLeft;
    this.diffTop = e.clientY - el.offsetTop;
    // 给document绑定鼠标移动事件。通过bind让事件内的this指向实例
    document.addEventListener('mousemove', this.MOVE);
    document.addEventListener('touchmove', this.TOUCHMOVE);

    // 执行回调函数，给回调函数传入元素对象和事件对象
    this.subDown.fire(el, e)
  }

  touchStartHandle(e) {
    this.mouseDownHandle(e.changedTouches[0])
  }

  // 鼠标移动事件
  mouseMoveHandle(e) {
    // this 指向实例
    let el = this._el;
    // 设置元素left、top
    el.style.left = e.clientX - this.diffLeft + 'px';
    el.style.top = e.clientY - this.diffTop + 'px';

    // 执行回调函数，给回调函数传入元素对象和事件对象
    this.subMove.fire(el, e)
  }

  touchMoveHandle(e) {
    this.mouseMoveHandle(e.changedTouches[0])
  }

  // 鼠标抬起事件
  mouseUpHandle(e) {
    let el = this._el;
    // this 指向实例
    // 解绑鼠标移动、抬起事件
    document.removeEventListener('mousemove', this.MOVE);
    document.removeEventListener('mouseup', this.UP);
    document.removeEventListener('touchmove', this.TOUCHMOVE);
    document.removeEventListener('touchend', this.TOUCHUP);

    // 执行回调函数，给回调函数传入元素对象和事件对象
    this.subUp.fire(el, e)
  }

  touchEndHandle(e) {
    this.mouseUpHandle(e.changedTouches[0]);
  }
}

