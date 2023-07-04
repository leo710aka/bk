// 解析 URL 参数
var urlParams = new URLSearchParams(window.location.search);
var title = urlParams.get("title");
var content = urlParams.get("content");
var time = urlParams.get("time");
var user = urlParams.get("user");

// 在页面中展示数据
document.getElementById("post-title").textContent = title;
// document.getElementById("post-content").textContent = content;
document.getElementById("post-time").textContent = time;
document.getElementById("logged-in-user").textContent = "欢迎，" + user;

// 创建一个新的 div 元素
var container = document.createElement('div');
// 将字符数据设置为 div 的 innerHTML
container.innerHTML = content;
// 获取创建的 HTML 元素
var elements = container.childNodes;
const postcontent = document.getElementById("post-content");
// 将创建的元素插入到页面中
for (var i = 0; i < elements.length; i++) {
    postcontent.appendChild(elements[i]);
}
