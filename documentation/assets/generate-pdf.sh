#!/bin/bash

# BuyZy BRD PDF Generator Script
# This script converts the Business Requirements Document to a professionally styled PDF
# Usage: Run from the documentation/assets/ directory

echo "🎨 Converting BuyZy BRD to styled PDF..."

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "❌ Error: Pandoc is not installed. Please install it first:"
    echo "   brew install pandoc"
    exit 1
fi

# Set paths relative to assets directory
BRD_SOURCE="../business-requirements/BUSINESS_REQUIREMENTS_DOCUMENT.md"
CSS_FILE="brd-style.css"
OUTPUT_DIR="../business-requirements/"
OUTPUT_FILE="${OUTPUT_DIR}BuyZy_Business_Requirements_Document_Generated.pdf"

# Check if the BRD markdown file exists
if [ ! -f "$BRD_SOURCE" ]; then
    echo "❌ Error: BUSINESS_REQUIREMENTS_DOCUMENT.md not found at $BRD_SOURCE"
    echo "💡 Make sure you're running this from documentation/assets/ directory"
    exit 1
fi

# Check if the CSS file exists
if [ ! -f "$CSS_FILE" ]; then
    echo "❌ Error: $CSS_FILE not found"
    echo "💡 Available CSS files:"
    ls -la *.css
    exit 1
fi

# Generate the PDF with custom styling
echo "📄 Generating PDF with BuyZy styling..."

pandoc "$BRD_SOURCE" \
    -o "$OUTPUT_FILE" \
    --pdf-engine=weasyprint \
    --css="$CSS_FILE" \
    --metadata title="BuyZy - Business Requirements Document" \
    --metadata author="Development Team" \
    --metadata date="$(date '+%B %d, %Y')" \
    --toc \
    --toc-depth=3 \
    --number-sections \
    --highlight-style=tango \
    --standalone

# Check if PDF was generated successfully
if [ -f "$OUTPUT_FILE" ]; then
    echo "✅ PDF generated successfully!"
    echo "📁 File: $OUTPUT_FILE"
    echo "📊 Size: $(ls -lh "$OUTPUT_FILE" | awk '{print $5}')"
    echo ""
    echo "🎯 Features included:"
    echo "   ✅ Professional styling matching BuyZy colors"
    echo "   ✅ Table of contents with page numbers"
    echo "   ✅ Numbered sections and subsections"
    echo "   ✅ Syntax highlighted code blocks"
    echo "   ✅ Professional tables and formatting"
    echo "   ✅ Page headers and footers"
    echo ""
    echo "💡 You can now:"
    echo "   📤 Share with clients and stakeholders"
    echo "   🖨️  Print for presentations"
    echo "   📧 Attach to project proposals"
    echo ""
    echo "🚀 Opening PDF preview..."
    open "$OUTPUT_FILE"
else
    echo "❌ Error: PDF generation failed"
    echo "💡 Trying alternative method with different PDF engine..."
    
    # Fallback method using different PDF engine
    pandoc "$BRD_SOURCE" \
        -o "$OUTPUT_FILE" \
        --pdf-engine=wkhtmltopdf \
        --css="$CSS_FILE" \
        --metadata title="BuyZy - Business Requirements Document" \
        --toc \
        --number-sections \
        --standalone
    
    if [ -f "$OUTPUT_FILE" ]; then
        echo "✅ PDF generated with fallback method!"
        open "$OUTPUT_FILE"
    else
        echo "❌ PDF generation failed with both methods"
        echo "💡 You can try online converters or copy content to Google Docs"
        echo "💡 Or use the existing professional PDF: BuyZy_Business_Requirements_Document_Professional.pdf"
    fi
fi

echo ""
echo "📋 Available documentation files:"
ls -la "$OUTPUT_DIR"*.pdf "$OUTPUT_DIR"*.html 2>/dev/null || echo "   No additional files found"
echo ""
echo "📂 Documentation structure:"
echo "   📁 documentation/"
echo "   ├── 📁 business-requirements/ (main documents)"
echo "   ├── 📁 assets/ (styling & scripts)"
echo "   └── 📄 README.md (documentation guide)"
