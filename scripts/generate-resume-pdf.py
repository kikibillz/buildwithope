"""Generate the public CV from the same reviewed content as the HTML CV."""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("ResumeSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("ResumeSansBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
root=Path(__file__).resolve().parents[1]
blocks=json.loads((root/'scripts/resume-content.json').read_text())
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name='ResumeHeading',fontName='ResumeSansBold',fontSize=10,leading=13,textColor=colors.HexColor('#0f766e'),spaceBefore=8,spaceAfter=3))
styles.add(ParagraphStyle(name='ResumeBody',fontName='ResumeSans',fontSize=9,leading=12,spaceAfter=4))
flow=[]
for i,(title,text) in enumerate(blocks):
 title=escape(title).replace('–','-').replace('—','-')
 text=escape(text).replace('–','-').replace('—','-').replace('\n','<br/>')
 flow.append(KeepTogether([Paragraph(title,styles['ResumeHeading']),Paragraph(text,styles['ResumeBody'])]))
def footer(canvas,doc):
 canvas.setFont('ResumeSans',8);canvas.setFillColor(colors.HexColor('#64748b'));canvas.drawString(42,24,'Opeyemi Olamiju | CV');canvas.drawRightString(553,24,f'Page {doc.page}')
SimpleDocTemplate(str(root/'public/Opeyemi_Olamiju_Resume.pdf'),pagesize=(595.28,841.89),leftMargin=42,rightMargin=42,topMargin=36,bottomMargin=42,title='Opeyemi Olamiju - CV',author='Opeyemi Olamiju').build(flow,onFirstPage=footer,onLaterPages=footer)
