import React ,{useContext,FunctionComponentElement,useState}from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
    index ?: string;
    title : string;
    className ?:string;
    children ?: React.ReactNode;
    disabled ?:boolean;
}

const SubMenu : React.FC<SubMenuProps> = (props) => {
    const {
        index,
        title,
        className,
        children,
        disabled
    } = props;
    const context = useContext(MenuContext);
    // 控制submenu 是否默认打开
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    // 控制菜单 打开 关闭 行为
    const [menuOpen, setMenuOpen] = useState(isOpened)
    const handleClick = (e : React.MouseEvent) => {
        e.preventDefault();
        setMenuOpen(!menuOpen)
    }
    let timer : any;
    const handleMouse = (e:React.MouseEvent ,toggle : boolean) => {
        clearTimeout(timer)
        e.preventDefault();
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300);
    }

    const clickEvents = context.mode === 'vertical' ? {
        onClick : handleClick 
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e : React.MouseEvent) => {handleMouse (e,true)},
        onMouseLeave: (e : React.MouseEvent) => {handleMouse(e,false)}
    } : {}
   
    const classes = classNames('menu-item submenu-item ', className, {
        'is-active': context.index === index,
        'is-disabled': disabled,
        'is-opened': menuOpen,
        'is-vertical':context.mode === 'vertical'
    })
    // 渲染下拉菜单的内容
    const renderChildren = () => {
        // 控制 submenu 菜单打开关闭的样式
        const subMenuClasses = classNames('hhx-submenu', {
            'menu-opened': menuOpen
        })
       
        const cildrenComponent = React.Children.map(children,(child,idx) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem') {
                // 二级菜单 添加 index 属性
                return React.cloneElement(childElement,{index:`${index}-${idx}`})
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
        return (
            <Transition 
            in = {menuOpen}
            timeout={300}
            animation="zoom-in-top"
            >
                <ul className={subMenuClasses}>
                    {cildrenComponent}
                </ul>
            </Transition>
        )
    }
    return (
        // 水平模式的菜单 hover 后子菜单显示
        // 垂直模式的菜单 点击 后子菜单显示
        <li key={index} className={classes} {...hoverEvents} {...clickEvents}>
            <div className="submenu-title"  >
                {title}
                <Icon icon={"angle-down"} className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu