## 栈结构
栈是一种**后进先出**的数据结构，JavaScript 中我们可以通过数组来模拟栈。栈的主要操作有`push`,`pop`,`peek`三种：

- push 向栈顶添加元素
- pop 从栈顶取出元素
- peek 获取栈顶的元素，不修改栈

```javascript
function Stack(){
    let items = []
    
    this.push=function(e){
        items.push(e)
    }
    
    this.pop=function(){
        return items.pop()
    }
    
    this.peek=function(){
        return items[items.length-1]
    }

    this.length=function(){
        return items.length
    }
}
```

## 栈应用
### 进制转换
将十进制数字转为二进制:
- 数字模2,入栈
- 数字除2,取整
- 重复1,2直至数字为0
- 栈依次弹出数据,拼接为字符串

```JavaScript
decimalToBinary=(number)=>{
    let stack = new Stack()
    let binary = ''
    while(number>0){
        stack.push(number%2)
        number=Math.floor(number/2)
    }
    while(stack.length()>0){
        binary += stack.pop().toString()
    }
}
```