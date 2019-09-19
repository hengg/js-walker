
## 什么是JavaScript？

我们来确认一下JavaScript的定义：JavaScript 是一门解释型的动态语言。

解释型语言是相对于编译型语言存在的，源代码不是直接编译为目标代码，而是转成中间代码，再由解释器对中间代码进行解释运行。

主流编程语言有编译型（如 C++）、解释型（如 JavaScript）、和半解释半编译（如 Java）这几大类型。

## 代码是怎么运行的？

首先我们来了解一下代码是怎么运行的。

我们知道，代码是由CPU执行的，而目前的CPU并不能直接执行诸如`if…else`之类的语句，它只能执行二进制指令。但是二进制指令对人类实在是太不友好了：我们很难快速准确的判断一个二进制指令`1000010010101001`代表什么？所以科学家们发明汇编语言。

### 汇编语言

汇编语言实际上就是二进制指令的助记符。

假设`10101010`代表读取内存操作，内存地址是`10101111`，寄存器地址是`11111010`，那么完整的操作`101010101010111111111010`就代表读取某个内存地址的值并装载到寄存器，而汇编语言并没有改变这种操作方式，它只是二进制指令的映射：

```
LD：10101010 
id:10101111
R:11111010
```

这样上述指令就可以表达为`LD id R` ，大大增强了代码的可读性。

但是这样还不够友好，CPU只能执行三地址表达式，和人的思考方式、语言模式相距甚远。所以伟大的科学家们又发明了高级语言。

### 高级语言

> “代码是写给人看的，不是写给机器看的，只是顺便计算机可以执行而已。”

高级语言之所以称之为“高级”，就是因为它更加符合我们的思维和阅读习惯。`if…else`这种语句看起来要比`1010101010`舒服的多了。但是计算机并不能直接执行高级语言，所以还需要把高级语言转化为汇编语言/机器指令才能执行。这个过程就是编译。

## JavaScript 需要编译吗？

JavaScript毫无疑问是高级语言，所以它肯定是需要编译后才能执行。但为什么我们又称之为解释型语言呢？它和编译型语言、半解释半编译型语言又有什么区别呢？我们先从编译说起。

### 编译

之前我们已经了解编译的概念，下面我们来聊聊平台：同样一份C++代码在Windows上会编译成.obj文件，而在Linux上则生成.o文件，两者不能通用。这是因为一个可执行文件除了代码外还需要操作系统 API、内存、线程、进程等系统资源，而不同的操作系统其实现也不尽相同。比如我们熟悉的I/O多路复用（事件驱动的灵魂），在Windows上的实现方案是IOCP方案，在Linux上是epoll。所以针对不同的平台，编译型语言需要分别编译，甚至需要分别编写，而且生成的可执行文件其格式并不相同。

### 跨平台

Java在此之上更进一步，它通过引入字节码实现了跨平台运行：无论是在什么操作系统上.java文件编译出的都是.class文件（这就是字节码文件，一种中间形态的目标代码）。然后Java对不同的系统提供不同的Java虚拟机用于解释执行字节码文件。解释执行并不生成目标代码，但其最终还是要转为汇编/二进制指令来给计算机执行的。

假如我们自己完全独立的新写一个简单的操作系统，那么它能不能运行Java呢？很显然是不能的，因为并没有这个系统相应的JVM。所以Java的跨平台、任何其他语言的跨平台，都是有局限性的。

Java采用半解释半编译的好处就是大大提升了开发效率，然而相应的则降低了代码的执行效率，毕竟虚拟机是有性能损失的。

### 解释执行

JavaScript则更进一步。它是完全的解释执行，或者叫做即时编译。它不会有中间代码生成，也不会有目标代码生成。这个过程通常由宿主环境（如浏览器、Node.js）包办。

## 编译过程

现在我们确认了，即使是解释执行的语言，也是需要编译的。那么代码是如何编译的呢？我们来简单了解一下。

### 词法分析

词法分析会把语句分解成词法单元，即Token。

```javascript
function square(n){
 return n*n;
}
```



这个函数会被词法分析器识别为`function `，`square`，`(`，`n`，`)`，`{`，`return`，，`n` ,`*`，`n` ，`}`并且给它们加上标注，代表这是一个变量还是一个操作。

### 语法分析

这个过程会把Token转化成抽象语法树（AST）：

