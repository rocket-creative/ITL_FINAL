#!/usr/bin/env python3
import re
from pathlib import Path

app_dir = Path('itl-website/src/app')

test_pages = [
    'diabetes-mouse-models/page.tsx',
    'immunology-mouse-models/page.tsx', 
    'parkinsons-mouse-models/page.tsx',
    'reporter-knockin/page.tsx',
    'tissue-specific-knockout/page.tsx',
    'cre-lox-system/page.tsx',
    'humanized-mouse-models/page.tsx',
    'backcrossing-services/page.tsx',
    'therapeutic-areas/page.tsx',
    'resources/page.tsx',
    'why-choose-itl/page.tsx',
    'custom-mouse-models/page.tsx',
    'nash-mash-mouse-models/page.tsx',
    'tim3-humanized-mice/page.tsx',
    'colony-management-services/page.tsx'
]

def check_consecutive(filepath):
    with open(app_dir / filepath, 'r') as f:
        content = f.read()
    
    pattern = r'<section[^>]*?style=\{\{[^}]*?background(?:Color)?:\s*[\'\"`]([^\'\"` ]+)[\'\"`][^}]*?\}\}'
    matches = re.findall(pattern, content)
    
    issues = []
    for i in range(1, len(matches)):
        prev, curr = matches[i-1], matches[i]
        
        if prev.lower() in ['white', '#ffffff'] and curr.lower() in ['white', '#ffffff']:
            issues.append(f'WHITE-WHITE at {i-1},{i}')
        
        grey_colors = ['#f8f9fa', '#f7f7f7', '#f5f5f5']
        if any(c in prev.lower() for c in grey_colors) and any(c in curr.lower() for c in grey_colors):
            if 'gradient' not in prev.lower() and 'gradient' not in curr.lower():
                issues.append(f'GREY-GREY at {i-1},{i}')
    
    return issues

print('Checking 15 sample pages:')
print('=' * 60)

all_clean = True
for page in test_pages:
    issues = check_consecutive(page)
    status = 'OK' if not issues else 'ISSUE'
    print(f'[{status}] {page}')
    if issues:
        for issue in issues:
            print(f'  - {issue}')
        all_clean = False

print('=' * 60)
if all_clean:
    print('All 15 sample pages are clean!')
else:
    print('Some pages have issues')
