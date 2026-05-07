#!/bin/bash
# Run this once on a fresh Amazon Linux 2023 or Ubuntu EC2 instance.
# Usage: bash ec2-setup.sh

set -e

echo "==> Updating system"
if command -v dnf &>/dev/null; then
  sudo dnf update -y
  sudo dnf install -y git docker
elif command -v apt-get &>/dev/null; then
  sudo apt-get update -y
  sudo apt-get install -y git docker.io
fi

echo "==> Starting Docker"
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker "$USER"

echo "==> Installing docker compose plugin"
sudo mkdir -p /usr/local/lib/docker/cli-plugins
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

echo "==> Done. Log out and back in so the docker group takes effect."
echo "    Then run:  bash deploy.sh"
