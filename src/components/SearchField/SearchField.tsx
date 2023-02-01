import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from '@mui/material';
import {SearchCardRadio} from './SearchCardRadio';
import {useParams} from 'react-router-dom';
import {AddNewPackModal} from '../../feautures/packs/Modals/AddNewPackModal';
import {AddNewCardModal} from '../../feautures/cards/Modals/AddNewCardModal';
import {useAppSelector} from '../../bll/store';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'secondary',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

type SearchFieldType = {
    title: string
    goBack: () => void
    value: string
    radioValue?: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    onChangeRadio?: (value: string) => void
    disabled?: boolean
}
export const SearchAppBar: React.FC<SearchFieldType> = React.memo(({
                                                                       goBack,
                                                                       onChange,
                                                                       value,
                                                                       radioValue,
                                                                       onChangeRadio
                                                                   }) => {
    const {packId} = useParams<'packId'>();
    const [isOpenModalAddNewPack, setIsOpenModalAddNewPack] = useState(false)
    const [isOpenModalAddNewCard, setIsOpenModalAddNewCard] = useState(false)
    const userId = useAppSelector(state => state.profile._id)
    const packUserId = useAppSelector(state => state.cards.packUserId)

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" style={{backgroundColor: '#7b1fa2', borderRadius: '0 8px 0 0'}}>
                    <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Button onClick={goBack}
                                    variant="contained"
                                    color="secondary">
                                Back
                            </Button>
                        </div>
                        {packId && <SearchCardRadio radioValue={radioValue} onChangeRadio={onChangeRadio}/>}
                        <div>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{'aria-label': 'search'}}
                                    style={{color: 'white'}}
                                    value={value}
                                    onChange={onChange}
                                />
                            </Search>
                        </div>
                        <div>
                            {packId
                                ? <Button
                                    disabled={userId !== packUserId}
                                    onClick={() => setIsOpenModalAddNewCard(true)}
                                    color="secondary"
                                    variant="contained">
                                    Add new card
                                </Button>
                                : <Button
                                    onClick={() => setIsOpenModalAddNewPack(true)}
                                    color="secondary"
                                    variant="contained">
                                    Add new Pack
                                </Button>}
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            {packId
                ? <AddNewCardModal
                    isOpenModal={isOpenModalAddNewCard}
                    setIsOpenModal={setIsOpenModalAddNewCard}
                />
                : <AddNewPackModal
                    isOpenModal={isOpenModalAddNewPack}
                    setIsOpenModal={setIsOpenModalAddNewPack}
                />
            }
        </>
    );
});
