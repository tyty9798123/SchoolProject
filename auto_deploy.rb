#!/usr/bin/env ruby

p 'Git clone' 
`ssh root@45.77.130.5 'git clone https://github.com/tyty9798123/SchoolProject' `
p '到專案資料夾'
`ssh root@45.77.130.5 'cd SchoolProject'`
p 'NPM install'
`ssh root@45.77.130.5 'cd SchoolProject && npm i' `
p 'Start Server'
`ssh root@45.77.130.5 'pm2 rstart 0' `