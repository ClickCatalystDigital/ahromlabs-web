#!/usr/bin/env python3
"""Turns generated PNGs into the ASME hub's page art, the same way as the other hubs' images.

    python3 scripts/asme-images.py ~/Downloads/asme-pngs
    python3 scripts/asme-images.py ~/Downloads/mfg-pngs manufacturing   # another hub: public/<hub>/, og-art/<hub>/

Each <name>.png (names from docs/asme-image-prompts.md, .png or .webp suffix both fine) becomes:
  public/asme/<name>.webp             1086 x 362, the object centred on the page colour (#fbfbfc)
  src/assets/og-art/asme/<name>.jpg   480 x 270, the share-card crop (the card renderer can't read WebP)

Whatever the PNG's size or framing, the object is found by its difference from the background (sampled at the
corners), trimmed, scaled to fit the middle of the 3:1 canvas, and pasted with its surroundings blended into the
exact page colour, so no edge shows against the site.
"""
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter

PAGE = (251, 251, 252)  # --background, #fbfbfc
W, H = 1086, 362
BOX_W, BOX_H = 0.62, 0.86  # how much of the canvas the object may fill
ROOT = Path(__file__).resolve().parent.parent


def background(im: Image.Image) -> tuple[int, int, int]:
    w, h = im.size
    corners = [im.getpixel(p) for p in [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3)]]
    return tuple(sorted(c[i] for c in corners)[1] for i in range(3))  # robust to one odd corner


def art(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGB")
    bg = background(im)
    diff = ImageChops.difference(im, Image.new("RGB", im.size, bg)).convert("L")
    mask = diff.point(lambda v: 255 if v > 14 else 0).filter(ImageFilter.MaxFilter(9))
    box = mask.getbbox()
    if not box:
        raise SystemExit(f"{src.name}: no object found against the background")
    obj, m = im.crop(box), mask.crop(box).filter(ImageFilter.GaussianBlur(4))
    scale = min(W * BOX_W / obj.width, H * BOX_H / obj.height)
    size = (round(obj.width * scale), round(obj.height * scale))
    obj, m = obj.resize(size, Image.LANCZOS), m.resize(size, Image.LANCZOS)
    canvas = Image.new("RGB", (W, H), PAGE)
    canvas.paste(obj, ((W - size[0]) // 2, (H - size[1]) // 2), m)
    return canvas


def main() -> None:
    folder = Path(sys.argv[1]).expanduser()
    hub = sys.argv[2] if len(sys.argv) > 2 else "asme"
    out, og = ROOT / "public" / hub, ROOT / "src/assets/og-art" / hub
    out.mkdir(parents=True, exist_ok=True)
    og.mkdir(parents=True, exist_ok=True)
    files = sorted(p for p in folder.iterdir() if p.suffix.lower() in {".png", ".webp", ".jpg", ".jpeg"})
    for src in files:
        name = src.stem.removesuffix(".webp")
        canvas = art(src)
        tmp = out / f"{name}.png"
        canvas.save(tmp)
        subprocess.run(["cwebp", "-quiet", "-q", "82", "-m", "6", str(tmp), "-o", str(out / f"{name}.webp")], check=True)
        tmp.unlink()
        # Share card: the middle 16:9 of the art, where the object sits.
        cw = round(H * 16 / 9)
        crop = canvas.crop(((W - cw) // 2, 0, (W + cw) // 2, H)).resize((480, 270), Image.LANCZOS)
        crop.save(og / f"{name}.jpg", quality=85, optimize=True, progressive=True)
        kb = (out / f"{name}.webp").stat().st_size // 1024
        print(f"{name}: public/{hub}/{name}.webp ({kb} KB), og-art/{hub}/{name}.jpg")


if __name__ == "__main__":
    main()
