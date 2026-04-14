import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NFTCard({ item }) {
  const [time, setTime] = useState("");
  const [author, setAuthor] = useState(null);

  
  const formatTime = () => {
    if (!item.expiryDate) return "Ended";

    const diff = item.expiryDate - Date.now();
    if (diff <= 0) return "Ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

 useEffect(() => {
  const timer = setInterval(() => {
    setTime(formatTime());
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, [item.expiryDate]);

  useEffect(() => {
    if (!item?.authorId) return;

    const fetchAuthor = async () => {
      try {
        const res = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${item.authorId}`
        );
        const data = res.data?.data || res.data;
        setAuthor(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAuthor();
  }, [item.authorId]);

  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">

       
        <div className="author_list_pp">
          <Link to={`/author/${item.authorId}`}>
            <img
              src={author?.authorImage || "/default.png"}
              alt=""
            />
            <i className="fa fa-check"></i>
          </Link>
        </div>

        
        <div className="author_name text-center">
          {author?.authorName || "Unknown Author"}
        </div>

        
        <div className="de_countdown">{time}</div>

        
        <div className="nft__item_wrap">
          <Link to={`/item-details/${item.nftId}`} state={{ nft: item }}>
            <img
              src={item.nftImage}
              className="nft__item_preview"
              alt=""
            />
          </Link>
        </div>

     
        <div className="nft__item_info">
          <Link to={`/item-details/${item.nftId}`} state={{ nft: item }}>
            <h4>{item.title}</h4>
          </Link>

          <div className="nft__item_price">
            {item.price} ETH
          </div>

          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default NFTCard;