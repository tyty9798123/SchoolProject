#!/usr/bin/env ruby

p '到專案資料夾 and git pull'
`ssh root@45.77.130.5 'cd SchoolProject && git pull'`
p 'NPM install'
`ssh root@45.77.130.5 'cd SchoolProject && npm i' `
p 'Start Server'
`ssh root@45.77.130.5 'pm2 restart 0' `