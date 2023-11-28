// pages/Home.tsx : rfce
import React, { useEffect } from "react";
import initScripts from "../assets/js/scripts";
import initCustom from "../assets/js/custom";

function Home() {
  useEffect(() => {
    initScripts();
    initCustom();
  }, []);

  return (
    <>
      {/* 여기 */}
      {/* 1 */}
      <div className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="intro-wrap">
                <h1 className="mb-5">
                  <span className="d-block">Let's Enjoy Your</span> Trip In{" "}
                  <span className="typed-words"></span>
                </h1>
                {/* 필요한거  */}
                <div className="row">
                  <div className="col-12">
                  
                    {/* 원래폼 */}
                    <form className="form-checkin">
                      <div className="row mb-2">
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
                          <h6>국적</h6>
                          <select
                            name=""
                            id=""
                            className="form-control custom-select"
                          >
                            <option value="">국적</option>
                            <option value="">페루</option>
                            <option value="">일본</option>
                            <option value="">태국</option>
                            <option value="">브라질</option>
                            <option value="">미국</option>
                            <option value="">일본</option>
                            <option value="">한국</option>
                          </select>
                        </div>
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-3">
                          <h6>성별</h6>
                          <select
                            name=""
                            id=""
                            className="form-control custom-select"
                          >
                            <option value="">성별</option>
                            <option value="">여성</option>
                            <option value="">남성</option>
                          </select>
                        </div>
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
                          <h6>생년월일</h6>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="생년월일"
                          />
                        </div>

                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
                          <h6>여권발급국가</h6>
                          <select
                            name=""
                            id=""
                            className="form-control custom-select"
                          >
                            <option value="">여권 발급 국가</option>
                            <option value="">페루</option>
                            <option value="">일본</option>
                            <option value="">태국</option>
                            <option value="">브라질</option>
                            <option value="">미국</option>
                            <option value="">일본</option>
                            <option value="">한국</option>
                          </select>
                        </div>
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-4">
                          <h6>여권번호</h6>
                          <input
                            name=""
                            type="type"
                            className="form-control"
                            placeholder="여권번호"
                          />
                        </div>
                        <div className="col-sm-12 col-md-6 mb-3 mb-lg-2 col-lg-3">
                          <h6>여권만료일</h6>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="여권 만료일 "
                          />
                        </div>
                        <br />
                        <div>
                          <div className="row align-items-center">
                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                              <input
                                type="submit"
                                className="btn btn-primary btn-block"
                                value="Search"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 필요한거 */}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="slides">
                <img
                  src="images/hero-slider-1.jpg"
                  alt="Image"
                  className="img-fluid active"
                />
                <img
                  src="images/hero-slider-2.jpg"
                  alt="Image"
                  className="img-fluid"
                />
                <img
                  src="images/hero-slider-3.jpg"
                  alt="Image"
                  className="img-fluid"
                />
                <img
                  src="images/hero-slider-4.jpg"
                  alt="Image"
                  className="img-fluid"
                />
                <img
                  src="images/hero-slider-5.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 2 --> */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className="section-title text-center mb-3">Our Services</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
            </div>
          </div>
          <div className="row align-items-stretch">
            <div className="col-lg-4 order-lg-1">
              <div className="h-100">
                <div className="frame h-100">
                  <div
                    className="feature-img-bg h-100"
                    style={{
                      backgroundImage: "url('images/hero-slider-1.jpg')",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1">
              <div className="feature-1 d-md-flex">
                <div className="align-self-center">
                  <span className="flaticon-house display-4 text-primary"></span>
                  <h3>Beautiful Condo</h3>
                  <p className="mb-0">
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                </div>
              </div>

              <div className="feature-1 ">
                <div className="align-self-center">
                  <span className="flaticon-restaurant display-4 text-primary"></span>
                  <h3>Restaurants & Cafe</h3>
                  <p className="mb-0">
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3">
              <div className="feature-1 d-md-flex">
                <div className="align-self-center">
                  <span className="flaticon-mail display-4 text-primary"></span>
                  <h3>Easy to Connect</h3>
                  <p className="mb-0">
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                </div>
              </div>

              <div className="feature-1 d-md-flex">
                <div className="align-self-center">
                  <span className="flaticon-phone-call display-4 text-primary"></span>
                  <h3>24/7 Support</h3>
                  <p className="mb-0">
                    Even the all-powerful Pointing has no control about the
                    blind texts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 3 --> */}
      <div className="untree_co-section count-numbers py-5">
        <div className="container">
          <div className="row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-3">
              <div className="counter-wrap">
                <div className="counter">
                  <span className="" data-number="9313">
                    0
                  </span>
                </div>
                <span className="caption">No. of Travels</span>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3">
              <div className="counter-wrap">
                <div className="counter">
                  <span className="" data-number="8492">
                    0
                  </span>
                </div>
                <span className="caption">No. of Clients</span>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3">
              <div className="counter-wrap">
                <div className="counter">
                  <span className="" data-number="100">
                    0
                  </span>
                </div>
                <span className="caption">No. of Employees</span>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3">
              <div className="counter-wrap">
                <div className="counter">
                  <span className="" data-number="120">
                    0
                  </span>
                </div>
                <span className="caption">No. of Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 4 --> */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row text-center justify-content-center mb-5">
            <div className="col-lg-7">
              <h2 className="section-title text-center">Popular Destination</h2>
            </div>
          </div>

          <div className="owl-carousel owl-3-slider">
            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-1.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Pragser Wildsee</h3>
                  <span className="location">Italy</span>
                </div>
                <img
                  src="images/hero-slider-1.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-2.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Oia</h3>
                  <span className="location">Greece</span>
                </div>
                <img
                  src="images/hero-slider-2.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-3.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Perhentian Islands</h3>
                  <span className="location">Malaysia</span>
                </div>
                <img
                  src="images/hero-slider-3.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-4.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Rialto Bridge</h3>
                  <span className="location">Italy</span>
                </div>
                <img
                  src="images/hero-slider-4.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-5.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>San Francisco, United States</h3>
                  <span className="location">United States</span>
                </div>
                <img
                  src="images/hero-slider-5.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
            </div>

            <div className="item">
              <a
                className="media-thumb"
                href="images/hero-slider-1.jpg"
                data-fancybox="gallery"
              >
                <div className="media-text">
                  <h3>Lake Thun</h3>
                  <span className="location">Switzerland</span>
                </div>
                <img
                  src="images/hero-slider-2.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 6 --> */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-6">
              <h2 className="section-title text-center mb-3">
                Special Offers &amp; Discounts
              </h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="media-1">
                <a href="#" className="d-block mb-3">
                  <img
                    src="images/hero-slider-1.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Italy</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Rialto Mountains</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>$520.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="media-1">
                <a href="#" className="d-block mb-3">
                  <img
                    src="images/hero-slider-2.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>United States</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">San Francisco</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>$520.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="media-1">
                <a href="#" className="d-block mb-3">
                  <img
                    src="images/hero-slider-3.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Malaysia</span>
                </span>
                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Perhentian Islands</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>$750.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="media-1">
                <a href="#" className="d-block mb-3">
                  <img
                    src="images/hero-slider-4.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>

                <span className="d-flex align-items-center loc mb-2">
                  <span className="icon-room mr-3"></span>
                  <span>Switzerland</span>
                </span>

                <div className="d-flex align-items-center">
                  <div>
                    <h3>
                      <a href="#">Lake Thun</a>
                    </h3>
                    <div className="price ml-auto">
                      <span>$520.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 7 --> */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <figure className="img-play-video">
                <a
                  id="play-video"
                  className="video-play-button"
                  href="https://www.youtube.com/watch?v=mwtbEGNABWU"
                  data-fancybox
                >
                  <span></span>
                </a>
                <img
                  src="images/hero-slider-2.jpg"
                  alt="Image"
                  className="img-fluid rounded-20"
                />
              </figure>
            </div>

            <div className="col-lg-5">
              <h2 className="section-title text-left mb-4">
                Take a look at Tour Video
              </h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>

              <p className="mb-4">
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia. It is a paradisematic country, in
                which roasted parts of sentences fly into your mouth.
              </p>

              <ul className="list-unstyled two-col clearfix">
                <li>Outdoor recreation activities</li>
                <li>Airlines</li>
                <li>Car Rentals</li>
                <li>Cruise Lines</li>
                <li>Hotels</li>
                <li>Railways</li>
                <li>Travel Insurance</li>
                <li>Package Tours</li>
                <li>Insurance</li>
                <li>Guide Books</li>
              </ul>

              <p>
                <a href="#" className="btn btn-primary">
                  Get Started
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 8 --> */}
      <div className="py-5 cta-section">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h2 className="mb-2 text-white">
                Lets you Explore the Best. Contact Us Now
              </h2>
              <p className="mb-4 lead text-white text-white-opacity">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Excepturi, fugit?
              </p>
              <p className="mb-0">
                <a
                  href="booking.html"
                  className="btn btn-outline-white text-white btn-md font-weight-bold"
                >
                  Get in touch
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
