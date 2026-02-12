#!/usr/bin/env python3
"""
Script to add BreadcrumbSchema to remaining pages
Processes files in batch to add both import and component
"""

import os
import re

# Remaining disease model pages to process
disease_models = [
    ('metabolic-disease-mouse-models', 'Metabolic Disease Mouse Models'),
    ('obesity-mouse-models', 'Obesity Mouse Models'),
    ('nash-mash-mouse-models', 'NASH MASH Mouse Models'),
    ('type-1-diabetes-mice', 'Type 1 Diabetes Mice'),
    ('type-2-diabetes-mice', 'Type 2 Diabetes Mice'),
    ('immunology-mouse-models', 'Immunology Mouse Models'),
    ('autoimmune-disease-mice', 'Autoimmune Disease Mice'),
    ('inflammatory-disease-mice', 'Inflammatory Disease Mice'),
    ('lupus-mouse-models', 'Lupus Mouse Models'),
    ('rheumatoid-arthritis-mice', 'Rheumatoid Arthritis Mice'),
    ('ibd-mouse-models', 'IBD Mouse Models'),
    ('allergy-asthma-mouse-models', 'Allergy Asthma Mouse Models'),
    ('rare-disease-mouse-models', 'Rare Disease Mouse Models'),
    ('cystic-fibrosis-mice', 'Cystic Fibrosis Mice'),
    ('muscular-dystrophy-mouse-models', 'Muscular Dystrophy Mouse Models'),
    ('ophthalmology-mouse-models', 'Ophthalmology Mouse Models'),
    ('syngeneic-tumor-models', 'Syngeneic Tumor Models'),
    ('tumor-suppressor-knockout-mice', 'Tumor Suppressor Knockout Mice'),
    ('immuno-oncology-mouse-models', 'Immuno Oncology Mouse Models'),
]

base_path = 'src/app'

def add_breadcrumb_to_file(filepath, page_name, page_path, category='Disease Models', category_path='/therapeutic-areas'):
    """Add BreadcrumbSchema import and component to a page file"""
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if already has BreadcrumbSchema in the component usage (not just import)
    if '<BreadcrumbSchema' in content:
        print(f"  ✓ Already has BreadcrumbSchema component: {filepath}")
        return False
    
    # Step 1: Add to imports if not present
    if 'BreadcrumbSchema' not in content:
        # Find the line with } from '@/components/UXUIDC';
        content = re.sub(
            r"(} from '@/components/UXUIDC';)",
            r", BreadcrumbSchema \1",
            content
        )
    
    # Step 2: Add component before closing </div>
    breadcrumb_component = f"""
      {{/* Schema.org Structured Data */}}
      <BreadcrumbSchema 
        items={{[
          {{ name: 'Home', path: '/' }},
          {{ name: '{category}', path: '{category_path}' }},
          {{ name: '{page_name}', path: '/{page_path}' }},
        ]}}
      />"""
    
    # Find the pattern: UXUIDCFooter followed by optional schema script, then </div> and );
    # Insert before the final </div>
    patterns = [
        # Pattern 1: UXUIDCFooter followed by script then </div>
        (r'(<UXUIDCFooter />\s*\n\s*\n\s*<script)', breadcrumb_component + r'\n      <script'),
        # Pattern 2: UXUIDCFooter followed directly by </div>
        (r'(<UXUIDCFooter />\s*\n\s*</div>)', breadcrumb_component + r'\n    </div>'),
        # Pattern 3: </main> followed by UXUIDCFooter then </div>
        (r'(</main>\s*\n\s*\n\s*<UXUIDCFooter />\s*\n\s*</div>)', 
         r'</main>\n      \n      <UXUIDCFooter />' + breadcrumb_component + r'\n    </div>'),
    ]
    
    modified = False
    for pattern, replacement in patterns:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            modified = True
            break
    
    if not modified:
        print(f"  ⚠ Could not find insertion point: {filepath}")
        return False
    
    # Write back
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"  ✓ Added BreadcrumbSchema: {filepath}")
    return True

def main():
    os.chdir('/Users/rocketcreative/Desktop/CURSER BUILDS/ITL_2026')
    
    count = 0
    for page_path, page_name in disease_models:
        filepath = os.path.join(base_path, page_path, 'page.tsx')
        if os.path.exists(filepath):
            if add_breadcrumb_to_file(filepath, page_name, page_path):
                count += 1
        else:
            print(f"  ✗ File not found: {filepath}")
    
    print(f"\n✅ Processed {count} disease model pages")

if __name__ == '__main__':
    main()
