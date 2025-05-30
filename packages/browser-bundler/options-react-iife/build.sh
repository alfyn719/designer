#!/usr/bin/env bash
set -e

# 输出文件
OUTFILE="./react-browser-packages/bundle-time.txt"

node ./dev-react-bundler.js
node ./dev-react-dom-bundler.js
node ./dev-react-dom-client-bundler.js
node ./dev-react-jsx-runtime-bundler.js

node ./dev-scheduler-bundler.js

node ./prod-react-bundler.js
node ./prod-react-dom-bundler.js
node ./prod-react-dom-client-bundler.js
node ./prod-react-jsx-runtime-bundler.js

node ./prod-scheduler-bundler.js

# 记录打包开始时间（可选）
echo "bundle-time: $(date '+%Y-%m-%d %H:%M:%S')" > "$OUTFILE"