## 前言
官方文档地址： [https://www.styled-components.com/](https://www.styled-components.com/)

中文文档地址：[https://github.com/hengg/styled-components-docs-zh](https://github.com/hengg/styled-components-docs-zh)

`styled-components`是一个`React`的第三方库，是`CSS in JS`的优秀实践。

初次了解`styled-components`是在读林昊翻译的[React设计模式与最佳实践](http://www.ituring.com.cn/book/2007)一书时。虽然接触的比较晚，但深深的被它的强大和优雅所吸引。然而其中文资料比较匮乏，多是，为帮助更多的小伙伴了解这个强大的工具，翻译了部分官方文档。能力所限，已翻译部分可能仍有字词错误或语句不通顺的地方，欢迎有能力的同学帮助纠正。

`styled-components`究竟强在哪里？这要从它所解决的问题说起：

## CSS 的痛点

不可否认，CSS是一门神奇的“语言”（*[What kind of language is CSS?](https://stackoverflow.com/questions/2670996/what-kind-of-language-is-css)*）。

它易于上手、却难以精通。它没有变量、函数等概念导致它的表现力要稍弱于其它语言，而它索要解决的问题却又很复杂。 关于这一点，[为什么 CSS 这么难学？](https://www.zhihu.com/question/66167982)这个问题下的一百多个答案就很能说明问题了。

日常使用中，CSS 的痛点很多，但大多围绕以下两点：

- 全局污染：CSS 选择器的作用域是全局的，所以很容易引起选择器冲突；而为了避免全局冲突，又会导致类命名的复杂度上升

- 复用性低：CSS 缺少抽象的机制，选择器很容易出现重复，不利于维护和复用


## CSS in JS

随着组件化时代的来临，前端应用开始从组件的层面对 CSS 进行封装：也就是通过 JS 来声明、抽象样式从而提高组件的可维护性；在组件加载时动态的加载样式，动态生成类名从而避免全局污染。

`styled-components`就是其中的佼佼者。

顾名思义，`styled-components`以组件的形式来声明样式，让样式也成为组件从而分离逻辑组件与展示组件（这个思路看起来是不是很眼熟），来看一下官方的示例：
```JSX
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.primary && css`
    background: white;
    color: palevioletred;
  `}
`

render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>

    <Button as={Link} href="/docs" prefetch>
      Documentation
    </Button>
  </div>
)
```
可以看到，`styled-components`通过标记的模板字符来设置组件样式.

它移除了组件和样式之间的映射.当我们通过`styled-components`定义样式时,我们实际上是创建了一个附加了样式的常规 React 组件.

同时它支持将`props`以插值的方式传递给组件,以调整组件样式.

官方宣称`styled-components`的优点如下：

- Automatic critical CSS: styled-components 持续跟踪页面上渲染的组件,并向自动其注入且仅注入样式. 结合使用代码拆分, 可以实现仅加载所需的最少代码.
- 解决了 class name 冲突: styled-components 为样式生成唯一的 class name. 开发者不必再担心 class name 重复,覆盖和拼写错误的问题.
- CSS 更容易移除: 想要确切的知道代码中某个 class 在哪儿用到是很困难的. 使用 styled-components 则很轻松, 因为每个样式都有其关联的组件. 如果检测到某个组件未使用并且被删除,则其所有的样式也都被删除.
- 简单的动态样式: 可以很简单直观的实现根据组件的 props 或者全局主题适配样式,无需手动管理数十个 classes.
- 无痛维护: 无需搜索不同的文件来查找影响组件的样式.无论代码多庞大，维护起来都是小菜一碟。
- 自动提供前缀: 按照当前标准写 CSS,其余的交给 styled-components 处理.

## 题外话

CSS 的问题，也有其他解决方案，比如著名的`CSS Module`方案。社区中也一直存在对于两者孰优孰劣的争执。

本文不会比较这两种解决方案，但有兴趣的朋友可以参考一下这两篇文章：

[Styled Components: To Use or Not to Use?](https://medium.com/building-crowdriff/styled-components-to-use-or-not-to-use-a6bb4a7ffc21)

[Stop using CSS in JavaScript for web development](https://medium.com/@gajus/stop-using-css-in-javascript-for-web-development-fa32fb873dcc)
