// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تفعيل زر View CV مع رسالة منبثقة
    const viewCvBtn = document.getElementById('viewCvBtn');
    
    viewCvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('📄 CV is being prepared for download...', 'info');
        
        setTimeout(() => {
            showNotification('✅ CV downloaded successfully!', 'success');
        }, 1000);
    });

    // 2. تفاعل مع الصورة الشخصية
    const profileImage = document.getElementById('profileImage');
    
    profileImage.addEventListener('click', function() {
        // محاكاة اختيار صورة
        showNotification('📸 Click "Add Photo" to upload your image', 'info');
        
        // تغيير الأيقونة مؤقتاً
        const icon = this.querySelector('i');
        icon.className = 'fas fa-spinner fa-spin';
        
        setTimeout(() => {
            icon.className = 'fas fa-user-secret';
            showNotification('✨ Photo upload feature coming soon!', 'success');
        }, 1500);
    });

    // 3. تفاعل مع بطاقات المشاريع
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.project-link')) return;
            
            const projectType = this.dataset.project;
            const projectName = this.querySelector('h3').textContent;
            
            showNotification(`🔍 Opening ${projectName} labs...`, 'info');
            
            setTimeout(() => {
                showNotification(`✨ ${projectName} materials loaded`, 'success');
            }, 500);
        });
        
        const projectLink = item.querySelector('.project-link');
        projectLink.addEventListener('click', function(e) {
            e.preventDefault();
            const linkType = this.dataset.projectLink;
            const projectNames = {
                'web': 'Web Security',
                'network': 'Network Security',
                'windows': 'Windows & PrivEsc',
                'osint': 'Recon & OSINT'
            };
            
            showNotification(`🚀 Redirecting to ${projectNames[linkType]} labs...`, 'info');
            
            this.style.backgroundColor = '#00a6ff';
            this.style.color = '#0a0c0f';
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 300);
        });
    });

    // 4. تفاعل مع قائمة الكورسات
    const courseItems = document.querySelectorAll('.course-list li');
    
    courseItems.forEach(item => {
        item.addEventListener('click', function() {
            const courseText = this.textContent.trim();
            showNotification(`📚 Course: ${courseText.substring(0, 30)}...`, 'info');
        });
    });

    // 5. تفاعل مع شهادة Microsoft
    const achievementCard = document.getElementById('achievementCard');
    
    achievementCard.addEventListener('click', function() {
        showNotification('🏆 Microsoft Sprints Camp Certificate', 'success');
        
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // 6. تفاعل مع مهارات Cybersecurity
    const cyberTags = document.querySelectorAll('.cyber-tag');
    
    cyberTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const skillName = this.textContent;
            showNotification(`⚡ Skill selected: ${skillName}`, 'info');
            
            this.style.backgroundColor = '#00a6ff';
            this.style.color = '#0a0c0f';
            setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 200);
        });
    });

    // 7. إحصائيات في console
    function displayStats() {
        const projectCount = document.querySelectorAll('.project-item').length;
        const courseCount = document.querySelectorAll('.course-list li').length;
        const skillCount = document.querySelectorAll('.skill-tag').length;
        
        console.log('%c📊 Portfolio Statistics:', 'color: #00a6ff; font-weight: bold');
        console.log(`   Projects: ${projectCount}`);
        console.log(`   Courses: ${courseCount}`);
        console.log(`   Skills: ${skillCount}`);
        console.log(`   Last updated: ${new Date().toLocaleDateString()}`);
    }
    
    displayStats();

    // 8. نظام الإشعارات المخصص
    function showNotification(message, type = 'info') {
        const oldNote = document.querySelector('.custom-notification');
        if (oldNote) oldNote.remove();
        
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        
        let bgColor, borderColor, icon;
        if (type === 'success') {
            bgColor = '#0f1a22';
            borderColor = '#00a6ff';
            icon = '✅';
        } else if (type === 'error') {
            bgColor = '#0f1a22';
            borderColor = '#ff4444';
            icon = '❌';
        } else {
            bgColor = '#0f1a22';
            borderColor = '#ff4444';
            icon = 'ℹ️';
        }
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${bgColor};
            color: #00a6ff;
            padding: 12px 24px;
            border-radius: 50px;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            box-shadow: 0 5px 20px rgba(0, 166, 255, 0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease forwards;
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid ${borderColor};
        `;
        
        notification.innerHTML = `${icon} ${message}`;
        
        if (!document.querySelector('#notificationKeyframes')) {
            const style = document.createElement('style');
            style.id = 'notificationKeyframes';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // 9. البحث بالضغط على Shift مرتين
    let lastKeyTime = 0;
    let shiftCount = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Shift') {
            const currentTime = new Date().getTime();
            if (currentTime - lastKeyTime < 500) {
                shiftCount++;
                if (shiftCount === 2) {
                    const searchTerm = prompt('🔍 Search in portfolio:', '');
                    if (searchTerm) {
                        searchInPortfolio(searchTerm);
                    }
                    shiftCount = 0;
                }
            } else {
                shiftCount = 1;
            }
            lastKeyTime = currentTime;
        }
    });
    
    function searchInPortfolio(term) {
        term = term.toLowerCase();
        const allTextElements = document.querySelectorAll('h1, h2, h3, .project-desc, .course-list li, .skill-tag');
        let foundCount = 0;
        
        allTextElements.forEach(el => {
            const text = el.textContent.toLowerCase();
            if (text.includes(term)) {
                foundCount++;
                const originalBg = el.style.backgroundColor;
                el.style.backgroundColor = '#1a2a33';
                el.style.border = '1px solid #00a6ff';
                el.style.transition = 'all 0.3s ease';
                el.style.borderRadius = '8px';
                el.style.padding = '2px 4px';
                
                setTimeout(() => {
                    el.style.backgroundColor = originalBg;
                    el.style.border = '';
                }, 2000);
            }
        });
        
        showNotification(`🔎 Found ${foundCount} matches for "${term}"`, 'info');
    }

    // 10. تغيير ألوان الخلفية (نسخة داكنة)
    let themeIndex = 0;
    const themes = ['#0a0c0f', '#0f1a22', '#111418', '#0b1a24'];
    
    document.body.addEventListener('dblclick', function() {
        themeIndex = (themeIndex + 1) % themes.length;
        document.body.style.backgroundColor = themes[themeIndex];
        document.body.style.transition = 'background-color 0.5s ease';
        showNotification('🎨 Dark theme changed!', 'success');
    });

    console.log('%c🚀 Dark Portfolio Loaded Successfully!', 'color: #ff4444; font-weight: bold');
}); عدل 
