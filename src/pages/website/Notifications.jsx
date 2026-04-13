import React, { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Loader from "../../loaders/Loader";
import LottieFiles from "../../lottieFiles/LottieFiles";
import { getNotifications } from "../../services/notificationServices";


export default function Notifications() {
    const [loader, setLoader] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const getAllNotifications = async () => {
            setLoader(true)
            try {
                const response = await getNotifications();
                setNotifications(response)

                console.log(response)
            } catch {
                setLoader(false)
            } finally {
                setLoader(false)
            }
        }

        getAllNotifications();
    }, [])

    const getIcon = (type) => {
        switch (type) {
            case 0:
                return <InfoOutlinedIcon fontSize="small" />;
            case 1:
                return <CheckCircleOutlineIcon fontSize="small" />;
            case 2:
                return <WarningAmberOutlinedIcon fontSize="small" />;
            default:
                return <ErrorOutlineIcon fontSize="small" />;
        }
    };

    const getIconStyle = (type) => {
        switch (type) {
            case 2:
            case 3:
                return "bg-red-100 text-red-500";
            default:
                return "bg-blue-100 text-blue-500";
        }
    };

    const formatTime = (date) => {

        const minuts = Math.floor((new Date() - new Date(date)) / (1000 * 60));
        const hours = Math.floor(minuts / 60);
        if (minuts < 1) {
            return "just now";
        } else if (minuts < 60) {
            return `${minuts} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (hours < 48) {
            return `yesterday`;
        } else if (hours < 24 * 7) {
            return `${Math.floor(hours / 24)} days ago`;
        }
        return new Date(date).toLocaleDateString();
    };

    if (loader)
        return <Loader />

    return (
        <div className="min-h-screen w-[100%]  sm:p-8 px-3 py-5" style={{ backgroundColor: colors.blueAccent[800] }}>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-[2.5rem] font-semibold text-gray-800" style={{ color: colors.grey[100] }}>
                        Notifications
                    </h1>
                    <p className="text-md" style={{ color: colors.grey[400] }}>
                        Stay updated with your latest signals and alerts.
                    </p>
                </div>
            </div>


            <p className="text-sm font-semibold text-gray-400 mb-4 tracking-wider">
                TODAY
            </p>

            {notifications.length ? notifications.map((item, index) => (
                <div
                    key={index}
                    className={`relative ${theme.palette.mode === "light" ? "odd:bg-[#d2d2d2dd] even:bg-white" : "odd:bg-[#242424] even:bg-[#2e2e2ede]"} rounded-md p-4 mb-4 flex justify-between items-start ${!item.isRead ? "border-l-4 border-blue-500" : ""}`}
                >
                    <div className="flex gap-3">
                        <div
                            className={`w-9 h-9 flex items-center justify-center rounded-full ${getIconStyle(
                                item.type
                            )}`}
                        >
                            {getIcon(item.type)}
                        </div>

                        <div>
                            <h3
                                style={{ color: colors.grey[100] }}
                                className={`text-sm font-semibold`}
                            >
                                {item.title}
                            </h3>
                            <p className="text-sm mt-1 leading-relaxed" style={{ color: colors.grey[400] }}>
                                {item.message}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1">

                        {!item.isRead && (
                            <p className=" w-2 h-2 bg-blue-500 rounded-full"></p>
                        )}
                        <div className="text-xs whitespace-nowrap" style={{ color: colors.grey[400] }}>
                            {formatTime(item.createdAt)}
                        </div>
                    </div>
                </div>
            )) : (
                <LottieFiles />
            )
            }
        </div>
    );
}