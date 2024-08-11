import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right'
type TransitionProps = CSSTransitionProps & {
    animation ?: AnimationName;
    children ?: React.ReactNode;
    classNames ?: string,
    // 添加这个属性防止内部元素也有 transition 属性并覆盖，因此为其添加一个空 div 进行包裹，让父和子元素的 transition 互不影响
    wrapper ?: boolean
}
const Transition : React.FC<TransitionProps> = (props) => {
    const {
        children,
        classNames,
        animation,
        wrapper,
        ...restProps
    } = props
    return (
       <CSSTransition 
       classNames={classNames ? classNames : animation}
       {...restProps}
       >
            {wrapper ? <div>{children}</div> : children }
       </CSSTransition>
    )
}
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
}
export default Transition