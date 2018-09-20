## 队列结构
队列是一种**先进先出**的数据结构，JavaScript 中我们可以通过数组来模拟队列。队列的主要操作有`push`,`shift`,`peek`三种：

- push 入队,向队列尾部添加元素
- shift 出队,从队列头部取出元素
- peek 获取队列头部的元素，但不修改队列

```javascript
function Queue(){
    let items = []
    
    this.push=function(e){
        items.push(e)
    }
    
    this.shift=function(){
        return items.shift()
    }
    
    this.peek=function(){
        return items[0]
    }

    this.length=function(){
        return items.length
    }
}
```