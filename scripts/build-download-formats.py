#!/usr/bin/env python3
"""Free formats offered on the guides, each as a printable Word file and PDF, and as Excel where a sheet is useful.
One description per format below; the three writers (docx, pdf, xlsx) read the same description, so the files agree.
Run after changing it:  python3 scripts/build-download-formats.py   (needs python-docx, reportlab, openpyxl)
The India construction Excel sheets come from build-construction-formats.py; this adds their Word and PDF versions.
Sample rows are made up and say so. Excel totals are recomputed in Python below and compared (self-check at the end)."""
import datetime
from pathlib import Path
from docx import Document
from docx.enum.section import WD_ORIENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Mm, Pt
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, LETTER, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from xlsx_values import evaluate, store_values

PUBLIC = Path(__file__).resolve().parent.parent / "public"
CREDIT = "From ahromlabs.com, free under CC BY 4.0, credit Ahrom Labs. A starting format, not legal, tax or engineering advice."
INR = "[>=10000000]##\\,##\\,##\\,##0.00;[>=100000]##\\,##\\,##0.00;##,##0.00"
USD = "$#,##0.00"
D = datetime.date

# A format: file (under public/, no extension), title, note, paper ("a4" | "letter"), wide (landscape), fields (labels
# filled by hand), tables [(heading, [(column, weight)], blank rows, sample rows)], boxes [(label, lines)], sign.
FORMATS = [
    dict(file="construction/ra-bill-format", title="Running account (RA) bill", paper="a4", wide=True,
         note="One sheet per bill. Quantities come from the measurement book; this bill is up to date less previous.",
         fields=["RA bill no.", "Date", "Name of work", "Agreement no.", "Contractor", "Period of this bill"],
         tables=[("", [("Item", 5), ("Description", 26), ("Unit", 5), ("BOQ qty", 8), ("Rate (₹)", 8), ("Qty up to previous bill", 9), ("Qty this bill", 8),
                       ("Qty up to date", 8), ("Amount up to date (₹)", 11), ("Amount this bill (₹)", 11)], 10, []),
                 ("Additions and deductions on this bill", [("Line", 40), ("Rate %", 10), ("Amount (₹)", 20)], 0,
                  [["Gross value of this bill", "", ""], ["Add: GST on works contract", "", ""], ["Less: security deposit", "", ""],
                   ["Less: TDS on contractor payments", "", ""], ["Less: labour cess (BOCW)", "", ""], ["Less: recovery of mobilisation advance", "", ""],
                   ["Net payable on this bill", "", ""]])],
         sign=["Prepared by (contractor)", "Checked by (engineer)", "Certified for payment"]),
    dict(file="construction/measurement-book-format", title="Measurement book (MB)", paper="a4", wide=True,
         note="Every measurement taken on site, dated and signed. Deductions are entered as negative numbers.",
         fields=["Name of work", "Agreement no.", "Contractor", "MB no. and page"],
         tables=[("", [("Date", 9), ("BOQ item", 7), ("Location and description", 30), ("Nos", 6), ("Length (m)", 8), ("Breadth (m)", 8),
                       ("Depth / height (m)", 9), ("Quantity", 9), ("Measured by", 11), ("Checked by", 11)], 16, [])],
         sign=["Measured by", "Checked by", "Accepted by (contractor)"]),
    dict(file="construction/daily-progress-report-format", title="Daily progress report (DPR)", paper="a4", wide=False,
         note="One sheet per site per day. Work done is recorded against BOQ items, so it feeds the measurement book.",
         fields=["Site", "Date", "Weather", "Prepared by"],
         tables=[("Work done today", [("BOQ item", 8), ("Work done", 34), ("Unit", 7), ("Quantity", 9), ("Location", 20)], 6, []),
                 ("Labour", [("Trade", 26), ("Count", 8), ("Own or subcontractor", 22), ("Hours", 8)], 5, []),
                 ("Material", [("Item", 26), ("Unit", 8), ("Received", 10), ("Issued", 10), ("Balance at site", 14)], 4, [])],
         boxes=[("Issues, delays, visitors and instructions", 4)], sign=["Site engineer", "Project manager"]),
    dict(file="construction/rate-analysis-format", title="Rate analysis", paper="a4", wide=False,
         note="One sheet per BOQ item. The percentages for water charges, and for overheads and profit, are typed: set them to your contract or schedule.",
         fields=["BOQ item", "Unit of the rate", "Description", "Date of rates"],
         tables=[("", [("Item", 34), ("Unit", 8), ("Quantity", 10), ("Rate (₹)", 12), ("Amount (₹)", 14)], 10, []),
                 ("", [("Line", 44), ("%", 8), ("Amount (₹)", 14)], 0,
                  [["Cost of materials, labour and tools and plant", "", ""], ["Water charges", "", ""], ["Overheads and profit", "", ""], ["Rate per unit", "", ""]])],
         sign=["Prepared by", "Checked by"]),
    dict(file="boq/interior-quotation-format", title="Interior design quotation", paper="a4", wide=False,
         note="Room by room, with the specification in each line. GST is shown separately; payments follow stages the client can see.",
         fields=["Client", "Quotation no.", "Site address", "Date", "Our GSTIN", "Valid until"],
         tables=[("Scope and prices", [("No.", 5), ("Room / area", 14), ("Item and specification", 36), ("Unit", 7), ("Qty", 7), ("Rate (₹)", 11), ("Amount (₹)", 13)], 12, []),
                 ("Totals", [("Line", 44), ("%", 8), ("Amount (₹)", 16)], 0,
                  [["Value of work", "", ""], ["Design fee", "", ""], ["Taxable value", "", ""], ["GST", "", ""], ["Total payable", "", ""]]),
                 ("Payment schedule", [("Stage", 44), ("%", 8), ("Amount (₹)", 16)], 0,
                  [["Booking, on signing", "", ""], ["Design approved, before material is ordered", "", ""], ["Carcass and civil work complete", "", ""],
                   ["Finishing complete, before handover", "", ""], ["After handover and snag list closed", "", ""]])],
         boxes=[("Not included (civil changes, appliances, loose furniture, society charges, and so on)", 3), ("Terms: timeline, brand equivalents, price changes, warranty", 4)],
         sign=["For the firm", "Accepted by the client"]),
    dict(file="asme/ncr-form", title="Nonconformance report (NCR)", paper="letter", wide=False,
         note="One report per nonconformance. The item stays tagged and on hold until the disposition is approved and verified.",
         fields=["NCR no.", "Date", "Job no.", "Customer", "Drawing and revision", "Part / item", "Heat, serial or weld no.", "ITP step", "Found by", "Found at (receiving, in process, final)"],
         boxes=[("Requirement (drawing, Code paragraph, specification or procedure)", 2), ("Nonconformance as found", 4),
                ("Disposition (circle one): repair / rework / use as is / reject / return to supplier. Reason:", 3),
                ("Repair or rework procedure (for a weld repair: the repair WPS and the welder)", 3),
                ("Re-inspection: method, acceptance criteria and result", 3), ("Cause and corrective action", 3)],
         sign=["Disposition approved by (QC manager)", "Authorized Inspector (where the manual requires)", "Customer (where the order requires)", "Verified and closed by, date"]),
    dict(file="asme/itp-template", title="Inspection and test plan (ITP)", paper="letter", wide=True,
         note="H = hold point, W = witness point, R = review of records, S = surveillance. The points in the sample rows are an example: "
              "the Inspector, the customer's specification and your quality manual set yours.",
         fields=["Job no.", "Customer", "Item / vessel", "Drawing and revision", "Code and edition", "ITP revision and date"],
         tables=[("", [("Step", 5), ("Activity", 26), ("Reference document", 16), ("Acceptance criteria", 16), ("Record produced", 14), ("Shop QC", 6),
                       ("AI", 5), ("Customer", 7), ("Prerequisite steps", 9), ("Sign-off: name, date, result", 16)], 8,
                  [["1.1", "Drawing and calculation review", "Drawing, calculations", "Code of construction", "Approved drawing", "R", "R", "R", "", ""],
                   ["2.1", "Material receipt against MTRs", "Purchase order, MTRs", "Material specification", "Receiving report", "H", "R", "R", "", ""],
                   ["2.2", "Heat number transfer before cutting", "Cut list", "Marking procedure", "Cut list signed", "H", "S", "S", "2.1", ""],
                   ["3.1", "Long seam fit-up", "Drawing, WPS", "WPS fit-up limits", "Fit-up record", "H", "S", "S", "2.2", ""],
                   ["4.1", "Visual examination of long seam", "Weld map", "Code acceptance criteria", "VT report", "H", "S", "S", "3.1", ""],
                   ["4.2", "RT or UT of long seam", "Weld map, NDE procedure", "Code acceptance criteria", "RT or UT report", "H", "R", "R", "4.1", ""],
                   ["8.1", "Hydrostatic test", "Test procedure", "Test pressure and hold time", "Test record, gauge IDs", "H", "H", "W", "4.2", ""],
                   ["9.1", "Final inspection, nameplate and data report", "Drawing, data report", "Code of construction", "Signed data report", "H", "H", "R", "8.1", ""]])],
         sign=["Prepared by (QC)", "Reviewed by (Authorized Inspector)", "Accepted by (customer)"]),
    dict(file="construction/punch-list-template", title="Punch list", paper="letter", wide=True,
         note="One line per item, one item per line, with the room and the trade. An item is closed when the person who raised it has checked it.",
         fields=["Project", "Walkthrough date", "Prepared by", "Substantial completion date"],
         tables=[("", [("No.", 6), ("Location", 16), ("Description", 30), ("Trade responsible", 12), ("Found by", 11), ("Date found", 9), ("Due date", 9),
                       ("Status", 9), ("Closed by", 11), ("Date closed", 9)], 14,
                  [["P-0147", "Level 2, room 214, east wall", "Outlet cover plate missing", "Electrical", "Owner's rep", D(2026, 3, 3), D(2026, 3, 10), "Closed", "Owner's rep", D(2026, 3, 9)],
                   ["P-0148", "Level 2, room 214, door frame", "Touch up paint, scuffed", "Painting", "Owner's rep", D(2026, 3, 3), D(2026, 3, 10), "Open", "", ""]])],
         sign=["Contractor", "Owner or architect"]),
    dict(file="construction/submittal-log", title="Submittal log", paper="letter", wide=True, xlsx_only=True,
         note="Every submittal with its dates. Days in review counts from the date sent to the date returned.",
         fields=["Project", "Contract review period (days)"],
         tables=[("", [("Submittal no.", 12), ("Rev.", 5), ("Spec section", 10), ("Description", 28), ("Type", 12), ("Subcontractor / supplier", 16), ("Date sent", 10),
                       ("Required back", 10), ("Date returned", 10), ("Days in review", 8), ("Review action", 16), ("Ball in court", 12), ("Lead time after approval (weeks)", 10), ("Linked items", 16)], 20,
                  [["23 05 00-003", 1, "23 05 00", "Hangers and supports, product data", "Product data", "Mechanical sub", D(2026, 3, 2), D(2026, 3, 16), D(2026, 3, 12), "=IF(I{r}=\"\",\"\",I{r}-G{r})", "Approved as noted", "Mechanical sub", 3, "PO 1184"],
                   ["08 11 13-001", 0, "08 11 13", "Hollow metal doors and frames, shop drawings", "Shop drawing", "Door supplier", D(2026, 3, 5), D(2026, 3, 19), "", "=IF(I{r}=\"\",\"\",I{r}-G{r})", "", "Architect", 8, ""]])]),
    dict(file="construction/rfi-log", title="RFI log", paper="letter", wide=True, xlsx_only=True,
         note="Every request for information with its dates. Days open counts from the date sent to the date answered.",
         fields=["Project"],
         tables=[("", [("RFI no.", 8), ("Date sent", 10), ("Subject / question", 32), ("Drawing or spec reference", 16), ("Sent to", 12), ("Answer required by", 10),
                       ("Date answered", 10), ("Days open", 8), ("Cost impact (Y/N)", 9), ("Schedule impact (Y/N)", 9), ("Change order request", 12), ("Status", 10)], 20,
                  [["RFI-021", D(2026, 3, 4), "Beam B-12 conflicts with duct main at grid C-4: lower the duct or reroute?", "S-201, M-102", "Architect", D(2026, 3, 11), D(2026, 3, 6), "=IF(G{r}=\"\",\"\",G{r}-B{r})", "N", "N", "", "Closed"],
                   ["RFI-022", D(2026, 3, 9), "Finish for stair 2 handrail is not in the finish schedule", "A-501", "Architect", D(2026, 3, 16), "", "=IF(G{r}=\"\",\"\",G{r}-B{r})", "", "", "", "Open"]])]),
    dict(file="interiors/ffe-schedule-template", title="FF&E schedule", paper="letter", wide=True, xlsx_only=True,
         note="One line per item, grouped by room. Extended cost and sell are formulas; the status follows the proposal, purchase order and receiving.",
         fields=["Client / project", "Date"],
         tables=[("", [("Tag", 8), ("Room", 12), ("Item", 26), ("Vendor", 14), ("Model / SKU", 12), ("Finish / fabric", 14), ("Qty", 6), ("Unit cost", 11), ("Extended cost", 12),
                       ("Markup %", 8), ("Sell (extended)", 12), ("Lead time (weeks)", 9), ("PO no.", 9), ("Status", 20)], 20,
                  [["LR-01", "Living", "Sofa, COM", "Workroom A", "", "COM, 14 yd", 1, 4200, "=G{r}*H{r}", 40, "=I{r}*(1+J{r}/100)", 10, "", "Approved, CFA sent"],
                   ["LR-02", "Living", "Lounge chair", "Vendor B", "", "", 2, 1150, "=G{r}*H{r}", 40, "=I{r}*(1+J{r}/100)", 6, "", "Ordered, acknowledged"],
                   ["LR-03", "Living", "Rug 9x12", "Vendor C", "", "", 1, 3600, "=G{r}*H{r}", 40, "=I{r}*(1+J{r}/100)", 4, "", "Proposal sent"],
                   ["DR-01", "Dining", "Table, walnut", "Vendor D", "", "Walnut", 1, 5800, "=G{r}*H{r}", 40, "=I{r}*(1+J{r}/100)", 14, "", "Back-ordered"],
                   ["DR-02", "Dining", "Pendant", "Vendor E", "", "", 2, 640, "=G{r}*H{r}", 40, "=I{r}*(1+J{r}/100)", 3, "", "Received"]])]),
]

