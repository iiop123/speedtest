import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
const u='rio'
const p='456'
let cacheControl = {
	browserTTL:  null, // do not set cache control ttl on responses
	edgeTTL: 2 * 60 * 60 * 24, // 2 days
	bypassCache: true, // do not bypass Cloudflare's cache
}

async function authhandle(request) {
    const has=request.request.headers.has('Authorization')
    if (has) {
      const { user, pass } = await basicAuthentication(request);
      if (u === user && p===pass) {
        return getAssetFromKV(request,{
         cacheControl,
         defaultMimeType:'application/octet-stream'
        })
      }
    }
  
    // Not authenticated.
    return new Response('You need to login.', {
      status: 401,
      headers: {
        // Prompts the user for credentials.
        'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"',
      },
    });
    }
    
    function basicAuthentication(request) {
      const Authorization = request.request.headers.get('Authorization');
    
      const [scheme, encoded] = Authorization.split(' ');
    
      if (!encoded || scheme !== 'Basic') {
        throw new BadRequestException('Malformed authorization header.');
      }
    
      const buffer = Uint8Array.from(atob(encoded), character => character.charCodeAt(0));
      const decoded = new TextDecoder().decode(buffer).normalize();
      const index = decoded.indexOf(':');
    
      if (index === -1 || /[\0-\x1F\x7F]/.test(decoded)) {
        throw new BadRequestException('Invalid authorization value.');
      }
    
      return {
        user: decoded.substring(0, index),
        pass: decoded.substring(index + 1),
      };
    }
    export {authhandle}