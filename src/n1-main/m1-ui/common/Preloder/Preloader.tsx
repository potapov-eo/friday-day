import React from 'react';
import style from './Preloader.module.css'


let Preloader = () => {
    return <div className={style.pre} >
        <img src="https://media.giphy.com/media/wnYB3vx9t6PXiq1ubB/giphy.gif"  style={ { height: 200 } }/>
    </div>
}

export default Preloader;
