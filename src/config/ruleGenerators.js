/**
 * Rule Generators
 * Functions for generating rules and rule sets
 */

import { UNIFIED_RULES, PREDEFINED_RULE_SETS, SITE_RULE_SETS, IP_RULE_SETS, CLASH_SITE_RULE_SETS, CLASH_IP_RULE_SETS } from './rules.js';
import { SITE_RULE_SET_BASE_URL, IP_RULE_SET_BASE_URL, CLASH_SITE_RULE_SET_BASE_URL, CLASH_IP_RULE_SET_BASE_URL } from './ruleUrls.js';

// Clash (ACL4SSR) rule provider sources.
// We only switch built-in rule-selection tags to ACL4SSR; unknown/custom tags fall back to the existing MetaCubeX providers.
const ACL4SSR_PROVIDER_BASE_URL = 'https://gh-proxy.com/https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/';
const ACL4SSR_RULESET_BASE_URL = `${ACL4SSR_PROVIDER_BASE_URL}Ruleset/`;

// Map our internal tags (geosite/geoip-ish) to ACL4SSR provider YAML files.
// If a tag isn't mapped, we keep using the existing MetaCubeX meta-rules-dat providers to preserve compatibility.
const ACL4SSR_TAG_MAP = {
	// Ads / AI
	'category-ads-all': { base: ACL4SSR_PROVIDER_BASE_URL, file: 'BanAD.yaml' },
	'category-ai-!cn': { base: ACL4SSR_RULESET_BASE_URL, file: 'AI.yaml' },

	// China / LAN / Global
	'geolocation-!cn': { base: ACL4SSR_PROVIDER_BASE_URL, file: 'ProxyGFWlist.yaml' },
	'geolocation-cn': { base: ACL4SSR_PROVIDER_BASE_URL, file: 'ChinaDomain.yaml' },
	'cn': { base: ACL4SSR_PROVIDER_BASE_URL, file: 'ChinaDomain.yaml' },
	'private': { base: ACL4SSR_PROVIDER_BASE_URL, file: 'LocalAreaNetwork.yaml' },

	// Common services
	'bilibili': { base: ACL4SSR_RULESET_BASE_URL, file: 'Bilibili.yaml' },
	'youtube': { base: ACL4SSR_RULESET_BASE_URL, file: 'YouTube.yaml' },
	'google': { base: ACL4SSR_RULESET_BASE_URL, file: 'Google.yaml' },
	'telegram': { base: ACL4SSR_RULESET_BASE_URL, file: 'Telegram.yaml' },
	'github': { base: ACL4SSR_RULESET_BASE_URL, file: 'Github.yaml' },
	'microsoft': { base: ACL4SSR_RULESET_BASE_URL, file: 'Microsoft.yaml' },
	'apple': { base: ACL4SSR_RULESET_BASE_URL, file: 'Apple.yaml' },

	// Social
	'facebook': { base: ACL4SSR_RULESET_BASE_URL, file: 'Facebook.yaml' },
	'instagram': { base: ACL4SSR_RULESET_BASE_URL, file: 'Instagram.yaml' },
	'twitter': { base: ACL4SSR_RULESET_BASE_URL, file: 'Twitter.yaml' },
	'tiktok': { base: ACL4SSR_RULESET_BASE_URL, file: 'TikTok.yaml' },

	// Streaming
	'netflix': { base: ACL4SSR_RULESET_BASE_URL, file: 'Netflix.yaml' },
	'disney': { base: ACL4SSR_RULESET_BASE_URL, file: 'DisneyPlus.yaml' },
	'hbo': { base: ACL4SSR_RULESET_BASE_URL, file: 'HBO.yaml' },
	'amazon': { base: ACL4SSR_RULESET_BASE_URL, file: 'Amazon.yaml' },
	'bahamut': { base: ACL4SSR_RULESET_BASE_URL, file: 'Bahamut.yaml' },
	// Best-effort mapping (ACL4SSR doesn't have a plain Hulu.yaml; HuluJapan exists)
	'hulu': { base: ACL4SSR_RULESET_BASE_URL, file: 'HuluJapan.yaml' },

	// Gaming
	'steam': { base: ACL4SSR_RULESET_BASE_URL, file: 'Steam.yaml' },
	'epicgames': { base: ACL4SSR_RULESET_BASE_URL, file: 'Epic.yaml' },
	'blizzard': { base: ACL4SSR_RULESET_BASE_URL, file: 'Blizzard.yaml' },
	// EA-ish best-effort mapping
	'ea': { base: ACL4SSR_RULESET_BASE_URL, file: 'Origin.yaml' },

	// Education best-effort (use Scholar)
	'coursera': { base: ACL4SSR_RULESET_BASE_URL, file: 'Scholar.yaml' },
	'edx': { base: ACL4SSR_RULESET_BASE_URL, file: 'Scholar.yaml' },
	'udemy': { base: ACL4SSR_RULESET_BASE_URL, file: 'Scholar.yaml' },
	'khanacademy': { base: ACL4SSR_RULESET_BASE_URL, file: 'Scholar.yaml' },
	'category-scholar-!cn': { base: ACL4SSR_RULESET_BASE_URL, file: 'Scholar.yaml' },
};

