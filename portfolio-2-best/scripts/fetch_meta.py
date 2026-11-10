import json, urllib.request, re, sys

USER = "shreyashmane-dev"
REPOS = ["OmSearch","Nexyris","Secure-codeb-AI","Drishti-AI","krushi-direct","zynth-browser","dev-tools-suite","Anything","First-Aid","Lumora","SecurePay-AI","Xai-governance-platform_M","LifeOS","MessMate","Smart-Library-Management-System","VireHire-AI","ElectOS-Ai-Civic","Synapse_Messenger","WindCast-AI","Secure-Focus-App","Veyra","MahaResilience","ReliefSync","WindCast-AI-MINI-MODEL","Xai-governance-platform","aivora-web","Expense-tacker-web","Expense-tacker-capacitor-app","aivora-capacitor-app","Memora","Mimora","Trained-Models","computer-networks-lab","OOC-lab","C-Programs","C-lab","Recordly","DevTrack-AI","BaisGaurd-XI","Kashid_Snacks","react-practice","skills-introduction-to-github","RepoPulse"]

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent":"portfolio-build","Accept":"application/vnd.github+json"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.load(r)
    except Exception as e:
        return {"_error": str(e)}

out = {}
for name in REPOS:
    meta = get(f"https://api.github.com/repos/{USER}/{name}")
    readme = get(f"https://api.github.com/repos/{USER}/{name}/readme")
    size = readme.get("size", 0)
    imgs = []
    if "content" in readme:
        import base64
        try:
            text = base64.b64decode(readme["content"]).decode("utf-8","ignore")
            imgs = re.findall(r'!\[[^\]]*\]\(([^)\s]+)', text) + re.findall(r'<img[^>]+src="([^"]+)"', text)
        except Exception:
            pass
    out[name] = {
        "fork": meta.get("fork"),
        "description": meta.get("description"),
        "language": meta.get("language"),
        "homepage": meta.get("homepage"),
        "pushed_at": meta.get("pushed_at"),
        "readme_size": size,
        "images": imgs[:8],
        "default_branch": meta.get("default_branch"),
        "error": meta.get("_error"),
    }
    print(name, "| fork:", out[name]["fork"], "| readme:", size, "| imgs:", len(imgs), flush=True)

with open("repo-meta.json","w") as f:
    json.dump(out, f, indent=1)