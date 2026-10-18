import { useEffect, useRef, useState } from 'react'
import styles from './CardInitital.module.css'

interface CardInitialProps {
  onComplete: (name: string) => void
}

export default function CardInitial({ onComplete }: CardInitialProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="welcome-title"
      aria-describedby="welcome-description"
      onCancel={(event) => {
        event.preventDefault()
        onComplete('')
      }}
    >
      <div className={styles.iconBadge} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3v5a3 3 0 0 0 6 0V3M7 3v18M19 3v18M19 3c-4 0-6 8 0 8" />
        </svg>
      </div>
      <p className={styles.eyebrow}>UM SABOR DE BOAS-VINDAS</p>
      <h2 id="welcome-title">Que bom ter você aqui!</h2>
      <p className={styles.description} id="welcome-description">
        Como podemos te chamar? Vamos deixar essa experiência mais sua.
      </p>

      <form
        className={styles.form}
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          const cleanName = name.trim().replace(/\s+/g, ' ')

          if (!cleanName) {
            setError('Digite seu nome ou escolha “Agora não” para continuar.')
            event.currentTarget.querySelector('input')?.focus()
            return
          }

          onComplete(cleanName)
        }}
      >
        <label className={styles.label} htmlFor="welcome-name">Seu nome</label>
        <input
          className={styles.input}
          id="welcome-name"
          name="givenName"
          type="text"
          placeholder="Ex.: João"
          autoComplete="given-name"
          autoFocus
          required
          maxLength={40}
          value={name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'welcome-name-error' : 'welcome-name-hint'}
          onChange={(event) => {
            setName(event.target.value)
            setError('')
          }}
        />
        {error ? (
          <p className={styles.error} id="welcome-name-error" role="alert">{error}</p>
        ) : (
          <p className={styles.hint} id="welcome-name-hint">Salvo apenas neste navegador.</p>
        )}

        <button className={styles.primaryButton} type="submit">
          Explorar cardápio
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </button>
        <button className={styles.skipButton} type="button" onClick={() => onComplete('')}>
          Agora não
        </button>
      </form>
    </dialog>
  )
}
