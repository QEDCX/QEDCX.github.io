let ale=document.getElementById('alert');
let name = document.getElementById('name');
let pwd = document.getElementById('pwd');
let btn = document.getElementById('btn_login');
btn.onclick=function () {
    if (name.innerText!=='001'){
        ale.textContent='用户名或密码错误';
        ale.style.display='block';
        ale.style.color='red';
    }
}

name.oninput=()=>{
   ale.style.display='block';
   ale.style.color='green';
   ale.textContent='仅包含英文字母、数字、下划线';
}

pwd.oninput=()=>{
    ale.style.display='block';
    ale.style.color='green';
    ale.textContent='仅包含英文字母、数字、下划线，且不少于5个字符';
}