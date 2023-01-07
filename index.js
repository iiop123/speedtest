import {
    Application,
    Router,
    normalizePathnameMiddleware
  } from '@cfworker/web';
  import { authhandle } from './auth';
  const router = new Router();

  router.get('/',({res})=>{
    res.redirect('/index.html')
  })
  router.all('/empty',({req,res})=>{
    let header=new Headers()
    header.append("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    header.append("Cache-Control", "post-check=0, pre-check=0");
    header.set('access-control-allow-origin', '*')
    header.append("Pragma", "no-cache");
    header.append('access-control-allow-headers','content-encoding')
    header.append('Access-Control-Expose-Headers','cf-ray')
    res.headers=header
    res.body=''
  })
  //router
  addEventListener("fetch", async (event) => {
    const empty=new RegExp('/empty.*','i')
    let pathname = new URL(event.request.url)
    if (!empty.test(pathname)) {
      event.respondWith(authhandle(event));
    }  
  });





  new Application()
  .use(normalizePathnameMiddleware)
  .use(router.middleware)
  .listen();