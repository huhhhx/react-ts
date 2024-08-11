import React ,{useState,createContext}from "react";
import classNames from "classnames";
import { TabsItemProps } from "./tabsItem";

type selectCallback = (index : number) => void
interface TabsProps {
    defaultIndex ?: number,
    onSelect ?: selectCallback,
    children ?: React.ReactNode,
    className ?: string,
    type ?: 'line' | 'card'
}
interface ITabsContext {
    index : number,
    onSelect ?:selectCallback
}

export const TabsContext = createContext<ITabsContext>({index : 0})
const Tabs :React.FC<TabsProps> = (props) => {
    const {
        defaultIndex = 0,
        onSelect,
        children,
        className,
        type = 'line'
    } = props
    const classes = classNames(className,'hhx-tabs',
        {
            [`nav-${type}`] : type 
        }
    )
    const [activeIndex,setActiveIndex] = useState(defaultIndex)
    const handleClick = (idx:number) =>{
        setActiveIndex(idx);
        if(onSelect) {
            onSelect(idx)
        }
    }
    const passedContext : ITabsContext = {
        index : activeIndex,
        onSelect :handleClick
    }
    const renderChildren = () => {
        return React.Children.map(children,(child,idx) => {
            const childElement = child as React.FunctionComponentElement<TabsItemProps>;
            const {displayName} = childElement.type;
            if (displayName === 'TabsItem'){
                return React.cloneElement(childElement,{index:idx})
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }
    const renderContent = () => {
        return React.Children.map(children,(child,idx) => {
            const childElement = child as React.FunctionComponentElement<TabsItemProps>;
            const {displayName} = childElement.type;
            if (displayName === 'TabsItem') {
               if(idx===activeIndex){
                return childElement.props.children
               }
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })

    }
    return (
        <div>
            <ul className={classes} >
                <TabsContext.Provider value={passedContext}>
                    {renderChildren()}
                </TabsContext.Provider>
            </ul>
            <div className="hhx-tabs-content">
                {renderContent()}
            </div>
        </div>
    )
}
export default Tabs;