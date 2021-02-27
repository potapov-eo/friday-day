import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../../m2-bll/store";
import {setAppErrorAC} from "../../../m2-bll/app-reduser";
import {PATH} from "../../routes/Routes";
import {getMe} from "../../../../n2-features/f1-auth/auth-reducer";


type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type AuthRedirectPagePropsType = DivPropsType & {}

const AuthRedirectPage: React.FC<AuthRedirectPagePropsType> = React.memo((
    {
        children,
        ...restProps
    }
) => {
    const {UserData, error} = useSelector((store: AppRootStateType) => store.app);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const [firstRendering, setFirstRendering] = useState<boolean>(true);
    const [redirect, setRedirect] = useState<boolean>(false);
    const [spin, setSpin] = useState<boolean>(!UserData); // !!! add request /auth/me

    const dispatch = useDispatch();
    useEffect(() => {
        if (firstRendering) {
            if (isLoggedIn || error) dispatch(setAppErrorAC(""));

            if (!UserData) {
                dispatch(getMe());
            }
            setFirstRendering(false); // + rerender
        } else {
            if (!redirect && ((spin && error) || (!spin && !UserData))) {
                setTimeout(() => setRedirect(true), 1500);
            }
            if (isLoggedIn && spin) setSpin(false);
        }
    }, [firstRendering, setFirstRendering, UserData, setRedirect, isLoggedIn, error,
        dispatch, redirect, spin, setSpin]);

    if (redirect) return <Redirect to={PATH.LOGIN}/>;
    if (spin) return <div>spin... {error}</div>;

    return (
        <>
            {/*<Log s={renderLog || "rendering AuthRedirectPage"}/>*/}
            <div {...restProps}>
                {children}
            </div>
        </>
    );
});

export default AuthRedirectPage;