// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. تفاعل مع الصورة الشخصية
    const profileImage = document.getElementById('profileImage');
    const imageOverlay = document.getElementById('imageOverlay');
    
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            // محاكاة اختيار صورة
            showNotification('📸 Click "Change Photo" to upload a new image', 'info');
        });
    }
    
    if (imageOverlay) {
        imageOverlay.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification('🖼️ Photo upload feature coming soon!', 'success');
            
            // تغيير الصورة مؤقتاً (للعرض فقط)
            if (profileImage) {
                profileImage.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    profileImage.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    // 2. تفاعل مع روابط المشاريع
    const projectItems = document.querySelectorAll('.project-item');
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.closest('.project-link')) return;
            
            const projectName = this.querySelector('h3').textContent;
            showNotification(`🔍 Opening ${projectName} labs...`, 'info');
        });
    });
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                showNotification('🚧 Labs coming soon!', 'info');
            } else {
                showNotification('🚀 Redirecting to GitHub...', 'info');
            }
        });
    });

    // 3. تفاعل مع قائمة الكورسات
    const courseItems = document.querySelectorAll('.course-list li');
    
    courseItems.forEach(item => {
        item.addEventListener('click', function() {
            const courseText = this.textContent.trim();
            showNotification(`📚 Course: ${courseText.substring(0, 40)}...`, 'info');
        });
    });

    // 4. تفاعل مع شهادة Microsoft
    const achievementCard = document.getElementById('achievementCard');
    
    if (achievementCard) {
        achievementCard.addEventListener('click', function() {
            showNotification('🏆 Microsoft Sprints Camp Certificate', 'success');
            
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // 5. تفاعل مع مهارات Cybersecurity
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

    // 6. تفاعل مع البريد الإلكتروني (نسخ)
    const emailLink = document.getElementById('emailLink');
    
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على البريد الإلكتروني من data attribute
            const email = this.dataset.email;
            
            // نسخ البريد الإلكتروني
            navigator.clipboard.writeText(email).then(() =>
