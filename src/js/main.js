//1.导入jquery模块
import $ from 'jquery'

//2.导入样式表
import '../css/app.css'
import '../css/index.scss'

$('#ulList>li:odd').css('backgroundColor','skyblue')

$('#ulList>li:even').css('backgroundColor','silver')

class Person {
    static username = "zs"
    static age = 20
}

console,log(Person.username);
console.log(Person.age);