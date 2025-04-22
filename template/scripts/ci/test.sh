#!/usr/bin/env bash

test_dir="$1"

set -eou pipefail

echo "⬇️ Installing Dependencies..."
dotnet restore
echo "✅ Done!"

# build the project
echo "🏗️ Building..."
dotnet build --no-incremental
echo "✅ Done!"

# run tests
echo "🧪 Running and Coverage..."
dotnet test --logger:junit "$test_dir"
echo "✅ Done!"
