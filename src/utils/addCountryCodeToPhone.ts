export function addCountryCodeToPhoneNumber(phoneNumber: string) {
  // Remove leading zeros
  const cleanedNumber = phoneNumber?.replace(/^0+/, '');

  // Check if the number already starts with "+234"
  if (cleanedNumber?.startsWith('234')) {
    return cleanedNumber;
  }

  // Add the country code
  const formattedNumber = `234${cleanedNumber}`;

  return formattedNumber;
}
