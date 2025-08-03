# BuyZy Documentation

This directory contains comprehensive project documentation for the BuyZy e-commerce platform.

## 📁 Structure

### `/business-requirements/`
Contains the complete Business Requirements Document (BRD) and related specifications.

**Files:**
- `BUSINESS_REQUIREMENTS_DOCUMENT.md` - Source markdown document
- `BuyZy_Business_Requirements_Document_Professional.pdf` - Final professional PDF (1.1MB)
- `BuyZy_Cover_Page.pdf` - Professional cover page (163KB)
- `BuyZy_BRD_Enhanced.html` - Interactive web version (56KB)

### `/assets/`
Contains styling files and source templates used for document generation.

**Files:**
- `pdf-style.css` - Professional PDF styling matching BuyZy design system
- `brd-style.css` - Additional BRD-specific styling
- `cover-page.html` - Cover page template source
- `generate-pdf.sh` - Automated PDF generation script

## 🛠️ PDF Generation

### Automated Script
Use the included script to regenerate PDFs from the markdown source:

```bash
# Navigate to the assets directory
cd documentation/assets/

# Run the generation script
./generate-pdf.sh
```

**Script Features:**
- ✅ Automatic path resolution for new folder structure
- ✅ Multiple PDF engine fallback (weasyprint → wkhtmltopdf)
- ✅ Professional styling application
- ✅ Error handling and user guidance
- ✅ Automatic file preview on completion

### Manual Generation
Alternatively, you can manually generate PDFs using Pandoc:

```bash
# From documentation/assets/ directory
pandoc ../business-requirements/BUSINESS_REQUIREMENTS_DOCUMENT.md \
    -o ../business-requirements/BuyZy_BRD_Custom.pdf \
    --css=brd-style.css \
    --toc --number-sections \
    --metadata title="BuyZy - Business Requirements Document"
```

## 🎯 Document Versions

### Business Requirements Document
- **Version:** 1.0
- **Date:** August 4, 2025
- **Status:** Production Ready
- **Format:** PDF with professional branding

### Key Features
- ✅ Complete technical specifications for 8 modules
- ✅ User journey flows and business logic
- ✅ API specifications and data models
- ✅ Security & compliance requirements
- ✅ Professional design matching web application
- ✅ Branded headers/footers with live demo URL
- ✅ Client-presentation ready

## 🚀 Usage

### For Client Presentations
Use `BuyZy_Business_Requirements_Document_Professional.pdf` - includes cover page and professional styling.

### For Web Viewing
Open `BuyZy_BRD_Enhanced.html` in any browser for interactive navigation.

### For Updates
Edit `BUSINESS_REQUIREMENTS_DOCUMENT.md` and regenerate using the styling assets.

## 🎨 Design System Integration

All documents use the BuyZy brand colors and typography:
- Primary: `#2563eb` (blue-600)
- Secondary: `#1d4ed8` (blue-700)
- Font: Inter (matching web application)
- Layout: Professional A4 format with branded elements

---

**Live Demo:** [almuhajiri.github.io/BuyZy](https://almuhajiri.github.io/BuyZy/)  
**Repository:** [github.com/Almuhajiri/BuyZy](https://github.com/Almuhajiri/BuyZy)  
**Documentation Version:** 1.0 | August 2025
