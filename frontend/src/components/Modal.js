import React from 'react';
import { Typography, Dialog, DialogContent, DialogContentText, DialogActions, Button, IconButton, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function Modal({ open, onClose, handleSubmit, title="안내", content, width, maxWidth="md", actionText="확인", titleFontSize=1.75, requiredInput=false, input="" }) {
    return (
        <Dialog open={open} maxWidth={width ? false : maxWidth}>
            <div style={{ width: width }}>
                <DialogTitle sx={{ m: 0, px: 3, pb: 0 }}>
                    <Typography variant="h6" fontWeight="700">
                        {title}
                    </Typography>
                    {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ py: 2, textAlign: "center", color: "black" }}>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                    <Button 
                        disabled={requiredInput ? !input && true : false}
                        variant="contained" onClick={handleSubmit}
                    >
                        <Typography fontWeight="700">{actionText}</Typography>
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}  
