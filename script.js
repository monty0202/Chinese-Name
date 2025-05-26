document.addEventListener('DOMContentLoaded', function() {
    // Populate year dropdown (1950 to current year)
    const yearSelect = document.getElementById('birthYear');
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Populate month dropdown
    const monthSelect = document.getElementById('birthMonth');
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    }

    // Populate day dropdown
    const daySelect = document.getElementById('birthDay');
    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }

    // Privacy Policy Modal Handling
    const privacyPolicyLink = document.getElementById('privacyPolicyLink');
    const privacyPolicyModal = document.getElementById('privacyPolicyModal');
    const closePrivacyPolicy = document.getElementById('closePrivacyPolicy');

    privacyPolicyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyPolicyModal.classList.remove('hidden');
    });

    closePrivacyPolicy.addEventListener('click', function() {
        privacyPolicyModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    privacyPolicyModal.addEventListener('click', function(e) {
        if (e.target === privacyPolicyModal) {
            privacyPolicyModal.classList.add('hidden');
        }
    });

    // Form submission handler
    document.getElementById('nameGeneratorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const englishName = document.getElementById('englishName').value;
        const birthYear = document.getElementById('birthYear').value;
        const birthMonth = document.getElementById('birthMonth').value;
        const birthDay = document.getElementById('birthDay').value;

        if (!englishName.trim()) {
            alert('Please enter your English name');
            return;
        }

        const generatedNames = generateChineseNames(englishName, birthYear, birthMonth, birthDay);
        displayResults(generatedNames);
    });
});

