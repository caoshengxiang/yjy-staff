#!  /bin/bash
# && 如果前面的命令正确执行，那么后面的命令也将执行。否则后面的命令不执行。
#tar zcvf dist.tar.gz dist
scp dist.tar.gz root@117.50.82.147:/opt/yjyweb
ssh root@117.50.82.147 "rm -rf /opt/yjyweb/home/* && tar -zxvf /opt/yjyweb/dist.tar.gz -C /opt/yjyweb/home/ && mv /opt/yjyweb/home/dist/* -t /opt/yjyweb/home/ && rm -rf /opt/yjyweb/home/dist /opt/yjyweb/dist.tar.gz"
#117.50.2.18   root   ynLPpiTCdJkGEni3
#/opt/yjyweb/h5
 #/opt/yjyweb/home
