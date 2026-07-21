// Targeted malicious patterns to minimize false positives on normal typing
const MALICIOUS_PATTERNS = [
  // 1. XSS & HTML Tags
  /<script[^>]*>/i,
  /<\/script>/i,
  /<iframe[^>]*>/i,
  /<object[^>]*>/i,
  /<embed[^>]*>/i,
  /<style[^>]*>/i,
  /javascript:/i,
  /onload\s*=\s*['"]/i,
  /onerror\s*=\s*['"]/i,
  /onclick\s*=\s*['"]/i,
  /onmouseover\s*=\s*['"]/i,
  /alert\s*\(/i,
  /eval\s*\(/i,

  // 2. SQL Injection Patterns
  /\bUNION\s+(?:ALL\s+)?SELECT\b/i,
  /\bDROP\s+TABLE\b/i,
  /\bDELETE\s+FROM\b/i,
  /\bINSERT\s+INTO\b/i,
  /\bUPDATE\s+\w+\s+SET\b/i,
  /'\s*OR\s*'\d+'\s*=\s*'\d+/i,
  /"\s*OR\s*"\d+"\s*=\s*"\d+/i,
  /'\s*OR\s*true\b/i,
  /"\s*OR\s*true\b/i,
  /\bOR\s+1\s*=\s*1\b/i,

  // 3. Directory Traversal
  /\.\.\/\.\./,
  /\/\.\.\//,
  /\\\.{2,}\\/,
];

/**
 * Checks a single string for malicious injection keywords and symbols.
 * @param {string} value The string to test.
 * @returns {boolean} True if abnormal/malicious text is detected.
 */
export const hasAbnormalText = (value) => {
  if (value === undefined || value === null) {return false;}
  const str = typeof value === 'string' ? value : String(value);

  for (const pattern of MALICIOUS_PATTERNS) {
    if (pattern.test(str)) {
      return true;
    }
  }
  return false;
};

/**
 * Recursively scans payload objects (bodies, params, etc.) for malicious patterns.
 * Acts as the final gate check for Axios request validation.
 * @param {any} obj Payload object or array.
 * @returns {boolean} True if abnormal/malicious content is found.
 */
export const checkPayloadForAbnormalText = (obj) => {
  if (obj === null || obj === undefined) {return false;}
  if (typeof obj === 'string') {
    return hasAbnormalText(obj);
  }
  if (Array.isArray(obj)) {
    for (const val of obj) {
      if (checkPayloadForAbnormalText(val)) {return true;}
    }
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (checkPayloadForAbnormalText(obj[key])) {return true;}
      }
    }
  }
  return false;
};
