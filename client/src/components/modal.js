import React from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { colors } from '@material-ui/core';

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
            <div class="modal-dialog">
                <div class="modal-content">
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
        <div class="modal-body">
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
        <div class="modal-header">
            <div style={{ textAlign: "right" }}>
                <button onClick={handleClose} type="button" class="btn btn-default close-btn" aria-label="Close">&times;</button>
            </div>

            <div className="left">
                {children}
            </div>
        </div >
    )
}
modal.footer = ({
    children,
    className,
    style
}) => {
    return (
        <div class="modal-footer">
            {children}
        </div>
    )
}
export default modal