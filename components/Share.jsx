"use client";
import { useState } from "react";
import {
    EmailIcon,
    EmailShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";
import { useAuth } from "@/hooks/useAuth";

export default function Share({ id, title, shareText }) {
    const [showShareOptions, setShowShareOptions] = useState(false);
    const url = `https://khana-khazana-mji.vercel.app/recipes/${id}`;
    const { auth } = useAuth();
    return (
        <>
            <div
                className="flex gap-2 text-gray-600 cursor-pointer hover:text-[#eb4a36]"
                onClick={() => setShowShareOptions(!showShareOptions)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icon-tabler-share"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="6" r="3" />
                    <circle cx="18" cy="18" r="3" />
                    <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
                    <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
                </svg>
                <span>Share</span>
            </div>
            {showShareOptions && (
                <div className="flex gap-2">
                    {/*<FacebookShareButton url={url} quote={title}>*/}
                    {/*    <FacebookIcon size={32} round />*/}
                    {/*</FacebookShareButton>*/}
                    <TwitterShareButton url={url} title={title}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <EmailShareButton
                        url={url}
                        subject={title}
                        body={shareText}
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </div>
            )}
        </>
    );
}