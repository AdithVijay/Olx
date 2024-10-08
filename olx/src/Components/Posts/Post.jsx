import React, { useContext,useEffect,useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './Post.css';
import bikeimage from '../../assets/bikeimage.jpeg'
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {

  const {db} = useContext(FirebaseContext)
  const [products,setProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()
  useEffect(() => {

    const fetchProducts = async ()=>{
      try{
        const snapshot = await getDocs(collection(db,'products'))
        const allProducts = snapshot.docs.map((product)=>({
          ...product.data(),
          id:product.id
        }))
        console.log(allProducts);
         setProducts(allProducts)
      }catch(error){
        console.error("Error fetching products: ", error);
      }
    }
    fetchProducts()
  },[db]);
  
  const handleClick=(product)=>{
    setPostDetails(product); // Set product details
    navigate('/view'); 
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards" >
        {products.map(product=>{
           return <div className="card"  onClick={()=>handleClick(product)}>
            <div className="image">
              <img src={product.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
            <span>{new Date(product.createdAt * 1000).toLocaleDateString()}</span>
            </div>
          </div>
        })
        }
        </div>

      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              {/* <Heart></Heart> */}
            </div>
            <div className="image">
              <img src={bikeimage} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
