import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import styles from '../css/style.scss';

/*classnames :为组件设置动态 className
  @是ES7修饰器的用法，修饰器是一个函数，可以在编译时改变代码
  http://es6.ruanyifeng.com/#docs/decorator
  immutableRenderDecorator：修饰JavaScript的可变数据为不可变，节约渲染开支
  https://zhuanlan.zhihu.com/p/20295971?columnSlug=purerender
*/
@immutableRenderDecorator
@CSSModules(styles, { allowMultiple: true })
class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    order: PropTypes.string.isRequired,
    disable: PropTypes.bool,
    isActive: PropTypes.bool,
  };

  render() {
    const { className, isActive, children } = this.props;

    const classes = classnames({
      panel: true,
      contentActive: isActive,
    });

    return (
      <div
        role="tabpanel"
        styleName={classes}
        aria-hidden={!isActive}>
        {children}
      </div>
    );
  }
}

export default TabPane;
