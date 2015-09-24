#!/usr/bin/env bash

install_dir=/opt/tv-processor

if [ $# -eq 1 ]; then
    input=$1
    node ${install_dir}/start.js ${input}
else
    echo "No arguments supplied"
fi


