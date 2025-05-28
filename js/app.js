document.addEventListener('DOMContentLoaded', function() {
    const curlInput = document.getElementById('curlInput');
    const output = document.getElementById('output');
    const copyBtn = document.getElementById('copyBtn');
    const copySuccess = document.getElementById('copySuccess');
    const errorAlert = document.getElementById('errorAlert');

    let debounceTimer;

    function formatCurl() {
        const curlCommand = curlInput.value.trim();
        if (!curlCommand) {
            output.textContent = '';
            copyBtn.style.display = 'none';
            return;
        }

        try {
            const formatted = CurlFormatter.format(curlCommand);
            output.textContent = formatted;
            copyBtn.style.display = 'inline-block';
            errorAlert.style.display = 'none';
        } catch (error) {
            output.textContent = '';
            copyBtn.style.display = 'none';
            showError(error.message);
        }
    }

    // Real-time formatting with debounce
    curlInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(formatCurl, 300);
    });

    copyBtn.addEventListener('click', function() {
        const text = output.textContent;
        navigator.clipboard.writeText(text).then(() => {
            copySuccess.style.display = 'inline-block';
            setTimeout(() => {
                copySuccess.style.display = 'none';
            }, 2000);
        });
    });

    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';
    }
}); 