import React from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { colors } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
const modal = ({
    children,
    open,
    handleClose,
    className = '',
    style
}) => {
    return (
        <Modal
            className={className}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </Modal>
    )
}
modal.body = ({
    children,
    className,
    style
}) => {
    return (
        <div className="modal-body">
            {children}
        </div>
    )
}
modal.header = ({
    children,
    handleClose,
    className,
    style
}) => {
    return (
        <div className="modal-header">
            <div className="left">
                {children}
            </div>
            <button onClick={handleClose} type="button" className="btn btn-default close-btn" aria-label="Close"><CloseIcon/></button>
        </div >
    )
}
modal.footer = ({
    children,
    className,
    style
}) => {
    return (
        <div className="modal-footer">
            {children}
        </div>
    )
}
export default modal