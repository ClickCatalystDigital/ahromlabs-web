#!/usr/bin/env python3
"""Writes three free Excel formats for Indian contractors, offered on the construction guides:
  public/construction/ra-bill-format.xlsx            /construction/ra-bills
  public/construction/measurement-book-format.xlsx   /construction/measurement-book
  public/construction/daily-progress-report-format.xlsx  /construction/daily-progress-reports
Shaded cells are typed in; everything else is a formula. The figures are a made-up worked example.
Run after changing it:  python3 scripts/build-construction-formats.py   (needs openpyxl)
The worked example's totals are recomputed here in Python and printed, so a formula typo shows up as a mismatch
once the file is opened and recalculated in Excel (the owner's check in docs/owner-todo.md)."""
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill

root = Path(__file__).resolve().parent.parent
outdir = root / "public" / "construction"
BOLD = Font(bold=True)
INPUT = PatternFill("solid", fgColor="FFF8E1")
HEAD = PatternFill("solid", fgColor="E8ECF4")
INR = "[>=10000000]##\\,##\\,##\\,##0.00;[>=100000]##\\,##\\,##0.00;##,##0.00"  # Indian lakh grouping: 12,88,140.00
CREDIT = "From ahromlabs.com, free under CC BY 4.0, credit Ahrom Labs. Not legal or tax advice: check rates with your CA."


def title(ws, text, note, cols):
    ws["A1"] = text
    ws["A1"].font = Font(bold=True, size=14)
    ws["A2"] = note + " " + CREDIT
    ws["A2"].alignment = Alignment(wrap_text=True, vertical="top")
    ws.merge_cells(f"A2:{cols}2")
    ws.row_dimensions[2].height = 48
    ws.oddFooter.right.text = "Ahrom Labs · ahromlabs.com"


def header(ws, row, names, widths):
    for i, (n, w) in enumerate(zip(names, widths), start=1):
        c = ws.cell(row, i, n)
        c.font, c.fill = BOLD, HEAD
        c.alignment = Alignment(wrap_text=True, vertical="top")
        ws.column_dimensions[c.column_letter].width = w


def inp(cell, value, fmt=None):
    cell.value, cell.fill = value, INPUT
    if fmt:
        cell.number_format = fmt


# ---------- RA bill
ITEMS = [  # item, description, unit, BOQ qty, rate, qty to previous bill, qty this bill
    ("1", "Excavation in foundation, all soils, lift up to 1.5 m", "m³", 420, 310, 420, 0),
    ("2", "PCC 1:4:8 in foundation", "m³", 38, 6200, 38, 0),
    ("3", "RCC M25 in columns and beams, excluding steel", "m³", 160, 9800, 90, 40),
    ("4", "Reinforcement steel Fe 500D, cut, bent and placed", "kg", 21000, 82, 11500, 6200),
    ("5", "Brick masonry 230 mm in CM 1:6", "m³", 210, 7400, 0, 55),
]
wb = Workbook()
ws = wb.active
ws.title = "RA bill"
title(ws, "Running account (RA) bill", "One sheet per bill: copy it for the next bill and move 'up to date' into 'previous'.", "L")
ws["A4"], ws["C4"] = "RA bill no.", 3
ws["A5"], ws["C5"] = "Work", "Sample residential block, structure"
ws["A6"], ws["C6"] = "Period", "1 to 31 October 2026"
for r in (4, 5, 6):
    ws[f"C{r}"].fill = INPUT
cols = ["Item", "Description", "Unit", "BOQ qty", "Rate (₹)", "Qty up to previous bill", "Qty this bill", "Qty up to date",
        "Amount up to date (₹)", "Amount previous (₹)", "Amount this bill (₹)", "Up to date as % of BOQ qty"]
