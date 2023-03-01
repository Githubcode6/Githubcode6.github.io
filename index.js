// 定义数据源
var imgs = ["./images/1.jpg", "./images/2.jpg", "./images/3.jpg", "./images/4.jpg", "./images/5.jpg"];

// 填充轮播图内容
renderSlider();
function renderSlider() {
    $(".slider_content .item").css({
        backgroundImage: function (index, oldValue) {
            // jquery的css属性值还可以通过回调函数的方法设置样式值（return）
            return `url(${imgs[index]})`
        }
    });
}

// 表示当前轮播到第几张内容了
var currentIndex = 0;
// 表示是否正在做动画
var isAnimate = false;

/*
*** 执行轮播核心的逻辑
*** index：表示接下来哪块要进场
*** to: 出场的位置
*** from：进场的位置
*/
function slider(index,to,from){
    if (isAnimate) return;
    isAnimate = true;

    // 让当前的内容走开
    $(".slider_content .item").eq(currentIndex).animate({ left: to }, 500, function () { });
    $(".indicator .dot").eq(currentIndex).removeClass("active");
    // 让下一张内容出来
    $(".slider_content .item").eq(index).css({ left: from }).animate({ left: 0 }, 500, function () { isAnimate = false });
    $(".indicator .dot").eq(index).addClass("active"); 
    // 更新 currentIndex
    currentIndex = index;
}
// 右箭头
$(".slider_arrow > div.right").on("click",next);
function next(){
    // index 表示下一张是谁
    var index = currentIndex >= imgs.length - 1 ? 0 : currentIndex + 1;
    slider(index, -817, 817);
}
// 左箭头
$(".slider_arrow > div.left").on("click", function () {
    // index 表示下一张是谁
    var index = currentIndex <= 0 ? imgs.length - 1 : currentIndex - 1;
    slider(index, 817, -817);
});

// 指示器
$(".indicator .dot").on("click",function(){
    if ($(this).index() > currentIndex) {
        slider($(this).index(), -817, 817);
    } 
    if ($(this).index() < currentIndex) {
        slider($(this).index(), 817, -817);
    } 
});

// 自动轮播
var timer = setInterval(next, 5000);
$(".slider").hover(function () {
    clearInterval(timer);
}, function () {
    timer = setInterval(next, 5000);
});
