import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { FaRegWindowClose } from 'react-icons/fa'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { getCartCount, products, cartItems, currency, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    const tempData = []
    const initialQuantities = {}
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
          initialQuantities[`${items}-${item}`] = cartItems[items][item]
        }
      }
    }
    setCartData(tempData)
    setQuantities(initialQuantities)
  }, [cartItems])

  const increment = (id, size) => {
    const key = `${id}-${size}`;
    const newValue = quantities[key] + 1;
    setQuantities(prev => ({ ...prev, [key]: newValue }))
    updateQuantity(id, size, newValue)
  }

  const decrement = (id, size) => {
    const key = `${id}-${size}`;
    if (quantities[key] > 1) {
      const newValue = quantities[key] - 1;
      setQuantities(prev => ({ ...prev, [key]: newValue }))
      updateQuantity(id, size, newValue)
    }
  }

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="container mx-auto px-4 py-10 bg-white rounded-2xl my-6 max-xl:mt-8">
          {/* Title */}
          <div className="flex items-baseline gap-x-4">
            <h3 className="text-3xl font-bold mb-2">Cart <span className="text-gray-600">List</span></h3>
            <p className="text-xl font-bold">{getCartCount()} items</p>
          </div>
          {/* container */}
          <div className="mt-6">
            {cartData.map((item, i) => {
              const productData = products.find(product => product._id === item._id)
              const key = `${item._id}-${item.size}`

              return (
                <div key={i} className="p-1 rounded-lg">
                  <div className="flex items-center gap-x-3">
                    <div className="flex items-start gap-6">
                      <img src={productData.image[0]} alt="" className="w-16 sm:w-18 rounded" />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center">
                        <h5 className="text-xl font-bold my-0 line-clamp-1">{productData.name}</h5>
                        <FaRegWindowClose 
                          onClick={() => updateQuantity(item._id, item.size, 0)} 
                          className="cursor-pointer text-gray-600" 
                        />
                      </div>
                      <p className="text-sm font-bold my-0.5">{item.size}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-gray-100">
                          <button className="p-1.5 bg-white text-gray-600 rounded-full shadow-md">
                            <FaMinus onClick={() => decrement(item._id, item.size)} className="text-xs" />
                          </button>
                          <p className="px-2">{quantities[key]}</p>
                          <button className="p-1.5 bg-white text-gray-600 rounded-full shadow-md">
                            <FaPlus onClick={() => increment(item._id, item.size)} className="text-xs" />
                          </button>
                        </div>
                        <h4 className="text-2xl font-bold">{currency}{productData.price}</h4>
                      </div>
                    </div>
                  </div>
                  <hr className="mx-auto h-[1px] w-4/5 bg-gray-900/10 mt-2" />
                </div>
              )
            })}
          </div>
          <div className="flex my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <button 
                onClick={() => navigate('/place-order')} 
                className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors mt-7"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart