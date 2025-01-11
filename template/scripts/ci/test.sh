#!/usr/bin/env bash

threshold=${1:-50}

set -eou pipefail

# export path
export PATH="$PATH:$HOME/.dotnet/tools"

echo "⬇️ Installing Dependencies..."
dotnet restore
dotnet tool restore
echo "✅ Done!"

# build the project
echo "🏗️ Building..."
dotnet build --no-incremental
echo "✅ Done!"

# run tests
echo "🧪 Running and Coverage..."
dotnet dotcover test --dcReportType=Json --dcFilters=-:testhost
echo "✅ Done!"

# print coverage
coverage=$(jq -r '.CoveragePercent' ./dotCover.Output.json)

echo "🧪 Current test coverage: ${coverage}%"

if (($(echo "$coverage > $threshold" | bc -l))); then
  echo "✅ Coverage threshold of ${threshold}% met"
else
  echo "❌ Failed:️ current test coverage is below threshold of ${threshold}%."
  exit 1
fi
