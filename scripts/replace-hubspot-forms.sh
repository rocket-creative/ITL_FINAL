#!/bin/bash

# Script to replace HubSpotForm React components with simple inline scripts
# This fixes removeChild errors and simplifies the codebase

echo "Replacing HubSpotForm components with inline scripts..."

# Function to replace in a file
replace_in_file() {
  local file=$1
  local form_id=$2
  
  echo "Processing: $file"
  echo "Form ID: $form_id"
  
  # This is a manual process - each page needs custom replacement
  # Based on its specific structure
}

echo ""
echo "=== Files that need manual update ==="
echo ""
echo "1. src/app/request-quote/page.tsx"
echo "   Form ID: b854ed46-fed3-4b54-9d01-62173106ad8c"
echo ""
echo "2. src/app/order-catalog-models/page.tsx"
echo "   Form ID: (need to find)"
echo ""
echo "3. src/app/schedule-meeting/page.tsx"
echo "   Form ID: (need to find)"
echo ""
echo "=== Replacement Pattern ==="
echo ""
echo "Replace:"
echo '  <HubSpotForm'
echo '    portalId="3977953"'
echo '    formId="FORM_ID"'
echo '    region="na1"'
echo '  />'
echo ""
echo "With:"
echo '  <div'
echo '    dangerouslySetInnerHTML={{'
echo '      __html: `'
echo '        <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>'
echo '        <script>'
echo '          hbspt.forms.create({'
echo '            region: "na1",'
echo '            portalId: "3977953",'
echo '            formId: "FORM_ID"'
echo '          });'
echo '        </script>'
echo '      `'
echo '    }}'
echo '  />'
echo ""
echo "Then remove HubSpotForm import from each file."
echo ""
