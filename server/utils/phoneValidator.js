/**
 * Validates Kenyan phone number format
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  
  const cleaned = phone.replace(/\D/g, '');
  
  // Should be 10 digits (07XXXXXXXX) or 12 digits (254XXXXXXXXX)
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return /^0[17]\d{8}$/.test(cleaned);
  }
  
  if (cleaned.length === 12 && cleaned.startsWith('254')) {
    return /^254[17]\d{8}$/.test(cleaned);
  }
  
  return false;
};

/**
 * Formats phone number to M-Pesa format (254XXXXXXXXX)
 */
export const formatPhone = (phone) => {
  let cleaned = phone.replace(/\D/g, '');
  
  // If starts with 0, replace with 254
  if (cleaned.startsWith('0')) {
    cleaned = '254' + cleaned.substring(1);
  }
  
  // If doesn't start with 254, add it
  if (!cleaned.startsWith('254')) {
    cleaned = '254' + cleaned;
  }
  
  return cleaned;
};
