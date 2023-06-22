import { FC, PropsWithChildren } from "react";
import Styles from './styles.module.scss'
import Sidebar from "./components/sidebar";

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className={Styles.layout}>
            <div className={Styles.layout__content_wrapper}>
                <Sidebar />
                <div className={Styles.layout__content_wrapper__main_content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout