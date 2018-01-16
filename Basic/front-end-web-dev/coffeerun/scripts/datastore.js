(function (window) {
    // 'use strict';

    var App = window.App || {};
    //构造函数首字母大写

    function DataStore() {
        this.data = {};
    }
    /**
     * 在 JavaScript 中所有通过构造函数创建的实例都可以访问其属性和方法
     * 的共享仓库：构造函数的 prototype 属性。
     * new 关键字不仅仅创建并返回实例，还在实例和构造函数的 prototype 
     * 属性间建立了一个特别的链接。只要使用 new 关键字调用构造函数创建的
     * 实例就会有此链接。
     *  
     */
    DataStore.prototype.add = function (key, val) {
        this.data[key] = val;
    }
    DataStore.prototype.get = function (key) {
        return this.data[key];
    };
    DataStore.prototype.getAll = function () {
        return this.data;
    };
    DataStore.prototype.remove = function (key) {
        delete this.data[key];
    };
    App.DataStore = DataStore;
    window.App = App;
})(window);