header(ws, 8, cols, [6, 44, 6, 10, 10, 12, 10, 11, 15, 15, 15, 11])
first = 9
for i, (no, desc, unit, boq, rate, prev, now) in enumerate(ITEMS):
    r = first + i
    ws.cell(r, 1, no); ws.cell(r, 2, desc); ws.cell(r, 3, unit)
    inp(ws.cell(r, 4), boq, "#,##0.00"); inp(ws.cell(r, 5), rate, INR)
    inp(ws.cell(r, 6), prev, "#,##0.00"); inp(ws.cell(r, 7), now, "#,##0.00")
    ws.cell(r, 8, f"=F{r}+G{r}").number_format = "#,##0.00"
    ws.cell(r, 9, f"=H{r}*E{r}").number_format = INR
    ws.cell(r, 10, f"=F{r}*E{r}").number_format = INR
    ws.cell(r, 11, f"=G{r}*E{r}").number_format = INR
    ws.cell(r, 12, f"=IF(D{r}=0,\"\",H{r}/D{r})").number_format = "0%"
last = first + len(ITEMS) - 1
t = last + 1
ws.cell(t, 2, "Gross value of work").font = BOLD
for col in "IJK":
    c = ws[f"{col}{t}"]
    c.value, c.font, c.number_format = f"=SUM({col}{first}:{col}{last})", BOLD, INR

d = t + 2
ws.cell(d, 2, "Deductions and additions on this bill").font = BOLD
rows = [  # label, rate cell value, formula on this bill's gross
    ("Add: GST on works contract, % of this bill", 18, "add"),
    ("Less: security deposit, % of this bill", 5, "less"),
    ("Less: TDS on contractor payments, % of this bill", 2, "less"),
    ("Less: labour cess (BOCW), % of this bill", 1, "less"),
]
for j, (label, pct, kind) in enumerate(rows):
    r = d + 1 + j
    ws.cell(r, 2, label)
    inp(ws.cell(r, 4), pct, "0.00")
    ws.cell(r, 11, f"=K{t}*D{r}/100").number_format = INR
adv = d + 1 + len(rows)
ws.cell(adv, 2, "Less: recovery of mobilisation advance this bill (₹)")
inp(ws.cell(adv, 4), 150000, INR)
ws.cell(adv, 11, f"=D{adv}").number_format = INR
net = adv + 1
ws.cell(net, 2, "Net payable on this bill").font = BOLD
c = ws.cell(net, 11, f"=K{t}+K{d + 1}-SUM(K{d + 2}:K{adv})")
c.font, c.number_format = BOLD, INR
ws.cell(net + 2, 2, "Check each rate with your contract and CA: whether GST is on the gross, the TDS rate and section, the security deposit "
        "rate and the cess base depend on the contract and the law in force.").alignment = Alignment(wrap_text=True)
ws.merge_cells(start_row=net + 2, start_column=2, end_row=net + 2, end_column=11)
ws.row_dimensions[net + 2].height = 30
outdir.mkdir(parents=True, exist_ok=True)
wb.save(outdir / "ra-bill-format.xlsx")

# Expected worked example, computed independently.
gross_now = sum(now * rate for (_, _, _, _, rate, _, now) in ITEMS)
expect_net = gross_now * (1 + 0.18 - 0.05 - 0.02 - 0.01) - 150000
print(f"ra-bill: this bill gross {gross_now:,.2f}, net payable {expect_net:,.2f}")

# ---------- Measurement book
MB = [  # date, item, description of location, nos, length, breadth, depth/height
    ("2026-10-03", "3", "Columns C1-C8, ground floor", 8, 0.30, 0.45, 3.0),
    ("2026-10-09", "3", "Beams B1-B6, first floor", 6, 4.20, 0.23, 0.45),
    ("2026-10-16", "5", "External wall, grid 1, A-D", 1, 12.00, 0.23, 3.0),
    ("2026-10-16", "5", "Deduct door opening D1", -2, 1.00, 0.23, 2.1),
]
wb = Workbook()
ws = wb.active
ws.title = "Measurement book"
title(ws, "Measurement book (MB)", "Every measurement taken on site, dated and signed; quantities flow to the RA bill. Deductions are entered as negative numbers.", "K")
header(ws, 4, ["Date", "BOQ item", "Location and description", "Nos", "Length (m)", "Breadth (m)", "Depth / height (m)",
               "Quantity", "Measured by", "Checked by", "Remarks"], [11, 8, 36, 7, 10, 10, 11, 11, 14, 14, 18])
for i, (dt, item, loc, n, l, b, h) in enumerate(MB):
    r = 5 + i
    inp(ws.cell(r, 1), dt); inp(ws.cell(r, 2), item); inp(ws.cell(r, 3), loc)
    for col, v in zip((4, 5, 6, 7), (n, l, b, h)):
        inp(ws.cell(r, col), v, "0.000")
    ws.cell(r, 8, f"=D{r}*E{r}*F{r}*G{r}").number_format = "0.000"
