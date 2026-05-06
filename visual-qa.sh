#!/bin/bash
# Visual QA script - converts PPTX to PDF for visual inspection
#
# Usage:
#   ./visual-qa.sh <presentation.pptx> [output-dir]
#
# Requires LibreOffice installed locally or use Docker:
#   docker run -v $(pwd):/workspace pptx-generator-qa topdf presentation.pptx

set -e

PPTX_FILE="${1:-}"
OUTPUT_DIR="${2:-.}"

if [ -z "$PPTX_FILE" ]; then
  echo "Usage: ./visual-qa.sh <presentation.pptx> [output-dir]"
  echo ""
  echo "Converts PPTX to PDF for visual inspection."
  echo "The PDF can then be viewed or analyzed by vision AI."
  exit 1
fi

if [ ! -f "$PPTX_FILE" ]; then
  echo "Error: File not found: $PPTX_FILE"
  exit 1
fi

# Check for LibreOffice
if command -v libreoffice &> /dev/null; then
  OFFICE_CMD="libreoffice"
elif command -v soffice &> /dev/null; then
  OFFICE_CMD="soffice"
else
  echo "Error: LibreOffice not found."
  echo ""
  echo "Install LibreOffice or use Docker:"
  echo "  docker build -f Dockerfile.qa -t pptx-generator-qa ."
  echo "  docker run -v \$(pwd):/workspace pptx-generator-qa \"libreoffice --headless --convert-to pdf /workspace/$PPTX_FILE --outdir /workspace/$OUTPUT_DIR\""
  exit 1
fi

echo "Converting $PPTX_FILE to PDF..."
$OFFICE_CMD --headless --convert-to pdf "$PPTX_FILE" --outdir "$OUTPUT_DIR"

PDF_FILE="$OUTPUT_DIR/$(basename "${PPTX_FILE%.pptx}.pdf")"
echo "Created: $PDF_FILE"
echo ""
echo "You can now:"
echo "  1. Open the PDF to visually inspect: open $PDF_FILE"
echo "  2. Use Claude Code to analyze: Ask Claude to read $PDF_FILE"
