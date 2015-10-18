#!/usr/bin/env bash

install_dir=/opt/what-tools
entry=${install_dir}/entries

if [ $# -eq 1 ]; then
    input=$1
    node ${entry}/start-process.js ${input}
else
    echo "No arguments supplied"
fi


