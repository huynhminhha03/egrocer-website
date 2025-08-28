import React from 'react';

/**
 * ZaloButton Component - Simple floating contact buttons
 */
const ZaloButton = () => {
    return (
        <>
            <style>
                {`
                .zalo-phone-container {
                    position: fixed;
                    bottom: 130px;
                    right: 0px;
                    z-index: 9999;
                }
                
                .zalo-zalo-container {
                    position: fixed;
                    bottom: 10px;
                    right: 0px;
                    z-index: 9999;
                }
                
                .zalo-inner {
                    width: 170px;
                    height: 170px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    position: relative;
                }
                
                .zalo-circle {
                    border-radius: 50%;
                    background-color: deepskyblue;
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    opacity: 0;
                    animation: zalo-scale 1.5s infinite cubic-bezier(.36, .11, .89, .32);
                }
                
                .zalo-item {
                    z-index: 100;
                    padding: 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100px;
                }
                
                .zalo-link {
                    text-decoration: none;
                }
                
                .zalo-icon-wrapper {
                    width: 49px;
                    height: 49px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .zalo-icon {
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    animation: zalo-shake 1s infinite;
                }
                
                .zalo-icon:hover {
                    animation: none !important;
                }
                
                @keyframes zalo-scale {
                    from {
                        transform: scale(.6, .6);
                        opacity: .5;
                    }
                    to {
                        transform: scale(1.3, 1.3);
                        opacity: 0;
                    }
                }
                
                @keyframes zalo-shake {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    10%, 30%, 50%, 70%, 90% { transform: translate(-3px, 0) rotate(-3deg); }
                    20%, 40%, 60%, 80% { transform: translate(3px, 0) rotate(3deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                `}
            </style>

            {/* Phone Button */}
            <div className="zalo-phone-container">
                <div className="zalo-inner">
                    <div className="zalo-item">
                        <a href="tel:0983891000" className="zalo-link">
                            <div className="zalo-icon-wrapper">
                                <img
                                    className="zalo-icon"
                                    src="https://freesvg.org/img/phone-call-icon.png"
                                    alt="Phone"
                                />
                            </div>
                        </a>
                    </div>
                    <div className="zalo-circle" style={{ animationDelay: '0s' }}></div>
                    <div className="zalo-circle" style={{ animationDelay: '0.5s' }}></div>
                    <div className="zalo-circle" style={{ animationDelay: '1s' }}></div>
                    <div className="zalo-circle" style={{ animationDelay: '1.5s' }}></div>
                </div>
            </div>

            {/* Zalo Button */}
            <div className="zalo-zalo-container">
                <div className="zalo-inner">
                    <div className="zalo-item">
                        <a href="https://zalo.me/0983891000" target="_blank" rel="noopener noreferrer" className="zalo-link">
                            <div className="zalo-icon-wrapper">
                                <img
                                    className="zalo-icon"
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                                    alt="Zalo"
                                />
                            </div>
                        </a>
                    </div>
                    <div className="zalo-circle" style={{ animationDelay: '0s' }}></div>
                    <div className="zalo-circle" style={{ animationDelay: '0.5s' }}></div>
                    <div className="zalo-circle" style={{ animationDelay: '1s' }}></div>
                    <div className="zalo-circle" style={{ animationDelay: '1.5s' }}></div>
                </div>
            </div>
        </>
    );
};

export default ZaloButton;