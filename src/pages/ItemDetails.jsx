import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton"; 

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);


    if (!id) return;

    const fetchItem = async () => {
      try {
        const res = await axios.get(
         `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );

        setItem(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchItem();
  }, [id]);


 if (!item) {
  return <Skeleton />;
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
                      <Link to={`/author/${item.ownerId}`}>
                        <img
                          src={item?.ownerImage || AuthorImage}
                          className="lazy"
                          alt=""
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to={`/author/${item?.ownerId}`}>
                        {item?.ownerName || "Unknown Owner"}
                      </Link>
                    </div>

                  </div>


                  <h6 className="mt-3">Creator</h6>

                  <div className="item_author d-flex align-items-center">

                    <div className="author_list_pp me-2">
                      <Link to={`/author/${item?.creatorId}`}>
                        <img
                          src={item?.creatorImage || AuthorImage}
                          className="lazy"
                          alt=""
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                        
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="author_list_info">
                      <Link to={`/author/${item?.creatorId}`}>
                        {item?.creatorName || "Unknown Creator"}
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