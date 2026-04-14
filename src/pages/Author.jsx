import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  
useEffect(() => {
  if (!id) return;

  const fetchAuthor = async () => {
    try {
      const res = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );

      const data = res.data?.data || res.data;
      setAuthor(data);
    } catch (err) {
      console.error("Error fetching author:", err);
    } finally {
      setLoading(false); 
    }
  };

  fetchAuthor();
}, [id]);


  useEffect(() => {
    if (author && author.followers !== undefined) {
      setFollowers(author.followers);
    }
  }, [author]);

  
  const handleFollow = () => {
    setFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
    setIsFollowing((prev) => !prev);
  };
  if (loading) {
  return (
    <div className="container">
      <div className="row">
        {new Array(4).fill(0).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    </div>
  );
}

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        
        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        />

        
        <section>
          <div className="container">
            <div className="row">
             
              <div className="col-md-12">
                <div className="d_profile de-flex">

                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author?.authorImage || AuthorImage} alt="" />
                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author?.authorName}
                          <span className="profile_username">
                            @{author?.tag}
                          </span>
                          <span className="profile_wallet">
                            {author?.address}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followers} followers
                      </div>

                      <button
                        onClick={handleFollow}
                        className="btn-main"
                          style={{
                            backgroundColor: isFollowing ? "gray" : "#8364e2",
                            border: "none"
                          }}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

           
            <div className="row mt-4">
              {author?.nftCollection?.map((nft) => (
                <div
                  key={nft.nftId}
                  className="col-lg-3 col-md-6 col-sm-6 mb-4"
                >
                  <Link to={`/item-details/${nft.nftId}`} state={{ nft }}>
                    <div className="nft__item">

                      <div className="nft__item_wrap">
                        <img
                          src={nft.nftImage}
                          alt=""
                          className="img-fluid"
                        />
                      </div>

                      <div className="nft__item_info">
                        <h4>{nft.title}</h4>

                        <div className="nft__item_price">
                          {nft.price} ETH

                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{nft.likes}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Author;