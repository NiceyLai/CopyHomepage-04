window.addEventListener("load", function () {
  // 轮播图制作

  let focus = document.querySelector(".focus");
  let ul = focus.children[0];
  let w = focus.offsetWidth;
  var ol = focus.children[1];

  // 1. 利用定时器自动轮播图片
  let index = 0;
  let timer = setInterval(function () {
    index++;
    let translatex = -index * w;
    ul.style.transition = "all .3s";
    ul.style.transform = "translateX(" + translatex + "px)";
  }, 2000);

  // 过渡完成之后再判断 监听过渡完成的事件
  ul.addEventListener("transitionend", function () {
    // 无缝滚动
    if (index >= 3) {
      index = 0;
      // console.log(index);
      // 去掉过渡效果 这样让我们的ul 快速的跳到目标位置
      ul.style.transition = "none";
      // 利用最新的索引号乘以宽度 去滚动图片
      var translatex = -index * w;
      ul.style.transform = "translateX(" + translatex + "px)";
    } else if (index < 0) {
      index = 2;
      ul.style.transition = "none";
      // 利用最新的索引号乘以宽度 去滚动图片
      var translatex = -index * w;
      ul.style.transform = "translateX(" + translatex + "px)";
    }
    // 3. 小圆点跟随变化
    // 把ol里面li带有current类名的选出来去掉类名 remove
    ol.querySelector(".current").classList.remove("current");
    // 让当前索引号 的小li 加上 current   add
    ol.children[index].classList.add("current");
  });

  // 4. 手指滑动轮播图
  // 触摸元素 touchstart：  获取手指初始坐标
  let startX = 0;
  let moveX = 0;
  let flag = false;

  ul.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    clearInterval(timer);
  });
  // 移动手指 touchmove：  计算手指的滑动距离，并且移动盒子
  ul.addEventListener("touchmove", function (e) {
    moveX = e.targetTouches[0].pageX - startX;
    let translateX = -index * w + moveX;
    // 手指拖动不需要动画效果
    ul.style.transition = "none";
    ul.style.transform = "translateX(" + translateX + "px)";
    flag = true; // 如果用户手指移动过再去判断，否则不做判断效果
    e.preventDefault(); // 阻止默认行为
  });
  // 离开手指 touchend:   根据滑动的距离分不同的情况
  ul.addEventListener("touchend", function (e) {
    if (flag) {
      // 如果移动距离大于某个像素就上一张下一张滑动。
      if (Math.abs(moveX) > 50) {
        // 滑动分为左滑和右滑 判断的标准是 移动距离正负 如果是负值就是左滑 反之右滑
        if (moveX > 0) {
          // 如果是右滑 就播放上一张  (index--)
          index--;
        } else {
          // 如果是左滑 就播放下一张 （index++）
          index++;
        }
        let translateX = -index * w;
        // 手指拖动不需要动画效果
        ul.style.transition = "all .3s";
        ul.style.transform = "translateX(" + translateX + "px)";
      } else {
        // 如果移动距离小于 某个像素  就回弹原来位置
        let translateX = -index * w;
        ul.style.transition = "all .1s";
        ul.style.transform = "translateX(" + translateX + "px)";
      }
    }
    // 手指离开开启定时器
    clearInterval(timer);
    timer = setInterval(function () {
      index++;
      let translatex = -index * w;
      ul.style.transition = "all .3s";
      ul.style.transform = "translateX(" + translatex + "px)";
    }, 2000);
  });

  // 返回顶部模块制作

  let goBack = document.querySelector(".goBack");
  let imgList = document.querySelector(".imgList");
  window.addEventListener("scroll", function () {
    if (window.pageYOffset >= imgList.offsetTop) {
      goBack.style.display = "block";
    } else {
      goBack.style.display = "none";
    }
  });
  goBack.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });
});
