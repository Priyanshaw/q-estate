import React, { useState } from "react";
import './EditModal.css';

export default function EditModal({ data, onSave, onClose }) {

  const [editedItem, setEditedItem] = useState({...data});
  const handleInputChange =(event)=>{
    const {name , value} = event.target;
    setEditedItem((prevItem)=> ({...prevItem, [name]:value}))
  }

  const handleSaveClick=()=>{
    onSave(editedItem);
    onClose();
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Property</h2>
        <label>Property Name</label>
        <input type="text" onChange={handleInputChange} value={editedItem.property_name} name="property_name" />
        <label>Price</label>
        <input type="text" onChange={handleInputChange} value={editedItem.price} name="price" />
        <label>Address</label>
        <input type="text" onChange={handleInputChange} value={editedItem.address} name="address" />
        <div className="modal-buttons">
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
