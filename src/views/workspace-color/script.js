document.addEventListener('DOMContentLoaded', function() {
    const themeSquares = document.querySelectorAll('.theme-square');

    // Apply colors to theme squares on load
    themeSquares.forEach(square => {
        const themeData = square.getAttribute('data-theme');
        if (themeData) {
            const theme = JSON.parse(themeData);
            square.style.backgroundColor = theme.bg;
            square.style.color = theme.text;
        }
    });

    themeSquares.forEach(square => {
        square.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action === 'remove') {
                window.WebviewUtils.postMessageToExtension('removeTheme');
            } else {
                const themeData = this.getAttribute('data-theme');
                if (themeData) {
                    const theme = JSON.parse(themeData);
                    window.WebviewUtils.postMessageToExtension('applyTheme', {theme});
                }
            }
        });
    });
});