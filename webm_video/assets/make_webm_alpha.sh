#!/usr/bin/env bash
# make_webm_alpha.sh — usage: ./make_webm_alpha.sh 30 ./frames frame-%04d.webp out.webm

# FPS=${1:-30}
# DIR=${2:-.}
# PATTERN=${3:-frame-%04d.webp}
# OUT=${4:-out.webm}

# ffmpeg -y -framerate "$FPS" -i "$DIR/$PATTERN" \
#   -c:v libvpx-vp9 -pix_fmt yuva420p -lossless 1 \
#   "$OUT" && echo "✅ Created $OUT"



FPS=$1
INPUT_DIR=$2
INPUT_PATTERN=$3
OUTPUT=$4

ffmpeg -framerate "$FPS" -i "$INPUT_DIR/$INPUT_PATTERN" \
  -c:v libvpx-vp9 \
  -pix_fmt yuva420p \
  -b:v 0 \
  -crf 33 \
  -an \
  -g 120 \
  "$OUTPUT"