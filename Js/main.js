var startbtn = document.getElementById("startbtn");
var landinghalf1 = document.getElementById("landinghalf1");
var landinghalf2 = document.getElementById("landinghalf2");

startbtn.addEventListener("click", function (e) {
  e.preventDefault(); // يمنع الانتقال الفوري

  // تطبيق الأنيميشن
  landinghalf1.classList.add("slide-up");
  landinghalf2.classList.add("slide-down");

  // إخفاء العناصر بعد انتهاء الأنيميشن (1 ثانية) ثم الانتقال
  setTimeout(function () {
    landinghalf1.classList.add("hidden");
    landinghalf2.classList.add("hidden");

    // الانتقال إلى صفحة أخرى (مثلاً game.html)
    window.location.href = "game.html";
  }, 2000); // نفس مدة الأنيميشن
});