function generateChineseNames(englishName, year, month, day) {
    // 创建更大的名字库，以便随机生成更多变化
    const surnames = [
        { chinese: '李', pinyin: 'Lǐ', meaning: 'plum' },
        { chinese: '王', pinyin: 'Wáng', meaning: 'king' },
        { chinese: '张', pinyin: 'Zhāng', meaning: 'to open up' },
        { chinese: '刘', pinyin: 'Liú', meaning: 'to kill' },
        { chinese: '陈', pinyin: 'Chén', meaning: 'to exhibit' },
        { chinese: '杨', pinyin: 'Yáng', meaning: 'poplar' },
        { chinese: '黄', pinyin: 'Huáng', meaning: 'yellow' },
        { chinese: '赵', pinyin: 'Zhào', meaning: 'to surpass' },
        { chinese: '吴', pinyin: 'Wú', meaning: 'flourishing' },
        { chinese: '周', pinyin: 'Zhōu', meaning: 'complete' },
        { chinese: '徐', pinyin: 'Xú', meaning: 'slowly' },
        { chinese: '孙', pinyin: 'Sūn', meaning: 'grandson' },
        { chinese: '马', pinyin: 'Mǎ', meaning: 'horse' },
        { chinese: '朱', pinyin: 'Zhū', meaning: 'vermilion' },
        { chinese: '胡', pinyin: 'Hú', meaning: 'recklessly' }
    ];

    const firstCharacters = [
        { chinese: '明', pinyin: 'Míng', meaning: 'bright' },
        { chinese: '华', pinyin: 'Huá', meaning: 'splendid' },
        { chinese: '英', pinyin: 'Yīng', meaning: 'hero' },
        { chinese: '俊', pinyin: 'Jùn', meaning: 'handsome' },
        { chinese: '文', pinyin: 'Wén', meaning: 'culture' },
        { chinese: '志', pinyin: 'Zhì', meaning: 'aspiration' },
        { chinese: '雅', pinyin: 'Yǎ', meaning: 'elegant' },
        { chinese: '晓', pinyin: 'Xiǎo', meaning: 'dawn' },
        { chinese: '天', pinyin: 'Tiān', meaning: 'heaven' },
        { chinese: '嘉', pinyin: 'Jiā', meaning: 'excellent' },
        { chinese: '安', pinyin: 'Ān', meaning: 'peace' },
        { chinese: '书', pinyin: 'Shū', meaning: 'book' },
        { chinese: '雨', pinyin: 'Yǔ', meaning: 'rain' },
        { chinese: '泽', pinyin: 'Zé', meaning: 'beneficence' },
        { chinese: '德', pinyin: 'Dé', meaning: 'virtue' }
    ];

    const secondCharacters = [
        { chinese: '智', pinyin: 'Zhì', meaning: 'wisdom' },
        { chinese: '平', pinyin: 'Píng', meaning: 'balanced' },
        { chinese: '馨', pinyin: 'Xīn', meaning: 'fragrant' },
        { chinese: '瑞', pinyin: 'Ruì', meaning: 'auspicious' },
        { chinese: '涵', pinyin: 'Hán', meaning: 'contain' },
        { chinese: '美', pinyin: 'Měi', meaning: 'beautiful' },
        { chinese: '宇', pinyin: 'Yǔ', meaning: 'universe' },
        { chinese: '风', pinyin: 'Fēng', meaning: 'wind' },
        { chinese: '桐', pinyin: 'Tóng', meaning: 'phoenix tree' },
        { chinese: '明', pinyin: 'Míng', meaning: 'bright' },
        { chinese: '月', pinyin: 'Yuè', meaning: 'moon' },
        { chinese: '海', pinyin: 'Hǎi', meaning: 'ocean' },
        { chinese: '静', pinyin: 'Jìng', meaning: 'quiet' },
        { chinese: '云', pinyin: 'Yún', meaning: 'cloud' },
        { chinese: '晴', pinyin: 'Qíng', meaning: 'clear sky' }
    ];

    // 根据出生日期为用户分配一些特定字符
    // 这里使用一个简单的算法，将出生日期转换为数字，用于选择名字组合
    const birthSum = parseInt(year) + parseInt(month) + parseInt(day);
    
    // 根据英文名的首字母决定一些选择
    const firstLetter = englishName.charAt(0).toLowerCase();
    const letterValue = firstLetter.charCodeAt(0) - 96; // 'a'=1, 'b'=2, etc.
    
    // 创建结果数组
    const results = [];
    
    // 生成10个独特的名字
    for (let i = 0; i < 10; i++) {
        // 使用一些随机性，但也考虑到用户输入的一致性
        const seed = (birthSum + letterValue + i) % surnames.length;
        const surnameSeed = (seed * (i + 1)) % surnames.length;
        const firstNameSeed = (birthSum + i + letterValue) % firstCharacters.length;
        const secondNameSeed = (birthSum * (i + 1) + letterValue) % secondCharacters.length;
        
        // 选择名字组件
        const surname = surnames[surnameSeed];
        const firstName = firstCharacters[firstNameSeed];
        const secondName = secondCharacters[secondNameSeed];
        
        // 创建完整名字
        const chineseName = surname.chinese + firstName.chinese + secondName.chinese;
        const pinyinName = surname.pinyin + ' ' + firstName.pinyin + secondName.pinyin;
        
        // 创建名字解释
        const meaning = `A name representing ${firstName.meaning} and ${secondName.meaning}. ` +
                        `${surname.chinese}(${surname.pinyin}) is a Chinese surname meaning "${surname.meaning}". ` +
                        `${firstName.chinese}(${firstName.pinyin}) means "${firstName.meaning}" and ` +
                        `${secondName.chinese}(${secondName.pinyin}) means "${secondName.meaning}". ` +
                        `This name is well-suited for someone born in ${month}/${day}, and ` +
                        `complements the sound of "${englishName}". It suggests a person who embodies ` +
                        `both ${firstName.meaning} and ${secondName.meaning} qualities.`;
        
        // 添加到结果
        results.push({
            chinese: chineseName,
            pinyin: pinyinName,
            meaning: meaning
        });
    }
    
    return results;document.addEventListener('DOMContentLoaded', function() {
    // Populate year dropdown (1950 to current year)
    const yearSelect = document.getElementById('birthYear');
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Populate month dropdown
    const monthSelect = document.getElementById('birthMonth');
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
    }

    // Populate day dropdown
    const daySelect = document.getElementById('birthDay');
    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }

    // Privacy Policy Modal Handling
    const privacyPolicyLink = document.getElementById('privacyPolicyLink');
    const privacyPolicyModal = document.getElementById('privacyPolicyModal');
    const closePrivacyPolicy = document.getElementById('closePrivacyPolicy');

    privacyPolicyLink.addEventListener('click', function(e) {
        e.preventDefault();
        privacyPolicyModal.classList.remove('hidden');
    });

    closePrivacyPolicy.addEventListener('click', function() {
        privacyPolicyModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    privacyPolicyModal.addEventListener('click', function(e) {
        if (e.target === privacyPolicyModal) {
            privacyPolicyModal.classList.add('hidden');
        }
    });

    // Form submission handler
    document.getElementById('nameGeneratorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const englishName = document.getElementById('englishName').value;
        const birthYear = document.getElementById('birthYear').value;
        const birthMonth = document.getElementById('birthMonth').value;
        const birthDay = document.getElementById('birthDay').value;

        if (!englishName.trim()) {
            alert('Please enter your English name');
            return;
        }

        const generatedNames = generateChineseNames(englishName, birthYear, birthMonth, birthDay);
        displayResults(generatedNames);
    });
});

