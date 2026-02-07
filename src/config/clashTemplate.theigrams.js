/**
 * Theigrams public Clash template (sanitized).
 *
 * Goals:
 * - Keep ports/DNS/proxy-groups/rule-providers/rules aligned with the user's preferred setup
 * - Do NOT include any private nodes (`proxies`) or subscription URLs (`proxy-providers`)
 *
 * This template is used as the default base config for `/clash` when no `configId` is provided.
 */

export const THEIGRAMS_CLASH_TEMPLATE = {
  // =========================
  // Base / General
  // =========================
  'mixed-port': 7897,
  'allow-lan': true,
  mode: 'rule',
  'log-level': 'info',
  'unified-delay': true,
  'tcp-concurrent': true,
  'find-process-mode': 'strict',
  'global-client-fingerprint': 'chrome',

  // =========================
  // DNS
  // =========================
  dns: {
    enable: true,
    listen: '127.0.0.1:5335',
    'use-system-hosts': false,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/16',
    'default-nameserver': ['180.76.76.76', '182.254.118.118', '8.8.8.8', '180.184.2.2'],
    nameserver: [
      '180.76.76.76',
      '119.29.29.29',
      '180.184.1.1',
      '223.5.5.5',
      '8.8.8.8',
      'https://223.6.6.6/dns-query#h3=true',
      'https://dns.alidns.com/dns-query',
      'https://cloudflare-dns.com/dns-query',
      'https://doh.pub/dns-query'
    ],
    fallback: [
      'https://000000.dns.nextdns.io/dns-query#h3=true',
      'https://dns.alidns.com/dns-query',
      'https://doh.pub/dns-query',
      'https://public.dns.iij.jp/dns-query',
      'https://101.101.101.101/dns-query',
      'https://208.67.220.220/dns-query',
      'tls://8.8.4.4',
      'tls://1.0.0.1:853',
      'https://cloudflare-dns.com/dns-query',
      'https://dns.google/dns-query'
    ],
    'fallback-filter': {
      geoip: true,
      ipcidr: ['240.0.0.0/4', '0.0.0.0/32', '127.0.0.1/32'],
      domain: [
        '+.google.com',
        '+.facebook.com',
        '+.twitter.com',
        '+.youtube.com',
        '+.xn--ngstr-lra8j.com',
        '+.google.cn',
        '+.googleapis.cn',
        '+.googleapis.com',
        '+.gvt1.com'
      ]
    },
    'fake-ip-filter': [
      '10.0.0.0/8',
      '*.lan',
      'stun.*.*.*',
      'stun.*.*',
      'time.windows.com',
      'time.nist.gov',
      'time.apple.com',
      'time.asia.apple.com',
      '*.ntp.org.cn',
      '*.openwrt.pool.ntp.org',
      'time1.cloud.tencent.com',
      'time.ustc.edu.cn',
      'pool.ntp.org',
      'ntp.ubuntu.com',
      'ntp.aliyun.com',
      'ntp1.aliyun.com',
      'ntp2.aliyun.com',
      'ntp3.aliyun.com',
      'ntp4.aliyun.com',
      'ntp5.aliyun.com',
      'ntp6.aliyun.com',
      'ntp7.aliyun.com',
      'time1.aliyun.com',
      'time2.aliyun.com',
      'time3.aliyun.com',
      'time4.aliyun.com',
      'time5.aliyun.com',
      'time6.aliyun.com',
      'time7.aliyun.com',
      '*.time.edu.cn',
      'time1.apple.com',
      'time2.apple.com',
      'time3.apple.com',
      'time4.apple.com',
      'time5.apple.com',
      'time6.apple.com',
      'time7.apple.com',
      'time1.google.com',
      'time2.google.com',
      'time3.google.com',
      'time4.google.com',
      'music.163.com',
      '*.music.163.com',
      '*.126.net',
      'musicapi.taihe.com',
      'music.taihe.com',
      'songsearch.kugou.com',
      'trackercdn.kugou.com',
      '*.kuwo.cn',
      'api-jooxtt.sanook.com',
      'api.joox.com',
      'joox.com',
      'y.qq.com',
      '*.y.qq.com',
      'streamoc.music.tc.qq.com',
      'mobileoc.music.tc.qq.com',
      'isure.stream.qqmusic.qq.com',
      'dl.stream.qqmusic.qq.com',
      'aqqmusic.tc.qq.com',
      'amobile.music.tc.qq.com',
      '*.xiami.com',
      '*.music.migu.cn',
      'music.migu.cn',
      '*.msftconnecttest.com',
      '*.msftncsi.com',
      'localhost.ptlogin2.qq.com',
      '*.*.*.srv.nintendo.net',
      '*.*.stun.playstation.net',
      'xbox.*.*.microsoft.com',
      '*.ipv6.microsoft.com',
      '*.*.xboxlive.com',
      'speedtest.cros.wr.pvp.net'
    ]
  },

  // =========================
  // Profile / Sniffer
  // =========================
  profile: {
    'store-selected': true,
    'store-fake-ip': false
  },
  sniffer: {
    enable: true,
    'parse-pure-ip': true,
    sniff: {
      TLS: { ports: [443, 8443] },
      HTTP: { ports: [80, '8080-8880'], 'override-destination': true }
    }
  },

  // =========================
  // Geo Data
  // =========================
  'geodata-mode': true,
  'geo-auto-update': true,
  'geodata-loader': 'standard',
  'geo-update-interval': 24,
  'geox-url': {
    geoip: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat',
    geosite: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat',
    mmdb: 'https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb',
    asn: 'https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb'
  },

  // =========================
  // Sanitized: no private nodes, no subscription URLs
  // =========================
  proxies: [],

  // =========================
  // Proxy Groups (template)
  // =========================
  'proxy-groups': [
    // Main select
    {
      name: '🚀 节点选择',
      type: 'select',
      proxies: [
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇸🇬 狮城节点',
        '🇯🇵 日本节点',
        '🇺🇸 美国节点',
        '🇰🇷 韩国节点',
        '🛠️ 自建节点',
        '⚡ 自动选择',
        '🚀 手动切换',
        'DIRECT'
      ]
    },
    // Manual switch: materialized from all proxies at build time
    {
      name: '🚀 手动切换',
      type: 'select',
      'include-all-proxies': true
    },
    // Auto select: materialized from all proxies at build time
    {
      name: '⚡ 自动选择',
      type: 'url-test',
      'include-all-proxies': true,
      url: 'https://www.gstatic.com/generate_204',
      interval: 300,
      lazy: false
    },

    // Service groups
    {
      name: '📲 电报消息',
      type: 'select',
      proxies: [
        '🚀 节点选择',
        '🇸🇬 狮城节点',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇯🇵 日本节点',
        '🇺🇸 美国节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换',
        'DIRECT'
      ]
    },
    {
      name: '💬 Ai平台',
      type: 'select',
      proxies: [
        '🚀 节点选择',
        '🛠️ 自建节点',
        '🇺🇸 美国节点',
        '🇸🇬 狮城节点',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇯🇵 日本节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换',
        'DIRECT'
      ]
    },
    {
      name: '📹 油管视频',
      type: 'select',
      proxies: [
        '🚀 节点选择',
        '🇸🇬 狮城节点',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇯🇵 日本节点',
        '🇺🇸 美国节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换',
        'DIRECT'
      ]
    },
    {
      name: '📺 巴哈姆特',
      type: 'select',
      proxies: ['🇨🇳 台湾节点', '🚀 节点选择', '🚀 手动切换', 'DIRECT']
    },
    {
      name: '📺 哔哩哔哩',
      type: 'select',
      proxies: ['DIRECT', '🇨🇳 台湾节点', '🇭🇰 香港节点']
    },
    {
      name: '🌍 国外媒体',
      type: 'select',
      proxies: [
        '🚀 节点选择',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇸🇬 狮城节点',
        '🇯🇵 日本节点',
        '🇺🇸 美国节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换',
        'DIRECT'
      ]
    },
    {
      name: '🌏 国内媒体',
      type: 'select',
      proxies: ['DIRECT', '🇭🇰 香港节点', '🇨🇳 台湾节点', '🇸🇬 狮城节点', '🇯🇵 日本节点', '🚀 手动切换']
    },
    {
      name: '🔍 谷歌服务',
      type: 'select',
      proxies: [
        '🚀 节点选择',
        '🛠️ 自建节点',
        '🇺🇸 美国节点',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇸🇬 狮城节点',
        '🇯🇵 日本节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换',
        'DIRECT'
      ]
    },
    {
      name: 'Ⓜ️ 微软Bing',
      type: 'select',
      proxies: [
        'DIRECT',
        '🚀 节点选择',
        '🛠️ 自建节点',
        '🇺🇸 美国节点',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇸🇬 狮城节点',
        '🇯🇵 日本节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换'
      ]
    },
    {
      name: 'Ⓜ️ 微软云盘',
      type: 'select',
      proxies: [
        'DIRECT',
        '🚀 节点选择',
        '🛠️ 自建节点',
        '🇺🇸 美国节点',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇸🇬 狮城节点',
        '🇯🇵 日本节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换'
      ]
    },
    {
      name: 'Ⓜ️ 微软服务',
      type: 'select',
      proxies: [
        'DIRECT',
        '🚀 节点选择',
        '🛠️ 自建节点',
        '🇺🇸 美国节点',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇸🇬 狮城节点',
        '🇯🇵 日本节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换'
      ]
    },
    {
      name: '🍎 苹果服务',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择', '🇺🇸 美国节点', '🇭🇰 香港节点', '🇨🇳 台湾节点', '🇸🇬 狮城节点', '🇯🇵 日本节点', '🇰🇷 韩国节点', '🚀 手动切换']
    },
    {
      name: '🐱 Github',
      type: 'select',
      proxies: [
        '🚀 节点选择',
        '🛠️ 自建节点',
        '🇺🇸 美国节点',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇸🇬 狮城节点',
        '🇯🇵 日本节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换',
        'DIRECT'
      ]
    },
    {
      name: '🎬 流媒体',
      type: 'select',
      proxies: ['🚀 节点选择', '🇭🇰 香港节点', '🇨🇳 台湾节点', '🇸🇬 狮城节点', '🇯🇵 日本节点', '🇺🇸 美国节点', '🇰🇷 韩国节点', '🚀 手动切换', 'DIRECT']
    },
    {
      name: '🎮 游戏平台',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择', '🇺🇸 美国节点', '🇭🇰 香港节点', '🇨🇳 台湾节点', '🇸🇬 狮城节点', '🇯🇵 日本节点', '🇰🇷 韩国节点', '🚀 手动切换']
    },
    {
      name: '📚 教育资源',
      type: 'select',
      proxies: ['🚀 节点选择', '🇺🇸 美国节点', '🇭🇰 香港节点', '🇨🇳 台湾节点', '🇸🇬 狮城节点', '🇯🇵 日本节点', '🇰🇷 韩国节点', '🚀 手动切换', 'DIRECT']
    },
    {
      name: '☁️ 云服务',
      type: 'select',
      proxies: ['🚀 节点选择', '🛠️ 自建节点', '🇺🇸 美国节点', '🇭🇰 香港节点', '🇨🇳 台湾节点', '🇸🇬 狮城节点', '🇯🇵 日本节点', '🇰🇷 韩国节点', '🚀 手动切换', 'DIRECT']
    },
    {
      name: '💰 金融服务',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择', '🛠️ 自建节点', '🇺🇸 美国节点', '🇭🇰 香港节点', '🇨🇳 台湾节点', '🇸🇬 狮城节点', '🇯🇵 日本节点', '🇰🇷 韩国节点', '🚀 手动切换']
    },
    {
      name: '🎯 全球直连',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择']
    },
    {
      name: '🛑 广告拦截',
      type: 'select',
      proxies: ['REJECT', 'DIRECT']
    },
    {
      name: '🍃 应用净化',
      type: 'select',
      proxies: ['REJECT', 'DIRECT']
    },
    {
      name: '🏠 私有网络',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择']
    },
    {
      name: '🐟 漏网之鱼',
      type: 'select',
      proxies: [
        '🚀 节点选择',
        'DIRECT',
        '🛠️ 自建节点',
        '🇭🇰 香港节点',
        '🇨🇳 台湾节点',
        '🇸🇬 狮城节点',
        '🇯🇵 日本节点',
        '🇺🇸 美国节点',
        '🇰🇷 韩国节点',
        '🚀 手动切换'
      ]
    },

    // Region groups (filter + include-all-proxies will be materialized by the worker)
    {
      name: '🇭🇰 香港节点',
      type: 'url-test',
      'include-all-proxies': true,
      filter: '(?i)港|HK|Hong|🇭🇰',
      url: 'https://www.gstatic.com/generate_204',
      interval: 300,
      tolerance: 50
    },
    {
      name: '🇨🇳 台湾节点',
      type: 'url-test',
      'include-all-proxies': true,
      filter: '(?i)台|TW|Taiwan|🇹🇼|🇨🇳.*台',
      url: 'https://www.gstatic.com/generate_204',
      interval: 300,
      tolerance: 50
    },
    {
      name: '🇸🇬 狮城节点',
      type: 'url-test',
      'include-all-proxies': true,
      filter: '(?i)新加坡|狮城|SG|Singapore|🇸🇬',
      url: 'https://www.gstatic.com/generate_204',
      interval: 300,
      tolerance: 50
    },
    {
      name: '🇯🇵 日本节点',
      type: 'url-test',
      'include-all-proxies': true,
      filter: '(?i)日本|JP|Japan|🇯🇵',
      url: 'https://www.gstatic.com/generate_204',
      interval: 300,
      tolerance: 50
    },
    {
      name: '🇺🇸 美国节点',
      type: 'url-test',
      'include-all-proxies': true,
      filter: '(?i)美|US|USA|United States|America|🇺🇸',
      url: 'https://www.gstatic.com/generate_204',
      interval: 300,
      tolerance: 50
    },
    {
      name: '🇰🇷 韩国节点',
      type: 'url-test',
      'include-all-proxies': true,
      filter: '(?i)韩|KR|Korea|🇰🇷',
      url: 'https://www.gstatic.com/generate_204',
      interval: 300,
      tolerance: 50
    },

    // Sanitized placeholder group (no private nodes)
    {
      name: '🛠️ 自建节点',
      type: 'select',
      proxies: ['DIRECT']
    }
  ],

  // =========================
  // Rule Providers (template)
  // =========================
  'rule-providers': {
    'category-ads-all': {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.mrs',
      path: './ruleset/category-ads-all.mrs',
      interval: 86400
    },
    'category-ai-chat-!cn': {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-chat-!cn.mrs',
      path: './ruleset/category-ai-chat-!cn.mrs',
      interval: 86400
    },
    youtube: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.mrs',
      path: './ruleset/youtube.mrs',
      interval: 86400
    },
    google: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google.mrs',
      path: './ruleset/google.mrs',
      interval: 86400
    },
    private: {
      type: 'http',
      format: 'mrs',
      behavior: 'ipcidr',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/private.mrs',
      path: './ruleset/private.mrs',
      interval: 86400
    },
    'geolocation-cn': {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-cn.mrs',
      path: './ruleset/geolocation-cn.mrs',
      interval: 86400
    },
    cn: {
      type: 'http',
      format: 'mrs',
      behavior: 'ipcidr',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/cn.mrs',
      path: './ruleset/cn.mrs',
      interval: 86400
    },
    telegram: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/telegram.mrs',
      path: './ruleset/telegram.mrs',
      interval: 86400
    },
    github: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/github.mrs',
      path: './ruleset/github.mrs',
      interval: 86400
    },
    gitlab: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/gitlab.mrs',
      path: './ruleset/gitlab.mrs',
      interval: 86400
    },
    microsoft: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft.mrs',
      path: './ruleset/microsoft.mrs',
      interval: 86400
    },
    bing: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bing.mrs',
      path: './ruleset/bing.mrs',
      interval: 86400
    },
    onedrive: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/onedrive.mrs',
      path: './ruleset/onedrive.mrs',
      interval: 86400
    },
    apple: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple.mrs',
      path: './ruleset/apple.mrs',
      interval: 86400
    },
    facebook: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/facebook.mrs',
      path: './ruleset/facebook.mrs',
      interval: 86400
    },
    instagram: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/instagram.mrs',
      path: './ruleset/instagram.mrs',
      interval: 86400
    },
    twitter: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/twitter.mrs',
      path: './ruleset/twitter.mrs',
      interval: 86400
    },
    tiktok: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tiktok.mrs',
      path: './ruleset/tiktok.mrs',
      interval: 86400
    },
    linkedin: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/linkedin.mrs',
      path: './ruleset/linkedin.mrs',
      interval: 86400
    },
    netflix: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/netflix.mrs',
      path: './ruleset/netflix.mrs',
      interval: 86400
    },
    hulu: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hulu.mrs',
      path: './ruleset/hulu.mrs',
      interval: 86400
    },
    disney: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/disney.mrs',
      path: './ruleset/disney.mrs',
      interval: 86400
    },
    hbo: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hbo.mrs',
      path: './ruleset/hbo.mrs',
      interval: 86400
    },
    amazon: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/amazon.mrs',
      path: './ruleset/amazon.mrs',
      interval: 86400
    },
    bahamut: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bahamut.mrs',
      path: './ruleset/bahamut.mrs',
      interval: 86400
    },
    bilibili: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bilibili.mrs',
      path: './ruleset/bilibili.mrs',
      interval: 86400
    },
    steam: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/steam.mrs',
      path: './ruleset/steam.mrs',
      interval: 86400
    },
    epicgames: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/epicgames.mrs',
      path: './ruleset/epicgames.mrs',
      interval: 86400
    },
    ea: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ea.mrs',
      path: './ruleset/ea.mrs',
      interval: 86400
    },
    ubisoft: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ubisoft.mrs',
      path: './ruleset/ubisoft.mrs',
      interval: 86400
    },
    blizzard: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/blizzard.mrs',
      path: './ruleset/blizzard.mrs',
      interval: 86400
    },
    coursera: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/coursera.mrs',
      path: './ruleset/coursera.mrs',
      interval: 86400
    },
    edx: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/edx.mrs',
      path: './ruleset/edx.mrs',
      interval: 86400
    },
    udemy: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/udemy.mrs',
      path: './ruleset/udemy.mrs',
      interval: 86400
    },
    khanacademy: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/khanacademy.mrs',
      path: './ruleset/khanacademy.mrs',
      interval: 86400
    },
    'category-scholar-!cn': {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-scholar-!cn.mrs',
      path: './ruleset/category-scholar-!cn.mrs',
      interval: 86400
    },
    paypal: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/paypal.mrs',
      path: './ruleset/paypal.mrs',
      interval: 86400
    },
    visa: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/visa.mrs',
      path: './ruleset/visa.mrs',
      interval: 86400
    },
    mastercard: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/mastercard.mrs',
      path: './ruleset/mastercard.mrs',
      interval: 86400
    },
    stripe: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/stripe.mrs',
      path: './ruleset/stripe.mrs',
      interval: 86400
    },
    wise: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/wise.mrs',
      path: './ruleset/wise.mrs',
      interval: 86400
    },
    aws: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/aws.mrs',
      path: './ruleset/aws.mrs',
      interval: 86400
    },
    azure: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/azure.mrs',
      path: './ruleset/azure.mrs',
      interval: 86400
    },
    digitalocean: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/digitalocean.mrs',
      path: './ruleset/digitalocean.mrs',
      interval: 86400
    },
    heroku: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/heroku.mrs',
      path: './ruleset/heroku.mrs',
      interval: 86400
    },
    dropbox: {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/dropbox.mrs',
      path: './ruleset/dropbox.mrs',
      interval: 86400
    },
    'geolocation-!cn': {
      type: 'http',
      format: 'mrs',
      behavior: 'domain',
      url: 'https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-!cn.mrs',
      path: './ruleset/geolocation-!cn.mrs',
      interval: 86400
    }
  },

  // =========================
  // Rules (template)
  // =========================
  rules: [
    // Overrides / local preferences (raw rules)
    'IP-CIDR,20.64.230.111/32,DIRECT',
    'IP-CIDR,20.219.216.191/32,DIRECT',
    'PROCESS-NAME,Tailscale,DIRECT',
    'PROCESS-NAME,IPNExtension,DIRECT',
    'IP-CIDR,154.9.228.223/32,DIRECT',
    'DOMAIN-KEYWORD,fuckit.sh,DIRECT',
    'DOMAIN-KEYWORD,any1.colin1112.me,DIRECT',
    'DOMAIN-KEYWORD,global.buaa.edu.cn,DIRECT',
    'DOMAIN-KEYWORD,buaa.edu.cn,DIRECT',
    'DOMAIN-KEYWORD,linux.do,🚀 节点选择',
    'DOMAIN-KEYWORD,ping0.cc,🚀 手动切换',
    'DOMAIN-KEYWORD,ipdata.co,🚀 手动切换',
    'DOMAIN-KEYWORD,anyrouter.top,💬 Ai平台',
    'DOMAIN-KEYWORD,grok,🚀 节点选择',
    'DOMAIN-KEYWORD,www.tcptest.cn,🚀 节点选择',
    'DOMAIN-KEYWORD,packyapi,DIRECT',
    'DOMAIN-KEYWORD,tryallai,DIRECT',
    'DOMAIN-KEYWORD,openrouter,🚀 节点选择',
    'DOMAIN-KEYWORD,sciencedirect,DIRECT',
    'DOMAIN-KEYWORD,proquest,DIRECT',
    'DOMAIN-KEYWORD,skywork,DIRECT',
    'DOMAIN-KEYWORD,asme.org,DIRECT',
    'DOMAIN-KEYWORD,webofscience,DIRECT',
    'DOMAIN-KEYWORD,sharedchat,DIRECT',
    'DOMAIN,api2.cursor.sh,💬 Ai平台',
    'DOMAIN-KEYWORD,repo42.cursor.sh,💬 Ai平台',
    'DOMAIN-KEYWORD,chatshare.xyz,DIRECT',
    'DOMAIN-KEYWORD,app.infini.money,🇰🇷 韩国节点',
    'DOMAIN-KEYWORD,bybit.com,💬 Ai平台',
    'DOMAIN-KEYWORD,openrouter.ai,💬 Ai平台',
    'DOMAIN-KEYWORD,developer.chrome.com,Ⓜ️ 微软Bing',
    'DOMAIN-KEYWORD,kimi.com,💬 Ai平台',
    'DOMAIN-KEYWORD,chatgpt-remix.openoai.net,💬 Ai平台',
    'DOMAIN-KEYWORD,openai,💬 Ai平台',
    'DOMAIN-KEYWORD,ios.chat.openai.com,💬 Ai平台',
    'DOMAIN-KEYWORD,buaa,DIRECT',
    'DOMAIN-KEYWORD,bhpan.buaa.edu.cn,DIRECT',
    'DOMAIN-KEYWORD,rawchat,DIRECT',
    'DOMAIN-KEYWORD,sciencedirectassets,DIRECT',
    'DOMAIN-KEYWORD,nature,DIRECT',
    'DOMAIN-KEYWORD,authenticator.cursor.sh,💬 Ai平台',
    'DOMAIN-KEYWORD,plus.aivvm.com,💬 Ai平台',
    'DOMAIN-KEYWORD,doc2x,DIRECT',
    'DOMAIN-KEYWORD,gemini.google.com,Ⓜ️ 微软Bing',
    'DOMAIN-KEYWORD,springer,DIRECT',
    'DOMAIN-KEYWORD,ieee,DIRECT',
    'DOMAIN-KEYWORD,chatgpt-async-webps-prod-eastus,💬 Ai平台',
    'DOMAIN-KEYWORD,rawchat,💬 Ai平台',
    'DOMAIN-KEYWORD,sora,💬 Ai平台',
    'DOMAIN,chat.openai.com.cdn.cloudflare.net,💬 Ai平台',
    'DOMAIN,openaiapi-site.azureedge.net,💬 Ai平台',
    'DOMAIN,openaicom-api-bdcpf8c6d2e9atf6.z01.azurefd.net,💬 Ai平台',
    'DOMAIN,openaicom.imgix.net,💬 Ai平台',
    'DOMAIN,openaicomproductionae4b.blob.core.windows.net,💬 Ai平台',
    'DOMAIN,production-openaicom-storage.azureedge.net,💬 Ai平台',
    'DOMAIN-SUFFIX,chatgpt.com,💬 Ai平台',
    'DOMAIN-SUFFIX,oaistatic.com,💬 Ai平台',
    'DOMAIN-SUFFIX,oaiusercontent.com,💬 Ai平台',
    'DOMAIN-SUFFIX,openai.com,💬 Ai平台',
    'DOMAIN,api.githubcopilot.com,💬 Ai平台',
    'DOMAIN,copilot-proxy.githubusercontent.com,💬 Ai平台',
    'DOMAIN,copilot.microsoft.com,💬 Ai平台',
    'DOMAIN,sydney.bing.com,💬 Ai平台',
    'DOMAIN,bard.google.com,Ⓜ️ 微软Bing',
    'DOMAIN,generativelanguage.googleapis.com,Ⓜ️ 微软Bing',
    'DOMAIN,ai.google.dev,Ⓜ️ 微软Bing',
    'DOMAIN-KEYWORD,notebooklm.google,Ⓜ️ 微软Bing',
    'DOMAIN-KEYWORD,googleapis.com,Ⓜ️ 微软Bing',
    'DOMAIN-KEYWORD,apis.google.com,Ⓜ️ 微软Bing',
    'DOMAIN-KEYWORD,clients6.google.com,Ⓜ️ 微软Bing',
    'DOMAIN-KEYWORD,aistudio.google.com,Ⓜ️ 微软Bing',
    'DOMAIN,alkalimakersuite-pa.clients6.google.com,Ⓜ️ 微软Bing',
    'DOMAIN,makersuite.google.com,Ⓜ️ 微软Bing',
    'DOMAIN-SUFFIX,anthropic.com,💬 Ai平台',
    'DOMAIN-SUFFIX,claude.ai,💬 Ai平台',
    'DOMAIN-SUFFIX,claude.com,💬 Ai平台',
    'DOMAIN-SUFFIX,grazie.ai,💬 Ai平台',
    'DOMAIN-SUFFIX,grazie.aws.intellij.net,💬 Ai平台',
    'DOMAIN,imagine.meta.com,💬 Ai平台',
    'DOMAIN-SUFFIX,meta.ai,💬 Ai平台',
    'DOMAIN-KEYWORD,ai-pro,💬 Ai平台',
    'DOMAIN-KEYWORD,coze.com,💬 Ai平台',
    'DOMAIN-KEYWORD,groq.com,💬 Ai平台',
    'DOMAIN-KEYWORD,notebooklm,Ⓜ️ 微软Bing',
    'DOMAIN-KEYWORD,perplexity,Ⓜ️ 微软Bing',

    // Rule-set based routing
    'RULE-SET,category-ads-all,🛑 广告拦截',
    'RULE-SET,category-ai-chat-!cn,💬 Ai平台',
    'RULE-SET,telegram,📲 电报消息',
    'RULE-SET,youtube,📹 油管视频',
    'RULE-SET,netflix,🎬 流媒体',
    'RULE-SET,bahamut,📺 巴哈姆特',
    'RULE-SET,bilibili,📺 哔哩哔哩',
    'RULE-SET,hulu,🌍 国外媒体',
    'RULE-SET,disney,🌍 国外媒体',
    'RULE-SET,hbo,🌍 国外媒体',
    'RULE-SET,amazon,🌍 国外媒体',
    'RULE-SET,google,🔍 谷歌服务,no-resolve',
    'RULE-SET,bing,Ⓜ️ 微软Bing',
    'RULE-SET,onedrive,Ⓜ️ 微软云盘',
    'RULE-SET,microsoft,Ⓜ️ 微软服务',
    'RULE-SET,apple,🍎 苹果服务',
    'RULE-SET,github,🐱 Github',
    'RULE-SET,gitlab,🐱 Github',
    'RULE-SET,facebook,🌍 国外媒体',
    'RULE-SET,instagram,🌍 国外媒体',
    'RULE-SET,twitter,🌍 国外媒体',
    'RULE-SET,tiktok,🌍 国外媒体',
    'RULE-SET,linkedin,🌍 国外媒体',
    'RULE-SET,hulu,🎬 流媒体',
    'RULE-SET,disney,🎬 流媒体',
    'RULE-SET,hbo,🎬 流媒体',
    'RULE-SET,amazon,🎬 流媒体',
    'RULE-SET,steam,🎮 游戏平台',
    'RULE-SET,epicgames,🎮 游戏平台',
    'RULE-SET,ea,🎮 游戏平台',
    'RULE-SET,ubisoft,🎮 游戏平台',
    'RULE-SET,blizzard,🎮 游戏平台',
    'RULE-SET,coursera,📚 教育资源',
    'RULE-SET,edx,📚 教育资源',
    'RULE-SET,udemy,📚 教育资源',
    'RULE-SET,khanacademy,📚 教育资源',
    'RULE-SET,category-scholar-!cn,📚 教育资源',
    'RULE-SET,paypal,💰 金融服务',
    'RULE-SET,visa,💰 金融服务',
    'RULE-SET,mastercard,💰 金融服务',
    'RULE-SET,stripe,💰 金融服务',
    'RULE-SET,wise,💰 金融服务',
    'RULE-SET,aws,☁️ 云服务',
    'RULE-SET,azure,☁️ 云服务',
    'RULE-SET,digitalocean,☁️ 云服务',
    'RULE-SET,heroku,☁️ 云服务',
    'RULE-SET,dropbox,☁️ 云服务',
    'RULE-SET,private,🏠 私有网络,no-resolve',
    'RULE-SET,geolocation-cn,🎯 全球直连',
    'RULE-SET,cn,🎯 全球直连,no-resolve',
    'RULE-SET,geolocation-!cn,🚀 节点选择',
    'MATCH,🐟 漏网之鱼'
  ]
};
