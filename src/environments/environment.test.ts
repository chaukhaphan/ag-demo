// since we use proxy, all outbound calls will be rewrite by proxy config in proxy.conf.ts and the env.service.ts will append webAPISubRoot
// to run test env in your local, make webAPIRoot empty in environment.test.ts and run "npm run serve-test"

export const environment = {
  production: false,
};
