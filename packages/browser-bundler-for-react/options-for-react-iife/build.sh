#!/usr/bin/env bash
set -e

# 输出打包时间
OUTFILE="./react-browser-packages/bundle-time.txt"

# 开发版本
node ./dev-react-bundler.js
node ./dev-react-dom-bundler.js
node ./dev-react-dom-client-bundler.js
node ./dev-react-jsx-runtime-bundler.js
node ./dev-react-scheduler-bundler.js

# 生产版本
node ./prod-react-bundler.js
node ./prod-react-dom-bundler.js
node ./prod-react-dom-client-bundler.js
node ./prod-react-jsx-runtime-bundler.js
node ./prod-react-scheduler-bundler.js

# 记录打包开始时间（可选）
echo "bundle-time: $(date '+%Y-%m-%d %H:%M:%S')" > "$OUTFILE"