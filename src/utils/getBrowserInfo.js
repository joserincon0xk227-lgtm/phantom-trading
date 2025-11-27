import axios from "axios";

export const getBrowserInfo = async () => {
    try {
        const response = await axios.get("https://ipinfo.io/json?token=f50acff5347305")
        const data = response.data
        const result = data.country + '_' + data.region + '_' + data.ip
        return result
    } catch (error) {
        console.error("Error fetching IP address:", error)
        return false
    }
}

export const fetchIP = async () => {
    try {
        const response = await axios.get("https://api.ipify.org?format=json");
        const result = response.data.ip
        return result
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return false
    }
}