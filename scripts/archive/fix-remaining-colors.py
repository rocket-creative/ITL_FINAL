#!/usr/bin/env python3
"""
Second pass color fixer - catches edge cases missed by first pass
"""

import re
from pathlib import Path

app_dir = Path('itl-website/src/app')

def is_white(color):
    return color.lower() in ['white', '#ffffff', '#fff']

def is_grey(color):
    grey_colors = ['#f8f9fa', '#f7f7f7', '#f5f5f5']
    return any(c in color.lower() for c in grey_colors)

def fix_file(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    changes = []
    modified = False
    
    # Track previous section background
    prev_bg = None
    prev_line_idx = None
    
    for i, line in enumerate(lines):
        # Match section with background
        match = re.search(r'<section[^>]*?style=\{\{[^}]*?background(?:Color)?:\s*[\'\"`]([^\'\"` ]+)[\'\"`]', line)
        
        if match:
            curr_bg = match.group(1)
            
            # Check for consecutive same colors
            if prev_bg:
                # White-white
                if is_white(prev_bg) and is_white(curr_bg):
                    # Change current to grey
                    new_line = line.replace(curr_bg, '#f8f9fa')
                    lines[i] = new_line
                    changes.append(f'Line {i+1}: {curr_bg} → #f8f9fa (after white)')
                    curr_bg = '#f8f9fa'
                    modified = True
                
                # Grey-grey
                elif is_grey(prev_bg) and is_grey(curr_bg):
                    # Change current to white
                    new_line = line.replace(curr_bg, 'white')
                    lines[i] = new_line
                    changes.append(f'Line {i+1}: {curr_bg} → white (after grey)')
                    curr_bg = 'white'
                    modified = True
            
            # Skip if current is gradient or accent
            if 'gradient' not in curr_bg.lower() and '#0a253c' not in curr_bg and '#134978' not in curr_bg and '#008080' not in curr_bg and 'teal' not in curr_bg.lower():
                prev_bg = curr_bg
                prev_line_idx = i
    
    if modified:
        with open(filepath, 'w') as f:
            f.writelines(lines)
        return {'fixed': True, 'changes': changes}
    
    return {'fixed': False}

def process_all_pages():
    results = {'fixed': [], 'skipped': []}
    
    for filepath in app_dir.rglob('page.tsx'):
        result = fix_file(filepath)
        result['filepath'] = str(filepath)
        
        if result['fixed']:
            results['fixed'].append(result)
        else:
            results['skipped'].append(result)
    
    return results

print('🔧 Second Pass - Fixing Remaining Issues\\n')

results = process_all_pages()

if results['fixed']:
    print(f'✅ Fixed {len(results["fixed"])} more pages:\\n')
    for r in results['fixed']:
        rel_path = r['filepath'].replace(str(Path.cwd()), '.')
        print(f'📄 {rel_path}')
        for change in r['changes']:
            print(f'   └─ {change}')
        print()
else:
    print('✅ No additional issues found!\\n')

print(f'\\n📊 Summary: Fixed {len(results["fixed"])} pages')
