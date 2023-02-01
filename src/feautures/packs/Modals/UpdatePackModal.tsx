import React, {useEffect, useState} from 'react';
import {BasicModal} from '../../../components/Modal/Modal';
import {useAppDispatch} from '../../../bll/store';
import {updatePackTC} from '../../../bll/reducers/packs-reducer';
import styles from '../../../components/Modal/Modal.module.css';
import {IconButton, TextField} from '@mui/material';
import {PackType} from '../../../api/packsAPI';
import {PhotoCamera} from '@mui/icons-material';
import {InputTypeFile} from '../../../components/InputTypeFile/InputTypeFile';

type UpdatePackModalType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    pack: PackType | null
}

export const UpdatePackModal: React.FC<UpdatePackModalType> = React.memo(({
                                                                              pack,
                                                                              isOpenModal,
                                                                              setIsOpenModal,
                                                                          }) => {
    const [newPackName, setNewPackName] = useState<string>(pack ? pack.name : '')
    const [newDeckCover, setNewDeckCover] = useState<string>(pack ? pack.deckCover : '')
    const dispatch = useAppDispatch()

    useEffect(() => {
        pack && setNewPackName(pack.name)
        pack && setNewDeckCover(pack.deckCover)
    }, [pack])

    const updateCardPack = () => {
        pack && dispatch(updatePackTC(pack._id, newPackName, newDeckCover))
        setNewPackName(newPackName)
        setIsOpenModal(false)
    }

    const updateDeckCover = (data: string) => {
        pack && setNewDeckCover(data)
    }

    return (
        <BasicModal operationTitle={'Update Pack'}
                    buttonName={'Save'}
                    handleOperation={updateCardPack}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
        >
            <TextField className={styles.addItemField}
                       label="Title"
                       variant="standard"
                       color="secondary"
                       value={newPackName}
                       onChange={(e) => setNewPackName(e.currentTarget.value)}/>
            <div className={styles.addDeckButton}>
                <InputTypeFile uploadImage={updateDeckCover}>
                    {pack?.deckCover
                        ? <img
                            src={pack.deckCover ? newDeckCover : ''}
                            style={{
                                width: '100px',
                            }}
                            alt="Deck cover"
                        />
                        : <img
                            src={newDeckCover ? newDeckCover : ''}
                            style={{
                                width: '100px',
                            }}
                            alt="Deck cover"
                        />
                    }
                    <IconButton component="span" color={'secondary'} sx={{right: '30px', top: '-4px'}}>
                        <PhotoCamera/>
                    </IconButton>
                </InputTypeFile>
            </div>
            <div>Do you really want to change <b>{pack!.name}</b>?</div>
        </BasicModal>
    );
});
