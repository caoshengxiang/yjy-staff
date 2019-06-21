#!  /bin/bash
# && 如果前面的命令正确执行，那么后面的命令也将执行。否则后面的命令不执行。
#tar zcvf dist.tar.gz dist
scp dist.tar.gz root@117.50.82.147:/opt/yjyweb
ssh root@117.50.82.147 "rm -rf /opt/yjyweb/staff/* && tar -zxvf /opt/yjyweb/dist.tar.gz -C /opt/yjyweb/staff/ && mv /opt/yjyweb/staff/dist/* -t /opt/yjyweb/staff/ && rm -rf /opt/yjyweb/staff/dist /opt/yjyweb/dist.tar.gz"
#117.50.82.147   root   ynLPpiTCdJkGEni3
#/opt/yjyweb/h5
 #/opt/yjyweb/home
 #/opt/yjyweb/staff
