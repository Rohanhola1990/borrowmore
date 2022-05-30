import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardRouting = (props) => {
  const resetUser = () => {
    localStorage.clear();
    props.setUser();
    props.setAuthorised(false);
  };
  return (
    <div className="dashMain h-100">
      <div className="dashContainer no-scroll d-flex h-100">
        <nav className="sideMenu d-flex">
            <div className="logoNav">
                <NavLink className={currentlink => currentlink.isActive ? "active" : "" } to="/">
                    BorrowMore
                </NavLink>
            </div>

          <ul>
            <li className="navOption">
              <NavLink className={currentlink => currentlink.isActive ? "active" : "" } to="/">Home</NavLink>
            </li>
            <li className="navOption">
              <NavLink className={currentlink => currentlink.isActive ? "active" : "" } to="/groups">Groups</NavLink>
            </li>
            <li className="navOption">
              <NavLink className={currentlink => currentlink.isActive ? "active" : "" } to="/settings">Settings</NavLink>
            </li>
            <li className="navOption">
              <NavLink className={currentlink => currentlink.isActive ? "active" : "" } to="/invite">Invite</NavLink>
            </li>
            <li>
              <button
                className="btn-inline logoutBtn w-100 text-left"
                onClick={resetUser}
              >
                Logout
              </button>
            </li>
          </ul>

          <div className="infoSideBarUser mt-a d-flex">
            <figure>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                width="1276.000000pt"
                height="1280.000000pt"
                viewBox="0 0 1276.000000 1280.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path d="M2056 12703 c-113 -619 -70 -1115 133 -1538 101 -211 174 -317 421 -615 309 -373 335 -444 267 -740 -230 -995 -17 -2019 588 -2825 530 -706 1299 -1178 2160 -1326 1315 -225 2642 340 3398 1448 293 429 481 914 557 1432 60 415 37 911 -61 1286 -54 207 -54 208 -36 280 28 112 71 176 277 410 58 66 134 156 170 200 398 499 524 1083 409 1884 -12 80 -24 152 -28 159 -4 8 -23 -26 -45 -85 -210 -537 -514 -917 -867 -1082 -357 -167 -769 -119 -1104 130 -276 205 -466 318 -725 432 -1099 482 -2390 347 -3353 -350 -177 -128 -213 -152 -292 -191 -173 -86 -331 -118 -539 -109 -99 4 -153 11 -221 31 -237 69 -456 218 -634 431 -152 183 -293 426 -400 693 -27 68 -51 126 -54 128 -3 3 -12 -35 -21 -83z" />
                  <path d="M8525 5843 c-191 -143 -472 -308 -695 -408 -387 -174 -764 -278 -1200 -331 -203 -25 -658 -25 -860 0 -684 83 -1296 315 -1837 697 -66 46 -123 79 -137 79 -13 0 -70 -9 -127 -21 -413 -82 -758 -199 -1134 -384 -1093 -538 -1928 -1501 -2311 -2663 -92 -280 -165 -621 -201 -944 -21 -192 -24 -691 -5 -848 66 -537 243 -831 572 -950 146 -54 226 -65 450 -64 285 1 501 32 1067 155 153 33 391 84 528 114 636 137 1072 204 1540 235 202 13 4208 13 4410 0 528 -35 940 -102 1838 -299 810 -178 1090 -220 1382 -207 581 25 852 318 937 1016 19 157 16 656 -6 850 -93 832 -383 1577 -871 2235 -616 833 -1502 1431 -2500 1690 -205 53 -324 77 -518 104 -215 31 -205 32 -322 -56z" />
                </g>
              </svg>
            </figure>
            <div className="userInfoSideBar">
              <h4>{props.user.user}</h4>
              <a href={`mailto:${props.user.email}`}>{props.user.email}</a>
            </div>
          </div>
        </nav>
        <div className="mainDashContent f-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardRouting;
