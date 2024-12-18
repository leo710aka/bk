// 登陆模块
//绑定组件
const loginForm = document.getElementById("login-form");
const loginUsername = document.getElementById("username");
const loginPassword = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const loggedInUser = document.getElementById("logged-in-user");
//监听提交事件
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //获取表单中用户输入的数据
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

//预存一篇
var post1 = {  title: "刘洪涛",  content: "12213123213",  timestamp: new Date().toLocaleString() , user : null};
var post2 = {  title: "何佳慧",  content: "12213123213",  timestamp: new Date().toLocaleString() , user : null };
posts.push(post1);posts.push(post2);
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
//没法定位到TinyMCE初始化的输入框，所以使用全局监听
var interval = setInterval(function() {
  var content = tinymce.get('post-content').getContent({ format: 'text' });
  var characterCount = content.trim().length;
  postContentCount.textContent = 100-characterCount + "个字符剩余";
  if(characterCount==0){
    postContentCount.textContent = "";
  }
}, 100); // 每隔0.1秒执行一次,检查TinyMCE控件中的字符

postForm.addEventListener("submit", function(event) {
  event.preventDefault(); // 阻止表单提交的默认行为
  // var content = postContent.value.trim(); // 获取用户输入的内容
  var content = tinymce.get('post-content').getContent();
  var title = postTitle.value.trim();
  var random = Math.floor(Math.random()*10000)+2;
  if (content !== "" && title != "") {
    // 创建帖子对象
    var post = {
      title: title,
      content: content,
      timestamp: new Date().toLocaleString(),
      value: random //唯一标识
    };
    posts.push(post);
    tinymce.get('post-content').setContent('');
    postTitle.value = "";
    // 更新帖子显示
    showPosts();
    postContentCount.textContent = "";
  }
});



// 论坛列表
const postList = document.getElementById("post-list");
const currentPage = document.getElementById("current-page");
const postsPerPage = document.getElementById("posts-per-page");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");
const deleteBtn = document.getElementById("delete-btn");

// 删除帖子
deleteBtn.addEventListener("click", function () {
  var de = document.querySelectorAll("#each-post");
  de.forEach(item=>{
    let checkbox = item.querySelector('#post-check') 
    if (checkbox.checked) {
      var i = 0;
      for (; i<posts.length; i++){
        if(posts[i].value==item.querySelector('#text').value) break;
      }
      posts.splice(i, 1);
    }
    showPosts();
  })
});

// 切页、切换每页显示的帖子数
prevPageBtn.addEventListener("click", function () {
  var page = parseInt(currentPage.innerText); 
  if (page>1){
    page--;
    currentPage.innerText=page;
    showPosts();
  }
});
nextPageBtn.addEventListener("click", function () {
  var page = parseInt(currentPage.innerText); 
  var postsPerPage = parseInt(document.getElementById("posts-per-page").value); // 从下拉菜单获取每页显示的帖子数
  if ((page*postsPerPage)<posts.length){
    page++;
    currentPage.innerText=page;
    showPosts();
  }
});
postsPerPage.addEventListener("change", function () {
  currentPage.innerText=1;
  showPosts();
});

function showPosts() {
  // 清空帖子显示区域
  postList.innerHTML = "";
  var username = loginUsername.value;
  var postsPerPage = parseInt(document.getElementById("posts-per-page").value); // 从下拉菜单获取每页显示的帖子数
  var page = parseInt(currentPage.innerText); 
  // 计算起始索引和结束索引
  var endIndex = posts.length-1-(page-1)*postsPerPage;
  var startIndex = endIndex-postsPerPage+1;
  if (endIndex>=0){
    if (startIndex<=0) startIndex=0;
    var curPosts = posts.slice(startIndex, endIndex+1);
    // 循环遍历帖子列表，创建帖子元素并添加到显示区域
    for (var i = curPosts.length-1; i >= 0 ; i--) {
      var post = curPosts[i];
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
      td3.type="hidden";td3.id="text";
      // td3.value=i;
      td3.value=post.value;
      // 将表格单元格添加到表格行
      tr.appendChild(td);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      console.log(tr);
      potList.appendChild(tr);
    }
  }
  
}

