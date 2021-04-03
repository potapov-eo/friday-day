import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./SuperButton.module.css";
import './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {

    name?: string

}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        name = "push",
        ...restProps
    }
) => {

    return (
        <button className={s.button}
                {...restProps}
        >{name} </button>
    );
}

export default SuperButton;
