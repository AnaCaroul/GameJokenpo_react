import { Flex, Tipografia } from "../../styles"
import { Action } from "./style"

export const ActionsGame = ({actions, disabled, onClick}) => {

    return(
        <Flex>
            {actions.map((action => (
               <Action
               key={action.value}
               disabled={disabled}
               onClick={() => onClick(action)}> 
                <Tipografia size="32px"> {action.label}</Tipografia>
               </Action>
            )

            ))}
        </Flex>
 
    )
}