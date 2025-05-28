# CURL Command Formatter

[English](README.md) | [中文](README.zh-CN.md)

## Project Overview

CURL Command Formatter is a frontend web tool that helps users format complex `curl` commands into structured, readable content, making it easier to understand and debug HTTP requests.

## Features
- Parses URL, request method, headers, cookies, query parameters, and request body from curl commands
- Real-time formatting with automatic display of results
- One-click copy of formatted output
- User-friendly error messages
- Responsive and beautiful interface based on Bootstrap 5 and Bootstrap Icons

## Usage
1. Open the `index.html` file in your browser to use this tool - no backend required.
2. Paste your curl command in the input box, and the formatted result will be displayed below automatically.
3. Click the "Copy" button to copy the formatted content with one click.

## Screenshot

Below is a preview of the CURL Command Formatter interface:

![CURL Command Formatter Screenshot](image/image.png)

## Dependencies
- [Bootstrap 5.1.3](https://getbootstrap.com/) (css/bootstrap.min.css)
- [Bootstrap Icons 1.7.2](https://icons.getbootstrap.com/) (css/bootstrap-icons.css and fonts)
- Dependencies are included locally. Use the script below to download them if needed.

## Asset Download Script
This project provides a `download_assets.py` script to automatically download Bootstrap and Bootstrap Icons dependencies.

### How to Use
1. Ensure you have Python 3 and the `requests` library installed:
   ```bash
   pip install requests
   ```
2. Run the script:
   ```bash
   python download_assets.py
   ```

The script will automatically download dependencies to the `css/` and `css/fonts/` directories.

## Directory Structure
```
├── index.html           # Main page
├── js/
│   ├── app.js           # Page interaction logic
│   └── curl-formatter.js# Core curl command parsing and formatting
├── css/
│   ├── bootstrap.min.css
│   ├── bootstrap-icons.css
│   ├── style.css        # Custom styles
│   └── fonts/           # Bootstrap Icons fonts
├── download_assets.py   # Dependency download script
```

## License
This project is for learning and communication purposes only. Bootstrap and Bootstrap Icons are licensed under their respective MIT licenses. 