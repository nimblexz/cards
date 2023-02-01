import React from 'react';
import {BasicModal} from '../../../components/Modal/Modal';
import {useAppDispatch} from '../../../bll/store';
import {deletePackTC} from '../../../bll/reducers/packs-reducer';

type DeletePackModalType = {
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
    packName?: string
    cardPackId?: string
}

export const DeletePackModal: React.FC<DeletePackModalType> = React.memo(({
                                                                              cardPackId,
                                                                              packName,
                                                                              isOpenModal,
                                                                              setIsOpenModal,
                                                                          }) => {
    const dispatch = useAppDispatch()

    const deleteCardPack = () => {
        dispatch(deletePackTC(cardPackId!))
        setIsOpenModal(false)
    }

    return (
        <BasicModal operationTitle={'Delete Pack'}
                    buttonName={'Delete'}
                    handleOperation={deleteCardPack}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
        >
            <div>Do you really want to remove <b>{packName}</b>?</div>
            <div>All cards will be excluded from this course.</div>
        </BasicModal>
    );
});
