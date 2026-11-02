#!/usr/bin/env python3
"""Writes public/manufacturing/job-cost-worked-example.xlsx: the free job cost workbook offered on
/manufacturing/quickbooks-job-costing, the spreadsheet version of the calculator on that page
(src/lib/manufacturing-calc.ts jobCost: same lines, same formulas, same worked example).
Run after changing it:  python3 scripts/build-job-cost-template.py   (needs openpyxl)"""
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill

root = Path(__file__).resolve().parent.parent
out = root / "public" / "manufacturing" / "job-cost-worked-example.xlsx"
NAVY, BOLD = PatternFill("solid", fgColor="1D3461"), Font(bold=True)
INPUT = PatternFill("solid", fgColor="FFF8E1")  # cells people type into

wb = Workbook()
ws = wb.active
ws.title = "Job cost"
ws["A1"] = "Job cost: estimated vs actual"
ws["A1"].font = Font(bold=True, size=14)
ws["A2"] = ("One job per sheet (copy the sheet for the next job). Type in the shaded cells; everything else is worked out. "
            "Labor is paid per person-hour; the shop rate covers the machine and overhead per machine-hour. The figures are a made-up "
            "worked example. From ahromlabs.com/manufacturing/quickbooks-job-costing, free under CC BY 4.0, credit Ahrom Labs.")
ws["A2"].alignment = Alignment(wrap_text=True, vertical="top")
ws.merge_cells("A2:D2")
ws.row_dimensions[2].height = 60
for col, w in zip("ABCD", [40, 16, 16, 16]):
    ws.column_dimensions[col].width = w

def inputs(row, label, value, fmt="#,##0.00"):
    ws.cell(row, 1, label)
    c = ws.cell(row, 2, value)
    c.fill, c.number_format = INPUT, fmt

ws["A4"] = "Job"; ws["A4"].font = BOLD
inputs(5, "Quantity ordered", 200, "#,##0")
inputs(6, "Price per part ($)", 18.50)
inputs(7, "Labor rate ($ per hour)", 32)
inputs(8, "Shop rate ($ per machine hour)", 65)
ws["A9"], ws["B9"] = "Cost per hour of setup or run time", "=B7+B8"
ws["B9"].number_format = "#,##0.00"

ws.append([])
ws.append(["Inputs", "Estimated", "Actual"])
head = ws.max_row
for c in range(1, 4):
    ws.cell(head, c).font = Font(bold=True, color="FFFFFF")
    ws.cell(head, c).fill = NAVY
rows = [("Material per part ($)", 4.20, 4.55), ("Setup (hours)", 2, 3.5), ("Run time per part (minutes)", 6, 7.5),
        ("Outside processing, total ($)", 300, 300), ("Scrapped parts (made again)", 0, 8), ("Rework (hours)", 0, 1.5)]
r0 = head + 1
for i, (label, e, a) in enumerate(rows):
    ws.cell(r0 + i, 1, label)
    for col, v in ((2, e), (3, a)):
        c = ws.cell(r0 + i, col, v)
        c.fill, c.number_format = INPUT, "#,##0.00"
mat, setup, run, outside, scrap, rework = (r0 + i for i in range(6))

ws.append([])
ws.append(["Cost", "Estimated", "Actual", "Difference"])
h2 = ws.max_row
for c in range(1, 5):
    ws.cell(h2, c).font = Font(bold=True, color="FFFFFF")
    ws.cell(h2, c).fill = NAVY
lines = [
    ("Material", "={c}%d*$B$5" % mat),
    ("Setup (labor + shop rate)", "={c}%d*$B$9" % setup),
    ("Run time (labor + shop rate)", "={c}%d*$B$5*$B$9/60" % run),
    ("Outside processing", "={c}%d" % outside),
    ("Scrapped parts (material + run time)", "={c}%d*({c}%d+{c}%d*$B$9/60)" % (scrap, mat, run)),
    ("Rework (labor + shop rate)", "={c}%d*$B$9" % rework),
]
first = h2 + 1
for i, (label, f) in enumerate(lines):
    r = first + i
    ws.cell(r, 1, label)
    ws.cell(r, 2, f.format(c="B")); ws.cell(r, 3, f.format(c="C")); ws.cell(r, 4, f"=C{r}-B{r}")
last = first + len(lines) - 1
tot = last + 1
ws.cell(tot, 1, "Total cost").font = BOLD
for col in "BCD":
    ws[f"{col}{tot}"] = f"=SUM({col}{first}:{col}{last})"
    ws[f"{col}{tot}"].font = BOLD
ws.cell(tot + 1, 1, "Revenue"); ws[f"B{tot + 1}"] = "=$B$5*$B$6"; ws[f"C{tot + 1}"] = "=$B$5*$B$6"
ws.cell(tot + 2, 1, "Margin ($)").font = BOLD
ws[f"B{tot + 2}"] = f"=B{tot + 1}-B{tot}"; ws[f"C{tot + 2}"] = f"=C{tot + 1}-C{tot}"
ws.cell(tot + 3, 1, "Margin (%)")
ws[f"B{tot + 3}"] = f"=IF(B{tot + 1}=0,\"\",B{tot + 2}/B{tot + 1})"; ws[f"C{tot + 3}"] = f"=IF(C{tot + 1}=0,\"\",C{tot + 2}/C{tot + 1})"
for r in range(first, tot + 3):
    for col in "BCD":
        ws[f"{col}{r}"].number_format = '"$"#,##0.00;-"$"#,##0.00'
for col in "BC":
    ws[f"{col}{tot + 3}"].number_format = "0.0%"

hrs = tot + 5
ws.cell(hrs, 1, "Hours (setup + run incl. scrapped parts + rework)")
for col in "BC":
    ws[f"{col}{hrs}"] = f"={col}{setup}+{col}{run}*($B$5+{col}{scrap})/60+{col}{rework}"
    ws[f"{col}{hrs}"].number_format = "#,##0.00"
ws.cell(hrs + 1, 1, "Hours used per hour quoted").font = BOLD
ws[f"C{hrs + 1}"] = f"=IF(B{hrs}=0,\"\",C{hrs}/B{hrs})"
ws[f"C{hrs + 1}"].number_format = "0.00"
ws[f"C{hrs + 1}"].font = BOLD
ws.cell(hrs + 2, 1, "Above 1 across several similar jobs: raise the quoted time for this kind of part.")
ws.cell(hrs + 2, 1).font = Font(italic=True)

out.parent.mkdir(parents=True, exist_ok=True)
wb.save(out)
print(f"wrote {out.relative_to(root)} ({out.stat().st_size // 1024} KB)")
