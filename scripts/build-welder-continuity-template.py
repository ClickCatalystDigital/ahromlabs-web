#!/usr/bin/env python3
"""Writes public/asme/welder-continuity-log.xlsx: the free welder continuity log offered on
/asme/welder-continuity, the spreadsheet version of the checker on that page (QW-322: a welder's
qualification for a process lapses after six months without welding with it).
Run after changing it:  python3 scripts/build-welder-continuity-template.py   (needs openpyxl)"""
from pathlib import Path
from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation

root = Path(__file__).resolve().parent.parent
out = root / "public" / "asme" / "welder-continuity-log.xlsx"
ROWS = 200
HEAD = ["Welder ID (stamp)", "Welder name", "Process", "WPQ reference", "Last weld with this process", "Job or weld no.", "Signed off by", "Lapses on", "Days left", "Status"]
WIDTH = [16, 22, 10, 16, 18, 16, 16, 13, 10, 22]

wb = Workbook()
ws = wb.active
ws.title = "Continuity log"
ws.append(["Welder continuity log (ASME Section IX, QW-322)"])
ws["A1"].font = Font(bold=True, size=14)
ws.append(["One row per welder per process. Update the last weld date whenever the welder welds with that process; the sheet works out when the qualification lapses (six months later). From ahromlabs.com/asme/welder-continuity, free under CC BY 4.0, credit Ahrom Labs. Not engineering advice: check against your copy of Section IX."])
ws["A2"].alignment = Alignment(wrap_text=True, vertical="top")
ws.merge_cells("A2:J2")
ws.row_dimensions[2].height = 45
ws.append([])
ws.append(HEAD)
head = ws.max_row
for c, w in enumerate(WIDTH, 1):
    ws.cell(head, c).font = Font(bold=True, color="FFFFFF")
    ws.cell(head, c).fill = PatternFill("solid", fgColor="1D3461")
    ws.cell(head, c).alignment = Alignment(wrap_text=True, vertical="center")
    ws.column_dimensions[chr(64 + c)].width = w
ws.row_dimensions[head].height = 32

samples = [["W-12", "", "SMAW", "WPQ-012-SMAW", "2026-05-02", "J-2311 / W14"], ["W-12", "", "GTAW", "WPQ-012-GTAW", "2026-01-15", "J-2290 / W03"], ["W-31", "", "GMAW", "WPQ-031-GMAW", "2026-03-28", "J-2301 / W22"]]
first = head + 1
for i in range(ROWS):
    r = first + i
    if i < len(samples):
        for c, v in enumerate(samples[i], 1):
            ws.cell(r, c, v)
        y, m, d = map(int, samples[i][4].split("-"))
        from datetime import date
        ws.cell(r, 5).value = date(y, m, d)
    ws.cell(r, 5).number_format = "yyyy-mm-dd"
    ws.cell(r, 8).value = f'=IF(ISNUMBER(E{r}),EDATE(E{r},6),"")'
    ws.cell(r, 8).number_format = "yyyy-mm-dd"
    ws.cell(r, 9).value = f'=IF(ISNUMBER(H{r}),H{r}-TODAY(),"")'
    ws.cell(r, 10).value = f'=IF(ISNUMBER(I{r}),IF(I{r}<=0,"Lapsed: requalify",IF(I{r}<=30,"Weld with it within "&I{r}&IF(I{r}=1," day"," days"),"OK")),"")'
last = first + ROWS - 1

procs = DataValidation(type="list", formula1='"SMAW,GTAW,GMAW,FCAW,SAW,PAW,OFW"', allow_blank=True)
ws.add_data_validation(procs)
procs.add(f"C{first}:C{last}")
red, amber = PatternFill("solid", fgColor="F8D7DA"), PatternFill("solid", fgColor="FFF3CD")
ws.conditional_formatting.add(f"J{first}:J{last}", FormulaRule(formula=[f'LEFT($J{first},6)="Lapsed"'], fill=red))
ws.conditional_formatting.add(f"J{first}:J{last}", FormulaRule(formula=[f'LEFT($J{first},4)="Weld"'], fill=amber))
ws.freeze_panes = ws.cell(first, 1)
ws.auto_filter.ref = f"A{head}:J{last}"

out.parent.mkdir(parents=True, exist_ok=True)
wb.save(out)
print(f"wrote {out.relative_to(root)} ({out.stat().st_size // 1024} KB, {ROWS} rows)")
