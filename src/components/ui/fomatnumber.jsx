/**
 * Utility functions for formatting currency and numbers
 */

/**
 * Format currency with Vietnamese Dong (VND)
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency symbol (default: 'đ')
 * @param {boolean} showSymbol - Whether to show currency symbol (default: true)
 * @returns {string} Formatted currency string
 */
export const formatVND = (amount, showSymbol = true) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return showSymbol ? `0` : '0';
    }

    const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);

    return showSymbol ? `${formattedAmount}` : formattedAmount;
};

/**
 * Format currency with USD
 * @param {number} amount - The amount to format
 * @param {boolean} showSymbol - Whether to show currency symbol (default: true)
 * @returns {string} Formatted currency string
 */
export const formatUSD = (amount, showSymbol = true) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return showSymbol ? '$0.00' : '0.00';
    }

    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    return showSymbol ? `$${formattedAmount}` : formattedAmount;
};

/**
 * Format currency based on locale and currency code
 * @param {number} amount - The amount to format
 * @param {string} locale - Locale string (default: 'vi-VN')
 * @param {string} currency - Currency code (default: 'VND')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, locale = 'vi-VN', currency = 'VND') => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        }).format(0);
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: currency === 'VND' ? 0 : 2,
        maximumFractionDigits: currency === 'VND' ? 0 : 2,
    }).format(amount);
};

/**
 * Format number with thousand separators
 * @param {number} number - The number to format
 * @param {string} locale - Locale string (default: 'vi-VN')
 * @returns {string} Formatted number string
 */
export const formatNumber = (number, locale = 'vi-VN') => {
    if (number === null || number === undefined || isNaN(number)) {
        return '0';
    }

    return new Intl.NumberFormat(locale).format(number);
};

/**
 * Format price with discount calculation
 * @param {number} originalPrice - Original price
 * @param {number} discountPercent - Discount percentage
 * @param {string} currency - Currency symbol (default: 'đ')
 * @returns {object} Object containing formatted original price, discount price, and savings
 */
export const formatPriceWithDiscount = (originalPrice, discountPercent = 0, currency = 'đ') => {
    if (originalPrice === null || originalPrice === undefined || isNaN(originalPrice)) {
        return {
            originalPrice: `0 ${currency}`,
            discountPrice: `0 ${currency}`,
            savings: `0 ${currency}`,
            discountPercent: 0
        };
    }

    const discountAmount = (originalPrice * discountPercent) / 100;
    const discountPrice = originalPrice - discountAmount;

    return {
        originalPrice: formatVND(originalPrice, currency),
        discountPrice: formatVND(discountPrice, currency),
        savings: formatVND(discountAmount, currency),
        discountPercent: Math.round(discountPercent)
    };
};

/**
 * Format compact currency (K, M, B notation)
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency symbol (default: 'đ')
 * @returns {string} Compact formatted currency string
 */
export const formatCompactCurrency = (amount, currency = 'đ') => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return `0 ${currency}`;
    }

    const absAmount = Math.abs(amount);

    if (absAmount >= 1000000000) {
        return `${(amount / 1000000000).toFixed(1)}B ${currency}`;
    } else if (absAmount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)}M ${currency}`;
    } else if (absAmount >= 1000) {
        return `${(amount / 1000).toFixed(1)}K ${currency}`;
    }

    return formatVND(amount, currency);
};

/**
 * Parse formatted currency string to number
 * @param {string} formattedCurrency - Formatted currency string
 * @returns {number} Parsed number
 */
export const parseCurrency = (formattedCurrency) => {
    if (!formattedCurrency || typeof formattedCurrency !== 'string') {
        return 0;
    }

    // Remove currency symbols and spaces
    const cleanedString = formattedCurrency
        .replace(/[đ$€£¥₹]/g, '')
        .replace(/[,\s]/g, '')
        .trim();

    const number = parseFloat(cleanedString);
    return isNaN(number) ? 0 : number;
};

/**
 * Format percentage
 * @param {number} value - The value to format as percentage
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
    if (value === null || value === undefined || isNaN(value)) {
        return '0%';
    }

    return `${value.toFixed(decimals)}%`;
};

/**
 * Calculate and format savings percentage
 * @param {number} originalPrice - Original price
 * @param {number} currentPrice - Current price
 * @returns {string} Formatted savings percentage
 */
export const calculateSavingsPercentage = (originalPrice, currentPrice) => {
    if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
        return '0%';
    }

    const savings = ((originalPrice - currentPrice) / originalPrice) * 100;
    return formatPercentage(savings, 0);
};

// Default export object with all functions
const FormatNumber = {
    formatVND,
    formatUSD,
    formatCurrency,
    formatNumber,
    formatPriceWithDiscount,
    formatCompactCurrency,
    parseCurrency,
    formatPercentage,
    calculateSavingsPercentage
};

export default FormatNumber;
