// 解析 URL 参数
var urlParams = new URLSearchParams(window.location.search);
var title = urlParams.get("title");
var content = urlParams.get("content");
var time = urlParams.get("time");
var user = urlParams.get("user");

// 在页面中展示数据
document.getElementById("post-title").textContent = title;
document.getElementById("post-content").textContent = content;
document.getElementById("post-time").textContent = time;
document.getElementById("logged-in-user").textContent = "欢迎，" + user;
