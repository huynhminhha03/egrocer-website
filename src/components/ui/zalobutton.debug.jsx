import React from 'react';

/**
 * ZaloButton with inline styles - for debugging
 * This will help identify if the issue is with CSS Modules or component structure
 */
const ZaloButtonDebug = () => {
    const containerStyle = {
        width: '170px',
        height: '170px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        border: '2px solid red' // Debug border
    };

    const outerContainer1Style = {
        position: 'fixed',
        bottom: '180px',
        right: '0px',
        zIndex: 9999,
        pointerEvents: 'auto'
    };

    const outerContainer2Style = {
        position: 'fixed',
        bottom: '60px',
        right: '0px',
        zIndex: 9999,
        pointerEvents: 'auto'
    };

    const itemStyle = {
        zIndex: 100,
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px'
    };

    const iconWrapperStyle = {
        width: '49px',
        height: '49px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const iconStyle = {
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        animation: 'shake 1s infinite'
    };

    const circleStyle = {
        borderRadius: '50%',
        backgroundColor: 'deepskyblue',
        width: '100px',
        height: '100px',
        position: 'absolute',
        opacity: 0,
        animation: 'scaleIn 1.5s infinite cubic-bezier(.36, .11, .89, .32)'
    };

    return (
        <>
            <style>
                {`
                @keyframes scaleIn {
                    from {
                        transform: scale(.6, .6);
                        opacity: .5;
                    }
                    to {
                        transform: scale(1.3, 1.3);
                        opacity: 0;
                    }
                }

                @keyframes shake {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    10%, 30%, 50%, 70%, 90% { transform: translate(-3px, 0) rotate(-3deg); }
                    20%, 40%, 60%, 80% { transform: translate(3px, 0) rotate(3deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                `}
            </style>

            {/* Phone Button Container */}
            <div style={outerContainer1Style}>
                <div style={containerStyle}>
                    <div style={itemStyle}>
                        <a href="tel:0983891000" style={{ textDecoration: 'none' }}>
                            <div style={iconWrapperStyle}>
                                <img
                                    style={iconStyle}
                                    src="https://freesvg.org/img/phone-call-icon.png"
                                    alt="Phone Call"
                                />
                            </div>
                        </a>
                    </div>
                    <div style={{ ...circleStyle, animationDelay: '0s' }}></div>
                    <div style={{ ...circleStyle, animationDelay: '0.5s' }}></div>
                    <div style={{ ...circleStyle, animationDelay: '1s' }}></div>
                    <div style={{ ...circleStyle, animationDelay: '1.5s' }}></div>
                </div>
            </div>

            {/* Zalo Button Container */}
            <div style={outerContainer2Style}>
                <div style={containerStyle}>
                    <div style={itemStyle}>
                        <a href="https://zalo.me/0983891000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={iconWrapperStyle}>
                                <img
                                    style={iconStyle}
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                                    alt="Zalo Chat"
                                />
                            </div>
                        </a>
                    </div>
                    <div style={{ ...circleStyle, animationDelay: '0s' }}></div>
                    <div style={{ ...circleStyle, animationDelay: '0.5s' }}></div>
                    <div style={{ ...circleStyle, animationDelay: '1s' }}></div>
                    <div style={{ ...circleStyle, animationDelay: '1.5s' }}></div>
                </div>
            </div>
        </>
    );
};

export default ZaloButtonDebug;
