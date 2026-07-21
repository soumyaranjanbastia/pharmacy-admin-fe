/**
 * locationHelper.js
 * Utilities for formatting and accessing global location data.
 */

export const formatAddress = (address) => {
  if (!address) return '';
  const parts = [];
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.country) parts.push(address.country);
  return parts.join(', ');
};

export const getApiLocationPayload = (locationState) => {
  if (!locationState || !locationState.coords) return {};

  return {
    latitude: locationState.coords.latitude,
    longitude: locationState.coords.longitude,
    city: locationState.address?.city || '',
    state: locationState.address?.state || '',
    country: locationState.address?.country || '',
    postcode: locationState.address?.postcode || ''
  };
};
