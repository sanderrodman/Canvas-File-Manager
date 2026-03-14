# Canvas File Manager

A Chrome extension that automatically organizes your Canvas LMS downloads into course-based folders.

## Features

- **Auto-organizes downloads** — files save to `Canvas Files/{Course Name}/{File}` instead of cluttering your Downloads folder
- **Duplicate prevention** — tracks download history so you never end up with `Syllabus(1).pdf` again
- **Instant file access** — already downloaded? One click opens your local copy
- **Real-time detection** — scrapes course and file metadata directly from the Canvas UI

## Install

1. Clone or download this repo
2. Open `chrome://extensions` and enable **Developer mode**
3. Click **Load unpacked** and select the project folder
4. Navigate to any Canvas course file page

## How It Works

The extension injects a content script into Canvas pages to extract the course name and file info. When you download, files are automatically routed to an organized folder structure on your machine.

## Privacy

All processing happens locally on your device. No data is collected, stored, or transmitted.

## Tech

JavaScript · Chrome Extension Manifest V3 · Chrome Downloads API · MutationObserver