```json
{
 type:'function',
    id:{
        type:'id'
        name:'square'
    },
    params:[
        {
            type:'id',
            name:'n'
        }
    ]
    ...
}
```

### 优化及代码生成

在这一步编译器会做一些优化工作，比如删除多余运算、删除未用赋值、合并部分变量等等操作，最后生成目标代码。

由于即时编译型语言的编译通常发生在运行前几微秒，所以编译器来不及做太多的优化工作。这也是相比编译型语言，早期JavaScript性能孱弱的原因之一。不过就现在而言，益于 V8 引擎（相比早期的JavaScript的引擎转换成字节码或解释执行，Node.js可以用 V8 提供的 JS2C 工具将 JavaScript 转译为 C++代码），JavaScript 和其他语言性能上的差距已经不足为道了。

### 链接及装载

目标代码基本不能独立运行。应用程序一般都会由多个部分（模块）组成 ，比如C++中一个简单的输出就要引入标准库 `iostream`：

```C++
#include <iostream>
using namespace std;
int main(){    
    cout << "Happy Hacking!\n";    
    return 0;
}
```

编译器需要把多份目标代码（库）链接起来才能生成可执行文件。至此，我们简单的了解了编译过程。但实际上编译比我们所讲的要复杂得多，在此就不在展开了。

## 什么是动态语言，动态类型？

我们还知道，JavaScript是动态语言。那么什么是动态语言？

通常来说，这是指在运行时代码可以根据某些条件改变自身结构的语言。比如JavaScript在运行时新的函数、对象、甚至代码都可以被引进（eval）；又比如Objective-C，它也可以在运行时修改对象，但它不能动态创建类，也没有 eval 方法。那Objective-C算是动态语言吗？所以我认为，动态语言是个程度的问题，我们不必在这个概念上太过纠结，可以更多的关注其应用。APP中常用的热更新功能就是基于动态语言特性而得以实现的。

JavaScript又是一门动态类型的语言，动态类型又是什么？动态类型的定义倒是很明确：数据类型不是在编译阶段确定，而是在运行时确定。

那么 TypeScript 是什么类型的语言呢？它有静态类型检查，它是静态语言吗？实际上它只是 JavaScript 的一个方言。TypeScript 最终还是要转译为 JavaScript 才能执行（tsc），就如同我们使用babel 把 ES6 代码转译为 ES5 一样。这个过程严格上来说不是编译。

TypeScript 最大的优势就是静态类型检查和类型推断，这是 JavaScript 严重缺失的能力。但实际上如果我们忽略IDE 给的报错提示强行运行 TS 代码，也还是有几率能够成功跑起来的。

## 错误

刚刚我们提到报错，不妨再扩展说一说错误。通常来说错误分为以下几种：

- 编译时错误
- 链接时错误
- 运行时错误

是不是和编译过程能够严格对应起来？

### 编译时错误

编译时错误分为：

- 语法错误

  ```JavaScript
  var str ='s ;
  ```

  这就是典型的语法错误，这种代码无法生成AST，在词法分析阶段就会报错。通常我们这么写代码，IDE 就会报错。这是IDE的优化工作，和词法分析相关。

- 类型错误

  编译器会检查我们声明的变量和函数的类型，JavaScript中我们非常熟悉的`Type Error:undefined is not object`就是此类错误。

### 链接时错误

在链接阶段发生的异常。这种情况 JavaScript 中比较少见，在编译型语言中比较常见。

### 运行时错误

这是最难排查的错误了，举例来说：

```c++
int divider(int a,int b){
    return a/b;
}
```

上面的代码在编辑编译、链接阶段都没问题，也能够正常的生成可执行文件。但是一旦如此使用`divider(1,0)`就会报错了，这就是典型的运行时错误。通常来说运行时错误都是程序不够健壮导致的。

### JavaScript中最常见的十个错误：

下图是某错误处理平台收集统计的JavaScript Top10 错误，其中7个TypeError，1个 ReferenceError：




显然这 8 种问题，我们都能用 TypeScript 在编码早期及时应对。

## 结语

现在我们已经了解JavaScript是如何运行的。但是了解这些能够帮我们写出更好的代码吗？

答案是肯定的。且不说TypeScript能够帮助我们完善类型检查和类型推断，JavaScript的作用域、this也是和编译过程强相关的；而目前主流的小程序框架都能够支持一套代码、多个平台，相信读完本文后，你大致也了解了这些技术背后的原理。Happy Hacking！
