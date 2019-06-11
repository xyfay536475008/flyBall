// 基于subscribe.js扩展小球抛掷运动函数
class FlyBall extends DragBall {
  constructor(el) {
    super(el);

    this.STOP = this.stopFly.bind(this);
    this.horizontalMove = this.horizontalMove.bind(this);
    this.verticalMove = this.verticalMove.bind(this);
    this.EVALUATE = this.evaluate.bind(this);

    // 添加鼠标按下后让小球停止运动的回调
    this.subDown.add(this.STOP);
    this.subMove.add(this.EVALUATE);
    this.subUp.add(this.horizontalMove);
    this.subUp.add(this.verticalMove);

    // 计算运动的范围
    this.maxL = document.documentElement.clientWidth - el.offsetWidth;
    this.maxT = document.documentElement.clientHeight - el.offsetHeight;
  }

  // 鼠标拖拽的回调
  evaluate(el) {
    // 求X、Y轴方向的speed
    this.speedX = el.offsetLeft - this.lastX;
    this.speedY = el.offsetTop - this.lastY;
    // 重新赋值,用于下次计算speed
    this.lastX = el.offsetLeft;
    this.lastY = el.offsetTop;
  }

  horizontalMove(el) {
    let _this = this;

    this.hTimer = setInterval(() => {
      // 当前位置
      let curL = el.offsetLeft;

      // 模拟空气摩擦力导致速度衰减
      _this.speedX *= 0.98;

      curL += _this.speedX;

      // 边缘碰撞处理
      if (curL >= _this.maxL) {
        curL = _this.maxL;
        _this.speedX *= -1;
      }
      if (curL <= 0) {
        curL = 0;
        _this.speedX *= -1;
      }
      el.style.left = curL + 'px';

      // 结束运动
      if (Math.abs(_this.speedX) < 0.5) {
        clearTimeout(_this.hTimer);
      }
    }, 16)
  }

  verticalMove(el) {
    let _this = this,
      flag = 0,
      maxT = _this.maxT;

    this.vTimer = setInterval(() => {
      if (flag > 1) {
        clearInterval(_this.vTimer);
      }
      // 计算后的当前位置
      let curT = el.offsetTop;

      // 模拟重力加速度
      _this.speedY += 9.8;
      // 模拟空气摩擦力导致速度衰减
      _this.speedY *= 0.98;

      curT += _this.speedY;

      // 触底
      if (curT >= maxT) {
        curT = maxT;
        _this.speedY *= -1;
        el.style.top = curT + 'px';
        // 连续两次动画都触底
        flag++;
        return;
      }
      // 触顶
      if (curT <= 0) {
        curT = 0;
        _this.speedY *= -1;
      }
      flag = 0;
      // 当前位置赋值
      el.style.top = curT + 'px';
    }, 16)
  }

  stopFly(el) {
    let {hTimer, vTimer} = this;
    // 如果小球正在运动则停止运动
    if (hTimer) {
      clearTimeout(hTimer);
    }
    if (vTimer) {
      clearTimeout(vTimer);
    }
    // 记录元素当前的offsetLeft、offsetTop
    this.lastX = el.offsetLeft;
    this.lastY = el.offsetTop

  }
}
