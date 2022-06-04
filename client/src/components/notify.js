import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
var unmounted
export default function Notify({
    option,
}) {
    const [isClosing, setIsClosing] = useState()
    const [isShow, setIsShow] = useState()
    const [notify, setNotify] = useState()

    useEffect(() => {
        if (isShow && notify.timeout) {
            setTimeout(() => {
                if (!unmounted) {
                    setIsClosing(true)
                }
            }, notify.timeout || 0);
        }
    }, [isShow])

    useEffect(() => {
        unmounted = false
        return () => { console.log("UNMOUNT"); unmounted = true }
    }, [])


    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                setNotify(null)
                setIsShow(false)
            }, 300);
        }
    }, [isClosing])

    useEffect(() => {
        if (option) {
            setIsShow(true)
            setNotify(option)
            setIsClosing(null)
        }
    }, [option])

    if (!isShow) return null
    return (
        <div className={`notify ${notify?.type ? `notify--${notify?.type}` : ''} ${isClosing ? 'notify--closing' : ''}`}>
            <div className="notify__container">
                <div className="notify__message">
                    <div className="message__icon">
                        {notify?.type == "info" && <InfoOutlinedIcon />}
                        {notify?.type == "success" && <CheckCircleOutlineIcon />}
                        {notify?.type == "error" && <ErrorOutlineIcon />}
                    </div>
                    <div className="message__text">
                        {notify?.message}
                    </div>
                </div>
                <button className="btn btn__icon" onClick={() => setIsClosing(true)}><CloseIcon /></button>
            </div>
        </div>
    )
}
