import React, { createContext,useState} from "react";
import { MenuItemProps } from "./menuItem";
import classNames from "classnames";

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectIndex: string) => void;
export interface MenuProps {
    defaultIndex ?: string;
    className ?:string;
    mode ?:MenuMode;
    style ?:React.CSSProperties;
    onSelect?: selectCallback;
    children? : React.ReactNode;
    defaultOpenSubMenus ?:string[]
}

interface IMenuContext {
     index : string;
     onSelect ?: selectCallback;
     mode ?: MenuMode,
    defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index : '0'})

const Menu :React.FC<MenuProps> = (props) =>{
    const {
        defaultIndex = '0',
        className,
        mode = 'horizontal',
        style,
        children,
        onSelect,
        defaultOpenSubMenus = []
    } = props
    const classes = classNames('hhx-menu',className,{
        'menu-vertical':mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    })
    const handleClick = (index : string) =>{
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    }
    const [currentActive, setActive] = useState(defaultIndex)
    const passedContext :IMenuContext = {
        index : currentActive,
        onSelect : handleClick,
        mode,
        defaultOpenSubMenus
    }

    // 验证 menu 里面的子节点是menuitem
    const renderChildren = () =>{
        return React.Children.map(children,(child,index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // index 属性不是必填的，因此这里需要添加 index 属性
                return React.cloneElement(childElement,{index:index.toString()})
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }

        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
           <MenuContext.Provider value={passedContext}>
                {renderChildren()}
           </MenuContext.Provider>
        </ul>
    )
}
export default Menu