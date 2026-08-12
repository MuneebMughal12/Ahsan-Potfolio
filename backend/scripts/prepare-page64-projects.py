import json
import re
import subprocess
from pathlib import Path

import pdfplumber
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
PDF = ROOT / 'tmp' / 'pdfs' / 'portfolio-source.pdf'
OUT = ROOT / 'tmp' / 'page64-projects'
POPPLER = Path(r'C:\Users\munee\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe')

RESIDENTIAL_PAGES = [
    70, 71, *range(74, 83), *range(86, 91), 105,
    *range(116, 124), *range(126, 142), 143, 144, 145,
]
COMMERCIAL_PAGES = [124, 142, 217, 218]
PAGES = RESIDENTIAL_PAGES + COMMERCIAL_PAGES


def clean(value):
    return re.sub(r'\s+', ' ', value or '').strip(' ,.-|')


def metadata(page_number, text):
    code_matches = re.findall(r'GCE[-\s]?\d+(?:\.\d+)?-\d{2}', text, re.I)
    unique_codes = list(dict.fromkeys(clean(value).replace(' ', '-') for value in code_matches))
    # Some presentation pages repeat the previous project's code in the margin.
    # The final distinct code on the page belongs to the large main render.
    code = unique_codes[-1] if unique_codes else f'PAGE-{page_number}'
    first = clean(text.split('|')[0])
    location = first.split('–', 1)[-1] if '–' in first else first.split('---', 1)[-1]
    location = clean(re.sub(r'^GCE[-\s]?\d+(?:\.\d+)?-\d{2}', '', location, flags=re.I))
    replacements = {
        'Taj residencia': 'Taj Residencia, Rawalpindi',
        'Taj Residencia': 'Taj Residencia, Rawalpindi',
        'Rehbar Housing Society': 'Rehbar Housing Society, Rawalpindi',
        'I-14/3': 'I-14/3, Islamabad',
        'i-14': 'I-14, Islamabad',
        'I-15': 'I-15, Islamabad',
        'i-15': 'I-15, Islamabad',
        'Gulberg Greens': 'Gulberg Greens, Islamabad',
        'Naval Anchorage': 'Naval Anchorage, Islamabad',
        'Park View City': 'Park View City, Islamabad',
        'Multi Garden B-17': 'B-17, Islamabad',
        'Air Port Green Garden': 'Airport Green Garden, Islamabad',
        'PAC': 'PAC Kamra, Pakistan',
        'TRAG': 'TRAG, Mianwali',
    }
    for key, value in replacements.items():
        if key.lower() in location.lower() or key.lower() in text.lower():
            location = value
            break
    if not location or len(location) > 80:
        location = 'Islamabad, Pakistan'

    category = 'Commercial' if page_number in COMMERCIAL_PAGES else 'Residential'
    place = location.split(',')[0]
    kind = 'Commercial Design' if category == 'Commercial' else ('Villa' if re.search(r'villa|classical|mediterranean', text, re.I) else 'House')
    title = f'{place} {kind} - {code}'
    area_match = re.search(r"\d{2,3}\s*[′'…]?\s*[x×‾]\s*\d{2,3}", text)
    area = clean(area_match.group(0)).replace('‾', 'x').replace('×', 'x') if area_match else ''
    year_match = re.search(r'-(\d{2})$', code)
    year = 2000 + int(year_match.group(1)) if year_match else 2026
    description = clean(text)
    if len(description) < 60:
        description = f'A contemporary {kind.lower()} project in {location}, selected from the architectural portfolio presentation.'
    return {
        'title': title,
        'slug': re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-'),
        'projectCode': code,
        'description': description[:900],
        'category': category,
        'location': location,
        'year': year,
        'area': area,
        'status': 'Completed',
        'featured': page_number in [70, 74, 83, 105, 116, 121],
        'order': PAGES.index(page_number) + 1,
        'sourcePages': [page_number],
    }


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    projects = []
    with pdfplumber.open(PDF) as pdf:
        for page_number in PAGES:
            page = pdf.pages[page_number - 1]
            text = (page.extract_text() or '').replace('\n', ' | ')
            item = metadata(page_number, text)
            prefix = OUT / f'page-{page_number}'
            subprocess.run([
                str(POPPLER), '-f', str(page_number), '-l', str(page_number),
                '-singlefile', '-jpeg', '-r', '180', '-jpegopt', 'quality=92',
                str(PDF), str(prefix),
            ], check=True)
            source = prefix.with_suffix('.jpg')
            with Image.open(source) as image:
                width, height = image.size
                crop = image.crop((0, 0, width, int(height * 0.665)))
                crop.save(source, 'JPEG', quality=92, optimize=True)
            item['localImage'] = str(source)
            projects.append(item)
    (OUT / 'manifest.json').write_text(json.dumps(projects, indent=2), encoding='utf-8')
    print(f'Prepared {len(projects)} projects: {len(RESIDENTIAL_PAGES)} residential, {len(COMMERCIAL_PAGES)} commercial')


if __name__ == '__main__':
    main()
