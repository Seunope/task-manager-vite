import { useState } from 'react';
import logo from '../img/logo.png';
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';
import Logout from '../pages/auth/user/Logout';
import { RootState } from '../config/redux/store';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { PAGE_ROUTES } from '../constants/pageRoutes';

const NavbarDesktop = () => {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [curDropDown, setCurDropDown] = useState<string>('');
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const role = useSelector((state: RootState) => state.user.role);

  function handleLogout() {
    setLogoutModal(!logoutModal);
  }

  function handleDropDown(item: string) {
    dropDown && curDropDown !== item ? setCurDropDown(item) : setDropDown(!dropDown);
    setCurDropDown(item);
  }
  return (
    <div
      className="hidden h-dvh md:w-1/4 lg:w-1/5 pt-8 pb-4
     overflow-y-hidden bg-WHITE px-6 md:flex flex-col justify-between"
    >
      {logoutModal && <Logout onSetLogoutModal={handleLogout} />}
      <div className="w-full ">
        <div className="flex justify-between items-center text-2xl">
          <img src={logo} alt="" className="w-12" onClick={() => navigate('/market-place')} />
        </div>
        {role === 'Customer Acquisition Agent' ? (
          <ul className="mt-10 font-semibold text-xs">
            <NavLink to="/caa/dashboard">
              {({ isActive }) => (
                <li className={`py-2 px-3 rounded-md ${isActive && 'bg-PRIMARY text-WHITE'}`}>
                  Dashboard
                </li>
              )}
            </NavLink>
            <NavLink to="/caa/onboarded-customers">
              {({ isActive }) => (
                <li className={`py-2 px-3  rounded-md ${isActive && 'bg-PRIMARY text-WHITE'}`}>
                  My Onboarded Customers
                </li>
              )}
            </NavLink>
            {/* <NavLink to="/caa/customer">
              {({ isActive }) => (
                <li className={`py-2 px-3  rounded-md ${isActive && 'bg-PRIMARY text-WHITE'}`}>
                  My Orders
                </li>
              )}
            </NavLink> */}
            <li className="px-3 py-2  rounded-md">Settings</li>
            <li className="px-3 py-2 rounded-md text-RED cursor-pointer" onClick={handleLogout}>
              Log out
            </li>
          </ul>
        ) : role === 'Sales Representative' ? (
          <ul className="mt-10 font-semibold text-xs">
            <NavLink to="/sr/dashboard">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 ounded-md ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Dashboard
                </li>
              )}
            </NavLink>
            <NavLink to="/sr/assigned-customers">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  My Assigned Customers
                </li>
              )}
            </NavLink>
            <NavLink to="/onboarding-form">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Onboarding
                </li>
              )}
            </NavLink>
            {/* <NavLink to="/market-place">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Product Recommendations
                </li>
              )}
            </NavLink> */}
            {/* <NavLink to="..">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md ${isActive && "bg-SECONDARY text-PRIMARY font-bold"}`}
                >
                  Feedback Form
                </li>
              )}
            </NavLink> */}

            {/* <NavLink to="/sr/orders">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  My Orders
                </li>
              )}
            </NavLink> */}
            {/* <li className="px-3 py-2 rounded-md">Settings</li> */}
            <li className="px-3 py-2 rounded-md text-RED cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        ) : role === 'Tele Sales Agent' ? (
          <ul className="mt-10 font-semibold text-xs">
            <NavLink to="/ts/dashboard">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Dashboard
                </li>
              )}
            </NavLink>

            <NavLink to="/onboarding-form">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Onboarding
                </li>
              )}
            </NavLink>
            <NavLink to="/ts/call-plan">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  My Call Plan
                </li>
              )}
            </NavLink>

            <NavLink to="/ts/assigned-customers">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  My Assigned Customers
                </li>
              )}
            </NavLink>

            {/* <NavLink to="/market-place">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Product Recommendations
                </li>
              )}
            </NavLink> */}
            {/* <NavLink to="..">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${isActive && "bg-SECONDARY text-PRIMARY font-bold"}`}
                >
                  Customer Feedback
                </li>
              )}
            </NavLink> */}

            {/* <NavLink to="/ts/orders">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  My Orders
                </li>
              )}
            </NavLink> */}
            {/* <NavLink to="..">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${isActive && "bg-SECONDARY text-PRIMARY font-bold"}`}
                >
                  Client Management
                </li>
              )}
            </NavLink>
            <NavLink to="..">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${isActive && "bg-SECONDARY text-PRIMARY font-bold"}`}
                >
                  My Stock Management
                </li>
              )}
            </NavLink>
            <li className="px-3 py-2 rounded-md text-GREY">Settings</li> */}
            <li className="px-3 py-2 rounded-md text-RED cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        ) : role === 'Back Office Manager' ? (
          <ul className="mt-10 font-semibold text-xs">
            <NavLink to="/bo/dashboard">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Dashboard
                </li>
              )}
            </NavLink>
            <li className=" rounded-md text-GREY cursor-pointer">
              <div
                className={`py-2 px-3 flex items-center 
                  justify-between rounded-md ${
                    dropDown && curDropDown === 'sales-execution' && 'bg-SECONDARY text-BLACK'
                  }`}
                onClick={() => handleDropDown('sales-execution')}
              >
                <p>Sales Execution</p>
                <IoIosArrowDown className="text-base" />
              </div>
              <ul
                className={`px-3 mt-2 ${
                  dropDown && curDropDown === 'sales-execution' ? 'block' : 'hidden'
                }`}
              >
                <NavLink to="/bo/assign-shops">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY
                         ${isActive && ' text-PRIMARY font-bold'}`}
                    >
                      Assign Shops
                    </li>
                  )}
                </NavLink>
                <NavLink to="/bo/visit-planner">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY ${isActive && ' text-PRIMARY font-bold'}`}
                    >
                      Visit Planner
                    </li>
                  )}
                </NavLink>
                <NavLink to="/bo/call-planner">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY
                         ${isActive && ' text-PRIMARY font-bold'}`}
                    >
                      Call Planner
                    </li>
                  )}
                </NavLink>
              </ul>
            </li>
            <li className=" rounded-md text-GREY">
              <div
                className={`py-2 px-3 flex items-center justify-between 
                  rounded-md cursor-pointer ${
                    dropDown && curDropDown === 'order-processing' && 'bg-SECONDARY text-BLACK'
                  }`}
                onClick={() => handleDropDown('order-processing')}
              >
                <p>Order Processing</p>
                <IoIosArrowDown className="text-base" />
              </div>
              <ul
                className={`px-3 mt-2 ${
                  dropDown && curDropDown === 'order-processing' ? 'block' : 'hidden'
                }`}
              >
                <NavLink to="/bo/orders">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY ${
                        isActive && ' text-PRIMARY font-bold'
                      }`}
                    >
                      Orders
                    </li>
                  )}
                </NavLink>
                <NavLink to={PAGE_ROUTES.BACK_OFFICE_PICK_UP_LIST}>
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY 
                        ${isActive && ' text-PRIMARY font-bold'}`}
                    >
                      Pick Up
                    </li>
                  )}
                </NavLink>
                <NavLink to={PAGE_ROUTES.BACK_OFFICE_PURCHASE_REQUISITION}>
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY 
                        ${isActive && ' text-PRIMARY font-bold'}`}
                    >
                      Purchase Requisition
                    </li>
                  )}
                </NavLink>
                <NavLink to="/bo/delivery">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY 
                        ${isActive && ' text-PRIMARY font-bold'}`}
                    >
                      Delivery
                    </li>
                  )}
                </NavLink>
              </ul>
            </li>
            <li className=" rounded-md text-GREY">
              <div
                className={`py-2 px-3 flex items-center justify-between 
                  rounded-md cursor-pointer ${
                    dropDown &&
                    curDropDown === 'pricing-and-promotions' &&
                    'bg-SECONDARY text-BLACK'
                  }`}
                onClick={() => handleDropDown('pricing-and-promotions')}
              >
                <p>Stock Update</p>
                <IoIosArrowDown className="text-base" />
              </div>
              <ul
                className={`px-3 mt-2 ${
                  dropDown && curDropDown === 'pricing-and-promotions' ? 'block' : 'hidden'
                }`}
              >
                <NavLink to="/bo/pricing">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY 
                        ${isActive && ' text-PRIMARY font-bold'}`}
                    >
                      Pricing & Inventory
                    </li>
                  )}
                </NavLink>

                <NavLink to="/bo/stock-update">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY ${
                        isActive && ' text-PRIMARY font-bold'
                      }`}
                    >
                      Wholesaler Stock Update
                    </li>
                  )}
                </NavLink>

                {/* <NavLink to="/bo/promotions">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY ${isActive && " text-PRIMARY font-bold"}`}
                    >
                      Promotions
                    </li>
                  )}
                </NavLink>
                <NavLink to="/bo/loyalty">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY ${isActive && " text-PRIMARY font-bold"}`}
                    >
                      Loyalty Programme
                    </li>
                  )}
                </NavLink> */}
              </ul>
            </li>

            <NavLink to="/onboarding-form">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Onboarding
                </li>
              )}
            </NavLink>

            <li className=" rounded-md text-GREY">
              <div
                className={`py-2 px-3 flex items-center justify-between 
                  rounded-md cursor-pointer ${
                    dropDown && curDropDown === 'product-sku' && 'bg-SECONDARY text-BLACK'
                  }`}
                onClick={() => handleDropDown('product-sku')}
              >
                <p>Product SKUs</p>
                <IoIosArrowDown className="text-base" />
              </div>
              <ul
                className={`px-3 mt-2 ${
                  dropDown && curDropDown === 'product-sku' ? 'block' : 'hidden'
                }`}
              >
                <NavLink to={PAGE_ROUTES.BACK_OFFICE_CREATE_SKU}>
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY 
                        ${isActive && ' text-PRIMARY font-bold'}`}
                    >
                      Create Product SKU
                    </li>
                  )}
                </NavLink>

                <NavLink to={PAGE_ROUTES.BACK_OFFICE_LIST_SKU}>
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY ${
                        isActive && ' text-PRIMARY font-bold'
                      }`}
                    >
                      List Product SKUs
                    </li>
                  )}
                </NavLink>
              </ul>
            </li>

            {/* <NavLink to="/bo/territory">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${isActive && "bg-SECONDARY text-PRIMARY font-bold"}`}
                >
                  Territory Creation
                </li>
              )}
            </NavLink> */}
            {/* <li className=" rounded-md text-GREY">
              <div
                className={`py-2 px-3 flex items-center justify-between 
                  rounded-md cursor-pointer ${
                    dropDown && curDropDown === 'inventory-management' && 'bg-SECONDARY text-BLACK'
                  }`}
                onClick={() => handleDropDown('inventory-management')}
              >
                <p>Inventory Management</p>
                <IoIosArrowDown className="text-base" />
              </div>
              <ul
                className={`px-3 mt-2 ${
                  dropDown && curDropDown === 'inventory-management' ? 'block' : 'hidden'
                }`}
              >
                <NavLink to="/bo/stock-update">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY ${
                        isActive && ' text-PRIMARY font-bold'
                      }`}
                    >
                      Wholesaler Stock Update
                    </li>
                  )}
                </NavLink>

                <NavLink to="/bo/openretail-stock-update">
                  {({ isActive }) => (
                    <li
                      className={`py-2 px-3 rounded-md text-GREY ${
                        isActive && ' text-PRIMARY font-bold'
                      }`}
                    >
                      Open Retail Stock Update
                    </li>
                  )}
                </NavLink>
              </ul>
            </li> */}
            {/* <NavLink to="/bo/stock-update">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY 
                    ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                >
                  Wholesaler Stock Update
                </li>
              )}
            </NavLink> */}

            <NavLink to="/bo/retailers">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY 
                    ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                >
                  Retailers
                </li>
              )}
            </NavLink>

            <NavLink to="/bo/agent">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Agents
                </li>
              )}
            </NavLink>

            <NavLink to="/bo/tasks">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                >
                  Task
                </li>
              )}
            </NavLink>

            <li className="px-3 py-2 rounded-md text-RED cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        ) : role === 'Logistics Manager' ? (
          <ul className="mt-10 font-semibold text-xs">
            <NavLink to={PAGE_ROUTES.LM_DASHBOARD}>
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY '
                  }`}
                >
                  Dashboard
                </li>
              )}
            </NavLink>

            <NavLink to={PAGE_ROUTES.LM_DRIVER_ORDER}>
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY'
                  }`}
                >
                  Order
                </li>
              )}
            </NavLink>

            <NavLink to={PAGE_ROUTES.LM_DRIVER_PICKUP}>
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY ${
                    isActive && 'bg-SECONDARY text-PRIMARY '
                  }`}
                >
                  Pick Up
                </li>
              )}
            </NavLink>

            <NavLink to={PAGE_ROUTES.LM_DRIVER_DELIVERY}>
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY 
                    ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                >
                  Delivery
                </li>
              )}
            </NavLink>

            <NavLink to={PAGE_ROUTES.LM_DRIVER_CLIENT}>
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md text-GREY 
                    ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                >
                  Client
                </li>
              )}
            </NavLink>

            <li className="px-3 py-2 rounded-md text-RED cursor-pointer" onClick={handleLogout}>
              Log out
            </li>
          </ul>
        ) : role === 'Wholesaler Account Officer' ? (
          <ul className="mt-10 font-semibold text-xs">
            <NavLink to="/wao/dashboard">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  Dashboard
                </li>
              )}
            </NavLink>
            <NavLink to="..">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  SKU Management
                </li>
              )}
            </NavLink>
            <NavLink to="..">
              {({ isActive }) => (
                <li
                  className={`py-2 px-3 rounded-md ${
                    isActive && 'bg-SECONDARY text-PRIMARY font-bold'
                  }`}
                >
                  New Product
                </li>
              )}
            </NavLink>
            <li className="px-3 py-2 rounded-md">Settings</li>
            <li className="px-3 py-2 rounded-md text-RED cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        ) : null}
      </div>
      <div>
        <div className="mt-8 flex items-center justify-between text-LIGHT_GREY ">
          <div className="flex items-center gap-2 text-sm sm:text-xs">
            <FontAwesomeIcon icon={faCircleQuestion} />
            <p>Help & getting started</p>
          </div>
          <div className="sm:hidden px-2 py-1 text-BLACK rounded-md bg-SECONDARY">8</div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