s = 5 + len(MB) + 1
ws.cell(s, 3, "Total by BOQ item").font = BOLD
for k, item in enumerate(sorted({m[1] for m in MB})):
    r = s + 1 + k
    ws.cell(r, 2, item)
    ws.cell(r, 8, f'=SUMIF(B5:B{4 + len(MB)},"{item}",H5:H{4 + len(MB)})').number_format = "0.000"
wb.save(outdir / "measurement-book-format.xlsx")
for item in sorted({m[1] for m in MB}):
    print(f"measurement-book: item {item} total {sum(n * l * b * h for (_, it, _, n, l, b, h) in MB if it == item):.3f}")

# ---------- Daily progress report
wb = Workbook()
ws = wb.active
ws.title = "DPR"
title(ws, "Daily progress report (DPR)", "One sheet per site per day. Work done is against BOQ items, so it feeds the measurement book and the RA bill.", "G")
for r, (k, v) in enumerate([("Site", "Sample residential block"), ("Date", "2026-10-16"), ("Weather", "Clear"), ("Prepared by", "Site engineer")], start=4):
    ws.cell(r, 1, k).font = BOLD
    inp(ws.cell(r, 2, None), v)
header(ws, 9, ["BOQ item", "Work done today", "Unit", "Quantity", "Location", "Remarks", ""], [10, 40, 8, 10, 24, 30, 4])
for i, row in enumerate([("3", "RCC in beams B1-B6, first floor", "m³", 2.61, "First floor"), ("5", "Brick masonry, grid 1", "m³", 6.0, "Ground floor")]):
    for j, v in enumerate(row, start=1):
        inp(ws.cell(10 + i, j), v)
lab = 14
header(ws, lab, ["Labour", "Trade", "Count", "Contractor", "Hours", "", ""], [10, 40, 8, 10, 24, 30, 4])
for i, row in enumerate([("", "Mason", 6, "Own", 8), ("", "Helper", 10, "Own", 8), ("", "Bar bender", 4, "Sub: steel", 8)]):
    for j, v in enumerate(row, start=1):
        if v != "":
            inp(ws.cell(lab + 1 + i, j), v)
ws.cell(lab + 4, 2, "Total workers").font = BOLD
ws.cell(lab + 4, 3, f"=SUM(C{lab + 1}:C{lab + 3})")
mat = lab + 6
header(ws, mat, ["Material", "Item", "Unit", "Received", "Issued", "Balance at site", ""], [10, 40, 8, 10, 24, 30, 4])
for i, row in enumerate([("", "Cement (bags)", "bag", 200, 64), ("", "Sand", "m³", 0, 3.2)]):
    for j, v in enumerate(row, start=1):
        if v != "":
            inp(ws.cell(mat + 1 + i, j), v)
ws.cell(mat + 4, 1, "Issues, delays, visitors and instructions").font = BOLD
ws.merge_cells(start_row=mat + 5, start_column=1, end_row=mat + 8, end_column=6)
ws.cell(mat + 5, 1).fill = INPUT
wb.save(outdir / "daily-progress-report-format.xlsx")
print("daily-progress-report: written")


# ---------- Self-check: evaluate the saved formulas and compare with the Python figures above.
from xlsx_values import evaluate, store_values

ws, val = evaluate(outdir / "ra-bill-format.xlsx")
got = val(f"K{net}")
assert abs(got - expect_net) < 0.01 and abs(val(f"K{t}") - gross_now) < 0.01, (got, expect_net)
ws, val = evaluate(outdir / "measurement-book-format.xlsx")
for k, item in enumerate(sorted({m[1] for m in MB})):
    want = sum(n * l * b * h for (_, it, _, n, l, b, h) in MB if it == item)
    assert abs(val(f"H{s + 1 + k}") - want) < 1e-6, (item, val(f"H{s + 1 + k}"), want)


for f in ("ra-bill-format.xlsx", "measurement-book-format.xlsx", "daily-progress-report-format.xlsx"):
    store_values(outdir / f)
print("formats: formulas checked against the Python figures")
