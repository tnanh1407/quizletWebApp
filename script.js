const f = document.getElementById('signupForm');
const email = document.getElementById('email');
const user = document.getElementById('username');
const pw = document.getElementById('pw');
const pw2 = document.getElementById('pw2');
const emailErr = document.getElementById('emailErr');
const userErr = document.getElementById('userErr');
const pwErr = document.getElementById('pwErr');
const pw2Err = document.getElementById('pw2Err');
const msgBox = document.getElementById('msgBox');

function clearErrors(){
  emailErr.textContent = userErr.textContent = pwErr.textContent = pw2Err.textContent = '';
  msgBox.innerHTML='';
}
function fakeSignup(e,u,p){
  return new Promise(res=>setTimeout(()=>{
    if(u.toLowerCase()==='taken') res({ok:false,msg:"Username đã tồn tại"});
    else res({ok:true,msg:"Đăng ký thành công! Hãy đăng nhập."});
  },900));
}

f.addEventListener('submit', async ev=>{
  ev.preventDefault();clearErrors();
  let ok=true;
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){emailErr.textContent="Email không hợp lệ";ok=false;}
  if(user.value.includes(" ")){userErr.textContent="Username không chứa khoảng trắng";ok=false;}
  if(pw.value.length<6){pwErr.textContent="Mật khẩu ≥6 ký tự";ok=false;}
  if(pw.value!==pw2.value){pw2Err.textContent="Mật khẩu không khớp";ok=false;}
  if(!ok)return;

  const res=await fakeSignup(email.value,user.value,pw.value);
  const div=document.createElement('div');
  div.className='msg '+(res.ok?'success':'fail');
  div.textContent=res.msg;
  msgBox.appendChild(div);
});
