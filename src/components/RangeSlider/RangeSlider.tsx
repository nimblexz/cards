import * as React from 'react';
import Box from '@mui/material/Box';
import Slider, {SliderProps} from '@mui/material/Slider';

export const RangeSlider: React.FC<SliderProps> = React.memo(({...restProps}) => {

    return (
        <Box sx={{width: 200}}>
            <Slider
                color={'secondary'}
                valueLabelDisplay="on"
                disableSwap
                {...restProps}
            />
        </Box>
    );
});

