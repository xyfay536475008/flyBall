// 基于subscribe.js扩展小球抛掷运动函数
class FlyBall extends DragBall {
  constructor(el) {
    super(el);

    this.STOP = this.stopFly.bind(this);
    this.horizontalMove = this.horizontalMove.bind(this);
    this.verticalMove = this.verticalMove.bind(this);
    this.EVALUATE = this.evaluate.bind(this);

    // 鼠标按下后让小球停止运动
    this.subDown.add(this.STOP);
    // 计算速度
    this.subMove.add(this.EVALUATE);
    // 水平运动
    this.subUp.add(this.horizontalMove);
    // 垂直运动
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

  // 水平方向动画
  horizontalMove(el) {
    this.hTimer = setInterval(() => {
      // 当前位置
      let curL = el.offsetLeft;

      // 模拟空气摩擦力导致速度衰减
      this.speedX *= 0.98;

      curL += this.speedX;

      // 边缘碰撞处理
      if (curL >= this.maxL) {
        curL = this.maxL;
        this.speedX *= -1;

        // 控制小球旋转方向
        let sy = this.speedY;
        if (sy > 0) {
          this.antiClockWise(el);
        } else if (sy < 0) {
          this.clockWise(el);
        }
      }
      if (curL <= 0) {
        curL = 0;
        this.speedX *= -1;

        // 控制小球旋转方向
        let sy = this.speedY;
        if (sy > 0) {
          this.clockWise(el);
        } else if (sy < 0) {
          this.antiClockWise(el);
        }
      }
      el.style.left = curL + 'px';

      // 结束运动
      if (Math.abs(this.speedX) < 0.5) {
        utils.clearClass(el);
        clearTimeout(this.hTimer);
      }
    }, 16)
  }

  // 垂直方向动画
  verticalMove(el) {
    let flag = 0,
      maxT = this.maxT;
    this.speedY === undefined ? this.speedY = 0 : null;

    this.vTimer = setInterval(() => {
      if (flag > 1) {
        clearInterval(this.vTimer);
      }
      // 计算后的当前位置
      let curT = el.offsetTop;

      // 模拟重力加速度
      this.speedY += 2;
      // 模拟空气摩擦力导致速度衰减
      this.speedY *= 0.98;

      curT += this.speedY;

      // 触底
      if (curT >= maxT) {
        // 控制小球旋转方向
        let sx = this.speedX;
        if (sx > 0) { // 向右
          this.clockWise(el);
        } else if (sx < 0) { // 向左
          this.antiClockWise(el);
        } else { // 水平静止
          utils.clearClass(el);
        }

        curT = maxT;
        this.speedY *= -1;
        el.style.top = curT + 'px';
        // 连续两次动画都触底
        flag++;
        return;
      }
      // 触顶
      if (curT <= 0) {
        // 控制小球旋转方向
        let sx = this.speedX;
        if (sx > 0) {
          this.antiClockWise(el);
        } else if (sx < 0) {
          this.clockWise(el);
        } else {
          utils.clearClass(el);
        }

        curT = 0;
        this.speedY *= -1;
      }
      flag = 0;
      // 当前位置赋值
      el.style.top = curT + 'px';
    }, 16)
  }

  // 顺时针旋转
  clockWise(el) {
    if (!utils.hasClass(el, 'rotateRight')) {
      utils.clearClass(el);
      utils.addClass(el, 'rotateRight')
    }
  }

  // 逆时针旋转
  antiClockWise(el) {
    if (!utils.hasClass(el, 'rotateLeft')) {
      utils.clearClass(el);
      utils.addClass(el, 'rotateLeft')
    }
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
