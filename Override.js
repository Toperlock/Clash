// 参考 Verge Rev 示例 Script 配置
//
// Clash Verge Rev (Version ≥ 17.2) & Mihomo-Party (Version ≥ 0.5.8)
//
// 最后更新时间: 2024-09-08 15:50

// 规则集通用配置
const ruleProviderCommon = {
    "type": "http",
    "format": "mrs",
    "interval": 86400
  };

// 策略组通用配置
const groupBaseOption = {
    "interval": 300,
    "timeout": 3000,
    "url": "http://connectivitycheck.gstatic.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": true
  };    

// 程序入口
function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
        typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("配置文件中未找到任何代理");
    }

    // 覆盖通用配置
    config["mixed-port"] = "7890";
    config["tcp-concurrent"] = true;
    config["allow-lan"] = true;
    config["ipv6"] = false;
    config["udp"] = true;
    config["log-level"] = "info";
    config["unified-delay"] = true;
    config["find-process-mode"] = "strict";
    config["global-client-fingerprint"] = "chrome";
    config["external-controller"] = "127.0.0.1:9090";
    config["external-ui"] = "ui";
    config["external-ui-url"] = "https://mirror.ghproxy.com/https://github.com/MetaCubeX/metacubexd/archive/gh-pages.zip";
  
    // 覆盖 dns 配置
    config["dns"] = {
      "enable": true,
      "listen": "0.0.0.0:1053",
      "ipv6": false,
      "enhanced-mode": "fake-ip",
      "fake-ip-range": "198.18.0.1/16",
      "fake-ip-filter": ["*", "+.lan", "+.local", "+.direct", "+.msftconnecttest.com", "+.msftncsi.com"],
      "default-nameserver": ["tls://223.5.5.5:853", "tls://1.12.12.12:853"],
      "proxy-server-nameserver": ["https://223.5.5.5/dns-query", "https://1.12.12.12/dns-query"],
      "nameserver": ["https://dns.cloudflare.com/dns-query", "https://dns.google/dns-query"],
      "nameserver-policy": {
        "rule-set:cn_domain,private_domain": ["https://1.12.12.12/dns-query", "https://223.5.5.5/dns-query"]
      }
    };
  
    // 覆盖 geodata 配置
    config["geodata-mode"] = true;
    config["geox-url"] = {
      "geoip": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
      "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
      "mmdb": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
      "asn": "https://mirror.ghproxy.com/https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
    };
  
    // 覆盖 sniffer 配置
    config["sniffer"] = {
      "enable": true,
      "parse-pure-ip": true,
      "sniff": {
        "TLS": {
          "ports": ["443", "8443"]
        },
        "HTTP": {
          "ports": ["80", "8080-8880"],
          "override-destination": true
        },
        "QUIC": {
          "ports": ["443", "8443"]
        }
      },
      "skip-domain": ["Mijia Cloud"]
    };
  
    // 覆盖 tun 配置
    config["tun"] = {
      "enable": false,
      "stack": "mixed",
      "dns-hijack": ["any:53"]
    };
    // 覆盖策略组
    config["proxy-groups"] = [
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Final.png",
        name: "Final",
        type: "select",
        proxies: ["Proxy", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Rocket.png",
        name: "Proxy",
        type: "select",
        proxies: ["HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Google_Search.png",
        name: "Google",
        type: "select",
        proxies: ["Proxy", "HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/bilibili_3.png",
        name: "BiliBili",
        type: "select",
        proxies: ["DIRECT", "HongKong", "TaiWan"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/ChatGPT.png",
        name: "AIGC",
        type: "select",
        proxies: ["America", "TaiWan", "Japan", "Korea", "Singapore", "UnitedKingdom", "AllServer"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/YouTube.png",
        name: "YouTube",
        type: "select",
        proxies: ["Proxy", "HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/TikTok.png",
        name: "TikTok",
        type: "select",
        proxies: ["Proxy", "HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Streaming.png",
        name: "Streaming",
        type: "select",
        proxies: ["Proxy", "HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Telegram_X.png",
        name: "Telegram",
        type: "select",
        proxies: ["Proxy", "HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/X.png",
        name: "X",
        type: "select",
        proxies: ["Proxy", "HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Apple_1.png",
        name: "Apple",
        type: "select",
        proxies: ["Proxy", "HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Windows_11.png",
        name: "Microsoft",
        type: "select",
        proxies: ["Proxy", "HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Game.png",
        name: "Games",
        type: "select",
        proxies: ["Proxy", "HongKong", "TaiWan", "Japan", "Korea", "Singapore", "America", "UnitedKingdom", "AllServer", "DIRECT"],
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Hong_Kong.png",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)香港|Hong Kong|HK|🇭🇰",
        name: "HongKong",
        type: "select",
        proxies: ["HK-Auto", "HK-FallBack", "HK-LoadBalance"]
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/China.png",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)台湾|Taiwan|TW|🇹🇼",
        name: "TaiWan",
        type: "select",
        proxies: ["TW-Auto", "TW-FallBack", "TW-LoadBalance"]
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Japan.png",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)日本|Japan|🇯🇵|川日|东京|大阪|泉日|埼玉",
        name: "Japan",
        type: "select",
        proxies: ["JP-Auto", "JP-FallBack", "JP-LoadBalance"]
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Singapore.png",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)新加坡|Singapore|🇸🇬|狮",
        name: "Singapore",
        type: "select",
        proxies: ["SG-Auto", "SG-FallBack", "SG-LoadBalance"]
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Korea.png",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)韩国|Korea|🇰🇷|韓|首尔",
        name: "Korea",
        type: "select",
        proxies: ["KR-Auto", "KR-FallBack", "KR-LoadBalance"]
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_States.png",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)美国|USA|United States|🇺🇸|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥",
        name: "America",
        type: "select",
        proxies: ["US-Auto", "US-FallBack", "US-LoadBalance"]
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/United_Kingdom.png",
        "include-all": true,
        "exclude-filter": "Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)英国|UK|United Kingdom|🇬🇧|伦敦",
        name: "UnitedKingdom",
        type: "select",
        proxies: ["UK-Auto", "UK-FallBack", "UK-LoadBalance"]
      },
      {
        icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Airport.png",
        "include-all": true,
        "exclude-filter": "Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        name: "AllServer",
        type: "select"
      },
      {
        ...groupBaseOption,
        "name": "HK-Auto",
        "type": "url-test",
        "tolerance": 50,
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)香港|Hong Kong|HK|🇭🇰"
      },
      {
        ...groupBaseOption,
        "name": "TW-Auto",
        "type": "url-test",
        "tolerance": 50,
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)台湾|Taiwan|TW|🇹🇼"
      },
      {
        ...groupBaseOption,
        "name": "JP-Auto",
        "type": "url-test",
        "tolerance": 50,
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)日本|Japan|🇯🇵|川日|东京|大阪|泉日|埼玉"
      },
      {
        ...groupBaseOption,
        "name": "SG-Auto",
        "type": "url-test",
        "tolerance": 50,
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)新加坡|Singapore|🇸🇬|狮"
      },
      {
        ...groupBaseOption,
        "name": "KR-Auto",
        "type": "url-test",
        "tolerance": 50,
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)韩国|Korea|🇰🇷|韓|首尔"
      },
      {
        ...groupBaseOption,
        "name": "US-Auto",
        "type": "url-test",
        "tolerance": 50,
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)美国|USA|United States|🇺🇸|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥"
      },
      {
        ...groupBaseOption,
        "name": "UK-Auto",
        "type": "url-test",
        "tolerance": 50,
        "include-all": true,
        "exclude-filter": "Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)英国|UK|United Kingdom|🇬🇧|伦敦"
      },
      {
        ...groupBaseOption,
        "name": "HK-FallBack",
        "type": "fallback",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)香港|Hong Kong|HK|🇭🇰"
      },
      {
        ...groupBaseOption,
        "name": "TW-FallBack",
        "type": "fallback",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)台湾|Taiwan|TW|🇹🇼"
      },
      {
        ...groupBaseOption,
        "name": "JP-FallBack",
        "type": "fallback",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)日本|Japan|🇯🇵|川日|东京|大阪|泉日|埼玉"
      },
      {
        ...groupBaseOption,
        "name": "SG-FallBack",
        "type": "fallback",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)新加坡|Singapore|🇸🇬|狮"
      },
      {
        ...groupBaseOption,
        "name": "KR-FallBack",
        "type": "fallback",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)韩国|Korea|🇰🇷|韓|首尔"
      },
      {
        ...groupBaseOption,
        "name": "US-FallBack",
        "type": "fallback",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)美国|USA|United States|🇺🇸|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥"
      },
      {
        ...groupBaseOption,
        "name": "UK-FallBack",
        "type": "fallback",
        "include-all": true,
        "exclude-filter": "Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)英国|UK|United Kingdom|🇬🇧|伦敦"
      },
      {
        ...groupBaseOption,
        "name": "HK-LoadBalance",
        "type": "load-balance",
        "strategy": "consistent-hashing",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)香港|Hong Kong|HK|🇭🇰"
      },
      {
        ...groupBaseOption,
        "name": "TW-LoadBalance",
        "type": "load-balance",
        "strategy": "consistent-hashing",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)台湾|Taiwan|TW|🇹🇼"
      },
      {
        ...groupBaseOption,
        "name": "JP-LoadBalance",
        "type": "load-balance",
        "strategy": "consistent-hashing",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)日本|Japan|🇯🇵|川日|东京|大阪|泉日|埼玉"
      },
      {
        ...groupBaseOption,
        "name": "SG-LoadBalance",
        "type": "load-balance",
        "strategy": "consistent-hashing",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)新加坡|Singapore|🇸🇬|狮"
      },
      {
        ...groupBaseOption,
        "name": "KR-LoadBalance",
        "type": "load-balance",
        "strategy": "consistent-hashing",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)韩国|Korea|🇰🇷|韓|首尔"
      },
      {
        ...groupBaseOption,
        "name": "US-LoadBalance",
        "type": "load-balance",
        "strategy": "consistent-hashing",
        "include-all": true,
        "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)美国|USA|United States|🇺🇸|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥"
      },
      {
        ...groupBaseOption,
        "name": "UK-LoadBalance",
        "type": "load-balance",
        "strategy": "consistent-hashing",
        "include-all": true,
        "exclude-filter": "Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
        filter: "(?i)英国|UK|United Kingdom|🇬🇧|伦敦"
      }
    ];
    if (!config['rule-providers']) {
      config['rule-providers'] = {};
    }
    // 覆盖规则集
    config["rule-providers"] = Object.assign(config["rule-providers"], {
      private_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs",
        path: "./ruleset/private_domain.mrs",
        behavior: "domain"
      },
      bing: {
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bing/Bing.yaml",
        path: "./ruleset/bing.yaml",
        behavior: "classical",
        interval: 86400,
        format: "yaml",
        type: "http",
      },
      copilot: {
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Copilot/Copilot.yaml",
        path: "./ruleset/copilot.yaml",
        behavior: "classical",
        interval: 86400,
        format: "yaml",
        type: "http",
      },
      claude: {
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
        path: "./ruleset/claude.yaml",
        behavior: "classical",
        interval: 86400,
        format: "yaml",
        type: "http",
      },
      bard: {
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BardAI/BardAI.yaml",
        path: "./ruleset/bard.yaml",
        behavior: "classical",
        interval: 86400,
        format: "yaml",
        type: "http",
      },
      openai: {
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml",
        path: "./ruleset/openai.yaml",
        behavior: "classical",
        interval: 86400,
        format: "yaml",
        type: "http",
      },
      youtube_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs",
        path: "./ruleset/youtube_domain.mrs",
        behavior: "domain"
      },
      bahamut_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/bahamut.mrs",
        path: "./ruleset/bahamut_domain.mrs",
        behavior: "domain"
      },
      biliintl_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/biliintl.mrs",
        path: "./ruleset/biliintl_domain.mrs",
        behavior: "domain"
      },
      bilibili_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/bilibili.mrs",
        path: "./ruleset/bilibili_domain.mrs",
        behavior: "domain"
      },
      tiktok_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/tiktok.mrs",
        path: "./ruleset/tiktok_domain.mrs",
        behavior: "domain"
      },
      streamingmedia: {
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GlobalMedia/GlobalMedia.yaml",
        path: "./ruleset/streamingmedia.yaml",
        behavior: "classical",
        interval: 86400,
        format: "yaml",
        type: "http",
      },
      telegram_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.mrs",
        path: "./ruleset/telegram_domain.mrs",
        behavior: "domain"
      },
      telegram_ip: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/telegram.mrs",
        path: "./ruleset/telegram_ip.mrs",
        behavior: "ipcidr"
      },
      github_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs",
        path: "./ruleset/github_domain.mrs",
        behavior: "domain"
      },
      google_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs",
        path: "./ruleset/google_domain.mrs",
        behavior: "domain"
      },
      google_ip: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/google.mrs",
        path: "./ruleset/google_ip.mrs",
        behavior: "ipcidr"
      },
      twitter_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/twitter.mrs",
        path: "./ruleset/twitter_domain.mrs",
        behavior: "domain"
      },
      twitter_ip: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/twitter.mrs",
        path: "./ruleset/twitter_ip.mrs",
        behavior: "ipcidr"
      },
      apple_classical: {
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Coldvvater/Mononoke/master/Clash/RuleSet/AppleProxyService.list",
        path: "./ruleset/apple_classical.list",
        behavior: "classical",
        interval: 86400,
        format: "text",
        type: "http",
      },
      apple_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple.mrs",
        path: "./ruleset/apple_domain.mrs",
        behavior: "domain"
      },
      apple_ip: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo-lite/geoip/apple.mrs",
        path: "./ruleset/apple_ip.mrs",
        behavior: "ipcidr"
      },
      microsoft_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs",
        path: "./ruleset/microsoft_domain.mrs",
        behavior: "domain"
      },
      steam: {
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.yaml",
        path: "./ruleset/steam.yaml",
        behavior: "classical",
        interval: 86400,
        format: "yaml",
        type: "http",
      },
      "geolocation-!cn": {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.mrs",
        path: "./ruleset/geolocation-!cn.mrs",
        behavior: "domain"
      },
      cn_domain: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs",
        path: "./ruleset/cn_domain.mrs",
        behavior: "domain"
      },
      cn_ip: {
        ...ruleProviderCommon,
        url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs",
        path: "./ruleset/cn_ip.mrs",
        behavior: "ipcidr"
      }
    });
    // 覆盖规则
    config["rules"] = [
      "RULE-SET,private_domain,DIRECT",
      "RULE-SET,bing,AIGC",
      "RULE-SET,copilot,AIGC",
      "RULE-SET,bard,AIGC",
      "RULE-SET,openai,AIGC",
      "RULE-SET,claude,AIGC",
      "RULE-SET,youtube_domain,YouTube",
      "RULE-SET,bahamut_domain,TaiWan",
      "RULE-SET,biliintl_domain,Streaming",
      "RULE-SET,bilibili_domain,BiliBili",
      "RULE-SET,tiktok_domain,TikTok",
      "RULE-SET,streamingmedia,Streaming",
      "RULE-SET,telegram_domain,Telegram",
      "RULE-SET,telegram_ip,Telegram",
      "RULE-SET,github_domain,Proxy",
      "RULE-SET,twitter_domain,X",
      "RULE-SET,twitter_ip,X",
      "RULE-SET,apple_classical,Proxy",
      "RULE-SET,apple_domain,Apple",
      "RULE-SET,apple_ip,Apple",
      "RULE-SET,google_domain,Google",
      "RULE-SET,google_ip,Google",
      "RULE-SET,microsoft_domain,Microsoft",
      "RULE-SET,steam,Games",
      "RULE-SET,geolocation-!cn,Proxy",
      "RULE-SET,cn_domain,DIRECT",
      "RULE-SET,cn_ip,DIRECT",
      "MATCH,Proxy",
    ];
    return config;
  }
