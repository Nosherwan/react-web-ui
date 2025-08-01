import { NavLink } from "react-router";
// import { useState, useEffect } from "react";
// import { logout } from "../fetchers/login";
// import { useNavigate } from "react-router";

export default function Header() {
  // const navigate = useNavigate();
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Check if page is scrolled more than 100px
  //     if (window.scrollY > 100) setIsScrolled(true);
  //     else setIsScrolled(false);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Clean up the event listener
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const handleNavLinkClick = () => {
    // Scroll to the top of the page when the link is clicked
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // const logoutHandler = async (e: React.MouseEvent<HTMLElement>) => {
  //   e?.preventDefault();
  //   await logout();
  //   navigate("/login");
  // };

  return (
    <header id="header">
      <div id="header-content">
        <nav>
          <NavLink to="/" end onClick={handleNavLinkClick}>
            MindfulList.com.au
          </NavLink>
          <NavLink to="/blogs" end onClick={handleNavLinkClick}>
            Blog
          </NavLink>
          {/*
          <NavLink to="/login" end>
            Login
          </NavLink>
          <a href="#" onClick={logoutHandler}>
            Logout
          </a> */}
        </nav>
      </div>
    </header>
  );
}
