#!/usr/bin/env bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

install_dir=/opt/tv-processor

rm -rf ${install_dir}

rm -f /usr/bin/process-tv