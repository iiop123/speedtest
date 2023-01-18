# 运行在CloudFlare Wokres的LibreSpeed:rocket:

#### - 基于LibreSpeed的NodeJS版本(肯定也支持多线程测速)
#### - 测速文件存在CloudFlare KV数据库中
#### - 可设置Basic Authentication验证登录，防止不法分子刷流量

:chart_with_upwards_trend:
## 更新LOG
- 由于Workers连接数限制，直接偷特斯拉官网静态资源作为测速文件，嘎嘎快

------------
## DEMO
[Link](https://speed.dingding.wtf/ "Link")

## 部署方法

#### 先安装Cloudflare Workers.命令行工具wrangler
    npm install -g wrangler

#### 登录cloudflare
    wrangler login

#### 下载代码
    git clone git@github.com:iiop123/speedtest.git

#### 执行npm i 安装库，并推送到Cloudflare
    npm i && wrangler publish



------------

## 密码更改
    import { getAssetFromKV } from "@cloudflare/kv-asset-handler"; 
    const u='rio' //用户名修改
    const p='456'  //密码修改
