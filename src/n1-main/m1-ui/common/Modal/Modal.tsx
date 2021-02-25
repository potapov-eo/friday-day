import style from './Modal.module.css'


export let Modal = (props: { activeModal: boolean, setActiveModal: (activeModal: boolean) => void, children: any }) => {
    return <div className={props.activeModal ? style.modal + ' ' + style.modalActive : style.modal} onClick={() => {
        props.setActiveModal(false)
    }}>
        <div className={props.activeModal ? style.modalContant + ' ' + style.modalContantactive : style.modalContant}
             onClick={e => {
                 e.stopPropagation();
                            }}>
            {props.children}
        </div>
    </div>
}
