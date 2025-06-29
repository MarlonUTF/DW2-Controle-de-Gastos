import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

export default function Pergunta(){
    return(
        <div className="w-full h-2/20 flex justify-evenly items-center">
            <TextField id="outlined-basic" label="Pergunte à IA sobre suas finanças" variant="outlined" className='!w-8/12' />
            <Button variant="contained" endIcon={<SendIcon />} className='!w-3/12 !bg-purple-700 !h-13'>
                Enviar
            </Button>
        </div>
    )
}