document.addEventListener('DOMContentLoaded', () => {
    
    // 1. التعامل مع صور الشهادات والصورة الشخصية إذا لم تكن موجودة
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            if (this.id === 'userPhoto') {
                this.style.display = 'none'; // سيظهر الـ fallback icon التلقائي
            } else {
                this.src = 'https://via.placeholder.com/300x180/161b22/58a6ff?text=Certificate+Image';
            }
        };
    });

    // 2. إشعار عند تحميل الـ CV
    const cvBtn = document.getElementById('viewCvBtn');
    if (cvBtn) {
        cvBtn.addEventListener('click', () => {
            const toast = document.createElement('div');
            toast.innerText = "📥 Downloading CV...";
            toast.style.cssText = `
                position: fixed; bottom: 20px; right: 20px;
                background: #58a6ff; color: #0d1117;
                padding: 12px 20px; border-radius: 8px;
                font-weight: bold; z-index: 1000;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        });
    }

    console.log("Mohamed Tarek's Portfolio Loaded Successfully.");
});