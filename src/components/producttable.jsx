import { useEffect, useState } from 'react';
import AXIOS from 'axios';
import { Table ,Container,Form,Button } from 'react-bootstrap';

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    AXIOS.get('http://localhost:9000/getproduct')
      .then((response) => {
        setProducts(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleUpdate = (productId) => {
    console.log(`Update product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    AXIOS.delete(`http://localhost:9000/deleteproduct/${productId}`)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
   
    <Container>
      <h1><u>Product Table</u></h1>
      <Table className='table table-striped table-dark'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                {product.fileurl && (
                  <img
                    src={`http://localhost:9000/${product.fileurl}`}
                    alt={product.pname}
                    style={{ width: '150px', height: '150px' }}
                  />
                )}
              </td>
              <td>
              <Form>
              <Form.Group>
                
              <Button
               type="button" 
               variant="primary" 
               className="mt-3" 
               href={`/update/${product._id}`} // Use the correct link format
               >Update
               </Button>
               
              </Form.Group>
              <Form.Group>
              <Button
                  type="button"
                  variant="primary"
                  className="btn btn-danger mt-3"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </Form.Group>
              </Form>
              </td>
            </tr>
          ))}
        </tbody>
       

      </Table>
    </Container>
    </>
  );
}