![js](../img/js.jpg)

- 什么是设计模式
- 什么是策略模式
- 策略模式在 JavaScript 中的应用（使用策略模式封装百度AI识别调用）
- 策略模式在 Vue 组件封装中的应用（使用策略模式封装Select组件）


### 什么是设计模式


> 设想有一个电子爱好者，虽然他没有经过正规的培训，但是却日积月累地设计并制造出了许多有用的电子设备：业余无线电、盖革计数器、报警器等。有一天这个爱好者决定重新回到学校去攻读电子学学位，来让自己的才能得到正式的认可。随着课程的展开，这个爱好者突然发现课程内容都似曾相识。似曾相识的不是术语或表述的方式，而是背后的概念。这个爱好者不断学到一些名称和原理，虽然这些名称和原理原来他并不知道，但事实上他多年以来一直都在使用。整个过程只不过是一个接一个的顿悟。
>
> *[设计模式沉思录 ，John Vlissides， 第一章 1.2节](https://yq.aliyun.com/articles/93401?spm=a2c4e.11153940.blogcont93399.10.76995b89Oy4aYg)*



我们在写代码的时候，一定也遇到过许多类似的场景。随着经验的增加，我们对于这些常见场景的处理越来越得心应手，甚至总结出了针对性的“套路”，下次遇到此类问题直接运用“套路”解决，省心又省力。这些在软件开发过程中逐渐积累下来的“套路”就是设计模式。

设计模式的目标之一就是提高代码的可复用性、可扩展性和可维护性。正因如此，虽然有时候我们不知道某个设计模式，但是看了相关书籍或文章后会有一种“啊，原来这就是设计模式”的恍然大明白。

如果你看完这篇文章后也有此感觉，那么恭喜你，你已经在高效程序员的道路上一路狂奔了。



### 什么是策略模式

策略模式是一种简单却常用的设计模式，它的应用场景非常广泛。我们先了解下策略模式的概念，再通过代码示例来更清晰的认识它。

策略模式由两部分构成：一部分是封装不同策略的策略组，另一部分是 Context。通过组合和委托来让 Context 拥有执行策略的能力，从而实现可复用、可扩展和可维护，并且避免大量复制粘贴的工作。

策略模式的典型应用场景是表单校验中，对于校验规则的封装。接下来我们就通过一个简单的例子具体了解一下：

#### 粗糙的表单校验

一个常见的登录表单代码如下：

```html
<form id='login-form' action="" method="post">
    <label for="account">手机号</label>
    <input type="number" id="account" name="account">
    <label for="password">密码</label>
    <input type="password" id="password" name="password">
    <button id='login'>登录</button>
</form>
<script>
    var loginForm = document.getElementById('login-form');

    loginForm.onsubmit = function (e) {
        e.preventDefault();  
        var account = document.getElementById("account").value;
        var pwd = document.getElementById("password").value;

        if(account===null||account===''){
            alert('手机号不能为空')；
            return false;
        }
        if(pwd===null||pwd===''){
            alert('密码不能为空')；
            return false;
        }
        if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(account)) {
            alert('手机号格式错误')；
            return false;
        }
        if(pwd.length<6){
            alert('密码不能小于六位')；
            return false;
        }
        // ajax 发送请求
    }
</script>
```



以上代码，虽然功能没问题，但是缺点也很明显：

代码里遍地都是 if 语句，并且它们缺乏弹性：每新增一种、或者修改原有校验规则，我们都必须去改loginForm.onsubmit内部的代码。另外逻辑的复用性也很差：如果有其它表单也是用同样的规则，这段代码并不能复用，只能复制。当校验规则发生变化时，比如上文的正则校验并不能匹配虚拟运营商14/17号段，我们就需要手动同步多处代码变更（Ctrl+C/Ctrl+V）。

#### 优秀的表单验证

接下来我们通过策略模式的思路改写一下上段代码，首先抽离并封装校验逻辑为策略组：

```javascript
var strategies = {
    isNonEmpty: function (value, errorMsg) {
        if (value === '' || value === null) {
            return errorMsg;
        }
    },
    isMobile: function (value, errorMsg) { // 手机号码格式
        if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },
    minLength: function (value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    }
};
```

接下来修改 Context:

```javascript
var loginForm = document.getElementById('login-form');

loginForm.onsubmit = function (e) {
    e.preventDefault(); 
    var accountIsMobile = strategies.isMobile(account,'手机号格式错误');
    var pwdMinLength = strategies.minLength(pwd,8,'密码不能小于8位');
    var errorMsg = accountIsMobile||pwdMinLength; 
    if(errorMsg){
        alert(errorMsg);
        return false;
    }
}
```



对比两种实现，我们可以看到：分离了校验逻辑的代码如果需要扩展校验类型，在策略组中新增定义即可使用；如果需要修改某个校验的实现，直接修改相应策略即可全局生效。对于开发和维护都有明显的效率提升。

#### 扩展：史诗的表单校验

有兴趣的朋友可以了解下 [async-validator](https://github.com/yiminghe/async-validator) ，element-ui 和 antd 的表单校验都是基于 async-validator 封装的，可以说是史诗级别的表单校验了



通过表单校验的对比，相信大家都对策略模式有所了解，那么接下来通过两个例子具体了解下 JavaScript 中策略模式的应用：

### 使用策略模式调用百度AI图像识别

因为百度AI图像识别的接口类型不同，所需的参数格式也不尽相同。然而图像的压缩及上传、错误处理等部分是公用的。所以可以采用策略模式封装：

#### 定义策略组

通过定义策略组来封装不同的接口及其参数：比如身份证识别接口的`side`字段，自定义识别的`templateSign`字段，以及行驶证识别的接收参数为`poparamstData`。

```JavaScript
/**
 * 策略组
 * IDCARD:身份证识别
 * CUSTOMIZED:自定义识别
 * VL:行驶证识别
 */
var strategies = {
    IDCARD: function (base64) {
        return {
            path: 'idcard',
            param: {
                'side': 'front',
                'base64': base64
            }
        };
    },

    CUSTOMIZED: function (base64) {
        return {
            path: 'customized',
            param: {
                'templateSign': '52cc2d402155xxxx',
                'base64': base64
            }
        };
    },
    VL: function (base64) {
        return {
            path: 'vehicled',
            poparamstData: {
                'base64': base64
            }
        };
    },
};
```

#### 定义 Context

```JavaScript
var ImageReader = function () { };

/**
 * 读取图像,调用接口,获取识别结果
 * 
 * @param {*} type 待识别文件类型
 * @param {*} base64 待识别文件 BASE64码
 * @param {*} callBack 识别结果回调
 */
ImageReader.prototype.getOcrResult = function (type, base64, callBack) {
    let fileSize = (base64.length / (1024 * 1024)).toFixed(2);
    let compressedBase64 = '';
    let image = new Image();
    image.src = base64;
    image.onload = function () {
        /**
         * 图片压缩处理及异常处理，代码略
         */
         

        let postData = strategies[type](compressedBase64);

        ajax(
            host + postData.path, {
                data: postData.param,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    var data = JSON.parse(res);
                    // 暴露给 UI 层的统一的错误码
                    if (data.error_code !== undefined && data.error_code !== 0) {
                        var errorData = {
                            error: 1,
                            title: '错误 ' + data.error_code,
                            content: 'error message'
                        };
                        callBack(errorData);
                    } else {
                        callBack(data);
                    }
                }
            });
    };
};


```

#### 调用方式

```JavaScript
var imageReader = new ImageReader();
imageReader.getOcrResult('IDCARD', this.result.toString(), callback);
```

### 使用策略模式封装 Vue Select 组件

某项目中多处用到了 element-ui 的 select 组件，其内在逻辑类似，都是初始化时获取下拉列表的数据源，然后在选中某一项时 dispatch 不同的 action。遂考虑使用策略模式封装。

#### Context

在本例中，组件向外部暴露一个 prop，调用方指定该 prop 从而加载不同的策略。那么定义 Context 如下:

```html
<template>
  <el-select v-model="selectedValue" placeholder="请选择" @change="optionChanged" size="mini" clearable>
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
</template>
```

```javascript
data() {
    return {
      selectedValue: undefined,
      options: [],
      action: "",
    };
  },
  props: {
    // 暴露给外部的 select-type
    selectType: {
      type: String
    },
  },
  created() {
   // 获取 options
   this.valuation();
  },
    methods: {
    optionChanged() {
      this.$emit(this.action, this.selectedValue);
    },
    setOptions(option) {
      this.$store.dispatch(this.action, option);
    },
    valuation() {
      // 获取 options 数据
    }
  },
```

外部通过如下方式调用组件：

```html
<MySelect selectType="product"/>
```

#### strategies

然后定义策略组：

```JavaScript
let strategies = {
    source: {
        action: "sourceOption",
        getOptions:  function() {
            // 拉取 options
        }
    },
    product: {
        action: "productOption",
        getOptions:  function() {
            // 拉取 options
        }
    },
    ...
}
```

#### 异步

至此该组件的基本结构已经清晰，但还存在一个问题：组件加载时是异步拉取的 options， 而页面初始化的时候很可能 options 还没有返回，导致 select 的 options 仍为空。所以此处应该修改代码，同步获取 options：

```JavaScript
// 策略组修改
source: {
    action: "sourceOption",
    getOptions: async function() {
        // await 拉取 options
    }
  },
// 组件修改
methods: {
    ...
    async valuation() {
        ...
    }
}
```

#### 继续优化

但我们不是每次加载组件都需要拉取 options，如果这些 options 在其他组件或者页面也被使用到，那么可以考虑将其存入 vuex 中。

*最开始的思路是高阶组件，即定义一个包装后的select模板,通过高阶组件的方式扩展其数据源与action（变化的部分）然而这个思路不是那么的vue（主要是slots不太好处理） 于是考虑策略模式改写该组件*

### 总结

通过以上两个例子，我们可以看到：

- 策略模式符合开放-封闭原则
- 如果代码里需要写大量的`if-else`语句，那么考虑使用策略模式
- 如果多个组件（类）之间的区别仅在于它们的行为，考虑采用策略模式



*参考*
*[JavaScript设计模式与开发实践(曾探)](http://www.ituring.com.cn/book/1632) 第五章 策略模式*

