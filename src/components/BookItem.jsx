import React from 'react';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { Rating } from "@mui/material"
import "../styles/bookItem.css"

function BookItem({title, author, description, img, rating, category, status, precision}) {
  return(
    <div className="book-container">
      <div className="book-img-container">
        <img 
        src={img ? img : "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" } 
        alt="book-cover"/>
      </div>
      <div className="book-info-container">
        <p className="book-title">{title}</p>
        <div>
        <p className="sub-text">{author}</p>
        <Rating name="simple-controlled" value={rating} size="small" readOnly/>
        </div>
        <p className="secondary-text">{description}</p>
        <div>
          <p><span className="sub-text">Status:</span> {status}</p>
          <span>|</span>
          <p><span className="sub-text">Category:</span> {category}</p>
        </div>
        
      </div>
    </div>
  );
}

export default BookItem;