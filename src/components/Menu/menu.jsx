
import Perfil from "./Perfil/perfil"
import IA from "./IA/ia"

export default function Menu(){
    return(
        <div className="w-2xl h-dvh bg-blue-200">
            <Perfil />
            <IA />
        </div>
    )
}