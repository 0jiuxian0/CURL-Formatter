class CurlFormatter {
    static parseUrl(url) {
        try {
            const urlObj = new URL(url);
            return {
                baseUrl: `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`,
                queryParams: Object.fromEntries(urlObj.searchParams.entries())
            };
        } catch (e) {
            throw new Error('Invalid URL format');
        }
    }

    static extractHeaders(curlCommand) {
        const headers = {};
        const headerRegex = /-H\s+'([^:]+):\s*([^']+)'/g;
        let match;
        
        while ((match = headerRegex.exec(curlCommand)) !== null) {
            headers[match[1]] = match[2];
        }
        
        return headers;
    }

    static extractCookies(curlCommand) {
        const cookies = {};
        const cookieRegex = /-b\s+'([^']+)'/g;
        let match;
        
        while ((match = cookieRegex.exec(curlCommand)) !== null) {
            const cookieStr = match[1];
            cookieStr.split(';').forEach(cookie => {
                const [key, value] = cookie.trim().split('=');
                if (key && value) {
                    cookies[key] = value;
                }
            });
        }
        
        return cookies;
    }

    static extractMethod(curlCommand) {
        // Check for explicit method
        const methodMatch = curlCommand.match(/-X\s+([A-Z]+)/);
        if (methodMatch) {
            return methodMatch[1];
        }
        
        // If no explicit method, check for data parameters to determine POST
        if (curlCommand.includes('--data') || 
            curlCommand.includes('--data-urlencode') || 
            curlCommand.includes('--data-raw')) {
            return 'POST';
        }
        
        return 'GET';
    }

    static extractBody(curlCommand) {
        const bodyParams = {};
        
        // Handle --data-urlencode parameters
        const dataUrlencodeRegex = /--data-urlencode\s+'([^=]+)=([^']+)'/g;
        let match;
        while ((match = dataUrlencodeRegex.exec(curlCommand)) !== null) {
            bodyParams[match[1]] = match[2];
        }

        // Handle --data-raw parameters
        const dataRawRegex = /--data-raw\s+'([^']+)'/g;
        while ((match = dataRawRegex.exec(curlCommand)) !== null) {
            const dataStr = match[1];
            try {
                // Try to parse as form-urlencoded
                const params = new URLSearchParams(dataStr);
                for (const [key, value] of params.entries()) {
                    bodyParams[key] = decodeURIComponent(value);
                }
            } catch (e) {
                // If not form-urlencoded, treat as raw data
                bodyParams['raw'] = dataStr;
            }
        }

        // Handle --data parameters
        const dataRegex = /--data\s+'([^']+)'/g;
        while ((match = dataRegex.exec(curlCommand)) !== null) {
            const dataStr = match[1];
            try {
                const params = new URLSearchParams(dataStr);
                for (const [key, value] of params.entries()) {
                    bodyParams[key] = decodeURIComponent(value);
                }
            } catch (e) {
                bodyParams['raw'] = dataStr;
            }
        }

        return bodyParams;
    }

    static format(curlCommand) {
        try {
            // Extract URL
            const urlMatch = curlCommand.match(/'([^']+)'/);
            if (!urlMatch) {
                throw new Error('Could not find URL in curl command');
            }
            const url = urlMatch[1];
            
            // Parse components
            const { baseUrl, queryParams } = this.parseUrl(url);
            const method = this.extractMethod(curlCommand);
            const headers = this.extractHeaders(curlCommand);
            const cookies = this.extractCookies(curlCommand);
            const bodyParams = this.extractBody(curlCommand);

            // Build formatted output
            const output = [];
            output.push(`Method: ${method}`);
            output.push(`URL: ${baseUrl}`);
            
            if (Object.keys(queryParams).length > 0) {
                output.push('\nQuery Parameters:');
                for (const [key, value] of Object.entries(queryParams)) {
                    output.push(`  ${key}: ${value}`);
                }
            }
            
            if (Object.keys(cookies).length > 0) {
                output.push('\nCookies:');
                for (const [key, value] of Object.entries(cookies)) {
                    output.push(`  ${key}: ${value}`);
                }
            }
            
            if (Object.keys(headers).length > 0) {
                output.push('\nHeaders:');
                for (const [key, value] of Object.entries(headers)) {
                    output.push(`  ${key}: ${value}`);
                }
            }

            if (Object.keys(bodyParams).length > 0) {
                output.push('\nRequest Body:');
                if (bodyParams['raw']) {
                    output.push(`  ${bodyParams['raw']}`);
                } else {
                    for (const [key, value] of Object.entries(bodyParams)) {
                        output.push(`  ${key}: ${value}`);
                    }
                }
            }
            
            return output.join('\n');
        } catch (error) {
            throw new Error(`Error parsing curl command: ${error.message}`);
        }
    }
} 