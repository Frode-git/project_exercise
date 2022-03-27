// 获取要操作的元素
const login_title = document.querySelector('.login-title')
const register_title = document.querySelector('.register-title')
const login_box = document.querySelector('.login-box')
const register_box = document.querySelector('.register-box')

// 绑定点击事件
login_title.addEventListener('click', () => {
  // 判断是否收起
  if (login_box.classList.contains('slide-up')) {
    register_box.classList.add('slide-up')
    login_box.classList.remove('slide-up')
  }
})

register_title.addEventListener('click', () => {
  if (register_box.classList.contains('slide-up')) {
    login_box.classList.add('slide-up')
    register_box.classList.remove('slide-up')
  }
})
