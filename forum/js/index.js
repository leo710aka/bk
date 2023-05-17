// 登陆模块
const loginForm = document.getElementById("login-form");
const loginUsername = document.getElementById("username");
const loginPassword = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const loggedInUser = document.getElementById("logged-in-user");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = loginUsername.value;
  const password = loginPassword.value;
  // 进行用户名和密码的验证
  if (password=="123"){
    // 如果用户名和密码验证通过，则隐藏登录表单，显示已登录用户的信息
  loginForm.style.display = "none";
  loggedInUser.textContent = "欢迎，" + username;
  loggedInUser.style.display = "inline-block";
  }
});


// 发帖模块
const postTitle = document.getElementById("post-title");
const postContent = document.getElementById("post-content");
const postContentCount = document.getElementById("post-content-count");
const postBtn = document.getElementById("post-btn");
const postForm = document.getElementById("post-form");
const potList = document.getElementById("post-list");
var posts = [];  // 存储已发布的帖子

//预存几篇
var post1 = {  title: "黄业凯",  content: "sb",  timestamp: new Date().toLocaleString() , user : null};
// var post2 = {  title: "何佳慧",  content: "12213123213",  timestamp: new Date().toLocaleString() , user : null };
posts.push(post1);
for (var i = 0; i < posts.length; i++) {
  var post = posts[i];
  // 创建表格行
  var tr = document.createElement("tr");
  // 创建表格单元格并设置内容
  var td = document.createElement("td");
  var input = document.createElement("input");
  input.type="checkbox";input.id="post-check";;
  td.appendChild(input);
  var td1 = document.createElement("td");
  var a = document.createElement("a");
  a.href = "./post.html?title=" + encodeURIComponent(post.title) + "&content=" + encodeURIComponent(post.content) + "&time=" + encodeURIComponent(post.timestamp) + "&user=" ;
  a.target = '_blank';
  a.textContent = post.title;
  td1.appendChild(a);
  var td2 = document.createElement("td");
  td2.textContent = post.timestamp;
  var td3 = document.createElement("input");
  td3.type="hidden";td3.id="text";td3.value=i;
  // 将表格单元格添加到表格行
  tr.appendChild(td);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  potList.appendChild(tr);
}

//发布新帖
postTitle.addEventListener("input", function (event) {
  // 标题长度不能超过10个字符
  if (event.target.value.length > 10) {
    event.target.value = event.target.value.slice(0, 10);
  }
});
postContent.addEventListener("input", function (event) {
  // 内容长度不能超过100个字符
  if (event.target.value.length > 100) {
    event.target.value = event.target.value.slice(0, 100);
  }
  // 显示还可输入的字符数
  const remainingChars = 100 - event.target.value.length;
  postContentCount.textContent = remainingChars + "个字符剩余";
});

postForm.addEventListener("submit", function(event) {
  event.preventDefault(); // 阻止表单提交的默认行为
  var content = postContent.value.trim(); // 获取用户输入的内容
  var title = postTitle.value.trim();
  if (content !== "" && title != "") {
    // 创建帖子对象
    var post = {
      title: title,
      content: content,
      timestamp: new Date().toLocaleString() // 记录时间戳
    };
    posts.push(post);
    postContent.value = "";
    postTitle.value = "";
    // 更新帖子显示
    displayPosts();
  }
});


// 论坛列表
const postList = document.getElementById("post-list");
const perPageSelect = document.getElementById("per-page-select");
const deleteBtn = document.getElementById("delete-btn");

// 渲染帖子列表
function displayPosts() {
  // 清空帖子显示区域
  postList.innerHTML = "";
  var username = loginUsername.value;
  // 循环遍历帖子列表，创建帖子元素并添加到显示区域
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    // 创建表格行
    var tr = document.createElement("tr");
    tr.id="each-post";
    // 创建表格单元格并设置内容
    var td = document.createElement("td");
    var input = document.createElement("input");
    input.type="checkbox";input.id="post-check";
    td.appendChild(input);
    var td1 = document.createElement("td");
    var a = document.createElement("a");
    a.href = "./post.html?title=" + encodeURIComponent(post.title) + "&content=" + encodeURIComponent(post.content) + "&time=" + encodeURIComponent(post.timestamp) + "&user=" + encodeURIComponent(username);
    a.target = '_blank';
    a.textContent = post.title;
    td1.appendChild(a);
    var td2 = document.createElement("td");
    td2.textContent = post.timestamp;
    var td3 = document.createElement("input");
    td3.type="hidden";td3.id="text";td3.value=i;
    // 将表格单元格添加到表格行
    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    console.log(tr);
    potList.appendChild(tr);
  }
}

// 删除帖子
deleteBtn.addEventListener("click", function () {

  var de = document.querySelectorAll("#each-post");
  de.forEach(item=>{
    let checkbox = item.querySelector('#post-check') 
    if (checkbox.checked) {
      // alert(item.querySelector('#text').value);
      posts.splice(item.querySelector('#text').value, 1);
    }
    displayPosts();
  })
  
});


// 切换每页显示的帖子数
perPageSelect.addEventListener("change", function (event) {
  const perPage = event.target.value;
  // TODO: 更新帖子列表显示
});



