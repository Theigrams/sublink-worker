import { decodeBase64 } from '../../utils.js';
import { parseSubscriptionContent } from './subscriptionContentParser.js';

function tryUrlDecode(value) {
    if (typeof value !== 'string' || !value.includes('%')) return value;
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

function looksLikeBase64(value) {
    const compact = String(value || '').trim().replace(/[\r\n\s]+/g, '');
    if (compact.length < 16) return false;
    // Standard + urlsafe base64 chars, allow up to 2 '=' at the end.
    return /^[A-Za-z0-9+/_-]+={0,2}$/.test(compact);
}

function decodeBase64WithPadding(value) {
    let compact = String(value || '').trim().replace(/[\r\n\s]+/g, '');
    // Normalize urlsafe base64 to standard
    compact = compact.replace(/-/g, '+').replace(/_/g, '/');
    const mod = compact.length % 4;
    if (mod !== 0) {
        compact += '='.repeat(4 - mod);
    }
    return decodeBase64(compact);
}

function extractBase64ErrorMessage(text) {
    const raw = typeof text === 'string' ? text : '';
    const trimmed = raw.trim();
    if (!trimmed) return null;
    if (!looksLikeBase64(trimmed)) return null;

    try {
        const decoded = decodeBase64WithPadding(trimmed);
        const decodedText = String(tryUrlDecode(decoded) || '').trim();
        if (!decodedText) return null;
        if (decodedText.length > 200) return null;
        // Avoid leaking real subscription payloads.
        if (decodedText.includes('://')) return null;
        if (!/(error|fail|forbidden|denied|unauthor|invalid|code)/i.test(decodedText)) return null;
        return decodedText.replace(/\s+/g, ' ').trim();
    } catch {
        return null;
    }
}

/**
 * Decode content with a conservative strategy:
 * - If it already looks like YAML/JSON/INI/URI list, keep as-is (optionally URL-decode).
 * - Otherwise, if it looks like base64, try base64 decode (supports urlsafe base64 and missing padding).
 * - Only accept base64-decoded output if it looks like a valid subscription payload.
 * @param {string} text - Raw text content
 * @returns {string} - Decoded content
 */
function decodeContent(text) {
    const raw = typeof text === 'string' ? text : '';
    const trimmed = raw.trim();
    if (!trimmed) return '';

    const looksLikeJson = (value) => {
        const s = (value || '').trim();
        return s.startsWith('{') || s.startsWith('[');
    };

    const looksLikeClashYaml = (value) => {
        const s = (value || '').trim();
        return /(^|\n)\s*(proxies|proxy-groups|rules|rule-providers)\s*:/.test(s);
    };

    const looksLikeSurgeIni = (value) => {
        const s = (value || '').trim();
        return /\[(Proxy|Proxy Group|General|Rule)\]/i.test(s);
    };

    const looksLikeUriList = (value) => {
        const s = (value || '').trim();
        return s.includes('://');
    };

    const isProbablyValidSubscriptionPayload = (value) => {
        const parsed = parseSubscriptionContent(value);
        if (Array.isArray(parsed)) {
            return parsed.some(line => typeof line === 'string' && line.includes('://'));
        }
        if (parsed && typeof parsed === 'object' && parsed.type) {
            return Array.isArray(parsed.proxies) && parsed.proxies.length > 0;
        }
        return false;
    };

    // First try URL decoding (some sources URL-encode the whole payload).
    const urlDecoded = tryUrlDecode(trimmed);

    // If it already looks like a structured payload, do NOT base64 decode.
    if (looksLikeClashYaml(urlDecoded) || looksLikeJson(urlDecoded) || looksLikeSurgeIni(urlDecoded) || looksLikeUriList(urlDecoded)) {
        return urlDecoded;
    }

    // Otherwise, try base64 decode only if it looks base64-like AND validates post-decode.
    if (looksLikeBase64(urlDecoded)) {
        try {
            const decoded = decodeBase64WithPadding(urlDecoded);
            const decodedUrl = tryUrlDecode(decoded);
            if (isProbablyValidSubscriptionPayload(decodedUrl)) return decodedUrl;
            if (isProbablyValidSubscriptionPayload(decoded)) return decoded;
        } catch (e) {
            // fall through
        }
    }

    return urlDecoded;
}

/**
 * Detect the format of subscription content
 * @param {string} content - Decoded subscription content
 * @returns {'clash'|'singbox'|'unknown'} - Detected format
 */
function detectFormat(content) {
    const trimmed = content.trim();

    // Try JSON (Sing-Box format)
    if (trimmed.startsWith('{')) {
        try {
            const parsed = JSON.parse(trimmed);
            if (parsed.outbounds || parsed.inbounds || parsed.route) {
                return 'singbox';
            }
        } catch {
            // Not valid JSON
        }
    }

    // Try YAML (Clash format) - check for proxies: key
    if (trimmed.includes('proxies:')) {
        return 'clash';
    }

    return 'unknown';
}

/**
 * Fetch subscription content from a URL and parse it
 * @param {string} url - The subscription URL to fetch
 * @param {string} userAgent - Optional User-Agent header
 * @returns {Promise<object|string[]|null>} - Parsed subscription content
 */
export async function fetchSubscription(url, userAgent) {
    try {
        const headers = new Headers();
        if (userAgent) {
            headers.set('User-Agent', userAgent);
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        const text = await response.text();
        const decodedText = decodeContent(text);

        return parseSubscriptionContent(decodedText);
    } catch (error) {
        console.error('Error fetching or parsing HTTP(S) content:', error);
        return null;
    }
}

/**
 * Fetch subscription content and detect its format without parsing
 * @param {string} url - The subscription URL to fetch
 * @param {string} userAgent - Optional User-Agent header
 * @returns {Promise<{content: string, format: 'clash'|'singbox'|'unknown', url: string}|null>}
 */
export async function fetchSubscriptionWithFormat(url, userAgent) {
    try {
        const headers = new Headers();
        if (userAgent) {
            headers.set('User-Agent', userAgent);
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        const httpStatus = response.status;
        const ok = response.ok;
        const text = await response.text();
        const errorMessage = extractBase64ErrorMessage(text);
        const content = decodeContent(text);
        const format = detectFormat(content);

        return { content, format, url, errorMessage, httpStatus, ok };
    } catch (error) {
        console.error('Error fetching subscription:', error);
        return null;
    }
}
