import { StyledInput } from "./style"


export const Input = ({placecholder, onChange }) => {
     return(
        <StyledInput placeholder={placecholder} 
        onChange={(e) => onChange(e.target.value)}/>
     )
}