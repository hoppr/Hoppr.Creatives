#!/bin/bash

# Usage: ./make_webm_alpha_vp8.sh <fps> <input_folder> <input_pattern> <output_file>
# Example: ./make_webm_alpha_vp8.sh 24 ./frames toyota_%04d.webp webm_toyota_vp8.webm

FPS=$1
INPUT_DIR=$2
INPUT_PATTERN=$3
OUTPUT=$4

ffmpeg -framerate "$FPS" -i "$INPUT_DIR/$INPUT_PATTERN" \
  -c:v libvpx \
  -pix_fmt yuva420p \
  -crf 20 \
  -b:v 0 \
  -an \
  -auto-alt-ref 0 \
  -threads 4 \
  "$OUTPUT"
