import { useSearchParams } from 'react-router'
import styles from './Search.module.css'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const query = search.trim()

  return (
    <div className={styles.searchPage}>
      <h1>Pesquisa</h1>

      <div className={styles.searchField} role="search">
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          className={styles.searchInput}
          type="search"
          name="q"
          aria-label="Buscar no cardápio"
          placeholder="Buscar no cardápio"
          value={search}
          onChange={(event) => {
            const value = event.target.value
            setSearchParams(value ? { q: value } : {}, { replace: true })
          }}
        />
      </div>

      <section aria-labelledby="resultados-title">
        <h2 id="resultados-title">{query ? 'Resultado da busca' : 'Buscar produtos'}</h2>
        <p className={styles.emptyState} role="status">
          {query
            ? `Nenhum produto encontrado para “${query}”.`
            : 'Os produtos estarão disponíveis para pesquisa quando o cardápio for cadastrado.'}
        </p>
        {query && (
          <button
            className={styles.clearSearch}
            type="button"
            onClick={() => setSearchParams({}, { replace: true })}
          >
            Limpar busca
          </button>
        )}
      </section>
    </div>
  )
}