function generateChineseNames(englishName, year, month, day) {
    // 创建更大的名字库，以便随机生成更多变化
    const surnames = [
        { chinese: '李', pinyin: 'Lǐ', meaning: 'plum' },
        { chinese: '王', pinyin: 'Wáng', meaning: 'king' },
        { chinese: '张', pinyin: 'Zhāng', meaning: 'to open up' },
        { chinese: '刘', pinyin: 'Liú', meaning: 'to kill' },
        { chinese: '陈', pinyin: 'Chén', meaning: 'to exhibit' },
        { chinese: '杨', pinyin: 'Yáng', meaning: 'poplar' },
        { chinese: '黄', pinyin: 'Huáng', meaning: 'yellow' },
        { chinese: '赵', pinyin: 'Zhào', meaning: 'to surpass' },
        { chinese: '吴', pinyin: 'Wú', meaning: 'flourishing' },
        { chinese: '周', pinyin: 'Zhōu', meaning: 'complete' },
        { chinese: '徐', pinyin: 'Xú', meaning: 'slowly' },
        { chinese: '孙', pinyin: 'Sūn', meaning: 'grandson' },
        { chinese: '马', pinyin: 'Mǎ', meaning: 'horse' },
        { chinese: '朱', pinyin: 'Zhū', meaning: 'vermilion' },
        { chinese: '胡', pinyin: 'Hú', meaning: 'recklessly' }
    ];

    const firstCharacters = [
        { chinese: '明', pinyin: 'Míng', meaning: 'bright' },
        { chinese: '华', pinyin: 'Huá', meaning: 'splendid' },
        { chinese: '英', pinyin: 'Yīng', meaning: 'hero' },
        { chinese: '俊', pinyin: 'Jùn', meaning: 'handsome' },
        { chinese: '文', pinyin: 'Wén', meaning: 'culture' },
        { chinese: '志', pinyin: 'Zhì', meaning: 'aspiration' },
        { chinese: '雅', pinyin: 'Yǎ', meaning: 'elegant' },
        { chinese: '晓', pinyin: 'Xiǎo', meaning: 'dawn' },
        { chinese: '天', pinyin: 'Tiān', meaning: 'heaven' },
        { chinese: '嘉', pinyin: 'Jiā', meaning: 'excellent' },
        { chinese: '安', pinyin: 'Ān', meaning: 'peace' },
        { chinese: '书', pinyin: 'Shū', meaning: 'book' },
        { chinese: '雨', pinyin: 'Yǔ', meaning: 'rain' },
        { chinese: '泽', pinyin: 'Zé', meaning: 'beneficence' },
        { chinese: '德', pinyin: 'Dé', meaning: 'virtue' }
    ];

    const secondCharacters = [
        { chinese: '智', pinyin: 'Zhì', meaning: 'wisdom' },
        { chinese: '平', pinyin: 'Píng', meaning: 'balanced' },
        { chinese: '馨', pinyin: 'Xīn', meaning: 'fragrant' },
        { chinese: '瑞', pinyin: 'Ruì', meaning: 'auspicious' },
        { chinese: '涵', pinyin: 'Hán', meaning: 'contain' },
        { chinese: '美', pinyin: 'Měi', meaning: 'beautiful' },
        { chinese: '宇', pinyin: 'Yǔ', meaning: 'universe' },
        { chinese: '风', pinyin: 'Fēng', meaning: 'wind' },
        { chinese: '桐', pinyin: 'Tóng', meaning: 'phoenix tree' },
        { chinese: '明', pinyin: 'Míng', meaning: 'bright' },
        { chinese: '月', pinyin: 'Yuè', meaning: 'moon' },
        { chinese: '海', pinyin: 'Hǎi', meaning: 'ocean' },
        { chinese: '静', pinyin: 'Jìng', meaning: 'quiet' },
        { chinese: '云', pinyin: 'Yún', meaning: 'cloud' },
        { chinese: '晴', pinyin: 'Qíng', meaning: 'clear sky' }
    ];

    // 根据出生日期为用户分配一些特定字符
    // 这里使用一个简单的算法，将出生日期转换为数字，用于选择名字组合
    const birthSum = parseInt(year) + parseInt(month) + parseInt(day);
    
    // 根据英文名的首字母决定一些选择
    const firstLetter = englishName.charAt(0).toLowerCase();
    const letterValue = firstLetter.charCodeAt(0) - 96; // 'a'=1, 'b'=2, etc.
    
    // 创建结果数组
    const results = [];
    
    // 生成10个独特的名字
    for (let i = 0; i < 10; i++) {
        // 使用一些随机性，但也考虑到用户输入的一致性
        const seed = (birthSum + letterValue + i) % surnames.length;
        const surnameSeed = (seed * (i + 1)) % surnames.length;
        const firstNameSeed = (birthSum + i + letterValue) % firstCharacters.length;
        const secondNameSeed = (birthSum * (i + 1) + letterValue) % secondCharacters.length;
        
        // 选择名字组件
        const surname = surnames[surnameSeed];
        const firstName = firstCharacters[firstNameSeed];
        const secondName = secondCharacters[secondNameSeed];
        
        // 创建完整名字
        const chineseName = surname.chinese + firstName.chinese + secondName.chinese;
        const pinyinName = surname.pinyin + ' ' + firstName.pinyin + secondName.pinyin;
        
        // 创建名字解释
        const meaning = `A name representing ${firstName.meaning} and ${secondName.meaning}. ` +
                        `${surname.chinese}(${surname.pinyin}) is a Chinese surname meaning "${surname.meaning}". ` +
                        `${firstName.chinese}(${firstName.pinyin}) means "${firstName.meaning}" and ` +
                        `${secondName.chinese}(${secondName.pinyin}) means "${secondName.meaning}". ` +
                        `This name is well-suited for someone born in ${month}/${day}, and ` +
                        `complements the sound of "${englishName}". It suggests a person who embodies ` +
                        `both ${firstName.meaning} and ${secondName.meaning} qualities.`;
        
        // 添加到结果
        results.push({
            chinese: chineseName,
            pinyin: pinyinName,
            meaning: meaning
        });
    }
    
    return results;
}

