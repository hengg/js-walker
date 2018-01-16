(function (window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    }

    Truck.prototype.printOrders = function () {
        //prototype 的方法中，this 指向 Truck 实例
        var customerIdArray = Object.keys(this.db.getAll());
        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function (id) {
            //回调函数有自己的 this
            console.log(this.db.get(id));
        }.bind(this)); //此处要绑定 prototype 的 this 至回调函数
    };

    App.Truck = Truck;
    window.App = App;
})(window);