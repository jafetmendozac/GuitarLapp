import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useEffect, useState } from "react"
import { db } from "./components/data/db"

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState([])
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    setData(db)
  }, [])

  const MAX_QUANTITY = 12
  const MIN_QUANTITY = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addCart(item) {

    const isGuitarExist = cart.findIndex( guitar => guitar.id === item.id)

    if(isGuitarExist >= 0 ) {
      if(cart[isGuitarExist].quantity >= MAX_QUANTITY) return
      const updateCart = [...cart]
      updateCart[isGuitarExist].quantity++
      setCart([...updateCart])
    } else {
      item.quantity = 1
      setCart( prevCart => [...prevCart, item])
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updateCart = cart.map( guitar => {
      if(guitar.id === id && guitar.quantity < MAX_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1
        }
      }
      return guitar
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map( guitar => {
      if(guitar.id === id && guitar.quantity > MIN_QUANTITY) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1
        }
      }
      return guitar
    })
    setCart(updateCart)  
  }

  function resetCart() {
    setCart([])
  }

  return (
    <>

    <Header 
      cart={cart} 
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      resetCart={resetCart}
    />
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map( (guitar) => <Guitar key={guitar.id} guitar={guitar} addCart={addCart} /> )
          }
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
