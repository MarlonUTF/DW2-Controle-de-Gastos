
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function Perfil(){
    return(
        <div className="w-full h-2/12 flex justify-center items-center">
            <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 60, height: 60 }}
                className='m-5'
            />
            <div className="gap-2 flex flex-col">
                <div className='font-bold'>Nome Oliveira da Silva</div>
                <Button color="error" className='!border-2' variant="outlined">Sair</Button>
            </div>
        </div>
    )
}