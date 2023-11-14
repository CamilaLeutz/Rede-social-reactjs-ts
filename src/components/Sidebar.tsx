import styles from "./Sidebar.module.css"
import { PencilLine } from "@phosphor-icons/react";
import imagemPerfil from "../assets/imagem-perfil.svg"
import imagemCapa from "../assets/imagem-capa.svg"


export function Sidebar () {
    return (
        <aside className={styles.sidebar}>
            <img src={imagemCapa}/>

            <div className={styles.profile}>
            <img className={styles.cover} src={imagemPerfil}/>
                <strong>Camila Leutz</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20}/>
                    Editar seu perfil...
                </a>
            </footer>
        </aside>
    )
}