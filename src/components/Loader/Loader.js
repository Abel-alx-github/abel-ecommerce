import styles from "./Loader.module.scss"
import loaderImg from '../../assetes/spinner.gif'
import ReactDOM from 'react-dom'


const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={loaderImg} alt="Loadding..." />
        </div>
    </div>, document.getElementById('loader')
  )
}

export default Loader