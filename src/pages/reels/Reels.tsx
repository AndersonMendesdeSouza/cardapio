import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { products } from '../../data/products'
import styles from './Reels.module.css'

const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export default function Reels() {
  const [searchParams] = useSearchParams()
  const [failedVideoIds, setFailedVideoIds] = useState<string[]>([])
  const feedRef = useRef<HTMLDivElement>(null)
  const selectedProductId = searchParams.get('produto')
  const selectedProduct = products.find((product) => product.id === selectedProductId)
  const visibleProducts = selectedProduct
    ? [selectedProduct, ...products.filter((product) => product.id !== selectedProduct.id)]
    : products

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    feedRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [selectedProductId])

  return (
    <section className={styles.reels} aria-labelledby="reels-title">
      <h1 id="reels-title">Reels</h1>

      <div className={styles.feed} ref={feedRef}>
        {visibleProducts.map((product) => (
          <article key={product.id} className={styles.reel} aria-labelledby={`reel-${product.id}`}>
            <video
              className={styles.video}
              src={product.video}
              poster={product.image}
              aria-label={`Vídeo de ${product.name}`}
              controls
              playsInline
              loop
              muted
              preload="metadata"
              onPlay={(event) => {
                const currentVideo = event.currentTarget
                feedRef.current?.querySelectorAll('video').forEach((video) => {
                  if (video !== currentVideo) {
                    video.pause()
                  }
                })
              }}
              onError={() => {
                setFailedVideoIds((current) => {
                  if (current.includes(product.id)) return current
                  return [...current, product.id]
                })
              }}
            >
              Seu navegador não suporta vídeos.
              <a href={product.video}>Abrir vídeo de {product.name}</a>
            </video>

            {failedVideoIds.includes(product.id) && (
              <p className={styles.videoError} role="alert">
                Não foi possível reproduzir este vídeo.{' '}
                <a href={product.video}>Abrir vídeo</a>
              </p>
            )}

            <div className={styles.productInfo}>
              <div className={styles.productHeading}>
                <h2 id={`reel-${product.id}`}>{product.name}</h2>
                <span className={styles.price}>{priceFormatter.format(product.price)}</span>
              </div>
              <p>{product.description}</p>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.demoNote}>Vídeos ilustrativos</p>
    </section>
  )
}
