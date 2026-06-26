#!/usr/bin/env python3
"""Generate icon.png and og-cover.png for the site."""
from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
FONT = "/usr/share/fonts/truetype/wqy/wqy-microhei.ttc"
ACCENT = (55, 224, 166)
ACCENT2 = (255, 211, 78)
BG = (11, 13, 18)
PANEL = (21, 25, 34)
LINE = (42, 50, 66)
MUTED = (154, 166, 187)
TEXT = (238, 242, 248)


def font(size, bold=False):
    try:
        return ImageFont.truetype(FONT, size)
    except OSError:
        return ImageFont.load_default()


def rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_won_mark(draw, cx, cy, size, color):
    """Bold won-style mark readable at small favicon sizes."""
    w = size
    t = max(3, size // 10)
    # two horizontal bars (simplified won currency mark)
    draw.rounded_rectangle((cx - w // 2, cy - w // 3, cx + w // 2, cy - w // 3 + t), radius=t // 2, fill=color)
    draw.rounded_rectangle((cx - w // 2, cy + w // 6, cx + w // 2, cy + w // 6 + t), radius=t // 2, fill=color)
    # vertical stem
    draw.rounded_rectangle((cx - t // 2, cy - w // 2, cx + t // 2, cy + w // 2), radius=t // 2, fill=color)


def draw_coin_stack(draw, cx, cy, rx, ry, layers=4):
    colors = [(26, 158, 114, 140), ACCENT, ACCENT2, (255, 220, 90)]
    for i in range(layers):
        y = cy + i * max(5, ry // 2)
        draw.ellipse((cx - rx, y - ry, cx + rx, y + ry), fill=colors[i % len(colors)])
    draw_won_mark(draw, cx, cy - ry, int(rx * 0.55), (6, 32, 24))


def make_icon(size=512):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = size * 0.06
    rounded_rect(d, (pad, pad, size - pad, size - pad), int(size * 0.2), BG, outline=LINE, width=max(2, size // 64))

    cx, cy = size // 2, int(size * 0.58)
    rx, ry = int(size * 0.28), int(size * 0.09)
    draw_coin_stack(d, cx, cy, rx, ry)

    # sparkles
    for sx, sy, r, c in [(size * 0.72, size * 0.28, size * 0.03, ACCENT),
                          (size * 0.28, size * 0.34, size * 0.02, ACCENT2)]:
        d.ellipse((sx - r, sy - r, sx + r, sy + r), fill=c)

    out = os.path.join(ROOT, "icon.png")
    img.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({size}x{size})")


def make_og():
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)

    rounded_rect(d, (40, 40, w - 40, h - 40), 20, PANEL, outline=LINE, width=2)

    # left coin graphic
    draw_coin_stack(d, 200, 320, 90, 26)

    # title
    d.text((620, 230), "\ubd80\uc790\uc758 \uc0b6 \uccb4\ud5d8\ud558\uae30", fill=ACCENT, font=font(62), anchor="mm")
    d.text((620, 310), "Forbes 2026 \uc2e4\uc81c \ubd80\uc790 \uc790\uc0b0\uc73c\ub85c \uc1fc\ud551 \uc2dc\ubbac\ub808\uc774\uc158", fill=MUTED, font=font(30), anchor="mm")
    d.text((620, 370), "100+ \uc544\uc774\ud15c  \u00b7  60\ucd08 \ucc44\ub9b0\uc9c0  \u00b7  \ubb34\ub8cc \ud50c\ub808\uc774", fill=(91, 102, 128), font=font(24), anchor="mm")

    # accent line
    d.rounded_rectangle((420, 410, 820, 416), radius=2, fill=ACCENT)

    # right decorative coins
    for cx, cy, r in [(980, 200, 36), (1040, 380, 24)]:
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=ACCENT, width=3)
        draw_won_mark(d, cx, cy, int(r * 0.55), ACCENT)

    out = os.path.join(ROOT, "og-cover.png")
    img.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({w}x{h})")


if __name__ == "__main__":
    make_icon(512)
    make_og()
