#!/bin/bash

# 301 Redirect Testing Script
# Tests all redirects from old genetargeting.com URLs to new ITL structure
# Usage: ./test-redirects.sh [domain]
# Example: ./test-redirects.sh https://yourdomain.com

DOMAIN="${1:-http://localhost:3000}"
REDIRECTS_FILE="src/lib/legacy/redirects.json"
RESULTS_FILE="redirect-test-results.log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "301 REDIRECT TEST"
echo "=========================================="
echo "Domain: $DOMAIN"
echo "Testing redirects from: $REDIRECTS_FILE"
echo "Results will be saved to: $RESULTS_FILE"
echo ""

# Initialize counters
total=0
passed=0
failed=0
warnings=0

# Clear previous results
> "$RESULTS_FILE"

# Function to test a single redirect
test_redirect() {
    local source=$1
    local expected_destination=$2
    
    ((total++))
    
    # Make request and capture response
    response=$(curl -s -o /dev/null -w "%{http_code}|%{redirect_url}" "${DOMAIN}${source}")
    
    http_code=$(echo "$response" | cut -d'|' -f1)
    redirect_url=$(echo "$response" | cut -d'|' -f2)
    
    # Check if it's a 301
    if [ "$http_code" = "301" ]; then
        # Check if destination matches
        expected_full="${DOMAIN}${expected_destination}"
        if [ "$redirect_url" = "$expected_full" ]; then
            echo -e "${GREEN}✓${NC} $source → $expected_destination (301)"
            echo "PASS: $source → $expected_destination (301)" >> "$RESULTS_FILE"
            ((passed++))
        else
            echo -e "${YELLOW}⚠${NC} $source → $redirect_url (Expected: $expected_full)"
            echo "WARNING: $source redirects to $redirect_url instead of $expected_full" >> "$RESULTS_FILE"
            ((warnings++))
        fi
    elif [ "$http_code" = "308" ]; then
        # 308 is also a permanent redirect (acceptable in Next.js)
        echo -e "${GREEN}✓${NC} $source → $expected_destination (308 - Permanent)"
        echo "PASS: $source → $expected_destination (308)" >> "$RESULTS_FILE"
        ((passed++))
    elif [ "$http_code" = "200" ]; then
        echo -e "${YELLOW}⚠${NC} $source returned 200 (no redirect)"
        echo "WARNING: $source returned 200 - expected redirect" >> "$RESULTS_FILE"
        ((warnings++))
    else
        echo -e "${RED}✗${NC} $source failed (HTTP $http_code)"
        echo "FAIL: $source (HTTP $http_code)" >> "$RESULTS_FILE"
        ((failed++))
    fi
}

# Parse JSON and test each redirect
# Note: This uses node to parse JSON. Requires Node.js installed.
if command -v node &> /dev/null; then
    echo "Parsing redirects..."
    echo ""
    
    # Extract source and destination from JSON
    node -e "
    const fs = require('fs');
    const redirects = JSON.parse(fs.readFileSync('$REDIRECTS_FILE', 'utf8'));
    redirects.forEach(r => {
        // Skip comment-only entries
        if (r.source && r.destination) {
            console.log(r.source + '|' + r.destination);
        }
    });
    " | while IFS='|' read -r source destination; do
        test_redirect "$source" "$destination"
        sleep 0.1 # Small delay to avoid rate limiting
    done
else
    echo "Error: Node.js is required to parse JSON"
    echo "Install Node.js or manually test redirects"
    exit 1
fi

echo ""
echo "=========================================="
echo "TEST SUMMARY"
echo "=========================================="
echo "Total Tests: $total"
echo -e "${GREEN}Passed: $passed${NC}"
echo -e "${YELLOW}Warnings: $warnings${NC}"
echo -e "${RED}Failed: $failed${NC}"
echo ""

if [ $failed -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}✓ All redirects working correctly!${NC}"
    exit 0
elif [ $failed -eq 0 ]; then
    echo -e "${YELLOW}⚠ Some warnings detected. Check $RESULTS_FILE for details.${NC}"
    exit 0
else
    echo -e "${RED}✗ Some redirects failed. Check $RESULTS_FILE for details.${NC}"
    exit 1
fi
