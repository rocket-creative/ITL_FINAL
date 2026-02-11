#!/usr/bin/env python3
"""
Batch Color Pattern Fixer for ITL Website
Fixes consecutive same-color section backgrounds across all page.tsx files
"""

import os
import re
from pathlib import Path

# Color categories
WHITE_COLORS = ['white', '#ffffff', '#fff']
GREY_COLORS = ['#f8f9fa', '#f7f7f7', '#f5f5f5']
DARK_COLORS = ['#0a253c', '#134978']
ACCENT_COLORS = ['#008080', 'teal']

def normalize_color(color):
    """Normalize color string for comparison"""
    if not color:
        return None
    return color.lower().strip().replace(' ', '')

def is_white(color):
    """Check if color is white"""
    norm = normalize_color(color)
    if not norm:
        return False
    return any(c in norm for c in WHITE_COLORS) and 'gradient' not in norm and 'rgba' not in norm

def is_grey(color):
    """Check if color is grey"""
    norm = normalize_color(color)
    if not norm:
        return False
    return any(c in norm for c in GREY_COLORS)

def is_dark_or_accent(color):
    """Check if color is dark blue or teal accent"""
    norm = normalize_color(color)
    if not norm:
        return False
    return any(c in norm for c in DARK_COLORS + ACCENT_COLORS)

def is_gradient(color):
    """Check if color is a gradient"""
    if not color:
        return False
    return 'gradient' in color.lower()

def extract_sections(content):
    """Extract section backgrounds from file content"""
    sections = []
    
    # Pattern to match section tags with background styles
    pattern = r'<section[^>]*?style=\{\{[^}]*?background(?:Color)?:\s*[\'"`]([^\'"`]+)[\'"`][^}]*?\}\}'
    
    for match in re.finditer(pattern, content, re.DOTALL):
        full_match = match.group(0)
        color = match.group(1)
        sections.append({
            'match': full_match,
            'color': color,
            'start': match.start(),
            'end': match.end()
        })
    
    return sections

def fix_file(filepath):
    """Analyze and fix a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        sections = extract_sections(content)
        
        if len(sections) < 3:
            return {'fixed': False, 'reason': 'Too few sections'}
        
        changes = []
        new_content = content
        
        # Work backwards to preserve indices
        for i in range(len(sections) - 1, 0, -1):
            prev = sections[i - 1]
            curr = sections[i]
            
            # Skip if previous is gradient/hero
            if is_gradient(prev['color']):
                continue
            
            # Skip if current is dark/accent
            if is_dark_or_accent(curr['color']) or is_gradient(curr['color']):
                continue
            
            # Fix consecutive whites
            if is_white(prev['color']) and is_white(curr['color']):
                old_match = curr['match']
                new_match = old_match.replace(curr['color'], '#f8f9fa')
                new_content = new_content[:curr['start']] + new_match + new_content[curr['end']:]
                changes.append(f"Section {i+1}: {curr['color']} → #f8f9fa (after white)")
            
            # Fix consecutive greys
            elif is_grey(prev['color']) and is_grey(curr['color']):
                old_match = curr['match']
                new_match = old_match.replace(curr['color'], 'white')
                new_content = new_content[:curr['start']] + new_match + new_content[curr['end']:]
                changes.append(f"Section {i+1}: {curr['color']} → white (after grey)")
        
        if changes:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return {'fixed': True, 'changes': changes}
        
        return {'fixed': False, 'reason': 'No issues found'}
    
    except Exception as e:
        return {'fixed': False, 'error': str(e)}

def process_all_pages(app_dir):
    """Process all page.tsx files"""
    results = {'fixed': [], 'skipped': [], 'errors': []}
    
    for root, dirs, files in os.walk(app_dir):
        if 'page.tsx' in files:
            filepath = os.path.join(root, 'page.tsx')
            result = fix_file(filepath)
            result['filepath'] = filepath
            
            if result.get('error'):
                results['errors'].append(result)
            elif result['fixed']:
                results['fixed'].append(result)
            else:
                results['skipped'].append(result)
    
    return results

def main():
    print('🎨 ITL Color Pattern Batch Fixer\\n')
    print('Scanning all page.tsx files...\\n')
    
    app_dir = Path(__file__).parent / 'itl-website' / 'src' / 'app'
    
    if not app_dir.exists():
        print(f'❌ Error: {app_dir} does not exist')
        return
    
    results = process_all_pages(app_dir)
    
    print('═' * 70)
    print(f'\\n✅ FIXED FILES ({len(results["fixed"])}):\\n')
    for r in results['fixed']:
        rel_path = r['filepath'].replace(str(Path.cwd()), '.')
        print(f'📄 {rel_path}')
        for change in r['changes']:
            print(f'   └─ {change}')
        print()
    
    print('═' * 70)
    print(f'\\n⏭️  SKIPPED FILES ({len(results["skipped"])}):\\n')
    for r in results['skipped'][:10]:
        rel_path = r['filepath'].replace(str(Path.cwd()), '.')
        print(f'   {rel_path} - {r.get("reason", "Unknown")}')
    if len(results['skipped']) > 10:
        print(f'   ... and {len(results["skipped"]) - 10} more')
    
    if results['errors']:
        print('\\n═' * 70)
        print(f'\\n❌ ERRORS ({len(results["errors"])}):\\n')
        for r in results['errors']:
            rel_path = r['filepath'].replace(str(Path.cwd()), '.')
            print(f'   {rel_path} - {r.get("error", "Unknown error")}')
    
    print('\\n═' * 70)
    print('\\n📊 SUMMARY:')
    print(f'   Fixed: {len(results["fixed"])}')
    print(f'   Skipped: {len(results["skipped"])}')
    print(f'   Errors: {len(results["errors"])}')
    print(f'   Total: {len(results["fixed"]) + len(results["skipped"]) + len(results["errors"])}')
    print('\\n✨ Done!\\n')

if __name__ == '__main__':
    main()
