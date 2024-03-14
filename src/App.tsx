import { useEffect, useState } from 'react'
import { Button, Modal } from 'flowbite-react';
import NavbarComponent from './component/NavbarComponent'
import FooterComponent from './component/FooterComponent'
import CardComponent from './component/CardComponent'
import FormCreateProduct from './component/FormCreateProduct';




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
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState({});


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
      <div className=' flex justify-center items-center h-screen '>
        <img
          src="https://i.gifer.com/ZKZg.gif"
        />
      </div>
    )
  }

  function getDataForm(product: Product) {
    setDataForm(product);

  }

  const createProduct = () => {
    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("create product successfully");
        console.log(data);

      })
      .catch((err) => {
        console.log(err);

      })

    setOpenModal(false)

  }

  return (
    <>


      <div className=' h-screen flex flex-col justify-between '>
        <NavbarComponent />
        <div className=' flex justify-center my-5'>
          <Button onClick={() => setOpenModal(true)}>Create products</Button>
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



      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create Product</Modal.Header>
        <Modal.Body>
          <FormCreateProduct getDataForm={getDataForm}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
