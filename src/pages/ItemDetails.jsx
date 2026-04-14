import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams, useLocation } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const nftFromState = location.state?.nft;
  const [item, setItem] = useState(nftFromState || null);
  const [author, setAuthor] = useState(null);
  const [creator, setCreator] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0);


    if (nftFromState) return;

    const fetchItem = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        const foundItem = res.data.find(
          (i) => Number(i.nftId) === Number(id)
        );

        setItem(foundItem || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItem();
  }, [id, nftFromState]);


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
  }, [item?.authorId]);

  useEffect(() => {
  if (!item?.authorId) return;

  const randomId = item.authorId === 1 ? 2 : 1;

  axios
    .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${randomId}`)
    .then((res) => {
      const data = res.data?.data || res.data;
      setCreator(data);
    })
    .catch((err) => console.error(err));
}, [item?.authorId]);


 if (!item || !author) {
  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-6">
          <div style={{
            width: "100%",
            height: "450px",
            background: "#e0e0e0",
            borderRadius: "12px"
          }} />
        </div>

        
        <div className="col-md-6">

       
          <div style={{
            height: "35px",
            width: "70%",
            background: "#e0e0e0",
            marginBottom: "20px",
            borderRadius: "6px"
          }} />

         
          <div style={{
            height: "20px",
            width: "40%",
            background: "#e0e0e0",
            marginBottom: "20px",
            borderRadius: "6px"
          }} />

         
          <div style={{
            height: "15px",
            width: "100%",
            background: "#e0e0e0",
            marginBottom: "10px",
            borderRadius: "6px"
          }} />
          <div style={{
            height: "15px",
            width: "90%",
            background: "#e0e0e0",
            marginBottom: "20px",
            borderRadius: "6px"
          }} />

          
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "#e0e0e0",
              borderRadius: "50%",
              marginRight: "10px"
            }} />
            <div style={{
              width: "120px",
              height: "15px",
              background: "#e0e0e0",
              borderRadius: "6px"
            }} />
          </div>

         
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <div style={{
              width: "40px",
              height: "40px",
              background: "#e0e0e0",
              borderRadius: "50%",
              marginRight: "10px"
            }} />
            <div style={{
              width: "120px",
              height: "15px",
              background: "#e0e0e0",
              borderRadius: "6px"
            }} />
          </div>

          
          <div style={{
            height: "25px",
            width: "80px",
            background: "#e0e0e0",
            borderRadius: "6px"
          }} />

        </div>
      </div>
    </div>
  );
}

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        <section className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">


              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>


              <div className="col-md-6">
                <div className="item_info">

                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div><i className="fa fa-eye"></i> {item.views}</div>
                    <div><i className="fa fa-heart"></i> {item.likes}</div>
                  </div>

                  <p>
                    doloremque laudantium, totam rem aperiam...
                  </p>


                  <h6>Owner</h6>

                  <div className="item_author d-flex align-items-center">

                    <div className="author_list_pp me-2">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          src={author?.authorImage || AuthorImage}
                          className="lazy"
                          alt=""
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`}>
                        {author?.authorName || "Unknown Author"}
                      </Link>
                    </div>

                  </div>


                  <h6 className="mt-3">Creator</h6>

                  <div className="item_author d-flex align-items-center">

                    <div className="author_list_pp me-2">
                      <Link to={`/author/${creator?.authorId}`}>
                        <img
                          src={author?.authorImage || AuthorImage}
                          className="lazy"
                          alt=""
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                        
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to={`/author/${creator?.authorId}`}>
                        {author?.authorName || "Unknown Creator"}
                      </Link>
                    </div>

                  </div>

                  <h6 className="mt-3">Price</h6>
                  <div className="nft-item-price">
                    <img src={EthImage} alt="" />
                    <span>{item.price}</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ItemDetails;