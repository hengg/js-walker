# 如何编写更好的JavaScript

https://dev.to/taillogs/practical-ways-to-write-better-javascript-26d4
很少见到有人讨论如何编写更好的JavaScript。下面是我常用的一些提升JavaScript代码质量的方法。

## 使用 TypeScript

The number one thing you can do to improve your JS, is by not writing JS. For the uninitiated, TypeScript (TS) is a "compiled" superset of JS (anything that runs in JS runs in TS). TS adds a comprehensive optional typing system on top of the vanilla JS experience. For a long time, TS support across the ecosystem was inconsistent enough for me to feel uncomfortable recommending it. Thankfully, those days are long behind us and most frameworks support TS out of the box. Now that we're all on the same page about what TS is, let's talk about why you would want to use it.

提升JS质量的第一件事就是不要写JS。对于初学者来说，TypeScript 是JS的超集（任何能再JS中运行的代码同样能在TS中运行）。TS在JS之上增加了一个可选的类型系统。以前TS的生态支持并不完善，甚至有矛盾的地方，不过现在大多数框架都支持开箱即用的TS了。下面我们聊一聊为什么要用TS。


TypeScript enforces "type safety".

TypeScript 会执行“类型安全”检查。

Type safety describes a process where a compiler verifies that all types are being used in a "legal" way throughout a piece of code. In other words, if you create a function foo that takes a number:

所谓类型安全，是指编译过程中会检查代码中所使用的类型是否合法。如果我们创建一个函数`foo`接收一个`number`类型的参数：
```JavaScript
function foo(someNum: number): number {
  return someNum + 5;
}
```
That foo function should only ever be called with a number:

`foo`函数在调用时只能接收`number`类型的参数：

```JavaScript
console.log(foo(2)); // prints "7"
console.log(foo("two")); // invalid TS code
```
Aside from the overhead of adding types to your code, there are zero downsides to type-safety enforcement. The benefit on the other hand, is too large to ignore. Type safety provides an extra level of protection against common errors/bugs, which is a blessing for a lawless language like JS.

除了向代码添加类型外，类型安全检查并没有额外的开销。而类型安全带来的益处相比开销来说要大得多。它对自由度非常高的JavaScript提供了额外的机制来防止常见错误/异常。

Typescript types, make refactoring larger applications possible.

## TypeScript的类型让重构大型JavaScript项目变得轻松
Refactoring a large JS application can be a true nightmare. Most of the pain of refactoring JS is due to the fact that it doesn't enforce function signatures. This means, a JS function can never really be "misused". For example, if I have a function myAPI that is used by 1000 different services:

重构大型的JavaScript项目简直就是噩梦。


```JavaScript
function myAPI(someNum, someString) {
  if (someNum > 0) {
    leakCredentials();
  } else {
    console.log(someString);
  }
}
```
