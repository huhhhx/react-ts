import React from "react";
import classNames from "classnames";

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm',
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className ?: string
    disabled ?: boolean
    size ?: ButtonSize
    btnType ?:ButtonType
    children : React.ReactNode
    href ?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// Partial 将属性设置成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) =>{
    const {
        className,
        btnType = ButtonType.Default, // 设置默认值
        disabled = false, // 设置默认值
        size,
        children,
        href,
        ...restProps
    } = props;
    // btn btn-lg btn-primary
    const classes = classNames('btn',className,{
        [`btn-${btnType}`] : btnType,
        [`btn-${size}`] : size,
        'disabled': (btnType === ButtonType.Link && disabled )
    })
    if (btnType === ButtonType.Link && href) {
        return (
            <a
            className={classes}
            href={href}
            {...restProps}
            >
                {children}
            </a>
        )
    }else {
        return (
            <button
            className={classes}
            disabled = {disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

export default Button