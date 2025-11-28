import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image || !data.name.trim() || !data.description.trim() || !data.price.trim()) {
      toast.warn("⚠️ Please fill all fields before adding the product!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    try {
      const response = await fetch(`${url}/api/food/add`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("✅ Product added successfully!");
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
      } else {
        toast.error("❌ Failed to add product!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("⚠️ Something went wrong!");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={data.name}
            onChange={onChangeHandler}
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="4"
            placeholder="Write description"
            value={data.description}
            onChange={onChangeHandler}
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select name="category" value={data.category} onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Price</p>
            <input
              type="number"
              name="price"
              placeholder="₹"
              value={data.price}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <button type="submit" className="add-btn">Add</button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Add;
