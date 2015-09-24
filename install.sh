#!/usr/bin/env bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

install_dir=/opt/tv-processor

mkdir -p ${install_dir}
cp -rf config lib package.json start.js uninstall.sh process-tv.sh ${install_dir}
chmod -R 755 ${install_dir}
cd ${install_dir}
npm install

cp -f ${install_dir}/process-tv.sh /usr/bin/process-tv
chmod 755 /usr/bin/process-tv