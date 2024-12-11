import { useParams } from "react-router-dom";
import ItemListingFull from "./itemListingFull";
import {useState, useEffect} from 'react';



  function ItemListingPage() {
    const [items, setItems]=useState([]);
    const { id } = useParams(); // Get the dynamic ID from the URL
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log("Fetching items...");
      fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getSellItems`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data received:", data);
          setItems(data.result || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching items", error);
          setLoading(false);
        });
    }, []);
    
    if (loading) {
      return <p>Loading items...</p>;
    }

    const item = items.find((item) => item.id === parseInt(id)); // Find the item by ID
    
    if (!item) {
      return <p>Item not found.</p>; // Display error if item is not found
    }
    
    return (
      <div>
        <h1>{item.name}</h1>
        <ItemListingFull
          image={item.image}
          name={item.name}
          currentPrice={item.price}
          deadline={item.deadline}
        />
      </div>
    );
}

export default ItemListingPage;


  // const { id } = useParams(); // Get the dynamic ID from the URL
  // const [item, setItem] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchItem = async () => {
  //     try {
  //       const response = await fetch(`/api/items/${id}`); // Fetch item details by ID
  //       const data = await response.json();
  //       setItem(data);
  //     } catch (error) {
  //       console.error("Error fetching item:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchItem();
  // }, [id]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (!item) {
  //   return <p>Item not found.</p>;
  // }

  /*

  const items = [
    {
      id: 1,
      category: "Electronics",
      title: "Luxury High-End Item",
      price: 1249.69,
      imageUrl: "https://picsum.photos/200?random=6",
      description: "A highly sought-after collectible.",
      topBid: 1049.57,
      deadline: "2024-05-13",
    },
    {
      id: 2,
      category: "Clothing",
      title: "Exclusive Collector's Piece",
      price: 1570.38,
      imageUrl: "https://picsum.photos/200?random=7",
      description: "In excellent condition and well-maintained.",
      topBid: 966.71,
      deadline: "2025-04-08",
    },
    {
      id: 3,
      category: "Art",
      title: "Handmade Custom Design",
      price: 571.76,
      imageUrl: "https://picsum.photos/200?random=5",
      description: "A one-of-a-kind piece you won't find anywhere else.",
      topBid: 597.72,
      deadline: "2024-08-09",
    },
    {
      id: 4,
      category: "Tools",
      title: "Handmade Custom Design",
      price: 1852.68,
      imageUrl: "https://picsum.photos/200?random=2",
      description: "Crafted with premium materials and care.",
      topBid: 404.03,
      deadline: "2025-04-13",
    },
    {
      id: 5,
      category: "Books",
      title: "Handmade Custom Design",
      price: 1635.87,
      imageUrl: "https://picsum.photos/200?random=9",
      description: "A one-of-a-kind piece you won't find anywhere else.",
      topBid: 598.13,
      deadline: "2025-03-13",
    },
    {
      id: 6,
      category: "Sports Equipment",
      title: "Luxury High-End Item",
      price: 41.78,
      imageUrl: "https://picsum.photos/200?random=2",
      description: "A highly sought-after collectible.",
      topBid: 67.56,
      deadline: "2025-08-05",
    },
    {
      id: 7,
      category: "Tools",
      title: "Exclusive Collector's Piece",
      price: 537.52,
      imageUrl: "https://picsum.photos/200?random=5",
      description: "A highly sought-after collectible.",
      topBid: 753.58,
      deadline: "2024-03-17",
    },
    {
      id: 8,
      category: "Clothing",
      title: "Limited Edition Product",
      price: 332.0,
      imageUrl: "https://picsum.photos/200?random=6",
      description: "In excellent condition and well-maintained.",
      topBid: 721.45,
      deadline: "2025-08-11",
    },
    {
      id: 9,
      category: "Electronics",
      title: "Rare Vintage Item",
      price: 183.66,
      imageUrl: "https://picsum.photos/200?random=9",
      description: "In excellent condition and well-maintained.",
      topBid: 1304.49,
      deadline: "2025-03-21",
    },
    {
      id: 10,
      category: "Furniture",
      title: "Handmade Custom Design",
      price: 1779.1,
      imageUrl: "https://picsum.photos/200?random=3",
      description: "In excellent condition and well-maintained.",
      topBid: 1075.5,
      deadline: "2024-11-21",
    },
  ];

  */
