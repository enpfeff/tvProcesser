#!/usr/bin/env bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

install_dir=/opt/tv-processor
bin=${install_dir}/bin

mkdir -p ${install_dir}
cp -rf config lib entries bin package.json uninstall.sh ${install_dir}
chmod -R 775 ${install_dir}
chown -R media:data ${install_dir}
cd ${install_dir}
npm install

chmod +x /usr/bin/*
cp -f ${bin}/* /usr/bin/