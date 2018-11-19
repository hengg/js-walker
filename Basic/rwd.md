*RWD首先针对小屏幕进行设计，然后逐步增强对大屏幕的设计和内容*

### 媒体查询

媒体查询是CSS3的一个附加模块，可以根据设备显示器的特性为其指定CSS样式。它由媒体类型和一个或多个检测媒体特性的条件表达式组成，最常用的是视口宽度（width）和屏幕宽度（device-width）。可以用在link标签中，也可以用在CSS文件中：

**HTML**
```html
<link rel="stylesheet" media="screen and (min-width:800px)" href="800wide-screen.css"/>
```
**CSS**
```css
@media screen and (min-width:800px){
    /*样式*/
}
```
因为使用多个独立的CSS文件会增加HTTP请求数量，所以出于性能考虑，通常使用CSS文件进行媒体查询。