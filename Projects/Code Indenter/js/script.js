document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const inputCodeElem = document.getElementById('input-code');
    const outputCodeElem = document.getElementById('output-code').querySelector('code');
    const languageSelect = document.getElementById('language');
    const themeSelect = document.getElementById('theme');
    const indentTypeSelect = document.getElementById('indentType');
    const indentSizeInput = document.getElementById('indentSize');
    const indentBtn = document.getElementById('indent-btn');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    const prismTheme = document.getElementById('prism-theme');

    // Event Listeners
    indentBtn.addEventListener('click', formatCode);
    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);
    languageSelect.addEventListener('change', updateOutputLanguage);
    themeSelect.addEventListener('change', toggleTheme);

    // Initialize
    updateOutputLanguage();

    // Format code function
    function formatCode() {
        const code = inputCodeElem.value.trim();
        if (!code) {
            showNotification('Please enter code to format', 'error');
            return;
        }

        const language = languageSelect.value;
        const indentType = indentTypeSelect.value;
        const indentSize = parseInt(indentSizeInput.value, 10);
        
        try {
            let formattedCode;
            
            // Format based on language using js-beautify or our custom formatter
            switch (language) {
                case 'html':
                    formattedCode = formatHtml(code, indentType, indentSize);
                    break;
                case 'css':
                    formattedCode = formatCss(code, indentType, indentSize);
                    break;
                case 'javascript':
                    formattedCode = formatJavascript(code, indentType, indentSize);
                    break;
                case 'python':
                    formattedCode = formatPython(code, indentType, indentSize);
                    break;
                case 'java':
                    formattedCode = formatJava(code, indentType, indentSize);
                    break;
                default:
                    formattedCode = simpleIndentation(code, indentSize, indentType === 'tabs');
            }

            // Display the formatted code
            outputCodeElem.textContent = formattedCode;
            
            // Update syntax highlighting
            updatePrismLanguage();
            Prism.highlightElement(outputCodeElem);
            
            showNotification('Code formatted successfully', 'success');
        } catch (error) {
            console.error('Error formatting code:', error);
            showNotification('Error formatting code. Using simple formatter.', 'error');
            
            // Fall back to simple indentation
            const formattedCode = simpleIndentation(code, indentSize, indentType === 'tabs');
            outputCodeElem.textContent = formattedCode;
            updatePrismLanguage();
            Prism.highlightElement(outputCodeElem);
        }
    }

    // HTML Formatting
    function formatHtml(code, indentType, indentSize) {
        try {
            if (typeof html_beautify === 'function') {
                return html_beautify(code, {
                    indent_size: indentSize,
                    indent_char: indentType === 'tabs' ? '\t' : ' ',
                    indent_with_tabs: indentType === 'tabs',
                    end_with_newline: true,
                    preserve_newlines: true,
                    max_preserve_newlines: 2
                });
            }
        } catch (e) {
            console.error("Error using html_beautify:", e);
        }
        
        // Fall back to simple indentation
        return simpleIndentation(code, indentSize, indentType === 'tabs');
    }

    // CSS Formatting
    function formatCss(code, indentType, indentSize) {
        try {
            if (typeof css_beautify === 'function') {
                return css_beautify(code, {
                    indent_size: indentSize,
                    indent_char: indentType === 'tabs' ? '\t' : ' ',
                    indent_with_tabs: indentType === 'tabs'
                });
            }
        } catch (e) {
            console.error("Error using css_beautify:", e);
        }
        
        // Fall back to simple indentation
        return simpleIndentation(code, indentSize, indentType === 'tabs');
    }

    // JavaScript Formatting
    function formatJavascript(code, indentType, indentSize) {
        try {
            if (typeof js_beautify === 'function') {
                return js_beautify(code, {
                    indent_size: indentSize,
                    indent_char: indentType === 'tabs' ? '\t' : ' ',
                    indent_with_tabs: indentType === 'tabs',
                    preserve_newlines: true,
                    max_preserve_newlines: 2,
                    brace_style: 'collapse',
                    space_before_conditional: true
                });
            }
        } catch (e) {
            console.error("Error using js_beautify:", e);
        }
        
        // Fall back to simple indentation
        return simpleIndentation(code, indentSize, indentType === 'tabs');
    }

    // Python Formatting
    function formatPython(code, indentType, indentSize) {
        // For Python, we'll use our custom indentation logic that respects Python's whitespace rules
        return formatWithIndentation(code, indentSize, indentType === 'tabs', {
            increaseIndentPatterns: [
                /:\s*$/,                // lines ending with colon
                /^\s*def\s+\w+\s*\(/,  // function definitions
                /^\s*class\s+\w+/,      // class definitions
                /^\s*if\s+.*:\s*$/,     // if statements
                /^\s*elif\s+.*:\s*$/,   // elif statements
                /^\s*else\s*:\s*$/,     // else statements
                /^\s*for\s+.*:\s*$/,    // for loops
                /^\s*while\s+.*:\s*$/,  // while loops
                /^\s*try\s*:\s*$/,      // try blocks
                /^\s*except.*:\s*$/,     // except blocks
                /^\s*finally\s*:\s*$/   // finally blocks
            ],
            decreaseIndentPatterns: []     // Python's dedent is handled by whitespace level
        });
    }

    // Java Formatting
    function formatJava(code, indentType, indentSize) {
        // For Java, we'll use our custom indentation logic
        return formatWithIndentation(code, indentSize, indentType === 'tabs', {
            increaseIndentPatterns: [
                /\{\s*$/,                // lines ending with {
                /^\s*if\s*\(/,          // if statements
                /^\s*else\s*$/,          // else statements
                /^\s*else\s+if\s*\(/,  // else if statements
                /^\s*for\s*\(/,         // for loops
                /^\s*while\s*\(/,       // while loops
                /^\s*do\s*$/,            // do-while loops
                /^\s*try\s*$/,           // try blocks
                /^\s*catch\s*\(/,       // catch blocks
                /^\s*finally\s*$/        // finally blocks
            ],
            decreaseIndentPatterns: [
                /^\s*\}\s*$/,           // lines with only }
                /^\s*\}\s*else\s*$/,   // } else
                /^\s*\}\s*else\s+if/,  // } else if
                /^\s*\}\s*while/,       // } while (for do-while)
                /^\s*\}\s*catch/,       // } catch
                /^\s*\}\s*finally/      // } finally
            ]
        });
    }

    // Advanced indentation for programming languages with specific rules
    function formatWithIndentation(code, indentSize, useTabs, patterns) {
        const lines = code.split('\n');
        const formattedLines = [];
        let indentLevel = 0;
        const indentChar = useTabs ? '\t' : ' '.repeat(indentSize);
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip empty lines
            if (line === '') {
                formattedLines.push('');
                continue;
            }
            
            // Check for indent decreasing patterns (must check before applying previous line's indent)
            if (patterns.decreaseIndentPatterns && patterns.decreaseIndentPatterns.length > 0) {
                for (const pattern of patterns.decreaseIndentPatterns) {
                    if (pattern.test(line)) {
                        indentLevel = Math.max(0, indentLevel - 1);
                        break;
                    }
                }
            }
            
            // Add the indented line
            formattedLines.push(indentChar.repeat(indentLevel) + line);
            
            // Check for indent increasing patterns (affects the next line)
            if (patterns.increaseIndentPatterns && patterns.increaseIndentPatterns.length > 0) {
                for (const pattern of patterns.increaseIndentPatterns) {
                    if (pattern.test(line)) {
                        indentLevel++;
                        break;
                    }
                }
            }
        }
        
        return formattedLines.join('\n');
    }

    // Simple indentation function as fallback
    function simpleIndentation(code, spaces, useTabs) {
        const lines = code.split('\n');
        let indent = 0;
        const indentChar = useTabs ? '\t' : ' '.repeat(spaces);
        
        const result = lines.map(line => {
            // Trim the line
            const trimmedLine = line.trim();
            
            // Skip empty lines
            if (!trimmedLine) return '';
            
            // Check for closing brackets to decrease indent
            if (trimmedLine.startsWith('}') || trimmedLine.startsWith(')') || trimmedLine.startsWith(']')) {
                indent = Math.max(0, indent - 1);
            }
            
            // Create the indented line
            const indentedLine = indentChar.repeat(indent) + trimmedLine;
            
            // Check for opening brackets to increase indent for next line
            if (trimmedLine.endsWith('{') || trimmedLine.endsWith('(') || 
                trimmedLine.endsWith('[') || trimmedLine.endsWith(':')) {
                indent++;
            }
            
            return indentedLine;
        });
        
        return result.join('\n');
    }

    // Copy formatted code to clipboard
    function copyToClipboard() {
        const formattedCode = outputCodeElem.textContent;
        if (!formattedCode) {
            showNotification('No formatted code to copy', 'error');
            return;
        }

        navigator.clipboard.writeText(formattedCode)
            .then(() => {
                showNotification('Code copied to clipboard', 'success');
            })
            .catch(err => {
                console.error('Error copying text: ', err);
                showNotification('Failed to copy code', 'error');
            });
    }

    // Clear all input and output
    function clearAll() {
        inputCodeElem.value = '';
        outputCodeElem.textContent = '';
        showNotification('All cleared', 'success');
    }

    // Update the language class for output code element
    function updateOutputLanguage() {
        updatePrismLanguage();
        
        // If there's code, update the highlighting
        if (outputCodeElem.textContent.trim()) {
            Prism.highlightElement(outputCodeElem);
        }
    }
    
    // Update Prism language class based on selected language
    function updatePrismLanguage() {
        const language = languageSelect.value;
        
        // Map our language options to Prism's language classes
        const prismLanguageMap = {
            'html': 'language-markup',
            'css': 'language-css',
            'javascript': 'language-javascript',
            'python': 'language-python',
            'java': 'language-java'
        };
        
        outputCodeElem.className = prismLanguageMap[language] || 'language-javascript';
    }

    // Toggle between light and dark themes
    function toggleTheme() {
        const theme = themeSelect.value;
        
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            prismTheme.disabled = false; // Enable dark theme for Prism
        } else {
            document.body.classList.remove('dark-theme');
            prismTheme.disabled = true; // Disable dark theme for Prism
        }
        
        // Re-highlight code with new theme
        if (outputCodeElem.textContent.trim()) {
            Prism.highlightElement(outputCodeElem);
        }
    }

    // Show notification
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Append to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16);
            transition: top 0.3s ease;
        }
        .notification.show {
            top: 20px;
        }
        .notification.success {
            background-color: #4caf50;
        }
        .notification.error {
            background-color: #f44336;
        }
    `;
    document.head.appendChild(style);
});