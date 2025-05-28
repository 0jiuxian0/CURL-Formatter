import os
import requests

def download_file(url, local_path):
    response = requests.get(url)
    if response.status_code == 200:
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        with open(local_path, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {local_path}")
    else:
        print(f"Failed to download: {url}")

def main():
    # Create directories if they don't exist
    os.makedirs('css', exist_ok=True)
    os.makedirs('js', exist_ok=True)

    # Download Bootstrap CSS
    bootstrap_url = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    download_file(bootstrap_url, 'css/bootstrap.min.css')

    # Download Bootstrap Icons CSS
    icons_url = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
    download_file(icons_url, 'css/bootstrap-icons.css')

    # Download Bootstrap Icons font files
    font_files = [
        "bootstrap-icons.woff",
        "bootstrap-icons.woff2"
    ]
    
    for font_file in font_files:
        font_url = f"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/fonts/{font_file}"
        download_file(font_url, f'css/fonts/{font_file}')

if __name__ == "__main__":
    main() 