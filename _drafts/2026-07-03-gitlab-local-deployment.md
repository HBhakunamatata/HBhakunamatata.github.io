---
layout: post
title:  "Gitlab-ce Local Deployment"
date:   2026-07-03
description:
categories: Docker Gitlab Linux
---
Record the process of gitlab local deployment

## 1. Check Linux Memory Occupation

```shell
# Total / Free / Available
free -m
free -h

# process that use maxinum memory
top 
m

# single service
systemctl status [service_name]

# top10
ps aux --sort=-%mem | head -n 11

# service in docker 
docker stats [container-id]
docker ps -s
```

## 2. Pull gitlab image

```shell
docker pull docker.m.daocloud.io/gitlab/gitlab-ce:latest
docker tag docker.m.daocloud.io/gitlab/gitlab-ce:latest gitlab/gitlab-ce:latest
```

## 3. modify docker-compose.yml

Gitlab offical recommended 8G memory, in order to minimize memory usage, change default config in docker-compose.yml and .env file

```ini
GITLAB_HTTP_PORT=15290
GITLAB_HTTPS_PORT=15243
GITLAB_SSH_PORT=15222
GITLAB_HOST_IP=172.26.100.9
GITLAB_CONTAINER_IP=172.26.201.10
```

```yml
services:
  gitlab:
    image: gitlab/gitlab-ce:latest
    restart: always
    hostname: '${GITLAB_HOST_IP}'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        # 基础访问配置
        external_url 'http://${GITLAB_HOST_IP}:${GITLAB_HTTP_PORT}' # 修改为你的服务器 IP 或域名
        # 关键修复：强行让容器内部 Nginx 监听 80 端口，不再受 external_url 端口干扰！
        nginx['listen_port'] = 80
        gitlab_rails['gitlab_shell_ssh_port'] = ${GITLAB_SSH_PORT}

        # 核心内存优化参数（针对 4G 内存服务器）
        puma['worker_processes'] = 2              
        puma['min_threads'] = 1
        puma['max_threads'] = 2
        sidekiq['max_concurrency'] = 15           
        postgresql['shared_buffers'] = '256MB'
        
        # 关闭不需要的内置监控服务（可节省约 1G+ 内存）
        prometheus_monitoring['enable'] = false
        prometheus['enable'] = false
        alertmanager['enable'] = false
        node_exporter['enable'] = false
        redis_exporter['enable'] = false
        postgres_exporter['enable'] = false
        gitlab_exporter['enable'] = false
    ports:
      - '${GITLAB_HTTP_PORT}:80'
      - '${GITLAB_HTTPS_PORT}:443'
      - '${GITLAB_SSH_PORT}:22'
    volumes:
      - '/opt/develop/gitlab/config:/etc/gitlab'
      - '/opt/develop/gitlab/logs:/var/log/gitlab'
      - '/opt/develop/gitlab/data:/var/opt/gitlab'
    shm_size: '256m'   # 增大共享内存，防止 Web 界面崩溃
    networks:
      gitlab_net:
        ipv4_address: ${GITLAB_CONTAINER_IP}

networks:
  gitlab_net:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.26.201.0/24
```

## 4. Problems

### 4.1 User with root priviledge cannot operate files in authrized directories from FTP

```shell
sudo chown -R hb:hb /opt/develop
sudo chmod -R 755 /opt/develop
```

### 4.2 Docker service occupies ip table with default installation

If docker is installed without configuration, 

## 4.3 Cannot get root's password when login at the first time

```shell
# method 1
docker compose exec gitlab cat /etc/gitlab/initial_root_password
# method 2
docker compose exec gitlab gitlab-rake db:migrate
docker compose exec gitlab gitlab-rake db:seed_fu
docker compose exec gitlab gitlab-rails runner 'user = User.find_by_username("root") || User.new(username: "root", email: "admin@example.com", name: "Administrator"); user.password = "Complex#Pass987"; user.password_confirmation = "Complex#Pass987"; user.skip_confirmation!; user.save!'
```

## 4.4 Cannot operate docker with root privilidge

```shell
sudo usermod -aG docker $USER
newgrp docker
```

## 4.5 Cannot access the webpage due to firewall

```shell
sudo ufw allow 15290/tcp
sudo ufw allow 2222/tcp

sudo ufw reload

netstat -tlnp | grep 15290
```

## 4.6 Recreate docker container in docker compose

```shell
docker compose up -d --force-recreate
```