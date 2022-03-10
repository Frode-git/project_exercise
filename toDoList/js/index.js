$(function () {
  // 进入页面先渲染本地数据一次
  load()

  // 添加清单
  // 当按下回车时，即要添加清单
  // 先从本地获取数据，然后追加，再存储
  // 数据存储格式：{title: ×××, done: false}
  $('#title').keydown(function (event) {
    if (event.keyCode === 13) {
      if ($(this).val() !== "" && $.trim($(this).val()) !== "") {
        var local = getData() // 获取本地数据
        local.push({ title: $.trim($(this).val()), done: false }) // 将当前要添加的清单追加进去
        saveData(local) // 将数据存到本地
        load() // 渲染数据
      }
      $(this).val('') // 添加完后清空输入框
    }
  })

  // 删除清单
  $('ol, ul').on('click', 'a', function () {
    var data = getData() // 获取本地数据
    var index = $(this).attr('index') // 修改数据
    data.splice(index, 1) // 删除指定下标的清单
    saveData(data) // 保存到本地然后重新渲染
    load()
  })

  // 区别正在进行和已完成
  $('ul, ol').on('click', 'input', function () {
    var index = $(this).siblings('a').attr('index') // 获取所点击清单的下标
    var data = getData() // 获取本地数据
    data[index].done = $(this).prop('checked') // 设置done属性
    saveData(data) // 存储更新后的数据
    load() // 重新渲染数据
  })

  // 获取本地数据
  function getData() {
    var todolist = localStorage.getItem('todolist')
    if (todolist !== null) {
      return JSON.parse(todolist)
    } else {
      return []
    }
  }

  // 将数据存储到本地，注意需要转型
  function saveData(data) {
    localStorage.setItem('todolist', JSON.stringify(data))
  }

  // 将数据渲染到页面中
  function load() {
    var data = getData()
    $('ol, ul').empty() // 每次渲染之前先清除之前创建的li标签，防止重复渲染
    $.each(data, function (i, e) {
      // 字符串拼接时注意单双引号的使用
      if (e.done) {
        $('ul').prepend("<li> <input type='checkbox' checked='checked'>  <p>" + e.title + "</p> <a href='javascript:;' index=" + i + '></a></li>')
      } else {
        $('ol').prepend("<li> <input type='checkbox'>  <p>" + e.title + "</p> <a href='javascript:;' index=" + i + '></a></li>')
      }
    })
    $('#todocount').text($('ol li').length)
    $('#donecount').text($('ul li').length)
  }
})