function displayResults(names) {
    const resultsSection = document.getElementById('results');
    const resultsContainer = document.getElementById('nameResults');
    resultsSection.classList.remove('hidden');
    resultsContainer.innerHTML = '';

    names.forEach(name => {
        const nameCard = document.createElement('div');
        nameCard.className = 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow';
        nameCard.innerHTML = `
            <h4 class="text-2xl font-bold text-gray-900 mb-2">${name.chinese}</h4>
            <p class="text-gray-600 mb-2">${name.pinyin}</p>
            <p class="text-gray-700">${name.meaning}</p>
        `;
        resultsContainer.appendChild(nameCard);
    });

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
} 
}

function displayResults(names) {
    const resultsSection = document.getElementById('results');
    const resultsContainer = document.getElementById('nameResults');
    resultsSection.classList.remove('hidden');
    resultsContainer.innerHTML = '';

    names.forEach(name => {
        const nameCard = document.createElement('div');
        nameCard.className = 'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow';
        nameCard.innerHTML = `
            <h4 class="text-2xl font-bold text-gray-900 mb-2">${name.chinese}</h4>
            <p class="text-gray-600 mb-2">${name.pinyin}</p>
            <p class="text-gray-700">${name.meaning}</p>
        `;
        resultsContainer.appendChild(nameCard);
    });

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
} 
