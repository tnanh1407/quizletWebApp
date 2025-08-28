const f = document.getElementById('forgotForm');
const email = document.getElementById('email');
const emailErr = document.getElementById('emailErr');
const msgBox = document.getElementById('msgBox');

function clearErrors(){
  emailErr.textContent = '';
  msgBox.innerHTML = '';
}

function fakeSendEmail(e){
  return new Promise(res=>setTimeout(()=>{
    if(!e.endsWith('@example.com')){
      res({ok:false,msg:"Email không tồn tại trong hệ thống"});
    } else {
      res({ok:true,msg:"Đã gửi liên kết đặt lại mật khẩu tới " + e});
    }
  },800));
}

f.addEventListener('submit', async ev=>{
  ev.preventDefault(); clearErrors();
  let ok = true;

  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){
    emailErr.textContent = "Email không hợp lệ";
    ok = false;
  }
  if(!ok) return;

  const res = await fakeSendEmail(email.value);
  const div = document.createElement('div');
  div.className = 'msg ' + (res.ok ? 'success' : 'fail');
  div.textContent = res.msg;
  msgBox.appendChild(div);
});
