#!/bin/bash

# Execute npm install
npm install

# Check if npm install was successful
if [ $? -ne 0 ]; then
    echo "npm install failed. Exiting."
    exit $?
fi

# Execute npm build
npm run build

# Check if npm build was successful
if [ $? -ne 0 ]; then
    echo "npm build failed. Exiting."
    exit $?
fi

# Execute npm start
npm start