import Card from '@/components/commons/Card'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchAllProductAsync } from '@/redux/reducers/productsReducer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { products, isLoading } = useAppSelector((state) => state.productReducer)

  const dispatch = useAppDispatch()
  const navigate = useNavigate(); 

  useEffect(() => {
    const controller = new AbortController(); 
    const { signal } = controller;

    dispatch(fetchAllProductAsync({ offset: 0, limit: 10, signal }))

    return () => {
     controller.abort(); 
    };
  }, [])

  const showDetail = (id: string) => {
    navigate(`products/${id}`)
  }

  if(products.length === 0 || isLoading) {
    return <p>loading ...</p>
  }
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8 shadow-md">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 &&
          products.map((item) => {
            return (
              <Card
              key={item.id}
                title={item.model}
                description={item.brand}
                price={item.price}
                model={item.model}
                button={{ type: 'button', label: 'More Details' }}
                onHandler={() => showDetail(item.id)} 
              />
            )
          })}
      </div>
    </div>
  )
}
