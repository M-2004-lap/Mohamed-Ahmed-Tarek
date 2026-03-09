// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تفعيل زر View CV مع رسالة منبثقة
    const viewCvBtn = document.getElementById('viewCvBtn');
    
    viewCvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // إنشاء عنصر الإشعار المنبثق
        showNotification('📄 CV is being prepared for download...', 'info');
        
        // محاكاة تحميل CV بعد ثانية
        setTimeout(() => {
            showNotification('✅ CV downloaded successfully!', 'success');
        }, 1000);
    });

    // 2. تفاعل مع بطاقات المشاريع
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // منع التفاعل إذا تم الضغط على الرابط نفسه
            if (e.target.closest('.project-link')) return;
            
            const projectType = this.dataset.project;
            const projectName = this.querySelector('h3').textContent;
            
            showNotification(`🔍 Opening ${projectName} labs...`, 'info');
            
            // محاكاة فتح المشروع بعد نصف ثانية
            setTimeout(() => {
                showNotification(`✨ ${projectName} materials loaded`, 'success');
            }, 500);
        });
        
        // روابط المشاريع
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
            
            // تغيير لون الرابط مؤقتاً
            this.style.backgroundColor = '#b8d9f0';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });

    // 3. تفاعل مع قائمة الكورسات
    const courseItems = document.querySelectorAll('.course-list li');
    
    courseItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // إضافة تأثير عند المرور
            this.style.transition = 'all 0.2s ease';
        });
        
        item.addEventListener('click', function() {
            const courseText = this.textContent.trim();
            showNotification(`📚 Course: ${courseText.substring(0, 30)}...`, 'info');
        });
    });

    // 4. تفاعل مع شهادة Microsoft
    const achievementCard = document.getElementById('achievementCard');
    
    achievementCard.addEventListener('click', function() {
        showNotification('🏆 Microsoft Sprints Camp Certificate', 'success');
        
        // تأثير وامض
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    // 5. تفاعل مع مهارات Cybersecurity
    const cyberTags = document.querySelectorAll('.cyber-tag');
    
    cyberTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const skillName = this.textContent;
            showNotification(`⚡ Skill selected: ${skillName}`, 'info');
            
            // تأثير مؤقت
            this.style.backgroundColor = '#2d7ca0';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
        });
    });

    // 6. إحصائيات خفيفة (تظهر في الـ console)
    function displayStats() {
        const projectCount = document.querySelectorAll('.project-item').length;
        const courseCount = document.querySelectorAll('.course-list li').length;
        const skillCount = document.querySelectorAll('.skill-tag').length;
        
        console.log('📊 Portfolio Statistics:');
        console.log(`   Projects: ${projectCount}`);
        console.log(`   Courses: ${courseCount}`);
        console.log(`   Skills: ${skillCount}`);
        console.log(`   Last updated: ${new Date().toLocaleDateString()}`);
    }
    
    displayStats();

    // 7. كشف المهارات المميزة
    function highlightTopSkills() {
        const skills = document.querySelectorAll('.skill-tag.cyber-tag');
        if (skills.length > 0) {
            // إضافة class مميز لأول 3 مهارات
            for (let i = 0; i < Math.min(3, skills.length); i++) {
                skills[i].style.position = 'relative';
                // إضافة نجمة صغيرة
                const star = document.createElement('span');
                star.innerHTML = '⭐';
                star.style.position = 'absolute';
                star.style.top = '-8px';
                star.style.right = '-8px';
                star.style.fontSize = '12px';
                skills[i].style.position = 'relative';
                skills[i].appendChild(star);
            }
        }
    }
    
    // تأخير بسيط لظهور النجوم
    setTimeout(highlightTopSkills, 500);

    // 8. وظيفة تغيير ألوان الخلفية بشكل خفيف
    let colorIndex = 0;
    const colors = ['#f0f4f8', '#ecf3f9', '#e8f2fa', '#e4f1fb'];
    
    document.body.addEventListener('dblclick', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        document.body.style.backgroundColor = colors[colorIndex];
        document.body.style.transition = 'background-color 0.5s ease';
        showNotification('🎨 Theme color changed!', 'success');
    });

    // 9. نظام الإشعارات المخصص
    function showNotification(message, type = 'info') {
        // إزالة أي إشعار سابق
        const oldNote = document.querySelector('.custom-notification');
        if (oldNote) oldNote.remove();
        
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        
        // تخصيص الألوان حسب النوع
        let bgColor, icon;
        if (type === 'success') {
            bgColor = '#1e7e34';
            icon = '✅';
        } else if (type === 'error') {
            bgColor = '#b53b3b';
            icon = '❌';
        } else {
            bgColor = '#1f6e8c';
            icon = 'ℹ️';
        }
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease forwards;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.innerHTML = `${icon} ${message}`;
        
        // إضافة animation إذا لم تكن موجودة
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
        
        // إخفاء الإشعار بعد 3 ثواني
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // 10. إضافة خاصية البحث السريع (double shift)
    let lastKeyTime = 0;
    let shiftCount = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Shift') {
            const currentTime = new Date().getTime();
            if (currentTime - lastKeyTime < 500) {
                shiftCount++;
                if (shiftCount === 2) {
                    // Double shift detected
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
                // تمييز مؤقت
                const originalBg = el.style.backgroundColor;
                el.style.backgroundColor = '#fff3bf';
                el.style.transition = 'background-color 0.3s ease';
                el.style.borderRadius = '8px';
                el.style.padding = '2px 4px';
                
                setTimeout(() => {
                    el.style.backgroundColor = originalBg;
                }, 2000);
            }
        });
        
        showNotification(`🔎 Found ${foundCount} matches for "${term}"`, 'info');
    }

    console.log('🚀 Portfolio JS loaded successfully!');
});
