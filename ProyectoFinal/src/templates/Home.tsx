import Empresas from "./empresa/Empresas";
import styles from "../styles/templates/styles.module.css"

const Home = () => {
  return (
    <div className={styles.appContainer}>
        <Empresas />    
    </div>
  )
}

export default Home
