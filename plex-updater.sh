#!/usr/bin/env bash

install_dir=/opt/tv-processor

if [ $# -eq 0 ]; then
    node ${install_dir}/start-plexUpdater.js
else
    echo "Wrong number of arguments"
fi

