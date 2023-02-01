import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {NavLink, useNavigate} from 'react-router-dom';
import styles from './Packs.module.css';
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TableContainer from '@mui/material/TableContainer';
import {formatDate} from './Packs';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {DeletePackModal} from './Modals/DeletePackModal';
import {UpdatePackModal} from './Modals/UpdatePackModal';
import {PackType} from '../../api/packsAPI';
import {setParamsSortPack} from '../../bll/reducers/packs-reducer';

export const PacksTable = () => {
    const navigate = useNavigate()

    const packs = useAppSelector(state => state.packs.cardPacks)
    const userId = useAppSelector(state => state.profile._id)
    const sort = useAppSelector(state => state.packs.params.sortPacks)
    const status = useAppSelector((state) => state.app.status)
    const dispatch = useAppDispatch()

    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false)
    const [deletePackData, setDeletePackData] = useState<PackType | null>(null);
    const [updatePackData, setUpdatePackData] = useState<PackType | null>(null);

    const sortUpdate = (sortParams: string) => {
        return sort === `1${sortParams}` ? dispatch(setParamsSortPack(`0${sortParams}`)) : dispatch(setParamsSortPack(`1${sortParams}`));
    }

    const openModalDeletePack = (pack: PackType) => {
        setIsOpenModalDelete(true)
        setDeletePackData(pack)
    }

    const openModalUpdatePack = (pack: PackType) => {
        setIsOpenModalUpdate(true)
        setUpdatePackData(pack)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 400}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Cover</TableCell>
                            <TableCell onClick={() => sortUpdate('name')}
                                       className={sort === '0name' ? styles.sortUp : styles.sortDown}>Name</TableCell>
                            <TableCell align="center" onClick={() => sortUpdate('cardsCount')}
                                       className={sort === '0cardsCount' ? styles.sortUp : styles.sortDown}>Cards</TableCell>
                            <TableCell align="center" onClick={() => sortUpdate('user_name')}
                                       className={sort === '0user_name' ? styles.sortUp : styles.sortDown}>Created
                                By</TableCell>
                            <TableCell align="center" onClick={() => sortUpdate('updated')}
                                       className={sort === '0updated' ? styles.sortUp : styles.sortDown}>Last
                                Updated</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packs.length ? status !== 'loading' && packs?.map((pack) => (
                            <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="center">{pack.deckCover && <img src={pack.deckCover}
                                                                                  alt={'cover'}
                                                                                  style={{width: '100px'}}/>}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <NavLink className={styles.pack}
                                             to={`/cards/${pack._id}/${pack.name}`}>{pack.name}</NavLink>
                                </TableCell>
                                <TableCell align="center">{pack.cardsCount}</TableCell>
                                <TableCell align="center" className={styles.createdBy}>{pack.user_name}</TableCell>
                                <TableCell align="center">{formatDate(pack.updated)}</TableCell>
                                <TableCell className={styles.buttonBlock}>
                                    <Button
                                        onClick={() => openModalDeletePack(pack)}
                                        disabled={userId !== pack.user_id}
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => openModalUpdatePack(pack)}
                                        disabled={userId !== pack.user_id}
                                        color="secondary"
                                        size="small"
                                        startIcon={<BorderColorIcon/>}>
                                        Edit
                                    </Button>
                                    <Button
                                        disabled={pack.cardsCount === 0}
                                        onClick={() => {
                                            navigate(`/learn/${pack._id}/${pack.name}`)
                                        }} color="secondary" size="small"
                                        startIcon={<MenuBookIcon/>}>
                                        Learn
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                            : status !== 'loading' && <TableRow>
                            <TableCell>{'NO PACKS FOUND'}</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            {deletePackData && <DeletePackModal
                isOpenModal={isOpenModalDelete}
                setIsOpenModal={setIsOpenModalDelete}
                packName={deletePackData && deletePackData.name}
                cardPackId={deletePackData && deletePackData._id}
            />}
            {updatePackData && <UpdatePackModal
                isOpenModal={isOpenModalUpdate}
                setIsOpenModal={setIsOpenModalUpdate}
                pack={updatePackData}
            />}
        </>
    );
};
