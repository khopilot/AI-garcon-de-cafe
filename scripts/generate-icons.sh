#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p public/icons

# Generate icons in various sizes
magick public/speacht.png -resize 72x72 public/icons/icon-72x72.png
magick public/speacht.png -resize 96x96 public/icons/icon-96x96.png
magick public/speacht.png -resize 128x128 public/icons/icon-128x128.png
magick public/speacht.png -resize 144x144 public/icons/icon-144x144.png
magick public/speacht.png -resize 152x152 public/icons/icon-152x152.png
magick public/speacht.png -resize 192x192 public/icons/icon-192x192.png
magick public/speacht.png -resize 384x384 public/icons/icon-384x384.png
magick public/speacht.png -resize 512x512 public/icons/icon-512x512.png

echo "Icons generated successfully!" 