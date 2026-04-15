import { useTheme } from '@emotion/react';
import React from 'react'
import { tokens } from '../../theme';
import DownloadIcon from '@mui/icons-material/Download';

export default function Title({title}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <div className='title mb-4 px-2 flex justify-between items-center'>
            <div>
                <h3 className="m-0 text-3xl font-semibold capitalize">{title}</h3>
                <p style={{color: colors.greenAccent[500]}}>welcome to your dashboard</p>
            </div>
        </div>
    )
}
