#!/bin/bash
# DuckDNS Dynamic DNS updater script for CollaGenie
# Replace YOUR_DOMAIN and YOUR_TOKEN with your credentials from duckdns.org

DOMAIN="collages" # e.g. "mycollagestudio" (without .duckdns.org)
TOKEN="ca756387-aa97-41c0-ac50-a4f67dda701b"   # Your 32-character token from duckdns.org

echo "Updating DuckDNS record for ${DOMAIN}.duckdns.org..."
RESPONSE=$(curl -s "https://www.duckdns.org/update?domains=${DOMAIN}&token=${TOKEN}&ip=")

if [ "$RESPONSE" = "OK" ]; then
    echo "✅ Success: DuckDNS IP updated to current public IP."
else
    echo "❌ Error: DuckDNS returned '$RESPONSE'. Check your DOMAIN and TOKEN."
fi
