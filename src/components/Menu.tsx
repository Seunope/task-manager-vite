import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from 'react-icons/io';

import logo from '../img/logo.png';
import Logout from '../pages/auth/user/Logout';
import { authUser } from '../config/utils/utils';
import { RootState } from '../config/redux/store';
import avatar from '../img/image-placeholder.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { PAGE_ROUTES } from '../constants/pageRoutes';

type MenuProps = {
  onHandleMenu: () => void;
};

function Menu({ onHandleMenu }: MenuProps) {
  const { profile } = authUser();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [curDropDown, setCurDropDown] = useState<string>('');
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.user);

  function handleLogoutModal() {
    setLogoutModal(!logoutModal);
    // localStorage.removeItem('authToken');
    // navigate('/');
  }

  function handleDropDown(item: string) {
    dropDown && curDropDown !== item ? setCurDropDown(item) : setDropDown(!dropDown);
    setCurDropDown(item);
  }

  return (
    <div className="w-dvw h-dvh fixed z-20 md:hidden">
      {logoutModal && <Logout onSetLogoutModal={handleLogoutModal} />}
      <div
        className="h-full w-[70%] sm:w-1/2 pt-4 md:pt-10 pb-4 
      fixed top-0 left-0 z-10 bg-WHITE px-2 md:px-6 flex flex-col justify-between"
      >
        <div className="w-full text-sm ">
          <div className="flex justify-between items-center text-2xl">
            <img
              src={logo}
              alt=""
              className="w-12"
              onClick={() => navigate(PAGE_ROUTES.MARKET_PLACE)}
            />
            <FontAwesomeIcon icon={faXmark} onClick={onHandleMenu} className="-mt-6" />
          </div>
          {role === 'Customer Acquisition Agent' ? (
            <ul className="mt-10 font-semibold">
              <NavLink to={PAGE_ROUTES.CUSTOMER_ACQUISITION_AGENT_DASHBOARD}>
                {({ isActive }) => (
                  <li
                    className={`py-2 px-2 md:px-3 text-xs md:text-sm text-GREY rounded-md
                       ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Dashboard
                  </li>
                )}
              </NavLink>
              <NavLink to="/caa/onboarded-customers">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-2 md:px-3 text-xs md:text-sm text-GREY  rounded-md 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    My Onboarded Customers
                  </li>
                )}
              </NavLink>
              {/* <NavLink to="/caa/customer">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-2 md:px-3 text-xs md:text-sm text-GREY  rounded-md 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    My Orders
                  </li>
                )}
              </NavLink> */}
              <li className="px-2 py-2 text-GREY text-xs md:text-sm  rounded-md">Settings</li>
              <li
                className="px-2 py-2 text-xs md:text-sm  rounded-md text-RED cursor-pointer"
                onClick={handleLogoutModal}
              >
                Log out
              </li>
            </ul>
          ) : role === 'Sales Representative' ? (
            <ul className="mt-10 font-semibold">
              <NavLink to="/sr/dashboard">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-2 md:px-3 text-xs md:text-sm text-GREY 
                      rounded-md ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Dashboard
                  </li>
                )}
              </NavLink>
              <NavLink to="/sr/assigned-customers">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-2 md:px-3 text-xs md:text-sm text-GREY  
                      rounded-md ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    My Assigned Customers
                  </li>
                )}
              </NavLink>
              <NavLink to="/onboarding-form">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-2 md:px-3 text-xs md:text-sm text-GREY  
                      rounded-md ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Onboarding
                  </li>
                )}
              </NavLink>
              {/* <NavLink to="/market-place">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-2 md:px-3 text-xs md:text-sm text-GREY  
                      rounded-md ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Product Recommendations
                  </li>
                )}
              </NavLink> */}
              {/* <NavLink to="..">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-2 md:px-3 text-xs md:text-sm text-GREY  rounded-md ${isActive && "bg-SECONDARY text-PRIMARY font-bold"}`}
                  >
                    Feedback Form
                  </li>
                )}
              </NavLink> */}
              {/* <NavLink to="/sr/customer">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-2 md:px-3 text-xs md:text-sm text-GREY  
                      rounded-md ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    My Orders
                  </li>
                )}
              </NavLink> */}
              {/* <li className="px-3 py-2 sm:text-sm text-GREY  rounded-md">
                Settings
              </li> */}
              <li
                className="px-3 py-2 sm:text-sm  rounded-md text-RED cursor-pointer"
                onClick={handleLogoutModal}
              >
                Log out
              </li>
            </ul>
          ) : role === 'Tele Sales Agent' ? (
            <ul className="mt-10 font-semibold text-xs">
              <NavLink to="/ts/dashboard">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Dashboard
                  </li>
                )}
              </NavLink>
              <NavLink to="/onboarding-form">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 text-xs md:text-sm text-GREY  
                      rounded-md ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Onboarding
                  </li>
                )}
              </NavLink>
              <NavLink to="/ts/call-plan">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    My Call Plan
                  </li>
                )}
              </NavLink>

              <NavLink to="/ts/assigned-customers">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    My Assigned Customers
                  </li>
                )}
              </NavLink>

              {/* <NavLink to="/market-place">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Product Recommendations
                  </li>
                )}
              </NavLink> */}
              {/* <NavLink to="..">
                {({ isActive, isPending, isTransitioning }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY ${isActive && "bg-SECONDARY text-PRIMARY font-bold"}`}
                  >
                    Customer Feedback
                  </li>
                )}
              </NavLink> */}

              {/* <NavLink to="/ts/customer">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
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
              </NavLink> */}
              {/* <li className="px-3 py-2 rounded-md text-GREY">Settings</li> */}
              <li
                className="px-3 py-2 sm:text-sm  rounded-md text-RED cursor-pointer"
                onClick={handleLogoutModal}
              >
                Log out
              </li>
            </ul>
          ) : role === 'Back Office Manager' ? (
            <ul className="mt-10 font-semibold text-xs">
              <NavLink to="/bo/dashboard">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Dashboard
                  </li>
                )}
              </NavLink>
              <li className=" rounded-md text-GREY cursor-pointer">
                <div
                  className={`py-2 px-3 flex items-center 
                    justify-between rounded-md 
                    ${dropDown && curDropDown === 'sales-execution' && 'bg-SECONDARY text-BLACK'}`}
                  onClick={() => handleDropDown('sales-execution')}
                >
                  <p>Sales Execution</p>
                  <IoIosArrowDown className="text-base" />
                </div>
                <ul
                  className={`px-3 mt-2 
                    ${dropDown && curDropDown === 'sales-execution' ? 'block' : 'hidden'}`}
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
                        className={`py-2 px-3 rounded-md text-GREY 
                          ${isActive && ' text-PRIMARY font-bold'}`}
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
                  className={`py-2 px-3 flex items-center 
                    justify-between rounded-md cursor-pointer 
                    ${dropDown && curDropDown === 'order-processing' && 'bg-SECONDARY text-BLACK'}`}
                  onClick={() => handleDropDown('order-processing')}
                >
                  <p>Order Processing</p>
                  <IoIosArrowDown className="text-base" />
                </div>
                <ul
                  className={`px-3 mt-2 
                    ${dropDown && curDropDown === 'order-processing' ? 'block' : 'hidden'}`}
                >
                  <NavLink to="/bo/orders">
                    {({ isActive }) => (
                      <li
                        className={`py-2 px-3 rounded-md text-GREY 
                          ${isActive && ' text-PRIMARY font-bold'}`}
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
                    rounded-md cursor-pointer 
                    ${
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
                  className={`px-3 mt-2 
                    ${dropDown && curDropDown === 'pricing-and-promotions' ? 'block' : 'hidden'}`}
                >
                  <NavLink to="/bo/pricing">
                    {({ isActive }) => (
                      <li
                        className={`py-2 px-3 rounded-md 
                          text-GREY ${isActive && ' text-PRIMARY font-bold'}`}
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
                        className={`py-2 px-3 rounded-md text-GREY 
                          ${isActive && ' text-PRIMARY font-bold'}`}
                      >
                        Promotions
                      </li>
                    )}
                  </NavLink> */}
                  {/* <NavLink to="/bo/loyalty">
                    {({ isActive }) => (
                      <li
                        className={`py-2 px-3 rounded-md text-GREY 
                          ${isActive && ' text-PRIMARY font-bold'}`}
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
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Onboarding
                  </li>
                )}
              </NavLink>

              <li className=" rounded-md text-GREY">
                <div
                  className={`py-2 px-3 flex items-center justify-between 
                    rounded-md cursor-pointer 
                    ${dropDown && curDropDown === 'product-sku' && 'bg-SECONDARY text-BLACK'}`}
                  onClick={() => handleDropDown('product-sku')}
                >
                  <p>Product SKUs</p>
                  <IoIosArrowDown className="text-base" />
                </div>
                <ul
                  className={`px-3 mt-2 
                    ${dropDown && curDropDown === 'product-sku' ? 'block' : 'hidden'}`}
                >
                  <NavLink to={PAGE_ROUTES.BACK_OFFICE_CREATE_SKU}>
                    {({ isActive }) => (
                      <li
                        className={`py-2 px-3 rounded-md text-GREY
                       ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                      >
                        Create Product SKU
                      </li>
                    )}
                  </NavLink>
                  <NavLink to={PAGE_ROUTES.BACK_OFFICE_LIST_SKU}>
                    {({ isActive }) => (
                      <li
                        className={`py-2 px-3 rounded-md text-GREY
                       ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                      >
                        List Product SKUs
                      </li>
                    )}
                  </NavLink>
                </ul>
              </li>

              <NavLink to="/bo/territory">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Territory Creation
                  </li>
                )}
              </NavLink>
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

              <NavLink to="/bo/agent">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
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

              <li
                className="px-3 py-2 sm:text-sm  rounded-md text-RED cursor-pointer"
                onClick={handleLogoutModal}
              >
                Log out
              </li>
            </ul>
          ) : role === 'Logistics Manager' ? (
            <ul className="mt-10 font-semibold text-xs">
              <NavLink to="/lm/dashboard">
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

              <NavLink to="/onboarding-form">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY ${
                      isActive && 'bg-SECONDARY text-PRIMARY'
                    }`}
                  >
                    Orders
                  </li>
                )}
              </NavLink>

              <NavLink to="/bo/stock-update">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md text-GREY 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Delivery
                  </li>
                )}
              </NavLink>
              <li
                className="px-3 py-2 rounded-md text-RED cursor-pointer"
                onClick={handleLogoutModal}
              >
                Logout
              </li>
            </ul>
          ) : role === 'Wholesaler Account Officer' ? (
            <ul className="mt-10 font-semibold text-xs">
              <NavLink to="/wao/dashboard">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 ounded-md 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    Dashboard
                  </li>
                )}
              </NavLink>
              <NavLink to="..">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    SKU Management
                  </li>
                )}
              </NavLink>
              <NavLink to="..">
                {({ isActive }) => (
                  <li
                    className={`py-2 px-3 rounded-md 
                      ${isActive && 'bg-SECONDARY text-PRIMARY font-bold'}`}
                  >
                    New Product
                  </li>
                )}
              </NavLink>
              <li className="px-3 py-2 rounded-md">Settings</li>
              <li
                className="px-3 py-2 sm:text-sm  rounded-md text-RED cursor-pointer"
                onClick={handleLogoutModal}
              >
                Log out
              </li>
            </ul>
          ) : null}
        </div>
        <div>
          <div
            className="flex items-center px-3 py-2 bg-GREY/20 rounded-xl gap-4"
            onClick={() => navigate('/profile')}
          >
            <div className=" ">
              <img
                src={profile?.profileUrl || avatar}
                alt=""
                className="  rounded-full object-cover w-8 h-8 md:w-14 md:h-14 sm:w-12 sm:h-12"
              />
            </div>
            <div className="font-medium">
              <h1 className="font-semibold text-xs md:text-sm">{`${profile?.firstName}
               ${profile?.lastName}`}</h1>
              <p className="text-xs md:text-xs">{profile?.role?.name}</p>
            </div>
          </div>
          <div
            className="mt-8 text-xs flex items-center 
          justify-between font-semibold text-LIGHT_GREY "
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCircleQuestion} />
              <p>Help & getting started</p>
            </div>
            <div className="sm:hidden px-2 py-1 text-BLACK rounded-md bg-SECONDARY">8</div>
          </div>
        </div>
      </div>
      <div className="bg-BLACK/60 fixed top-0 left-0 h-full w-full" onClick={onHandleMenu}></div>
    </div>
  );
}

export default Menu;
