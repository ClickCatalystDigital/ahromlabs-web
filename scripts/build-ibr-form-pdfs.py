#!/usr/bin/env python3
"""Cuts each IBR 2026 form out of the Gazette into its own PDF: public/ibr/pdf/ibr-2026-<slug>.pdf, linked from
/ibr/forms/<slug>. The pages are the Gazette's own (No. 596, 1 October 2026), untouched, so the form is exactly as
notified. Run after the Gazette is amended:  python3 scripts/build-ibr-form-pdfs.py   (needs PyMuPDF)
Each form starts at the top of a Gazette page, so a form is the pages from its heading to the next form's heading.
Self-check: the first page of every file must carry that form's own heading, or the script stops."""
import os
import re
import sys
from pathlib import Path
import fitz

GAZETTE = Path(os.environ.get("IBR_SOURCES", "/Users/pujan/Developer/FOLDER SAMPLE - FOR APP/IBR 2026/sources")) / "IBR 2026 - Gazette No 596 2026-10-01.pdf"
OUT = Path(__file__).resolve().parent.parent / "public" / "ibr" / "pdf"
# slug -> (first Gazette page, heading on that page). Form VI and Form VII are one page each on the site, all parts.
STARTS = [
    ("form-i-part-a", 867, "FORM-I", "PART-A"), ("form-i-part-b", 868, "FORM-I", "PART-B"), ("form-i-part-c", 870, "FORM-I", "PART-C"),
    ("form-i-part-d", 872, "FORM-I", "PART-D"), ("form-i-part-e", 873, "FORM-I", "PART-E"), ("form-ii", 874, "FORM-II", ""),
    ("form-iii", 876, "FORM-III", ""), ("form-iv-part-a", 878, "FORM-IV", "PART-A"), ("form-iv-part-b", 882, "FORM-IV", "PART-B"),
    ("form-iv-part-c", 885, "FORM-IV", "PART-C"), ("form-iv-part-d", 889, "FORM-IV", "PART-D"), ("form-iv-part-e", 892, "FORM-IV", "PART-E"),
    ("form-iv-part-f", 893, "FORM-IV", "PART-F"), ("form-iv-part-g", 894, "FORM-IV", "PART-G"), ("form-iv-part-h", 896, "FORM-IV", "PART-H"),
    ("form-v-part-a", 898, "FORM-V", "PART-A"), ("form-v-part-b", 899, "FORM-V", "PART-B"), ("form-vi", 900, "FORM-VI", "PART-A"),
    ("form-vii", 911, "FORM-VII", "PART-A"), ("form-viii", 920, "FORM-VIII", ""), ("form-ix", 921, "FORM-IX", ""), ("form-x", 923, "FORM-X", ""),
    ("form-xi", 924, "FORM-XI", ""), ("form-xii", 934, "FORM-XII", ""), ("form-xiii", 936, "FORM-XIII", ""), ("form-xiv", 937, "FORM- XIV", ""),
    ("form-xv", 941, "FORM-XV", ""), ("form-xvi", 942, "FORM-XVI", ""), ("form-xvii", 944, "FORM-XVII", ""), ("form-xviii", 945, "FORM-XVIII", ""),
    ("form-xix", 949, "FORM-XIX", ""), ("form-xx", 951, "FORM-XX", ""), ("form-xxi", 953, "FORM-XXI", ""), ("form-xxii", 956, "FORM-XXII", ""),
    ("form-xxiii", 958, "FORM-XXIII", ""),
]
END = 960  # Appendix A starts here, after Form XXIII

doc = fitz.open(GAZETTE)
assert "APPENDIX-A" in doc[END - 1].get_text(), "the page after Form XXIII is no longer Appendix A; re-check the page numbers"
OUT.mkdir(parents=True, exist_ok=True)
total = 0
for i, (slug, first, heading, part) in enumerate(STARTS):
    last = (STARTS[i + 1][1] if i + 1 < len(STARTS) else END) - 1
    top = re.sub(r"\s+", " ", doc[first - 1].get_text())
    if not re.search(re.escape(heading) + r"\s", top) or (part and part not in top):
        sys.exit(f"{slug}: Gazette page {first} does not carry {heading} {part}")
    out = fitz.open()
    out.insert_pdf(doc, from_page=first - 1, to_page=last - 1)
    out.set_metadata({"title": f"IBR 2026 {heading.replace('FORM-', 'Form ').replace('- ', '')} {part.replace('PART-', 'Part ')}".strip() + " (Gazette of India, No. 596, 1 October 2026)",
                      "author": "Central Boilers Board, Government of India", "subject": f"Gazette pages {first} to {last}", "creator": "ahromlabs.com/ibr/forms"})
    out.subset_fonts()  # the Gazette embeds whole Hindi and English fonts on every page
    path = OUT / f"ibr-2026-{slug}.pdf"
    out.save(path, garbage=4, deflate=True)
    total += path.stat().st_size
    print(f"{slug}: Gazette pages {first}-{last}, {path.stat().st_size // 1024} KB")
print(f"{len(STARTS)} forms, {total // 1024} KB in all")