# Ahrom Labs' mark, top right of the Word and PDF formats (these are our own formats; the IBR form PDFs are the
# Gazette's pages and carry nothing of ours). Cut from public/logo/a_logo.webp, trimmed, on white.
def logo_png():
    import tempfile
    from PIL import Image
    im = Image.open(PUBLIC / "logo" / "a_logo.webp").convert("RGBA")
    im = im.crop(im.split()[3].getbbox())
    flat = Image.new("RGB", im.size, "white")
    flat.paste(im, mask=im.split()[3])
    flat.thumbnail((240, 240))
    path = Path(tempfile.gettempdir()) / "ahrom-labs-mark.png"
    flat.save(path)
    return str(path), flat.width / flat.height


LOGO, LOGO_RATIO = logo_png()

show = lambda v: v.strftime("%-d %b %Y") if isinstance(v, D) else "" if isinstance(v, str) and v.startswith("=") else str(v)


# ---------- Word
def shade(cell, fill="E8ECF4"):
    el = OxmlElement("w:shd")
    el.set(qn("w:val"), "clear"); el.set(qn("w:color"), "auto"); el.set(qn("w:fill"), fill)
    cell._tc.get_or_add_tcPr().append(el)


def write_docx(f):
    doc = Document()
    sec = doc.sections[0]
    w, h = (Mm(210), Mm(297)) if f["paper"] == "a4" else (Mm(215.9), Mm(279.4))
    if f["wide"]:
        sec.orientation, w, h = WD_ORIENT.LANDSCAPE, h, w
    sec.page_width, sec.page_height = w, h
    sec.left_margin = sec.right_margin = sec.top_margin = sec.bottom_margin = Mm(14)
    doc.styles["Normal"].font.size = Pt(9)
    doc.core_properties.title, doc.core_properties.author = f["title"], "Ahrom Labs"
    head = sec.header.paragraphs[0]
    head.alignment = 2  # right
    head.add_run().add_picture(LOGO, height=Mm(6))
    brand = head.add_run("  Ahrom Labs · ahromlabs.com")
    brand.font.size = Pt(8)
    doc.add_heading(f["title"], level=1)
    doc.add_paragraph(f["note"])
    fields = f.get("fields", [])
    if fields:
        t = doc.add_table(rows=(len(fields) + 1) // 2, cols=4, style="Table Grid")
        for i, label in enumerate(fields):
            c = t.cell(i // 2, (i % 2) * 2)
            c.text = label; shade(c)
    for heading, cols, blank, rows in f.get("tables", []):
        doc.add_paragraph()
        if heading:
            doc.add_paragraph().add_run(heading).bold = True
        t = doc.add_table(rows=1, cols=len(cols), style="Table Grid")
        total = sum(wt for _, wt in cols)
        usable = sec.page_width - sec.left_margin - sec.right_margin
        for i, (name, wt) in enumerate(cols):
            c = t.rows[0].cells[i]
            c.text = name; shade(c)
            c.paragraphs[0].runs[0].bold = True
        for row in rows + [[""] * len(cols)] * blank:
            cells = t.add_row().cells
            for i, v in enumerate(row):
                cells[i].text = show(v)
        for r in t.rows:
            for i, (_, wt) in enumerate(cols):
                r.cells[i].width = int(usable * wt / total)
    for label, lines in f.get("boxes", []):
        doc.add_paragraph()
        t = doc.add_table(rows=2, cols=1, style="Table Grid")
        t.cell(0, 0).text = label; shade(t.cell(0, 0))
        t.cell(1, 0).text = "\n" * (lines - 1)
    if f.get("sign"):
        doc.add_paragraph()
        t = doc.add_table(rows=2, cols=len(f["sign"]), style="Table Grid")
        for i, label in enumerate(f["sign"]):
            t.cell(0, i).text = "\n\n"
            t.cell(1, i).text = label + " · name, signature, date"
    doc.add_paragraph()
    doc.add_paragraph().add_run(CREDIT).italic = True
    doc.save(PUBLIC / (f["file"] + ".docx"))


# ---------- PDF
SMALL = ParagraphStyle("small", fontName="Helvetica", fontSize=7.5, leading=9.5)
HEAD = ParagraphStyle("head", parent=SMALL, fontName="Helvetica-Bold")
GRID = [("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#8a93a6")), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("FONTSIZE", (0, 0), (-1, -1), 7.5)]
TINT = colors.HexColor("#E8ECF4")
P = lambda v, style=SMALL: Paragraph(show(v).replace("₹", "Rs").replace("&", "&amp;"), style)  # Helvetica has no rupee sign


def write_pdf(f):
    size = A4 if f["paper"] == "a4" else LETTER
    if f["wide"]:
        size = landscape(size)
    doc = SimpleDocTemplate(str(PUBLIC / (f["file"] + ".pdf")), pagesize=size, leftMargin=14 * mm, rightMargin=14 * mm, topMargin=12 * mm, bottomMargin=12 * mm,
                            title=f["title"], author="Ahrom Labs", subject=f["note"])
    usable = size[0] - 28 * mm
    out = [Paragraph(f["title"], ParagraphStyle("t", fontName="Helvetica-Bold", fontSize=14, leading=18)), P(f["note"]), Spacer(1, 4 * mm)]
    fields = f.get("fields", [])
    if fields:
        rows = [[P(fields[i], HEAD), "", P(fields[i + 1], HEAD) if i + 1 < len(fields) else "", ""] for i in range(0, len(fields), 2)]
        out += [Table(rows, colWidths=[usable * x for x in (0.2, 0.3, 0.2, 0.3)], style=TableStyle(GRID + [("BACKGROUND", (0, 0), (0, -1), TINT), ("BACKGROUND", (2, 0), (2, -1), TINT)])), Spacer(1, 4 * mm)]
    for heading, cols, blank, rows in f.get("tables", []):
        if heading:
            out.append(P(heading, HEAD)); out.append(Spacer(1, 1.5 * mm))
        total = sum(wt for _, wt in cols)
        data = [[P(name, HEAD) for name, _ in cols]] + [[P(v) for v in row] for row in rows] + [[""] * len(cols)] * blank
        heights = [None] * (1 + len(rows)) + [7 * mm] * blank
        out += [Table(data, colWidths=[usable * wt / total for _, wt in cols], rowHeights=heights, repeatRows=1, style=TableStyle(GRID + [("BACKGROUND", (0, 0), (-1, 0), TINT)])), Spacer(1, 4 * mm)]
    for label, lines in f.get("boxes", []):
        out += [Table([[P(label, HEAD)], [""]], colWidths=[usable], rowHeights=[None, lines * 6 * mm], style=TableStyle(GRID + [("BACKGROUND", (0, 0), (0, 0), TINT)])), Spacer(1, 3 * mm)]
    if f.get("sign"):
        n = len(f["sign"])
        out += [Table([[""] * n, [P(s + " · name, signature, date") for s in f["sign"]]], colWidths=[usable / n] * n, rowHeights=[12 * mm, None], style=TableStyle(GRID)), Spacer(1, 3 * mm)]
    out.append(Paragraph(CREDIT, ParagraphStyle("c", parent=SMALL, fontName="Helvetica-Oblique")))
    def brand(canvas, _doc):
        h = 6 * mm
        x = size[0] - 14 * mm - h * LOGO_RATIO
        canvas.drawImage(LOGO, x, size[1] - 10 * mm - h + 2 * mm, width=h * LOGO_RATIO, height=h)
        canvas.setFont("Helvetica", 7.5)
        canvas.drawRightString(x - 2 * mm, size[1] - 10 * mm - h + 4 * mm, "Ahrom Labs · ahromlabs.com")
    doc.build(out, onFirstPage=brand, onLaterPages=brand)


# ---------- Excel: a typed table with its sample rows (logs and schedules)
BOLD, INPUT, HEADFILL = Font(bold=True), PatternFill("solid", fgColor="FFF8E1"), PatternFill("solid", fgColor="E8ECF4")


def sheet(f):
    wb = Workbook()
    ws = wb.active
    ws.title = f["title"][:31]
    ws["A1"], ws["A1"].font = f["title"], Font(bold=True, size=14)
    ws["A2"] = f["note"] + " " + CREDIT.replace("A starting format", "Sample rows are made up. A starting format")
    ws["A2"].alignment = Alignment(wrap_text=True, vertical="top")
    ws.row_dimensions[2].height = 44
    return wb, ws


def header(ws, row, cols):
    for i, (name, wt) in enumerate(cols, start=1):
        c = ws.cell(row, i, name)
        c.font, c.fill, c.alignment = BOLD, HEADFILL, Alignment(wrap_text=True, vertical="top")
        ws.column_dimensions[get_column_letter(i)].width = max(ws.column_dimensions[get_column_letter(i)].width or 0, wt * 1.25)


def write_table_xlsx(f, money=()):
    wb, ws = sheet(f)
    _, cols, blank, rows = f["tables"][0]
    ws.merge_cells(start_row=2, start_column=1, end_row=2, end_column=min(len(cols), 10))
    first = 5
    hdr = first - 1
    header(ws, hdr, cols)
    for r, row in enumerate(rows + [[""] * len(cols)] * blank, start=first):
        for c, v in enumerate(row, start=1):
            if isinstance(v, str) and v.startswith("="):
                v = v.format(r=r)
            cell = ws.cell(r, c, v if v != "" else None)
            if isinstance(v, D):
                cell.number_format = "d mmm yyyy"
            if cols[c - 1][0] in money:
                cell.number_format = USD
            if not (isinstance(v, str) and v.startswith("=")):
                cell.fill = INPUT
    ws.freeze_panes = ws.cell(first, 1)
    return wb, ws, first, first + len(rows) - 1


def build_logs():
    for name in ("construction/submittal-log", "construction/rfi-log", "construction/punch-list-template", "asme/itp-template"):
        f = next(x for x in FORMATS if x["file"] == name)
        wb, ws, first, last = write_table_xlsx(f)
        if name.endswith("punch-list-template"):
            ws["L1"], ws["M1"] = "Open items", f'=COUNTIF(H{first}:H{first + 60},"Open")'
            ws["L1"].font = BOLD
        wb.save(PUBLIC / (name + ".xlsx"))
        store_values(PUBLIC / (name + ".xlsx"))
    # Self-checks on the sample rows.
    _, val = evaluate(PUBLIC / "construction/submittal-log.xlsx")
    assert val("J5") == 10 and val("J6") == "", (val("J5"), val("J6"))
    _, val = evaluate(PUBLIC / "construction/rfi-log.xlsx")
    assert val("H5") == 2 and val("H6") == "", (val("H5"), val("H6"))
    _, val = evaluate(PUBLIC / "construction/punch-list-template.xlsx")
    assert val("M1") == 1, val("M1")


def build_ffe():
    f = next(x for x in FORMATS if x["file"] == "interiors/ffe-schedule-template")
    wb, ws, first, last = write_table_xlsx(f, money=("Unit cost", "Extended cost", "Sell (extended)"))
    t = last + 22
    ws.cell(t, 3, "Totals (all rows above)").font = BOLD
    for col in ("I", "K"):
        c = ws[f"{col}{t}"]
        c.value, c.font, c.number_format = f"=SUM({col}{first}:{col}{t - 1})", BOLD, USD
    path = PUBLIC / "interiors/ffe-schedule-template.xlsx"
    wb.save(path); store_values(path)
    _, val = evaluate(path)
    # The guide's own table: cost 4,200 + 2x1,150 + 3,600 + 5,800 + 2x640 = 17,180; sell at 40% markup = 24,052.
    assert abs(val(f"I{t}") - 17180) < 0.01 and abs(val(f"K{t}") - 24052) < 0.01, (val(f"I{t}"), val(f"K{t}"))


def build_rate_analysis():
    f = next(x for x in FORMATS if x["file"] == "construction/rate-analysis-format")
    wb, ws = sheet(f)
    ws.merge_cells("A2:E2")
    ws["A4"], ws["B4"] = "BOQ item", "M20 nominal mix concrete (1:1.5:3) in slab, excluding reinforcement and shuttering"
    ws["A5"], ws["B5"] = "Unit of the rate", "m³"
    ws["B4"].fill = ws["B5"].fill = INPUT
    cols = [("Item", 34), ("Unit", 8), ("Quantity", 10), ("Rate (₹)", 12), ("Amount (₹)", 14)]
    header(ws, 7, cols)
    items = [("Cement", "bag", 8.0, 400), ("Coarse sand", "m³", 0.44, 2800), ("Stone aggregate 20 mm", "m³", 0.88, 2200), ("Mason", "day", 0.17, 1000),
             ("Beldar (helper)", "day", 2.0, 750), ("Mixer and vibrator hire, fuel (lump sum)", "LS", 1, 300)]
    for i, (name, unit, qty, rate) in enumerate(items + [("", "", None, None)] * 6):
        r = 8 + i
        for c, v in enumerate((name, unit, qty, rate), start=1):
            ws.cell(r, c, v if v != "" else None).fill = INPUT
        ws.cell(r, 4).number_format = INR
        ws.cell(r, 5, f"=C{r}*D{r}").number_format = INR
    last = 8 + len(items) + 5
    c = last + 1
    for r, (label, pct, formula) in enumerate([("Cost of materials, labour and tools and plant", None, f"=SUM(E8:E{last})"), ("Water charges, % of cost", 1, f"=ROUND(E{c}*B{c + 1}/100,0)"),
                                              ("Overheads and profit, % of cost", 15, f"=ROUND(E{c}*B{c + 2}/100,0)"), ("Rate per unit (₹)", None, f"=E{c}+E{c + 1}+E{c + 2}")], start=c):
        ws.cell(r, 1, label).font = BOLD
        if pct is not None:
            ws.cell(r, 2, pct).fill = INPUT
        ws.cell(r, 5, formula).number_format = INR
        ws.cell(r, 5).font = BOLD
    path = PUBLIC / "construction/rate-analysis-format.xlsx"
    wb.save(path); store_values(path)
    _, val = evaluate(path)
    assert (val(f"E{c}"), val(f"E{c + 1}"), val(f"E{c + 2}"), val(f"E{c + 3}")) == (8338, 83, 1251, 9672), [val(f"E{c + k}") for k in range(4)]  # the guide's figures


def build_quotation():
    f = next(x for x in FORMATS if x["file"] == "boq/interior-quotation-format")
    wb, ws = sheet(f)
    ws.merge_cells("A2:G2")
    for i, label in enumerate(f["fields"]):
        ws.cell(4 + i // 2, 1 + (i % 2) * 4, label).font = BOLD
        ws.cell(4 + i // 2, 2 + (i % 2) * 4).fill = INPUT
    cols = f["tables"][0][1]
    header(ws, 8, cols)
    lines = [("Kitchen", "Modular kitchen base and wall units, BWP plywood 18 mm, laminate 1 mm, soft-close hardware", "rft", 14, 5200),
             ("Master bedroom", "Wardrobe, BWR plywood 18 mm, laminate finish, hinged shutters", "sq ft", 84, 1450),
             ("Living room", "False ceiling, gypsum board 12.5 mm on GI frame, with cove", "sq ft", 220, 135),
             ("Whole flat", "Painting, premium emulsion, two coats over putty and primer", "sq ft", 2400, 32),
             ("Living room", "TV unit, plywood 18 mm with veneer and PU finish", "rft", 8, 3800)]
    for i, row in enumerate(lines + [("", "", "", None, None)] * 8):
        r = 9 + i
        ws.cell(r, 1, i + 1 if row[0] else None)
        for c, v in enumerate(row, start=2):
            cell = ws.cell(r, c, v if v != "" else None)
            cell.fill = INPUT
            cell.alignment = Alignment(wrap_text=True, vertical="top")
        ws.cell(r, 6).number_format = INR
        ws.cell(r, 7, f"=E{r}*F{r}").number_format = INR
    last = 9 + len(lines) + 7
    t = last + 2
    rows = [("Value of work", None, f"=SUM(G9:G{last})"), ("Design fee, % of the value of work", 8, f"=G{t}*F{t + 1}/100"), ("Taxable value", None, f"=G{t}+G{t + 1}"),
            ("GST, %", 18, f"=G{t + 2}*F{t + 3}/100"), ("Total payable", None, f"=G{t + 2}+G{t + 3}")]
    for r, (label, pct, formula) in enumerate(rows, start=t):
        ws.cell(r, 3, label).font = BOLD
        if pct is not None:
            ws.cell(r, 6, pct).fill = INPUT
        ws.cell(r, 7, formula).number_format = INR
        ws.cell(r, 7).font = BOLD
    s = t + len(rows) + 1
    ws.cell(s, 3, "Payment schedule").font = BOLD
    stages = [(x[0], p) for x, p in zip(f["tables"][2][3], (10, 40, 30, 15, 5))]
    for r, (label, pct) in enumerate(stages, start=s + 1):
        ws.cell(r, 3, label)
        ws.cell(r, 6, pct).fill = INPUT
        ws.cell(r, 7, f"=G{t + 4}*F{r}/100").number_format = INR
    path = PUBLIC / "boq/interior-quotation-format.xlsx"
    wb.save(path); store_values(path)
    _, val = evaluate(path)
    work = sum(q * rate for _, _, _, q, rate in lines)
    total = work * 1.08 * 1.18
    assert abs(val(f"G{t}") - work) < 0.01 and abs(val(f"G{t + 4}") - total) < 0.01, (val(f"G{t}"), work, val(f"G{t + 4}"), total)
    assert abs(sum(val(f"G{r}") for r in range(s + 1, s + 6)) - total) < 0.01
    print(f"interior quotation sample: work {work:,.0f}, total payable {total:,.2f}")


for f in FORMATS:
    if not f.get("xlsx_only"):
        write_docx(f); write_pdf(f)
build_logs(); build_ffe(); build_rate_analysis(); build_quotation()
print(f"formats: {sum(1 for f in FORMATS if not f.get('xlsx_only'))} Word and PDF pairs, 7 Excel files; sample totals checked")
