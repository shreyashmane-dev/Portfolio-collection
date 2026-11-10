from PIL import Image, ImageDraw, ImageFont
import math, random

W, H = 1536, 1024
BG = (7, 8, 11)
INK = (242, 240, 234)
BLUE = (47, 107, 255)
RED = (229, 36, 59)
MUTED = (154, 157, 168)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img, "RGBA")

# grid lines
for x in range(0, W, 128):
    d.line([(x, 0), (x, H)], fill=(242, 240, 234, 14), width=1)
for y in range(0, H, 128):
    d.line([(0, y), (W, y)], fill=(242, 240, 234, 14), width=1)

# diagonal accent fields
d.polygon([(1050, 0), (1536, 0), (1536, 1024), (750, 1024)], fill=(*BLUE, 22))
d.polygon([(1180, 0), (1536, 0), (1536, 1024), (960, 1024)], fill=(*BLUE, 20))
d.polygon([(0, 700), (420, 1024), (0, 1024)], fill=(*RED, 26))

# halftone dots in blue field
random.seed(7)
for gx in range(760, W, 22):
    for gy in range(0, H, 22):
        if gx > 900 + gy * 0.28:
            r = 2.2
            d.ellipse([gx - r, gy - r, gx + r, gy + r], fill=(*BLUE, 70))

# speed lines burst from right-center
fx, fy = 1180, 470
for i in range(64):
    a = (i / 64) * math.tau + random.uniform(-0.04, 0.04)
    r1 = random.uniform(190, 300)
    r2 = 1000
    col = (*RED, 90) if i % 8 == 0 else (242, 240, 234, 46)
    d.line([(fx + math.cos(a) * r1, fy + math.sin(a) * r1), (fx + math.cos(a) * r2, fy + math.sin(a) * r2)], fill=col, width=2 if i % 3 else 1)

# swordsman silhouette
sx, sy = 1180, 470
d.polygon([(sx-28, sy-118), (sx, sy-168), (sx+28, sy-118), (sx+20, sy-100), (sx-20, sy-100)], fill=(11, 12, 17))
d.ellipse([sx-24, sy-128, sx+24, sy-80], fill=(11, 12, 17))
d.polygon([(sx-30, sy-76), (sx+30, sy-76), (sx+44, sy+30), (sx-44, sy+30)], fill=(11, 12, 17))
d.polygon([(sx-44, sy+30), (sx+44, sy+30), (sx+70, sy+190), (sx-70, sy+190)], fill=(11, 12, 17))
d.polygon([(sx+30, sy-66), (sx+86, sy-98), (sx+94, sy-84), (sx+40, sy-50)], fill=(11, 12, 17))
# rim light edges
d.line([(sx-30, sy-76), (sx-44, sy+30), (sx-70, sy+190)], fill=(*RED, 230), width=3)
d.line([(sx+30, sy-76), (sx+44, sy+30), (sx+70, sy+190)], fill=(*BLUE, 230), width=3)
# katana
d.line([(sx+90, sy-92), (sx+230, sy-260)], fill=(223, 228, 255), width=6)
d.line([(sx+90, sy-92), (sx+230, sy-260)], fill=(*BLUE, 90), width=14)
# orbs
d.ellipse([sx-190, sy-40, sx-166, sy-16], fill=RED)
d.ellipse([sx-198, sy-48, sx-158, sy-8], outline=(*RED, 90), width=3)
d.ellipse([sx+150, sy+60, sx+174, sy+84], fill=BLUE)
d.ellipse([sx+142, sy+52, sx+182, sy+92], outline=(*BLUE, 90), width=3)

def font(size, bold=False):
    try:
        return ImageFont.truetype("C:/Windows/Fonts/impact.ttf", size)
    except Exception:
        return ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf", size)

def mono(size):
    try:
        return ImageFont.truetype("C:/Windows/Fonts/consola.ttf", size)
    except Exception:
        return font(size)

# title
d.text((80, 260), "SHREYASH", font=font(170), fill=INK)
d.text((80, 430), "MANE", font=font(170), fill=INK)
d.text((568, 430), ".", font=font(170), fill=RED)
d.rectangle([80, 640, 240, 646], fill=RED)
d.text((80, 672), "PORTFOLIO / 43 PROJECTS", font=mono(30), fill=MUTED)
d.text((80, 716), "AI - FULL-STACK - IOT", font=mono(24), fill=BLUE)
d.text((80, 84), "EP.00 - OPENING", font=mono(22), fill=MUTED)

# frame + corner ticks
d.rectangle([24, 24, W-25, H-25], outline=(242, 240, 234, 70), width=2)
for (cx, cy, dx, dy) in [(24, 24, 1, 1), (W-25, 24, -1, 1), (24, H-25, 1, -1), (W-25, H-25, -1, -1)]:
    d.line([(cx, cy), (cx + 40*dx, cy)], fill=BLUE, width=4)
    d.line([(cx, cy), (cx, cy + 40*dy)], fill=BLUE, width=4)

img.save("public/og.png", optimize=True)
print("og.png written", img.size)