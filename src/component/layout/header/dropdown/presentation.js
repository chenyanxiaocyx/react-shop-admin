import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Avatar, message } from 'antd';
import { removeUserDataStorage } from 'util/storege';
import { userLogout } from 'service/user-service.js';

class DropdownPresentation extends React.PureComponent {
  /**
   * 退出登录，删除本地存储的用户信息
   * @param {object} e event
   */
  handleLogout = async e => {
    e.preventDefault();
    try {
      const result = await userLogout();
      removeUserDataStorage();
      this.props.doLogOut();
      message.success(result);
    } catch (error) {
      message.error(error);
    }
  }

  render () {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a target="_blank" onClick={this.handleLogout}>退出登录</a>
        </Menu.Item>
      </Menu>
    );

    const { userData } = this.props;

    return (
      <Dropdown overlay={menu}>
        <div>
          <span style={{ marginRight: 10 }}>
            <Avatar>头像</Avatar>
          </span>
          { userData.username ? `你好，${userData.username}！` : '请登录' }
        </div>
      </Dropdown>
    );
  }
}

DropdownPresentation.propTypes = {
  doLogOut: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default DropdownPresentation;
