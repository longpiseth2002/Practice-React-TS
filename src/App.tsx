import { useEffect, useState } from 'react'
import { Spinner } from 'flowbite-react';
import NavbarComponent from './component/NavbarComponent'
import FooterComponent from './component/FooterComponent'
import CardComponent from './component/CardComponent'
import ButtonComponent from './component/ButtonComponent';



type Status = 'idle' | 'loading' | 'success' | 'error';
type Product = {
  readonly id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string
}




function App() {

  const [products, setProducts] = useState<Product[]>([]);
  const [Status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    setStatus("loading");
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setStatus('success');
      }).catch(err => {
        setStatus('error');
      })
  }, []);

  if (Status === "loading") {
    return (
      <div className=' flex justify-center '>
      
        <Spinner color="pink" aria-label="Pink spinner example" size="xl" />
      </div>
    )
  }

  return (
    <>
      

      <div className=' h-screen flex flex-col justify-between '>
        <NavbarComponent />
        <div className=' flex justify-center  '>
          <ButtonComponent />
        </div>

        <div className=' grid grid-cols-4 grid-flow-row gap-5 m-[50px]  '>
          {products.map((product) => (
            <CardComponent
              key={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
        <FooterComponent />
      </div>

    </>
  )
}

export default App
