import React from 'react';
import {BasicModal} from '../../../components/Modal/Modal';
import {useAppDispatch} from '../../../bll/store';
import {deleteCardTC} from '../../../bll/reducers/cards-reducer';

type DeleteCardType = {
    cardQuestion: string
    cardId: string
    packId: string
    isOpenModal: boolean
    setIsOpenModal: (value: boolean) => void
}

export const DeleteCardModal: React.FC<DeleteCardType> = React.memo(({
                                                                         cardId,
                                                                         packId,
                                                                         cardQuestion,
                                                                         isOpenModal,
                                                                         setIsOpenModal
                                                                     }) => {
    const dispatch = useAppDispatch()

    const deleteCard = () => {
        dispatch(deleteCardTC(cardId, packId))
    }

    return (
        <BasicModal
            operationTitle={'Delete Card'}
            buttonName={'Delete'}
            handleOperation={deleteCard}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
        >
            <div>Do you really want to remove card with question <b>{cardQuestion}</b>?</div>
            <div>The card will be removed.</div>
        </BasicModal>
    );
});
