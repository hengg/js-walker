# 如何编写更好的JavaScript

*原文地址*：[**Practical Ways to Write Better JavaScript**](https://dev.to/taillogs/practical-ways-to-write-better-javascript-26d4)

*作者*：[**Ryland G**](https://dev.to/taillogs)

很少见到有人讨论如何编写更好的 JavaScript。下面是我常用的一些提升 JavaScript 代码质量的方法。

## 使用 TypeScript

提升 JavaScript 质量的第一件事就是不要写 JavaScript。对于初学者来说，TypeScript 是 JavaScript 的超集（任何能在 JavaScript 中运行的代码同样能在 TypeScript 中运行）。 TypeScript 在 JavaScript 之上增加了一个可选的类型系统。以前 TypeScript 的生态支持并不完善，甚至有矛盾的地方，不过现在大多数框架都支持开箱即用的 TypeScript 了。下面我们聊一聊为什么要用 TypeScript 。

**TypeScript 是“类型安全”的。**

所谓类型安全，是指编译过程中会检查代码中所使用的类型是否合法。如果我们创建一个函数`foo`接收一个`number`类型的参数：
```JavaScript
function foo(someNum: number): number {
  return someNum + 5;
}
```
`foo`函数在调用时只能接收`number`类型的参数：

```JavaScript
console.log(foo(2)); // prints "7"
console.log(foo("two")); // invalid  TypeScript  code
```
除了向代码添加类型外，类型安全检查并没有额外的开销。而类型安全带来的益处相比开销来说要大得多。它对自由度非常高的JavaScript提供了额外的机制来防止常见错误/异常。

**TypeScript的类型让重构大型 JavaScript 项目变得容易**

重构大型的 JavaScript 项目简直就是噩梦。重构 JavaScript 的难点在于它不校验函数签名。也就是说，一个 JavaScript 函数不存在“误用”这回事。举个例子，如果声明了一个在 1000 个不同服务中调用的函数`myAPI`：


```JavaScript
function myAPI(someNum, someString) {
  if (someNum > 0) {
    leakCredentials();
  } else {
    console.log(someString);
  }
}
```

现在稍微修改一下这个函数：

```javascript
function myAPI(someString, someNum) {
  if (someNum > 0) {
    leakCredentials();
  } else {
    console.log(someString);
  }
}
```

这意味着我们需要确保所有调用这个函数的地方（多达1000处）都要正确的修改，哪怕漏了一处`leakCredentials`函数都会被执行。而  TypeScript  中方案如下：

```typescript
// before
function myAPITS(someNum: number, someString: string) { ... }
// after
function myAPITS(someString: string, someNum: number) { ... }
```

正如所见，我们对函数`myAPITS`做了同样的修改。但是它不像在 JavaScript 版本中改动后仍然能够运行，由于“类型安全”的关系，TypeScript 会在 1000 处使用它的地方提示类型错误并阻塞编译。这保证了`leakCredentials`不会被错误的调用。

**TypeScript 让团队架构变得透明**

正确的设置 TypeSrcipt 后，编写代码前最好先定义接口和类。这让代码的结构简洁、明了。举例来说，如果想为后端代码定义一个新的`Request`类型，可以在 TypeScript 中如此定义：

```typescript
interface BasicRequest {
  body: Buffer;
  headers: { [header: string]: string | string[] | undefined; };
  secret: Shhh;
}
```

无论如何我们都必须写这样的或者那样的代码，但是使用 TypeScript 可以轻松的分享进展并得到反馈，而无需花费额外的时间。我不知道 TypeScript 是不是天生就没有 JavaScript 那么多 bug，但是我坚信，要求开发者先定义接口和 API 再编写代码会保证代码质量。

总的来说 TypeScript 已经是一门成熟的语言，替代 JavaScript 也成为了一种趋势。我的新项目已经全面切换到了 TypeScript。

# 使用新特性

JavaScript 是世界上最流行的编程语言之一。许多人可能认为这门 20 多岁、被上亿人使用的语言已经没有什么新鲜的了，但事实恰好相反。最近这段时间，JavaScript（学名ECMAScript）有很多修改，也增加了许多新特性。这些改动从根本上改变了开发体验。作为一个近两年才开始写JS的人，我的优势是没有偏见和固有印象。这让我在使用这门语言时更加偏重实用，避免了教条主义。

**async 和 await**

异步、事件驱动的回调一直是 JavaScript 开发中不可避免的一部分:

*传统的回调*

```javascript
makeHttpRequest('google.com', function (err, result) {
  if (err) {
    console.log('Oh boy, an error');
  } else {
    console.log(result);
  }
});
```

我不想花时间解释上述的代码为什么是有问题的（[请参考我之前的文章](http://cdevn.com/parallel-computing-simplified-starring-gordon-ramsay)）。为了解决回调的问题，JavaScript 引入了“Promise”的概念。 Promises 在编写异步逻辑的同时，解决了回调地狱的问题.

*Promises*

```javascript
makeHttpRequest('google.com').then(function (result) {
  console.log(result);
}).catch(function (err) {
  console.log('Oh boy, an error');
});
```

Promise 最大的优点就是可读性强，能够链式调用。 

虽然 Promise 很强大，但它仍有力所不逮的地方。写 Promise 仍然会让人觉得不够“本地化”。为了解决这个问题，ECMAScript 委员会决定为 Promise 添加新的使用方式， `async` 和 `await`:

*async 和 await*

```javascript
try {
  const result = await makeHttpRequest('google.com');
  console.log(result);
} catch (err) {
  console.log('Oh boy, an error');
}
```

需要注意的是， `await`的方法必须被声明为 `async`:

*上个例子中的 makeHttpRequest 必须如下声明*

```javascript
async function makeHttpRequest(url) {
  // ...
}
```

It's also possible to `await` a Promise directly since an `async` function is really just a fancy Promise wrapper. This also means, the `async/await` code and the Promise code, are functionally equivalent. So feel free to use `async/await` without feeling guilty.

**let and const**

For most of JavaScript's existence, there was only one variable scope qualifier `var`. `var` has some pretty unique/interesting rules in regards to how it handles scope. The scoping behavior of `var` is inconsistent and confusing, and has resulted in unexpected behavior and therefore bugs , throughout the lifetime of JS. But as of ES6, there is an alternative to `var`, `const` and `let`. There is practically zero need to use `var` anymore, so don't. Any logic that uses `var`, can always be converted to equivalent `const` and `let` based code.

As for when to use `const` vs `let`, I always start by declaring everything `const`. `const` is far more restrictive and "immutablish" which usually results in better code. There aren't a ton of "real scenarios" where using `let`is necessary, I would say 1/20 variables I declare with `let`. The rest are all `const`.

> I said `const` is "immutablish" because it does not work in the same way as `const` in C/C++. What `const` means to the JavaScript runtime, is that the reference to that `const` variable will never change. This does not mean the contents stored at that reference will never change. For primitive types (number, boolean etc), `const` does translate to immutability (because it's a single memory address). But for all objects (classes, arrays, dicts), `const` does not guarantee immutability.

**Arrow => Functions**

Arrow functions are a concise method of declaring [anonymous functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in JS. Anonymous functions, describe functions that aren't explicitly named. Usually, anonymous functions are passed as a callback or event hook.

*vanilla anonymous function*

```
someMethod(1, function () { // has no name
  console.log('called');
});
```

For the most part, there isn't anything "wrong" with this style. Vanilla anonymous functions behave "interestingly" in regards to scope, which can/has result in many unexpected bugs. We don't have to worry about that anymore, thanks to arrow functions. Here is the same code, implemented with an arrow function:

*anonymous arrow function*

```
someMethod(1, () => { // has no name
  console.log('called');
});
```

Aside from being far more concise, arrow functions also have much more practical scoping behavior. Arrow function inherit `this` from the scope they were defined in.

In some cases, arrow functions can be even more concise:

```
const added = [0, 1, 2, 3, 4].map((item) => item + 1);
console.log(added) // prints "[1, 2, 3, 4, 5]"
```

Arrow functions that reside on a single line, include a implicit `return`statement. There is no need for brackets or semi-colons with single line arrow functions.

I want to make it clear. This isn't a `var` situation, there are still valid use cases for vanilla anonymous functions (specifically class methods). That being said, I've found that if you always default to an arrow function, you end up doing a lot less debugging as opposed to defaulting to vanilla anonymous functions.

[As usual, the Mozilla docs are the best resource](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

**Spread Operator ...**

Extracting key/value pairs of one object, and adding them as children of another object, is a very common scenario. Historically, there have been a few ways to accomplish this, but all of those methods are pretty clunky:

```
const obj1 = { dog: 'woof' };
const obj2 = { cat: 'meow' };
const merged = Object.assign({}, obj1, obj2);
console.log(merged) // prints { dog: 'woof', cat: 'meow' }
```

This pattern is incredibly common, so the above approach quickly becomes tedious. Thanks to the "spread operator" there's never a need to use it again:

```
const obj1 = { dog: 'woof' };
const obj2 = { cat: 'meow' };
console.log({ ...obj1, ...obj2 }); // prints { dog: 'woof', cat: 'meow' }
```

The great part is, this also works seamlessly with arrays:

```
const arr1 = [1, 2];
const arr2 = [3, 4];
console.log([ ...arr1, ...arr2 ]); // prints [1, 2, 3, 4]
```

It's probably not the most important, recent JS feature, but it's one of my favorites.

**Template Literals (Template Strings)**

Strings are one of the most common programming constructs. This is why it's so embarassing that natively declaring strings is still poorly supported in many languages. For a long time, JS was in the "crappy string" family. But the addition of template literals put JS in a category of its own. Template literals natively, and conveniently solve the two biggest problems with writing strings, adding dynamic content, and writing strings that bridge multiple lines:

```
const name = 'Ryland';
const helloString =
`Hello
 ${name}`;
```

I think the code speaks for itself. What an amazing implementation.

**Object Destructuring**

Object destructuring is a way to extract values from a data collection (object, array, etc), without having to iterate over the data or access it's key's explicitly:

*old way*

```
function animalParty(dogSound, catSound) {}

const myDict = {
  dog: 'woof',
  cat: 'meow',
};

animalParty(myDict.dog, myDict.cat);
```

*destructuring*

```
function animalParty(dogSound, catSound) {}

const myDict = {
  dog: 'woof',
  cat: 'meow',
};

const { dog, cat } = myDict;
animalParty(dog, cat);
```

But wait, there's more. You can also define destructuring in the signature of a function:

*destructuring 2*

```
function animalParty({ dog, cat }) {}

const myDict = {
  dog: 'woof',
  cat: 'meow',
};

animalParty(myDict);
```

It also works with arrays:

*destructuring 3*

```
[a, b] = [10, 20];

console.log(a); // prints 10
```

There are a ton of other modern features you should be utilizing. Here are a handful of others that stand out to me:

- [Rest Parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [Import Over Require](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Array Element Find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

# Always Assume Your System is Distributed

When writing parallelized applications your goal is to optimize the amount of work you're doing at one time. If you have 4 available cores, and your code can only utilize a single core, 75% of your potential is being wasted. This means, blocking, synchronous operations are the ultimate enemy of parallel computing. But considering that JS is a single threaded language, things don't run on multiple cores. So what's the point?

JS is single threaded, but not single-file (as in lines at school). Even though it isn't parallel, it's still concurrent. Sending an HTTP request may take seconds or even minutes, if JS stopped executing code until a response came back from the request, the language would be unusable.

JavaScript solves this with an [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). The event loop, loops through registered events and executes them based on internal scheduling/prioritization logic. This is what enables sending 1000's of "simultaneous" HTTP requests or reading multiple files from disk at the "same time". Here's the catch, JavaScript can only utilize this capability if you utilize the correct features. The most simple example is the for loop:

```
let sum = 0;
const myArray = [1, 2, 3, 4, 5, ... 99, 100];
for (let i = 0; i < myArray.length; i += 1) {
  sum += myArray[i];
}
```

A vanilla for loop is one of the least parallel constructs that exists in programming. At my last job, I led a team that spent months attempting to convert traditional `R` lang for-loops into automagically parallel code. It's basically an impossible problem, only solvable by waiting for deep learning to improve. The difficulty of parallelizing a for-loop comes from a few problematic patterns. Sequential for-loops are very rare, but they alone make it impossible to guarantee a for-loops separability:

```
let runningTotal = 0;
for (let i = 0; i < myArray.length; i += 1) {
  if (i === 50 && runningTotal > 50) {
    runningTotal = 0;
  }
  runningTotal += Math.random() + runningTotal;
}
```

This code only produces the intended result if it is executed in order, iteration by iteration. If you tried to execute multiple iterations at once, the processor might incorrectly branch based on inaccurate values, which invalidates the result. We would be having a different conversation if this was C code, as the usage is different and there are quite a few tricks the compiler can do with loops. In JavaScript, traditional for loops should only be used if absolutely necessary. Otherwise utilize the following constructs:

*map*

```
// in decreasing relevancy :0
const urls = ['google.com', 'yahoo.com', 'aol.com', 'netscape.com'];
const resultingPromises = urls.map((url) => makHttpRequest(url));
const results = await Promise.all(resultingPromises);
```

*map with index*

```
// in decreasing relevancy :0
const urls = ['google.com', 'yahoo.com', 'aol.com', 'netscape.com'];
const resultingPromises = urls.map((url, index) => makHttpRequest(url, index));
const results = await Promise.all(resultingPromises);
```

*for-each*

```
const urls = ['google.com', 'yahoo.com', 'aol.com', 'netscape.com'];
// note this is non blocking
urls.forEach(async (url) => {
  try {
    await makHttpRequest(url);
  } catch (err) {
    console.log(`${err} bad practice`);
  }
});
```

I'll explain why these are an improvement over traditional for loops. Instead of executing each "iteration" in order (sequentially), constructs such as `map`take all of the elements and submit them as individual events to the user-defined map function. This directly communicates to the runtime, that the individual "iterations" have no connection or dependence to each other, allowing them to run concurrently. There are many cases where a for-loop would be just as performant (or maybe more) in comparison to a `map` or `forEach`. I would still argue that losing a few cycles now, is worth the advantage of using a well defined API. That way, any future improvements to that data access patterns implementation will benefit your code. The for-loop is too generic to have meaningful optimizations for that same pattern.

*There are a other valid async options outside of map and forEach, such as for-await-of.*

# Lint Your Code and Enforce a Style

Code without a consistent style (look and feel), is incredibly difficult to read and understand. Therefore, a critical aspect of writing high-end code in any language, is having a consistent and sensible style. Due to the breadth of the JS ecosystem, there are a LOT of options for linters and style specifics. What I can't stress enough, is that it's far more important that you are using a linter and enforcing a style (any of them), than it is which linter/style you specifically choose. At the end of the day, no one is going to write code exactly how I would, so optimizing for that is an unrealistic goal.

I see a lot of people ask whether they should use [eslint](https://github.com/eslint/eslint) or [prettier](https://github.com/prettier/prettier). For me, they serve very different purposes, and therefore should be used in conjunction. Eslint is a traditional "linter", most of the time, it's going to identify issues with your code that have less to do with style, and more to do with correctness. For example, I use eslint with [AirBNB](https://github.com/airbnb/javascript) rules. With that configuration, the following code would force the linter to fail:

```
var fooVar = 3; // airbnb rules forebid "var"
```

It should be pretty obvious how eslint adds value to your development cycle. In essence, it makes sure you follow the rules about what "is" and "isn't" good practice. Due to this, linters are inherently opinionated. As with all opinions, take it with a grain of salt, the linter can be wrong.

Prettier is a code formatter. It is less concerned with "correctness", and far more worried about uniformity and consistency. Prettier isn't going to complain about using `var`, but it will automatically align all the brackets in your code. In my personal development process, I always run prettier as the last step before pushing code to Git. In many cases, it even makes sense to have Prettier run automatically on each commit to a repo. This ensures that all code coming into source control has consistent style and structure.

# Test Your Code

Writing tests, is an indirect but incredibly effective method of improving the JS code you write. I recommend becoming comfortable with a wide array of testing tools. Your testing needs will vary and there's no single tool that can handle everything. There are tons of well established testing tools in the JS ecosystem, so choosing tools mostly comes down to personal taste. As always, think for yourself.

**Test Driver - Ava**

[AvaJS on Github](https://github.com/avajs)

*Test drivers are simply frameworks that give structure and utilities at a very high level. They are often used in conjunction with other, specific testing tools, which vary based on your testing needs.*

Ava is the right balance of expressiveness and conciseness. Ava's parallel, and isolated architecture is the source of most my love. Tests that run faster save developers time and companies money. Ava boasts a ton of nice features, such as builtin assertions, while managing to stay very minimal.

Alternatives: Jest, Mocha, Jasmine

**Spies and Stubs - Sinon**

[Sinon on Github](https://github.com/sinonjs/sinon)

*Spies give us "function analytics" such as how many times a function was called, what they were called by, and other insightful data.*

Sinon is a library that does a lot of things, but only a few super well. Specifically, sinon excels when it comes to spies and stubs. The feature set is rich but the syntax is concise. This is especially important for stubs, considering they partially exist to save space.

Alternatives: testdouble

**Mocks - Nock**

[Nock on Github](https://github.com/nock/nock?source=post_page---------------------------)

*HTTP mocking is the process of faking some part of the http request process, so the tester can inject custom logic to simulate server behavior.*

Http mocking can be a real pain, nock makes it less painful. Nock directly overrides the `request` builtin of nodejs and intercepts outgoing http requests. This in turn gives you complete control of the response.

Alternatives: I don't really know of any :(

**Web Automation - Selenium**

[Selenium on Github](https://github.com/SeleniumHQ/selenium)

Selenium is one I have mixed emotions about recommending. As it's the most popular option for web automation, it has a massive community and online resource set. Unfortunately, the learning curve is pretty steep, and it depends on a lot of external libraries for real use. That being said, it's the only real free option, so unless you're doing some enterprise grade web-automation, Selenium will do the job.

# Two Other Random JS Things

- Very rarely should you use `null`, poor `null`
- Numbers in JavaScript just suck, always use a radix parameter with `parseInt`

# Conclusion

Draw your own.

