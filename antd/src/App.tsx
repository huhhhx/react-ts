import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

import Icon from "./components/Icon/icon";

import Tabs from "./components/Tabs/tabs";
import TabsItem from "./components/Tabs/tabsItem";

import Input from "./components/Input/input";

// 引入图标库
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>Input组件</h4>
        <Input
          size="sm"
          prepend="%"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        ></Input>
        <hr />
        <Input size="sm" disabled style={{ width: "20px" }}></Input>
        <hr />
        <Input size="lg" icon="arrow-down" style={{ width: "100px" }}></Input>
        <hr></hr>
        <h4>tabs 组件</h4>
        <Tabs defaultIndex={1}>
          <TabsItem label={<Button>我是自定义</Button>}>内容1</TabsItem>
          <TabsItem label="选项卡2">内容2</TabsItem>
          <TabsItem label="选项卡3" disabled>
            内容3
          </TabsItem>
        </Tabs>
        <Tabs defaultIndex={1} type="card">
          <TabsItem label="选项卡1">内容1</TabsItem>
          <TabsItem label="选项卡2">
            <h5>jjj</h5>
          </TabsItem>
          <TabsItem label="选项卡3" disabled>
            内容3
          </TabsItem>
        </Tabs>
        <hr />
        <h4>icon 组件</h4>
        <Icon icon="arrow-down" theme="danger" size="2xl"></Icon>
        <hr></hr>
        <h4>menu 组件</h4>
        <Menu
          onSelect={(index) => console.log("点击了" + index)}
          mode="vertical"
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem index={"0"}>cool link 1</MenuItem>
          <MenuItem disabled>disabled link 2</MenuItem>
          <SubMenu title="下拉菜单">
            <MenuItem> 子菜单 1</MenuItem>
            <MenuItem> 子菜单 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
        <Menu onSelect={(index) => console.log("点击了" + index)}>
          <MenuItem index={"0"}>cool link 1</MenuItem>
          <MenuItem index={"1"} disabled>
            disabled link 2
          </MenuItem>
          <SubMenu title="下拉菜单">
            <MenuItem> 子菜单 1</MenuItem>
            <MenuItem> 子菜单 2</MenuItem>
          </SubMenu>
          <MenuItem index={"2"}>cool link 3</MenuItem>
        </Menu>
        <hr />
        <h4>button 组件</h4>
        <Button disabled>disabled hello</Button>
        <Button autoFocus className="custom">
          默认 hello
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          hello
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          hello
        </Button>
        <Button btnType={ButtonType.Link} href="http://baidu.com">
          baidu link
        </Button>
        <Button btnType={ButtonType.Link} href="http://baidu.com" disabled>
          disabled link
        </Button>
        <hr />
      </header>
    </div>
  );
}

export default App;
