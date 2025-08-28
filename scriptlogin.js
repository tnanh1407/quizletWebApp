const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const globalMessage = document.getElementById('globalMessage');
const submitBtn = document.getElementById('submitBtn');
const btnLabel = document.getElementById('btnLabel');
const togglePw = document.getElementById('togglePw');
const clearUsername = document.getElementById('clearUsername');

function setLoading(on){
  if(on){
    submitBtn.disabled = true;
    btnLabel.innerHTML = '<span class="spinner" aria-hidden="true"></span> Đang xử lý';
    submitBtn.setAttribute('aria-busy','true');
  } else {
    submitBtn.disabled = false;
    btnLabel.textContent = 'Đăng nhập';
    submitBtn.removeAttribute('aria-busy');
  }
}

function showGlobal(msg, type='success'){
  globalMessage.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'msg ' + (type === 'success' ? 'success' : 'fail');
  div.textContent = msg;
  globalMessage.appendChild(div);
}

function clearErrors(){
  usernameError.textContent = '';
  passwordError.textContent = '';
  globalMessage.innerHTML = '';
}

function validate(){
  clearErrors();
  let ok = true;
  const u = username.value.trim();
  const p = password.value;

  if(!u){
    usernameError.textContent = 'Vui lòng nhập email hoặc username.'; ok = false;
  } else if (u.length < 3){
    usernameError.textContent = 'Username/phần email quá ngắn.'; ok = false;
  } else if (u.length > 80){
    usernameError.textContent = 'Trường username/email quá dài (tối đa 80 ký tự).'; ok = false;
  } else if (u.includes(' ')){
    usernameError.textContent = 'Không được có khoảng trắng trong username/email.'; ok = false;
  }

  if(!p){
    passwordError.textContent = 'Vui lòng nhập mật khẩu.'; ok = false;
  } else if (p.length < 6){
    passwordError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.'; ok = false;
  } else if (p.length > 128){
    passwordError.textContent = 'Mật khẩu quá dài.'; ok = false;
  }

  return ok;
}

togglePw.addEventListener('click', () => {
  const isHidden = password.type === 'password';
  password.type = isHidden ? 'text' : 'password';
  togglePw.setAttribute('aria-pressed', String(isHidden));
  togglePw.textContent = isHidden ? '🙈' : '👁️';
});

clearUsername.addEventListener('click', () => {
  username.value = '';
  username.focus();
});

/* fake login */
function fakeLogin(u, p){
  return new Promise(resolve => {
    setTimeout(() => {
      if(u === 'student' && p === 'password') resolve({ok:true});
      else resolve({ok:false});
    }, 1000);
  });
}

/* handle submit */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(!validate()) return;

  const u = username.value.trim();
  const p = password.value;

  setLoading(true);
  try {
    const result = await fakeLogin(u, p);
    if(result.ok){
      showGlobal('Đăng nhập thành công!', 'success');
      // window.location.href = '/dashboard';
    } else {
      showGlobal('Sai tài khoản hoặc mật khẩu.', 'fail');
    }
  } catch(err){
    showGlobal('Có lỗi kết nối. Vui lòng thử lại.', 'fail');
  } finally {
    setLoading(false);
  }
});
document.getElementById('loginGoogle').addEventListener('click', () => {
  alert('Đăng nhập bằng Google (demo)');
  // Thực tế: gọi API OAuth Google
});
document.getElementById('loginFacebook').addEventListener('click', () => {
  alert('Đăng nhập bằng Facebook (demo)');
  // Thực tế: gọi API OAuth Facebook
});
document.getElementById('loginApple').addEventListener('click', () => {
  alert('Đăng nhập bằng Apple (demo)');
  // Thực tế: gọi API OAuth Apple
});
