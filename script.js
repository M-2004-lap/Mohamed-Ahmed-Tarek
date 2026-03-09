// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تفعيل زر View CV (مع التحقق من وجوده في الصفحة)
    const viewCvBtn = document.getElementById('viewCvBtn');
    if (viewCvBtn) {
        viewCvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('📄 CV is being prepared for download...', 'info');
            
            setTimeout(() => {
                showNotification('✅ CV downloaded successfully!', 'success');
            }, 1000);
        });
    }

    // 2. التفاعل مع البريد الإلكتروني (إضافة جديدة)
    const emailSpan = document.querySelector('.email');
    if (emailSpan) {
        emailSpan.addEventListener('click', function() {
            const email = this.textContent.trim();
            showNotification(`📧 Contacting: ${email}`, 'success');
            
            // اختيارياً: فتح برنامج البريد عند الضغط
            // window.location.href = "mailto:" + email;
        });
    }

    // 3. تفاعل مع الصورة الشخصية
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            showNotification('📸 Click "Add Photo" to upload your image', 'info');
            
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-spinner fa-spin';
            
            setTimeout(() => {
                icon.className = originalClass;
                showNotification('✨ Photo upload feature coming soon!', 'success');
            }, 1500);
        });
    }

    // 4. تفاعل مع بطاقات المشاريع
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.project-link')) return;
            
            const projectName = this.querySelector('h3').textContent;
            showNotification(`🔍 Opening ${projectName} labs...`, 'info');
            
            setTimeout(() => {
                showNotification(`✨ ${projectName} materials loaded`, 'success');
            }, 500);
        });
        
        const projectLink = item.querySelector('.project-link');
        if (projectLink) {
            projectLink.addEventListener('click', function(e) {
                // ملاحظة: إذا كنت تريد الرابط يعمل فعلياً، احذف e.preventDefault()
                // e.preventDefault(); 
                const linkType = this.dataset.projectLink;
                showNotification(`🚀 Redirecting to ${linkType || 'GitHub'}...`, 'info');
            });
        }
    });

    // 5. تفاعل مع قائمة الكورسات وشهادة Microsoft
    const courseItems = document.querySelectorAll('.course-list li');
    courseItems.forEach(item => {
        item.addEventListener('click', function() {
            showNotification(`📚 Course: ${this.textContent.trim().substring(0, 40)}...`, 'info');
        });
    });

    const achievementCard = document.getElementById('achievementCard');
    if (achievementCard) {
        achievementCard.addEventListener('click', function() {
            showNotification('🏆 Microsoft Sprints Camp Certificate', 'success');
            this.style.transform = 'scale(0.98)';
            setTimeout(() => this.style.transform = 'scale(1)', 150);
        });
    }

    // 6. تفاعل مع مهارات Cybersecurity
    const cyberTags = document.querySelectorAll('.cyber-tag');
    cyberTags.forEach(tag => {
        tag.addEventListener('click', function() {
            showNotification(`⚡ Skill: ${this.textContent}`, 'info');
            this.style.backgroundColor = '#00a6ff';
            this.style.color = '#0a0c0f';
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 200);
        });
    });

    // 7. نظام الإشعارات المخصص
    function showNotification(message, type = 'info') {
        const oldNote = document.querySelector('.custom-notification');
        if (oldNote) oldNote.remove();
        
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        
        let borderColor = type === 'success' ? '#00a6ff' : '#ff4444';
        let icon = type === 'success' ? '✅' : 'ℹ️';
        
        notification.style.cssText = `
            position: fixed; bottom: 20px; right: 20px;
            background: #0f1a22; color: #00a6ff;
            padding: 12px 24px; border-radius: 50px;
            font-family: 'Inter', sans-serif; font-weight: 500;
            box-shadow: 0 5px 20px rgba(0, 166, 255, 0.2);
            z-index: 1000; display: flex; align-items: center;
            gap: 10px; border: 1px solid ${borderColor};
            animation: slideInRight 0.3s ease forwards;
        `;
        
        notification.innerHTML = `${icon} ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // 8. ميزة البحث (Double Shift)
    let lastKeyTime = 0;
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Shift') {
            const currentTime = new Date().getTime();
            if (currentTime - lastKeyTime < 500) {
                const term = prompt('🔍 Search in Mohamed\'s Portfolio:');
                if (term) searchInPortfolio(term);
            }
            lastKeyTime = currentTime;
        }
    });

    function searchInPortfolio(term) {
        term = term.toLowerCase();
        const elements = document.querySelectorAll('h1, h3, .project-desc, .course-list li, .skill-tag');
        let found = 0;
        elements.forEach(el => {
            if (el.textContent.toLowerCase().includes(term)) {
                el.style.backgroundColor = '#1a2a33';
                el.style.outline = '1px solid #00a6ff';
                setTimeout(() => { el.style.backgroundColor = ''; el.style.outline = ''; }, 3000);
                found++;
            }
        });
        showNotification(`🔎 Found ${found} matches`, 'info');
    }

    console.log('%c🚀 Mohamed Ahmed Tarek - Portfolio Loaded', 'color: #00a6ff; font-weight: bold');
});
