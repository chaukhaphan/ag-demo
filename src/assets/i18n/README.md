<!--

This is structured by components and child components. We take the component's name as root and sub
Label format: {LBL/TXT/TITLE/HEADING/URL/LINK/ETC}_{A-VERY-LONG-LABEL}

To add a new language, we need to follow these steps:
- register it in locales.json
- add language json file with the name matching locale declated in locales.json
- import and register in app.module.ts
- auth.service.ts will handle language switching. So add another object in langList


-->
