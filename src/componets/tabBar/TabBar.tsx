import { NavLink } from 'react-router'
import styles from './TabBar.module.css'

export default function TabBar() {
  return (
    <nav className={styles.tabBar} aria-label="Navegação principal">
      <NavLink to="/" end className={styles.link} aria-label="Home" title="Home">
        <svg
          className={`${styles.icon} ${styles.homeIcon}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z" />
        </svg>
      </NavLink>

      <NavLink to="/reels" className={styles.link} aria-label="Reels" title="Reels">
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M3 8h18M8 3l3 5m4-5 3 5" />
          <path d="m10 12 5 3-5 3Z" fill="currentColor" stroke="none" />
        </svg>
      </NavLink>

      <NavLink
        to="/pesquisa"
        className={styles.link}
        aria-label="Pesquisar no cardápio"
        title="Pesquisa"
      >
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="10.5" cy="10.5" r="7.5" />
          <path d="m16 16 5 5" />
        </svg>
      </NavLink>

      <NavLink to="/perfil" className={styles.link} aria-label="Perfil" title="Perfil">
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="9" r="3" />
          <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
        </svg>
      </NavLink>
    </nav>
  )
}
