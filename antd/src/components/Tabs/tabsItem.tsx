import React ,{useContext}from "react";
import classNames from "classnames";
import { TabsContext } from "./tabs";


export interface TabsItemProps {
    index ?: number
    label: string | React.ReactElement
    children ?: React.ReactNode,
    disabled ?: boolean
}

const TabsItem :React.FC<TabsItemProps> = (props) => {
    const context = useContext(TabsContext)
    const {
        label,
        children,
        disabled,
        index
    } = props
    const classes = classNames('tabs-item',{
        'is-disabled' : disabled,
        'is-active': context.index === index
    })
    const handleClick = () => {
        if(context.onSelect && !disabled && typeof index === 'number'){
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} onClick={handleClick} key={`nav-item-${index}`}>
            {label}
        </li>
    )
}
TabsItem.displayName = 'TabsItem'
export default TabsItem