// IP-only tags mapping (we still register these as rule-providers).
// NOTE: ACL4SSR providers are usually "classical" yaml; we still suffix "-ip" for tag uniqueness.
const ACL4SSR_IP_TAG_MAP = {
	'cn': { base: ACL4SSR_PROVIDER_BASE_URL, file: 'ChinaCompanyIp.yaml' },
	'google': { base: ACL4SSR_RULESET_BASE_URL, file: 'GoogleCNProxyIP.yaml' },
	// Telegram doesn't have a dedicated CIDR provider in ACL4SSR; fall back to Telegram.yaml (classical).
	'telegram': { base: ACL4SSR_RULESET_BASE_URL, file: 'Telegram.yaml' },
	'private': { base: ACL4SSR_PROVIDER_BASE_URL, file: 'LocalAreaNetwork.yaml' },
};

function getAcl4ssrProviderForTag(tag, kind /* 'site'|'ip' */) {
	const m = kind === 'ip' ? ACL4SSR_IP_TAG_MAP : ACL4SSR_TAG_MAP;
	return m[tag] || null;
}

// Helper function to get outbounds based on selected rule names
export function getOutbounds(selectedRuleNames) {
	if (!selectedRuleNames || !Array.isArray(selectedRuleNames)) {
		return [];
	}
	return UNIFIED_RULES
		.filter(rule => selectedRuleNames.includes(rule.name))
		.map(rule => rule.name);
}

// Helper function to generate rules based on selected rule names
export function generateRules(selectedRules = [], customRules = []) {
	if (typeof selectedRules === 'string' && PREDEFINED_RULE_SETS[selectedRules]) {
		selectedRules = PREDEFINED_RULE_SETS[selectedRules];
	}

	if (!selectedRules || selectedRules.length === 0) {
		selectedRules = PREDEFINED_RULE_SETS.minimal;
	}

	const rules = [];

	UNIFIED_RULES.forEach(rule => {
		if (selectedRules.includes(rule.name)) {
			rules.push({
				site_rules: rule.site_rules,
				ip_rules: rule.ip_rules,
				domain_suffix: rule?.domain_suffix,
				ip_cidr: rule?.ip_cidr,
				outbound: rule.name
			});
		}
	});

	customRules.reverse();
	customRules.forEach((rule) => {
		rules.unshift({
			site_rules: rule.site ? rule.site.split(',') : [],
			ip_rules: rule.ip ? rule.ip.split(',') : [],
			domain_suffix: rule.domain_suffix ? rule.domain_suffix.split(',') : [],
			domain_keyword: rule.domain_keyword ? rule.domain_keyword.split(',') : [],
			ip_cidr: rule.ip_cidr ? rule.ip_cidr.split(',') : [],
			protocol: rule.protocol ? rule.protocol.split(',') : [],
			outbound: rule.name
		});
	});

	return rules;
}

export function generateRuleSets(selectedRules = [], customRules = []) {
	if (typeof selectedRules === 'string' && PREDEFINED_RULE_SETS[selectedRules]) {
		selectedRules = PREDEFINED_RULE_SETS[selectedRules];
	}

	if (!selectedRules || selectedRules.length === 0) {
		selectedRules = PREDEFINED_RULE_SETS.minimal;
	}

	const selectedRulesSet = new Set(selectedRules);

	const siteRuleSets = new Set();
	const ipRuleSets = new Set();

	const ruleSets = [];

	UNIFIED_RULES.forEach(rule => {
		if (selectedRulesSet.has(rule.name)) {
			rule.site_rules.forEach(siteRule => siteRuleSets.add(siteRule));
			rule.ip_rules.forEach(ipRule => ipRuleSets.add(ipRule));
		}
	});

	const site_rule_sets = Array.from(siteRuleSets).map(rule => ({
		tag: rule,
		type: 'remote',
		format: 'binary',
		url: `${SITE_RULE_SET_BASE_URL}${SITE_RULE_SETS[rule]}`,
	}));

	const ip_rule_sets = Array.from(ipRuleSets).map(rule => ({
		tag: `${rule}-ip`,
		type: 'remote',
		format: 'binary',
		url: `${IP_RULE_SET_BASE_URL}${IP_RULE_SETS[rule]}`,
	}));

	if (!selectedRules.includes('Non-China')) {
		site_rule_sets.push({
			tag: 'geolocation-!cn',
			type: 'remote',
			format: 'binary',
			url: `${SITE_RULE_SET_BASE_URL}geosite-geolocation-!cn.srs`,
		});
	}

	if (customRules) {
		customRules.forEach(rule => {
			if (rule.site && rule.site != '') {
				rule.site.split(',').forEach(site => {
					site_rule_sets.push({
						tag: site.trim(),
						type: 'remote',
						format: 'binary',
						url: `${SITE_RULE_SET_BASE_URL}geosite-${site.trim()}.srs`,
					});
				});
			}
			if (rule.ip && rule.ip != '') {
				rule.ip.split(',').forEach(ip => {
					ip_rule_sets.push({
						tag: `${ip.trim()}-ip`,
						type: 'remote',
						format: 'binary',
						url: `${IP_RULE_SET_BASE_URL}geoip-${ip.trim()}.srs`,
					});
				});
			}
		});
	}

	ruleSets.push(...site_rule_sets, ...ip_rule_sets);

	return { site_rule_sets, ip_rule_sets };
}

