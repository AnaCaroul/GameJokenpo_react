import { Flex, Spacer, Tipografia } from '../../styles/index'
import { ModalStyled, CloseModal } from './style'


export const Modal = ({
    open, handleOpenModal, titleModal, messageModal
}) => {

    return(
        <ModalStyled open={open}>
            <Flex direction="column">
                <Tipografia primary>{titleModal}</Tipografia>
                <Spacer margin="8px"/>
                <CloseModal onClick={() => handleOpenModal()}>X</CloseModal> 
                <Tipografia primary>{messageModal}</Tipografia>
            </Flex>
        </ModalStyled>
    )

}