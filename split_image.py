#!/usr/bin/env python3
from PIL import Image
import os

# Image path - adjust if needed
image_path = 'assets/all-categories.png'

# Check if image exists
if not os.path.exists(image_path):
    # Try alternative paths
    if os.path.exists('all-categories.png'):
        image_path = 'all-categories.png'
    else:
        print(f"Error: Image not found at {image_path}")
        print("Please ensure the image is saved as 'all-categories.png' or 'assets/all-categories.png'")
        exit(1)

# Open the image
img = Image.open(image_path)
print(f"Image size: {img.size}")

width, height = img.size

# The image is 4 columns x 3 rows
cols = 4
rows = 3

# Calculate the dimensions of each section
section_width = width // cols
section_height = height // rows

# Category names for file naming
categories = [
    'section-1-teaching-aptitude.png',
    'section-2-subject-knowledge.png',
    'section-3-classroom-management.png',
    'section-4-communication.png',
    'section-5-emotional-intelligence.png',
    'section-6-motivation.png',
    'section-7-creativity.png',
    'section-8-adaptability.png',
    'section-9-leadership.png',
    'section-10-ethics.png',
    'section-11-attitude.png',
    'section-12-responsibility.png'
]

# Create assets folder if it doesn't exist
os.makedirs('assets', exist_ok=True)

# Split and save each section
idx = 0
for row in range(rows):
    for col in range(cols):
        if idx < len(categories):
            # Define the box for this section
            left = col * section_width
            top = row * section_height
            right = left + section_width
            bottom = top + section_height
            
            # Crop the section
            section = img.crop((left, top, right, bottom))
            
            # Save the section
            output_path = os.path.join('assets', categories[idx])
            section.save(output_path, 'PNG')
            print(f"Saved: {output_path} ({section_width}x{section_height})")
            
            idx += 1

print(f"\nSuccessfully split image into {idx} sections!")
print("All category images have been saved to the assets folder.")
