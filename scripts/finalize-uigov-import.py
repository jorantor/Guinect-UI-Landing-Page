#!/usr/bin/env python3
"""Only the personal GitHub review branch may run this text-only Webflow import."""
import os,re,subprocess,sys
from pathlib import Path
REPO="jorantor/Guinect-UI-Landing-Page"
BRANCH="review/uigov-home-funcionalidades-footer-2026-11-13"
if os.getenv("GITHUB_REPOSITORY")!=REPO or subprocess.check_output(["git","branch","--show-current"],text=True).strip()!=BRANCH:
    sys.exit("Refusing unexpected repo or branch")
root=Path.cwd()
footer=(root/"partials/footer-es.html").read_text().strip()
names=["landing-precandidato.html","contacto.html","f-qs.html","old-home-2.html","contact-en.html","home-es.html","old-home.html","use-cases.html","candidate-en.html","contact.html"]
footer_pattern=re.compile(r'<(?:section|footer)\b[^>]*class=["\'][^"\']*\bfooter(?:-es|-en|_guinect)?\b[^"\']*["\'][^>]*>[\s\S]*?</(?:section|footer)>',re.I)
edited=[];skipped=[]
for name in names:
 p=root/name
 if not p.is_file():
  skipped.append(name+" (missing)");continue
 s=p.read_text()
 match=footer_pattern.search(s)
 if not match:
  skipped.append(name+" (no matching footer)");continue
 s=s[:match.start()]+footer+s[match.end():]
 s=re.sub(r'\s*<link\b[^>]*href=["\']css/uigov-current-sync\.css["\'][^>]*>','',s,flags=re.I)
 if "css/uigov-export-footer.css" not in s:
  s=re.sub(r'</head>','  <link href="css/uigov-export-footer.css" rel="stylesheet" type="text/css">\n</head>',s,count=1,flags=re.I)
 p.write_text(s)
 edited.append(name)
for stale in [".github/workflows/sync-uigov-export.yml","scripts/apply-uigov-export.py.zlib.b64","scripts/sync-footer.mjs","css/uigov-current-sync.css"]:
 (root/stale).unlink(missing_ok=True)
print("Updated",len(edited),"existing footers, skipped:",skipped)
if skipped:sys.exit("Footer update incomplete")
