#!/usr/bin/env python3
"""Writes public/manufacturing/job-shop-schedule-template.xlsx: the free production schedule template offered on
/manufacturing/production-schedule-template. Three sheets: Machines (hours per day), Jobs (each job's routing
with a planned day, flagged when it's after the due date or before the previous operation) and Load (hours booked
per machine per day, red when over capacity). Filled in with the jobs of the schedule demo
(src/lib/manufacturing-calc.ts SCHEDULE_DEMO, with the rush order), planned by the same rule: earliest due date
first, each operation on the day its machine and the previous operation are free.
Run after changing it:  python3 scripts/build-schedule-template.py   (needs openpyxl)"""
from datetime import date, timedelta
from pathlib import Path
from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation

root = Path(__file__).resolve().parent.parent
out = root / "public" / "manufacturing" / "job-shop-schedule-template.xlsx"
NAVY, INPUT = PatternFill("solid", fgColor="1D3461"), PatternFill("solid", fgColor="FFF8E1")
RED, AMBER = PatternFill("solid", fgColor="F8D7DA"), PatternFill("solid", fgColor="FFF3CD")
ROWS, DAYS = 200, 20

MACHINES = [("Laser", 8), ("Brake", 8), ("Weld", 8)]
JOBS = [  # same as SCHEDULE_DEMO plus its rush order; due = working day number
    ("J-106 rush order", 1, [("Laser", 2), ("Weld", 4)]),
    ("J-102 covers", 2, [("Laser", 3), ("Brake", 4)]),
    ("J-101 brackets", 3, [("Laser", 4), ("Brake", 6), ("Weld", 5)]),
    ("J-104 guards", 3, [("Laser", 2), ("Brake", 3), ("Weld", 3)]),
    ("J-103 frames", 4, [("Laser", 5), ("Weld", 10)]),
    ("J-105 panels", 5, [("Laser", 6), ("Brake", 5)]),
]
START = date(2026, 11, 9)  # a Monday


def workday(n):  # working day n (1 = START), Monday to Friday
    d, left = START, n - 1
    while left:
        d += timedelta(days=1)
        if d.weekday() < 5:
            left -= 1
    return d


def head(ws, row, labels, widths):
    for c, (label, w) in enumerate(zip(labels, widths), 1):
        cell = ws.cell(row, c, label)
        cell.font, cell.fill = Font(bold=True, color="FFFFFF"), NAVY
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        ws.column_dimensions[cell.column_letter].width = w
    ws.row_dimensions[row].height = 30


wb = Workbook()

# Machines
m = wb.active
m.title = "Machines"
m["A1"] = "Machines and hours per day"
m["A1"].font = Font(bold=True, size=14)
m["A2"] = "One row per machine or work center. Hours per day: 8 for one shift, 16 for two."
head(m, 4, ["Machine", "Hours per day"], [22, 14])
for i in range(30):
    r = 5 + i
    if i < len(MACHINES):
        m.cell(r, 1, MACHINES[i][0]); m.cell(r, 2, MACHINES[i][1])
    m.cell(r, 1).fill = m.cell(r, 2).fill = INPUT

# Jobs
j = wb.create_sheet("Jobs")
j["A1"] = "Jobs and routings"
j["A1"].font = Font(bold=True, size=14)
j["A2"] = ("One row per operation, in routing order, job by job. Type the planned day for each operation; the sheet "
           "flags an operation planned after the job's due date or before the job's previous operation. The Load sheet "
           "shows whether any machine is over its hours that day. From ahromlabs.com/manufacturing/production-schedule-template, "
           "free under CC BY 4.0, credit Ahrom Labs.")
j["A2"].alignment = Alignment(wrap_text=True, vertical="top")
j.merge_cells("A2:H2")
j.row_dimensions[2].height = 60
head(j, 4, ["Job", "Due date", "Op", "Machine", "Hours", "Planned day", "Check", "Notes"], [20, 12, 6, 14, 8, 12, 30, 24])
first = 5
free, r = {}, first
for job, due, ops in JOBS:
    ready = 0
    for k, (mach, hrs) in enumerate(ops, 1):
        start = max(free.get(mach, 0), ready)
        free[mach] = ready = start + hrs
        j.cell(r, 1, job); j.cell(r, 2, workday(due)); j.cell(r, 3, k * 10); j.cell(r, 4, mach); j.cell(r, 5, hrs)
        j.cell(r, 6, workday(start // 8 + 1))
        r += 1
last = first + ROWS - 1
for row in range(first, last + 1):
    for c in range(1, 9):
        if c != 7:
            j.cell(row, c).fill = INPUT
    j.cell(row, 2).number_format = j.cell(row, 6).number_format = "ddd d mmm"
    j.cell(row, 7).value = (f'=IF(OR(A{row}="",F{row}=""),"",IF(F{row}>B{row},"After due date",'
                            f'IF(AND(A{row}=A{row - 1},ISNUMBER(F{row - 1}),F{row}<F{row - 1}),"Before previous operation","OK")))') if row > first else \
                           f'=IF(OR(A{row}="",F{row}=""),"",IF(F{row}>B{row},"After due date","OK"))'
machines = DataValidation(type="list", formula1="=Machines!$A$5:$A$34", allow_blank=True)
j.add_data_validation(machines)
machines.add(f"D{first}:D{last}")
j.conditional_formatting.add(f"G{first}:G{last}", FormulaRule(formula=[f'$G{first}="After due date"'], fill=RED))
j.conditional_formatting.add(f"G{first}:G{last}", FormulaRule(formula=[f'$G{first}="Before previous operation"'], fill=AMBER))
j.freeze_panes = j.cell(first, 1)

# Load
ld = wb.create_sheet("Load")
ld["A1"] = "Hours booked per machine per day"
ld["A1"].font = Font(bold=True, size=14)
ld["A2"] = "First day:"
ld["B2"] = START
ld["B2"].fill, ld["B2"].number_format = INPUT, "ddd d mmm yyyy"
ld["C2"] = "Red: more hours booked than the machine has that day. An operation's hours all count on its planned day."
ld.cell(4, 1, "Machine").font = Font(bold=True, color="FFFFFF")
ld.cell(4, 1).fill = NAVY
ld.column_dimensions["A"].width = 18
for d in range(DAYS):
    c = ld.cell(4, 2 + d, "=B2" if d == 0 else f"=WORKDAY({ld.cell(4, 1 + d).coordinate},1)")
    c.number_format, c.font, c.fill = "ddd d mmm", Font(bold=True, color="FFFFFF"), NAVY
    ld.column_dimensions[c.column_letter].width = 10
for i in range(30):
    row = 5 + i
    ld.cell(row, 1, f'=IF(Machines!A{5 + i}="","",Machines!A{5 + i})')
    for d in range(DAYS):
        col = ld.cell(4, 2 + d).column_letter
        ld.cell(row, 2 + d, f'=IF($A{row}="","",SUMIFS(Jobs!$E${first}:$E${last},Jobs!$D${first}:$D${last},$A{row},Jobs!$F${first}:$F${last},{col}$4))')
end = ld.cell(34, 1 + DAYS).coordinate
ld.conditional_formatting.add(f"B5:{end}", FormulaRule(formula=[f'AND(ISNUMBER(B5),B5>Machines!$B5)'], fill=RED))
ld.freeze_panes = "B5"

out.parent.mkdir(parents=True, exist_ok=True)
wb.save(out)
print(f"wrote {out.relative_to(root)} ({out.stat().st_size // 1024} KB)")
