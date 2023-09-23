import { Tipografia, Flex } from "../../styles";

export const Score = ({userName, scorePlayer, scorerPc}) => {
userName = userName.length > 12 ? `${userName.slice(0,8)}...` : userName;


    return(
        <Flex direction="column"> 
            <Tipografia size="32px" fontWeight="400" lineHeight="48px"> PLACAR </Tipografia>

            <Flex justify="space-between"> 
                <Flex direction="column" gap="2px"> 
                    <Tipografia>{userName}</Tipografia>
                    <Tipografia>{scorePlayer}</Tipografia>
                </Flex>

                <Tipografia>X</Tipografia>

                <Flex direction="column"  gap="2px"> 
                    <Tipografia>COMPUTADOR</Tipografia>
                    <Tipografia>{scorerPc}</Tipografia>
                </Flex>

            </Flex>
        </Flex>
    )
}