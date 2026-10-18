import { useState } from 'react'
import { Link } from 'react-router'
import burgerImage from '../../assets/food/burger.jpg'
import pizzaImage from '../../assets/food/pizza.jpg'
import { products } from '../../data/products'
import styles from './Home.module.css'
import CardInitial from '../../componets/cardInitial/CardInitial'

const visitorStorageKey = 'cardapio:visitor-name'

const categories = [
  { id: 'all', name: 'Destaques', image: null },
  { id: 'burgers', name: 'Burgers', image: burgerImage },
  { id: 'pizzas', name: 'Pizzas', image: pizzaImage },
]

const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function Home() {
  const [visitorName, setVisitorName] = useState<string | null>(() => {
    try {
      const savedName = window.localStorage.getItem(visitorStorageKey)
      return savedName === null ? null : savedName.trim().replace(/\s+/g, ' ').slice(0, 40)
    } catch {
      // Sem armazenamento disponível, a apresentação continua nesta visita.
      return null
    }
  })
  const [storageNotice, setStorageNotice] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const visibleProducts = products.filter((product) => {
    return selectedCategory === 'all' || product.category === selectedCategory
  })

  function handleWelcomeComplete(name: string) {
    const cleanName = name.trim().replace(/\s+/g, ' ').slice(0, 40)

    try {
      window.localStorage.setItem(visitorStorageKey, cleanName)
    } catch {
      setStorageNotice('Sua escolha vale nesta visita. O navegador não permitiu salvá-la para a próxima.')
    }

    setVisitorName(cleanName)
  }

  return (
    <div className={styles.home}>
      {visitorName === null && <CardInitial onComplete={handleWelcomeComplete} />}
      <div className={styles.intro}>
        <h2>{visitorName ? `Bateu a fome, ${visitorName}?` : 'Bateu a fome?'}</h2>
        <p>Explore o cardápio e escolha seu favorito.</p>
        {storageNotice && <p role="status">{storageNotice}</p>}
      </div>

      <div
        className={styles.categories}
        role="group"
        aria-label="Categorias do cardápio"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className={styles.categoryButton}
            type="button"
            aria-pressed={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className={styles.categoryCircle}>
              {category.image ? (
                <img src={category.image} alt="" width="56" height="56" />
              ) : (
                <svg
                  className={styles.categoryIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              )}
            </span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <section className={styles.feed} aria-label="Pratos do cardápio" aria-live="polite">
        {visibleProducts.map((product, index) => (
          <article key={product.id} className={styles.product}>
            <div className={styles.productHeader}>
              <span>{product.highlight}</span>
            </div>

            <Link
              className={styles.videoLink}
              to={`/reels?produto=${product.id}`}
              aria-label={`Assistir ao vídeo de ${product.name}`}
            >
              <img
                className={styles.productImage}
                src={product.image}
                alt={product.imageAlt}
                width="650"
                height="488"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <span className={styles.videoBadge} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
                  <path d="m8 5 11 7-11 7Z" />
                </svg>
                Ver vídeo
              </span>
            </Link>

            <div className={styles.productContent}>
              <div className={styles.productHeading}>
                <h3>{product.name}</h3>
                <span className={styles.price}>{priceFormatter.format(product.price)}</span>
              </div>
              <p>{product.description}</p>

              <details className={styles.productDetails}>
                <summary>Ver detalhes</summary>
                <p>{product.details}</p>
              </details>
            </div>
          </article>
        ))}
      </section>

      <p className={styles.demoNote}>Pratos e preços ilustrativos.</p>
    </div>
  )
}
