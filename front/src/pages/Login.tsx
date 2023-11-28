// Login.tsx : rfce
import React, { useEffect } from "react";
import initScripts from "../assets/js/scripts";
import initCustom from "../assets/js/custom";

function Login() {

  useEffect(()=>{
    initScripts();
    initCustom();
},[])

    

  return (
    <>
      {/* 여기 */}
      <div className="hero hero-inner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">LogIn</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <form
                className="contact-form"
                data-aos="fade-up"
                data-aos-delay="200"
              >

                {/* ID  */}
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" htmlFor="userId">
                        ID
                      </label>
                      <input type="text" className="form-control" id="userId" />
                    </div>
                  </div>
                </div>
                {/* ID */}

                {/* PW */}
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" htmlFor="password">
                        Password
                      </label>
                      <input type="text" className="form-control" id="password" />
                    </div>
                  </div>
                </div>
                {/* PW */}

                <button type="submit" className="btn btn-primary">
                  LogIn
                </button>
                <button type="submit" className="btn btn-primary ml-2">
                  Find ID/PW
                </button>
                <button type="submit" className="btn btn-primary ml-2">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
