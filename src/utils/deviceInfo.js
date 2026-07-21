/**
 * Utility to collect device information for Web/Laptop users.
 * This mimics the device info collected by mobile apps to ensure 
 * consistency in the backend devicesinfo table.
 */

export const getDeviceInfo = () => {
  // 1. Get or generate a persistent Device ID
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    // Fallback for older browsers if crypto.randomUUID is not available
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      deviceId = crypto.randomUUID();
    } else {
      deviceId = 'web-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    localStorage.setItem('deviceId', deviceId);
  }

  // 2. Parse User Agent for Browser and OS
  const ua = navigator.userAgent;
  let browser = "Unknown Browser";
  let systemName = "Unknown OS";
  let deviceType = "Desktop";

  // Browser detection
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("SamsungBrowser/")) browser = "Samsung Browser";
  else if (ua.includes("Opera/") || ua.includes("OPR/")) browser = "Opera";
  else if (ua.includes("Trident/")) browser = "Internet Explorer";
  else if (ua.includes("Edge/") || ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/")) browser = "Chrome";
  else if (ua.includes("Safari/")) browser = "Safari";

  // OS detection
  if (ua.includes("Win")) systemName = "Windows";
  else if (ua.includes("Mac")) systemName = "MacOS";
  else if (ua.includes("X11") || ua.includes("Linux")) systemName = "Linux";
  else if (ua.includes("Android")) {
    systemName = "Android";
    deviceType = "Mobile";
  } else if (ua.includes("iPhone") || ua.includes("iPad")) {
    systemName = "iOS";
    deviceType = ua.includes("iPad") ? "Tablet" : "Mobile";
  }

  // 3. Construct the deviceInfo object
  return {
    deviceId: deviceId,
    deviceUniqueId: deviceId,
    deviceFingerprint: btoa(ua).substring(0, 255), // Basic fingerprint from UA
    deviceType: deviceType,
    browser: browser,
    brand: "Web",
    model: systemName,
    deviceName: `${browser} on ${systemName}`,
    systemName: systemName,
    systemVersion: navigator.platform || "Unknown",
    osVersion: ua.split(')')[0].split('(')[1] || "Unknown",
    deviceManufacturer: "Browser",
    platform: "Web",
    readableAppVersion: "1.0.0",
    buildNumber: "1",
    apiLevel: 0,
    deviceVersion: "1.0.0",
    bundleId: "com.swastyam.pharmacy.web",
    isEmulator: false,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    screenDensity: window.devicePixelRatio || 1.0,
    carrier: "Network",
    localIpAddress: "127.0.0.1",
    networkCountryCode: "IN",
    totalDiskCapacityBytes: "0",
    freeDiskStorageBytes: "0",
  };
};
