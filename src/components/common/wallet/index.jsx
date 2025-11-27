'use client';

import React from "react";
import { useState, createContext } from "react";
import Networkmodal from "./networkmodal";
import {
  ethereum
} from "./image";
// const ethereum= "./assets/images/icons/eth_logo.svg"
const UserContext = createContext();
const Metamask = () => {
  const [networkmodal, setNetworkmodal] = useState(false);
  const [currentnet, setCurrentnet] = useState({
    id: "ethereummainnet",
    icon: ethereum,
    text: "Ethereum Mainnet",
  });
  return (
    <UserContext.Provider
      value={{
        networkmodal: networkmodal,
        setNetworkmodal: setNetworkmodal,
        currentnet: currentnet,
        setCurrentnet: setCurrentnet,
      }}
    >
      <div>
        <Networkmodal />
      </div>
    </UserContext.Provider>
  );
};

export default Metamask;
export { UserContext };


























































































