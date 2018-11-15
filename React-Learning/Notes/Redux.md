## Redux三大原则
- 单一数据源：
Redux应用永远只有唯一的数据源，整个应用状态都保存在一个对象中。通过`combineReducers`来解决数据源对象过于庞大的问题。
- 状态是只读的：
Redux定义了`reducer(previousState,action)=>newState`，它根据当前触发的action对当前应用的state进行迭代，保留原state的同时返回一个全新的state。
`createStore(reducers[,initialState])`方法会根据reducer生成store，也可以传入第二个可选参数初始化状态。
使用`store.dispatch(action)`分发一个action并返回这个action，这是唯一改变store中数据的方式。
- 状态修改器均由纯函数完成：
Redux通过定义reducer来确定状态的修改。而每一个reducer都是纯函数，这可以实现保存每次数据变化前后的状态。

绑定 React和Redux:react-redux提供一个`<Provider/>`组件和一个`connect()`:`<Provider/>`接收一个store作为props,它是Redux应用的顶层组件;`connect()`则提供了在应用的任意组件中获取store的功能。

## middleware和Redux异步

## Redux Router
