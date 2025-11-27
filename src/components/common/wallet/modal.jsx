'use client';

import React, { useState, useEffect } from 'react';
import ConnectModal from './connectModal';
import './modal.css';

import { Typography, Card, List } from "antd";
import "antd/dist/reset.css";
const { Title, Text } = Typography;

const wallets = [
  
    {
        name: "Phantom",
        id  : "phantom",
        icon: <img src='/assets/svg/phantom.ico' width='25px' height='25px' />
    },
    {
        name: "Tronlink",
        id  : "tronlink",
        icon: <img src='/assets/svg/tronlink.ico' width='25px' height='25px' />
    },
    {
        name: "Rabby",
        id  : "rabby",
        icon: <img src='/assets/svg/rabby.ico' width='25px' height='25px' />
    },
];

const Modal = (props) => {
    const {handleModal, handleWalletPath} = props
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.onclick = function(event) {
                if(event.target == document.getElementById('listModal')) {
                    handleModal("modal", false);
                }
            };
        }
    }, [handleModal]);
    const [walletstatus, setWalletstatus] = useState(false);
    const [modalState, setModalState] = useState(false);
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setWalletstatus(true);
        } else {
            setWalletstatus(false);
        }
    }, []);

    const chooseModal = (value) => {
        if(walletstatus) {
            handleModal(value, true);
        } else {
            handleModal("connect", true);
            handleWalletPath(value)
        }
    }

    return (
        <div id="listModal"
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "10",
                margin: "auto",
                position: "fixed",
            }}
        >
            <Card
                style={{
                    width: "300px",
                    display: "flex",
                    background: "#1c1c1c",
                    borderRadius: 10,
                    position: "fixed",
                }}
                >
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: 30,
                        paddingBottom: "5px",
                    }}
                    onClick={() => handleModal("modal", false)}
                >
                    &times;
                </div>
                <div style={{ display: "flex" }}>
                    {/* Left Side */}
                    <div style={{ flex: 1 }}>
                        <Title level={3} style={{ color: "white" }}>
                            Connect a Wallet
                        </Title>
                        <Text style={{ color: "gray" }}>Popular</Text>
                        <List
                            itemLayout="horizontal"
                            dataSource={wallets}
                            renderItem={(wallet) => (
                            <List.Item
                                style={{ padding: "10px 0", cursor: "pointer" }}
                                // onClick={walletstatus ? () => handleModal(wallet.id, true) : () => handleConnectModal()}
                                onClick={() => chooseModal(wallet.id)}
                            >
                                <List.Item.Meta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                    avatar={wallet.icon}
                                    title={
                                        <Text style={{ color: "white", fontSize: '16px', fontFamily:'Inter, Roboto, Arial' }} id={wallet.id}>{wallet.name}</Text>
                                    }
                                />
                            </List.Item>
                            )}
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Modal;