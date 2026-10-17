import styles from './Profile.module.css'

export default function Profile() {
  return (
    <section className={styles.profile} aria-labelledby="perfil-title">
      <h1 id="perfil-title">Perfil</h1>
      <p>As informações do perfil aparecerão aqui em breve.</p>
    </section>
  )
}