// Generate rule sets for Clash using .mrs format
export function generateClashRuleSets(selectedRules = [], customRules = [], useMrs = true) {
	if (typeof selectedRules === 'string' && PREDEFINED_RULE_SETS[selectedRules]) {
		selectedRules = PREDEFINED_RULE_SETS[selectedRules];
	}

	if (!selectedRules || selectedRules.length === 0) {
		selectedRules = PREDEFINED_RULE_SETS.minimal;
	}

	// Determine format based on client compatibility
	const format = useMrs ? 'mrs' : 'yaml';
	const ext = useMrs ? '.mrs' : '.yaml';

	const selectedRulesSet = new Set(selectedRules);

	const siteRuleSets = new Set();
	const ipRuleSets = new Set();

	UNIFIED_RULES.forEach(rule => {
		if (selectedRulesSet.has(rule.name)) {
			rule.site_rules.forEach(siteRule => siteRuleSets.add(siteRule));
			rule.ip_rules.forEach(ipRule => ipRuleSets.add(ipRule));
		}
	});

	const site_rule_providers = {};
	const ip_rule_providers = {};

	Array.from(siteRuleSets).forEach(rule => {
		const acl = getAcl4ssrProviderForTag(rule, 'site');
		if (acl) {
			site_rule_providers[rule] = {
				type: 'http',
				format: 'yaml',
				behavior: 'classical',
				url: `${acl.base}${acl.file}`,
				path: `./ruleset/acl4ssr/${rule}.yaml`,
				interval: 86400
			};
			return;
		}

		// Fallback: MetaCubeX providers (preserve existing behavior for custom/unmapped tags)
		site_rule_providers[rule] = {
			type: 'http',
			format: format,
			behavior: 'domain',
			url: `${CLASH_SITE_RULE_SET_BASE_URL}${rule}${ext}`,
			path: `./ruleset/${rule}${ext}`,
			interval: 86400
		};
	});

	Array.from(ipRuleSets).forEach(rule => {
		const tag = `${rule}-ip`;
		const acl = getAcl4ssrProviderForTag(rule, 'ip');
		if (acl) {
			ip_rule_providers[tag] = {
				type: 'http',
				format: 'yaml',
				behavior: 'classical',
				url: `${acl.base}${acl.file}`,
				path: `./ruleset/acl4ssr/${tag}.yaml`,
				interval: 86400
			};
			return;
		}

		// Fallback: MetaCubeX providers (preserve existing behavior for custom/unmapped tags)
		ip_rule_providers[tag] = {
			type: 'http',
			format: format,
			behavior: 'ipcidr',
			url: `${CLASH_IP_RULE_SET_BASE_URL}${rule}${ext}`,
			path: `./ruleset/${tag}${ext}`,
			interval: 86400
		};
	});

	// Add Non-China rule set if not included
	if (!selectedRules.includes('Non-China')) {
		const acl = getAcl4ssrProviderForTag('geolocation-!cn', 'site');
		if (acl) {
			site_rule_providers['geolocation-!cn'] = {
				type: 'http',
				format: 'yaml',
				behavior: 'classical',
				url: `${acl.base}${acl.file}`,
				path: `./ruleset/acl4ssr/geolocation-!cn.yaml`,
				interval: 86400
			};
		} else {
			site_rule_providers['geolocation-!cn'] = {
				type: 'http',
				format: format,
				behavior: 'domain',
				url: `${CLASH_SITE_RULE_SET_BASE_URL}geolocation-!cn${ext}`,
				path: `./ruleset/geolocation-!cn${ext}`,
				interval: 86400
			};
		}
	}

	// Add custom rules
	if (customRules) {
		customRules.forEach(rule => {
			if (rule.site && rule.site != '') {
				rule.site.split(',').forEach(site => {
					const site_trimmed = site.trim();
					// Custom inputs likely follow the old geosite tag system; keep the original provider source for compatibility.
					site_rule_providers[site_trimmed] = {
						type: 'http',
						format: format,
						behavior: 'domain',
						url: `${CLASH_SITE_RULE_SET_BASE_URL}${site_trimmed}${ext}`,
						path: `./ruleset/${site_trimmed}${ext}`,
						interval: 86400
					};
				});
			}
			if (rule.ip && rule.ip != '') {
				rule.ip.split(',').forEach(ip => {
					const ip_trimmed = ip.trim();
					const tag = `${ip_trimmed}-ip`;
					ip_rule_providers[tag] = {
						type: 'http',
						format: format,
						behavior: 'ipcidr',
						url: `${CLASH_IP_RULE_SET_BASE_URL}${ip_trimmed}${ext}`,
						path: `./ruleset/${tag}${ext}`,
						interval: 86400
					};
				});
			}
		});
	}

	return { site_rule_providers, ip_rule_providers };
}
