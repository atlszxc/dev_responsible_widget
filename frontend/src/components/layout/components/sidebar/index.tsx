import { Link } from "react-router-dom"
import { ROUTES } from "../../../../consts/routes"
import Styles from './styles.module.scss'

const Sidebar = () => {
    return (
        <aside className={Styles.sidebar}>
            {
                ROUTES.map(route => (
                    <div key={route.path}>
                        <Link to={route.path}>{route.title}</Link>
                    </div>
                ))
            }
        </aside>
    )
}

export default Sidebar