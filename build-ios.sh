#!/bin/sh
set -e
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
