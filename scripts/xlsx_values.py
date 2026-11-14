"""Shared by the format builders (build-construction-formats.py, build-download-formats.py): a small evaluator for
the formulas these sheets use, and store_values(), which writes each formula's result into the file so viewers that
don't recalculate (Quick Look, phone previews) show the figures. Excel recalculates on opening anyway.
ponytail: handles + - * /, SUM, SUMIF, COUNTIF, ROUND(x,0), IF(a=0,"",b/c) and IF(a="","",b-c); a real engine if it grows."""
import datetime
import re
import zipfile
from openpyxl import load_workbook


def evaluate(path):
    ws = load_workbook(path).active
    cache = {}

    def val(ref):
        if ref in cache:
            return cache[ref]
        v = ws[ref].value
        if isinstance(v, str) and v.startswith("="):
            v = calc(v[1:])
        cache[ref] = v if v is not None else 0
        return cache[ref]

    def rng(a, b):
        (ca, ra), (cb, rb) = re.match(r"([A-Z]+)(\d+)", a).groups(), re.match(r"([A-Z]+)(\d+)", b).groups()
        return [f"{c}{r}" for c in (chr(x) for x in range(ord(ca), ord(cb) + 1)) for r in range(int(ra), int(rb) + 1)]

    def calc(f):
        m = re.fullmatch(r'SUMIF\((\w+):(\w+),"([^"]*)",(\w+):(\w+)\)', f)
        if m:
            keys, vals = rng(m[1], m[2]), rng(m[4], m[5])
            return sum(val(v) for k, v in zip(keys, vals) if str(ws[k].value) == m[3])
        m = re.fullmatch(r'COUNTIF\((\w+):(\w+),"([^"]*)"\)', f)
        if m:
            return sum(1 for k in rng(m[1], m[2]) if str(ws[k].value) == m[3])
        m = re.fullmatch(r'IF\((\w+)=0,"",(\w+)/(\w+)\)', f)
        if m:
            return "" if val(m[1]) == 0 else val(m[2]) / val(m[3])
        m = re.fullmatch(r'IF\((\w+)="","",(\w+)-(\w+)\)', f)
        if m:
            if val(m[1]) in ("", 0):
                return ""
            d = val(m[2]) - val(m[3])
            return d.days if isinstance(d, datetime.timedelta) else d
        m = re.fullmatch(r"ROUND\((.*),0\)", f)
        if m:
            return int(calc(m[1]) + 0.5)
        f = re.sub(r"SUM\((\w+):(\w+)\)", lambda m: "(" + "+".join(f"val('{r}')" for r in rng(m[1], m[2])) + ")", f)
        f = re.sub(r"(?<!')\b([A-Z]{1,2}\d+)\b(?!')", r"val('\1')", f)
        return eval(f)

    return ws, val


def store_values(path):
    """openpyxl writes formulas with empty cached values; fill them in."""
    ws, val = evaluate(path)
    name = "xl/worksheets/sheet1.xml"
    with zipfile.ZipFile(path) as z:
        files = {n: z.read(n) for n in z.namelist()}
    xml = files[name].decode()

    def fill(m):
        v = val(m[1])
        if v == "":
            return m[0].replace("<v></v>", "").replace("<v />", "")
        return m[0].replace("<v></v>", f"<v>{v!r}</v>").replace("<v />", f"<v>{v!r}</v>")
    xml = re.sub(r'<c r="([A-Z]+\d+)"[^>]*><f>[^<]*</f><v ?/?>(?:</v>)?', fill, xml)
    files[name] = xml.encode()
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        for n, b in files.items():
            z.writestr(n, b)
