// Services.tsx
import React from "react";
import { useEffect } from "react";
import initScripts from "../assets/js/scripts";
import initCustom from "../assets/js/custom";

function Services() {
  useEffect(() => {
    initScripts();
    initCustom();
  }, []);
  return (
    <>
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icofont-close js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <nav className="site-nav">
        <div className="container">
          <div className="site-navigation">
            <a href="index.html" className="logo m-0">
              Tour <span className="text-primary">.</span>
            </a>

            <ul className="js-clone-nav d-none d-lg-inline-block text-left site-menu float-right">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li className="has-children">
                <a href="#">Dropdown</a>
                <ul className="dropdown">
                  <li>
                    <a href="elements.html">Elements</a>
                  </li>
                  <li>
                    <a href="#">Menu One</a>
                  </li>
                  <li className="has-children">
                    <a href="#">Menu Two</a>
                    <ul className="dropdown">
                      <li>
                        <a href="#">Sub Menu One</a>
                      </li>
                      <li>
                        <a href="#">Sub Menu Two</a>
                      </li>
                      <li>
                        <a href="#">Sub Menu Three</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Menu Three</a>
                  </li>
                </ul>
              </li>
              <li className="active">
                <a href="services.html">Services</a>
              </li>
              <li>
                <a href="about.html">About</a>
              </li>
              <li>
                <a href="contact.html">Contact Us</a>
              </li>
            </ul>

            <a
              href="#"
              className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
              data-toggle="collapse"
              data-target="#main-navbar"
            >
              <span></span>
            </a>
          </div>
        </div>
      </nav>

      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">Our Services</h1>
                <p className="text-white">
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-6 col-lg-3">
              <div className="media-1">
                <a href="#" className="d-block mb-3">
                  <img
                    src="images/hero-slider-1.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <div className="d-flex">
                  <div>
                    <h3>
                      <a href="#">Excellence in Travel</a>
                    </h3>
                    <p>
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="media-1">
            <a href="#" className="d-block mb-3"><img src="images/hero-slider-2.jpg" alt="Image" className="img-fluid"/></a>
            <div className="d-flex">
              <div>
                <h3><a href="#">Discovering Best</a></h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="media-1">
            <a href="#" className="d-block mb-3"><img src="images/hero-slider-3.jpg" alt="Image" className="img-fluid"/></a>
            <div className="d-flex">
              <div>
                <h3><a href="#">A New Moments of Life</a></h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="media-1">
            <a href="#" className="d-block mb-3"><img src="images/hero-slider-4.jpg" alt="Image" className="img-fluid"/></a>
            <div className="d-flex">
              <div>
                <h3><a href="#">Joy To Your Journey</a></h3>
                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-6 col-lg-3">
              <div className="service text-center">
                <span className="icon-paper-plane"></span>
                <h3>Excellence in Travel</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3">
              <div className="service text-center">
                <span className="icon-tag"></span>
                <h3>Discover Best</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3">
              <div className="service text-center">
                <span className="icon-user"></span>
                <h3>A New Moments of Life</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-3">
              <div className="service text-center">
                <span className="icon-support"></span>
                <h3>Joy To Your Journey</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="service text-center">
            <span className="icon-tag"></span>
            <h3>Discover Best</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="service text-center">
            <span className="icon-user"></span>
            <h3>A New Moments of Life</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="service text-center">
            <span className="icon-support"></span>
            <h3>Joy To Your Journey</h3>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="untree_co-section">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-lg-6 text-center">
          <h2 className="section-title text-center mb-3">More Services</h2>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
        </div>
      </div>
      <div className="row align-items-stretch">
        <div className="col-lg-4 order-lg-1">
          <div className="h-100"><div className="frame h-100"><div className="feature-img-bg h-100" style={{backgroundImage: "url('images/hero-slider-1.jpg')"}}>
          </div></div></div>
        </div>

        <div className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1" >

      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className="section-title text-center mb-3">More Services</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts. Separated
                they live in Bookmarksgrove right at the coast of the Semantics,
                a large language ocean.
              </p>
            </div>
          </div>

          <div className="feature-1 ">
            <div className="align-self-center">
              <span className="flaticon-restaurant display-4 text-primary"></span>
              <h3>Restaurants & Cafe</h3>
              <p className="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>

        </div>

        <div className="col-6 col-sm-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3" >

          <div className="feature-1 d-md-flex">
            <div className="align-self-center">
              <span className="flaticon-mail display-4 text-primary"></span>
              <h3>Easy to Connect</h3>
              <p className="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>

          <div className="feature-1 d-md-flex">
            <div className="align-self-center">
              <span className="flaticon-phone-call display-4 text-primary"></span>
              <h3>24/7 Support</h3>
              <p className="mb-0">Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>

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
  )
}

export default Services;
