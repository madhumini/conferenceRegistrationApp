import React from 'react'
import "../index.css"

const Nav = () => {
  return (
    <nav className="navbar navbar-light nav-bg">
      <div className="container-fluid">
        <a className="navbar-brand d-flex" href="#">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReIfUeqF3_lcJJue8wgCQ5uFRrzKfmnS_ZeA&usqp=CAU"
            alt=""
            width="70"
            height="70"
            className="d-inline-block align-text-top"
          />
          <h2 className="m-3">Conference</h2>
        </a>
      </div>
    </nav>
  );
}

export default Nav