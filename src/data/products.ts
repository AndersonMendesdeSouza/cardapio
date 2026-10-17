import burgerImage from '../assets/food/burger.jpg'
import pizzaImage from '../assets/food/pizza.jpg'

// Produtos e vídeos ilustrativos até o cadastro dos itens reais.
export const products = [
  {
    id: 'classic-burger',
    category: 'burgers',
    highlight: 'Para abrir o apetite',
    name: 'Clássico da casa',
    description: 'Pão macio, burger e queijo derretido.',
    details: 'Burger de 160 g, queijo, alface, tomate e molho da casa.',
    price: 29.9,
    image: burgerImage,
    imageAlt: 'Hambúrguer com queijo, tomate e alface',
    // https://mixkit.co/free-stock-video/burgers-in-great-detail-3538/
    video: '/videos/burger.mp4',
  },
  {
    id: 'margherita-pizza',
    category: 'pizzas',
    highlight: 'Para compartilhar',
    name: 'Margherita',
    description: 'O clássico que sempre combina.',
    details: 'Molho de tomate, muçarela e manjericão fresco.',
    price: 49.9,
    image: pizzaImage,
    imageAlt: 'Pizza de queijo cortada em fatias sobre uma mesa de madeira',
    // https://mixkit.co/free-stock-video/close-up-shot-of-a-pepperoni-pizza-44001/
    video: '/videos/pizza.mp4',
  },
]
