import { Outlet, useMatch } from 'react-router'
import TabBar from '../componets/tabBar/TabBar'
import styles from './Layout.module.css'

export default function Layout() {
  const isReels = useMatch('/reels') !== null

  return (
    <div className={styles.layout}>
      <main className={`${styles.content} ${isReels ? styles.reelsContent : ''}`}>
        <Outlet />
      </main>
      <TabBar />
    </div>
  )
}
