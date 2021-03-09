import React from 'react'
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


export default function paganation({gotoNextPage, gotoPrevPage}) {
    const divStyle = {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        position: 'bottom',

    };


    return (
        <div style={divStyle}>
            {gotoPrevPage && <IconButton variant="outlined" onClick={gotoPrevPage}><NavigateBeforeIcon/></IconButton>}
            {gotoNextPage && <IconButton variant="outlined" disableElevation onClick={gotoNextPage}><NavigateNextIcon/></IconButton>}

        </div>
    )
}
