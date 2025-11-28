import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from "react-toastify";

const List = () => {

  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  // Fetch food list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list!");
      }
    } catch (error) {
      toast.error("Server Error!");
    }
  };

  // Remove food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Food Removed Successfully!");
        fetchList(); // Refresh list after delete
      } else {
        toast.error("Failed to remove food!");
      }
    } catch (error) {
      toast.error("Server Error!");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px", color: "#555" }}>
            No food items available.
          </p>
        ) : (
          list.map((item, index) => (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>❌</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
