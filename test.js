/* ══ 120 UNIQUE ANIMATIONS — 12 exclusive families, 10 variants each ══ */
    /* Each category has its own motion family. No animation is shared across categories. */
    const Q_ICONS = {
      // Cat 1: Teaching Aptitude
      1:'👨‍🏫',2:'👩‍🏫',3:'🔍',4:'📝',5:'🗣️',6:'👂',7:'📚',8:'🖊️',9:'🏫',10:'🎒',
      // Cat 2: Subject Knowledge
      11:'🔬',12:'🔭',13:'🧪',14:'📐',15:'🧮',16:'🧬',17:'💻',18:'⌨️',19:'🖥️',20:'💾',
      // Cat 3: Classroom Management
      21:'🕰️',22:'⏱️',23:'📅',24:'🗓️',25:'📊',26:'📉',27:'📈',28:'🗂️',29:'📂',30:'🗃️',
      // Cat 4: Communication
      31:'📱',32:'📲',33:'☎️',34:'📞',35:'📟',36:'📠',37:'✉️',38:'📩',39:'📨',40:'📧',
      // Cat 5: Emotional Intelligence
      41:'😊',42:'😃',43:'😌',44:'🤝',45:'🫂',46:'❤️',47:'💙',48:'💜',49:'💚',50:'💛',
      // Cat 6: Motivation & Passion
      51:'🚀',52:'🛸',53:'🚁',54:'🛩️',55:'✈️',56:'🛫',57:'🛬',58:'🎈',59:'🌟',60:'💫',
      // Cat 7: Creativity & Innovation
      61:'🎨',62:'🖌️',63:'🖍️',64:'🎸',65:'🎹',66:'🥁',67:'🎭',68:'🎬',69:'📸',70:'🎥',
      // Cat 8: Adaptability
      71:'🧩',72:'🎲',73:'🎯',74:'🎳',75:'🎮',76:'🕹️',77:'🎰',78:'🪄',79:'🔮',80:'🧿',
      // Cat 9: Leadership
      81:'👑',82:'🧢',83:'🎩',84:'🎓',85:'🏅',86:'🥇',87:'🥈',88:'🥉',89:'🏆',90:'🎖️',
      // Cat 10: Ethics
      91:'⚖️',92:'🛡️',93:'⚔️',94:'🗡️',95:'🗝️',96:'🔑',97:'🔐',98:'🔒',99:'🔓',100:'🔏',
      // Cat 11: Attitude
      101:'☀️',102:'🌤️',103:'⛅',104:'🌥️',105:'☁️',106:'🌦️',107:'🌧️',108:'⛈️',109:'🌩️',110:'🌨️',
      // Cat 12: Responsibility
      111:'🌍',112:'🌎',113:'🌏',114:'🗺️',115:'🧭',116:'🏔️',117:'🌋',118:'🏕️',119:'🏖️',120:'🏜️'
    };

    /* Build 120 unique CSS animations at runtime */
    const Q_ANIMATIONS = {};
    (function generateExclusiveAnimations() {
      let css = '';
      
      for(let i=0; i<120; i++) {
        const qId = i + 1;
        const name = 'qa' + qId;
        
        // Generate pseudo-random deterministic large values
        const seed1 = (i * 137 + 11);
        const seed2 = (i * 271 + 33);
        const seed3 = (i * 313 + 55);
        const seed4 = (i * 401 + 77);
        
        // Pick a dominant effect to ensure they don't all look like "random chaotic flying"
        // 0: Big Translate, 1: Big Rotate, 2: Big Scale, 3: 3D Flip, 4: Translate + Rotate, 5: Translate + Scale
        const effectType = seed1 % 6;
        
        let kf = '';
        if(effectType === 0) {
           const dx = (seed2 % 160) - 80;
           const dy = (seed3 % 160) - 80;
           // force it to be a BIG move
           const fdx = dx >= 0 ? dx + 50 : dx - 50;
           const fdy = dy >= 0 ? dy + 50 : dy - 50;
           kf = `0%,100%{transform:translate(0,0)} 50%{transform:translate(${fdx}px, ${fdy}px)}`;
        } else if(effectType === 1) {
           const rot = (seed2 % 720) - 360;
           const frot = rot >= 0 ? rot + 180 : rot - 180;
           kf = `0%,100%{transform:rotate(0deg)} 50%{transform:rotate(${frot}deg)}`;
        } else if(effectType === 2) {
           const sc = 1.5 + (seed2 % 15) * 0.1; // 1.5x to 2.9x
           kf = `0%,100%{transform:scale(1)} 50%{transform:scale(${sc.toFixed(2)})}`;
        } else if(effectType === 3) {
           const isX = seed2 % 2 === 0;
           kf = isX 
             ? `0%{transform:perspective(400px) rotateX(0deg)} 100%{transform:perspective(400px) rotateX(360deg)}`
             : `0%{transform:perspective(400px) rotateY(0deg)} 100%{transform:perspective(400px) rotateY(360deg)}`;
        } else if(effectType === 4) {
           const dx = (seed2 % 120) - 60;
           const fdx = dx >= 0 ? dx + 40 : dx - 40;
           const rot = (seed3 % 360) - 180;
           const frot = rot >= 0 ? rot + 90 : rot - 90;
           kf = `0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(${fdx}px, ${fdx}px) rotate(${frot}deg)}`;
        } else if(effectType === 5) {
           const dy = (seed2 % 120) - 60;
           const fdy = dy >= 0 ? dy + 40 : dy - 40;
           const sc = 0.4 + (seed3 % 10) * 0.1; // 0.4x to 1.3x
           kf = `0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(0, ${fdy}px) scale(${sc.toFixed(2)})}`;
        }
        
        css += `@keyframes ${name} { ${kf} }\n`;
        const dur = (1.0 + (seed4 % 20) * 0.1).toFixed(2);
        css += `.q-anim-${name} .slide-illus { animation: ${name} ${dur}s ease-in-out infinite; }\n`;
        Q_ANIMATIONS[qId] = { icon: Q_ICONS[qId] || '✨', anim: name };
      }
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);
    })();

    /* ══ SECTIONS DATA ══ */
    const SECS = [
      { id: 1, name: 'Teaching Aptitude', color: '#4a8fe8', bg: 'rgba(74,143,232,.12)', icon: '🎓', img: 'assets/section-1-teaching-aptitude.png', qs: Array.from({length: 10}, (_, i) => i + 1), reverse: false },
      { id: 2, name: 'Subject Knowledge & Clarity', color: '#3ec9a7', bg: 'rgba(62,201,167,.12)', icon: '📚', img: 'assets/section-2-subject-knowledge.png', qs: Array.from({length: 10}, (_, i) => i + 11), reverse: false },
      { id: 3, name: 'Classroom Management & Discipline', color: '#d4a843', bg: 'rgba(212,168,67,.12)', icon: '👥', img: 'assets/section-3-classroom-management.png', qs: Array.from({length: 10}, (_, i) => i + 21), reverse: false },
      { id: 4, name: 'Communication Skills', color: '#9b6de8', bg: 'rgba(155,109,232,.12)', icon: '💬', img: 'assets/section-4-communication.png', qs: Array.from({length: 10}, (_, i) => i + 31), reverse: false },
      { id: 5, name: 'Emotional Intelligence', color: '#e8624a', bg: 'rgba(232,98,74,.12)', icon: '❤️', img: 'assets/section-5-emotional-intelligence.png', qs: Array.from({length: 10}, (_, i) => i + 41), reverse: false },
      { id: 6, name: 'Motivation & Passion for Teaching', color: '#f59e0b', bg: 'rgba(245,158,11,.12)', icon: '🔥', img: 'assets/section-6-motivation.png', qs: Array.from({length: 10}, (_, i) => i + 51), reverse: false },
      { id: 7, name: 'Creativity & Innovation in Teaching', color: '#8b5cf6', bg: 'rgba(139,92,246,.12)', icon: '💡', img: 'assets/section-7-creativity.png', qs: Array.from({length: 10}, (_, i) => i + 61), reverse: false },
      { id: 8, name: 'Adaptability & Flexibility', color: '#06b6d4', bg: 'rgba(6,182,212,.12)', icon: '🔄', img: 'assets/section-8-adaptability.png', qs: Array.from({length: 10}, (_, i) => i + 71), reverse: false },
      { id: 9, name: 'Leadership & Role Modeling', color: '#ec4899', bg: 'rgba(236,72,153,.12)', icon: '👑', img: 'assets/section-9-leadership.png', qs: Array.from({length: 10}, (_, i) => i + 81), reverse: false },
      { id: 10, name: 'Professional Ethics & Values', color: '#14b8a6', bg: 'rgba(20,184,166,.12)', icon: '⚖️', img: 'assets/section-10-ethics.png', qs: Array.from({length: 10}, (_, i) => i + 91), reverse: false },
      { id: 11, name: 'Attitude (Optimism, Growth Mindset, Resilience)', color: '#f97316', bg: 'rgba(249,115,22,.12)', icon: '🌟', img: 'assets/section-11-attitude.png', qs: Array.from({length: 10}, (_, i) => i + 101), reverse: false },
      { id: 12, name: 'Responsibility & Commitment', color: '#6366f1', bg: 'rgba(99,102,241,.12)', icon: '✅', img: 'assets/section-12-responsibility.png', qs: Array.from({length: 10}, (_, i) => i + 111), reverse: false },
    ];

    const OPTIONS = [
      { t: 'Option A', s: 1 },
      { t: 'Option B', s: 2 },
      { t: 'Option C', s: 3 },
      { t: 'Option D', s: 5 },
    ];

    const QUESTIONS = [
      // Category 1: Teaching Aptitude (Q1-Q10)
      { id: 1, sec: 1, text: 'You are teaching a new concept, and half the students look confused. What would you do?', opts: [
        { t: 'I would continue with the lesson while briefly revisiting the concept.', s: 1 },
        { t: 'I would repeat the explanation with slight clarification.', s: 2 },
        { t: 'I would check understanding and re-explain key points.', s: 3 },
        { t: 'I would simplify the concept using alternative examples.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 2, sec: 1, text: 'You notice students are not interested in your lesson. How would you handle this?', opts: [
        { t: 'I would continue while making minimal effort to regain attention.', s: 1 },
        { t: 'I would slightly adjust my tone or pace.', s: 2 },
        { t: 'I would include relevant examples to regain interest.', s: 3 },
        { t: 'I would introduce questions or small interactions.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 3, sec: 1, text: 'A student asks, "Why should we study this topic?" What\'s your reaction?', opts: [
        { t: 'I would give a general answer and continue the lesson.', s: 1 },
        { t: 'I would briefly explain its importance.', s: 2 },
        { t: 'I would relate the topic to practical applications.', s: 3 },
        { t: 'I would connect it to real-life scenarios and student goals.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 4, sec: 1, text: 'You are asked to teach a subject area that is not your favorite. How would you approach it?', opts: [
        { t: 'I would teach it as required without much change.', s: 1 },
        { t: 'I would prepare adequately and deliver the content.', s: 2 },
        { t: 'I would try to make it interesting for students.', s: 3 },
        { t: 'I would explore creative ways to engage students.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 5, sec: 1, text: 'Your school assigns you to take remedial classes for weak students. What do you do?', opts: [
        { t: 'I would conduct the class as per instructions.', s: 1 },
        { t: 'I would focus on basic revision.', s: 2 },
        { t: 'I would identify student difficulties and address them.', s: 3 },
        { t: 'I would use different methods to support learning.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 6, sec: 1, text: 'When you succeed in explaining a difficult concept clearly, how do you feel?', opts: [
        { t: 'I feel satisfied and move on.', s: 1 },
        { t: 'I feel happy about completing the task.', s: 2 },
        { t: 'I feel encouraged to continue teaching effectively.', s: 3 },
        { t: 'I feel motivated to improve further.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 7, sec: 1, text: 'Students are hesitant to ask questions in your class. What will you do?', opts: [
        { t: 'I would wait for them to ask questions.', s: 1 },
        { t: 'I would encourage them occasionally.', s: 2 },
        { t: 'I would create opportunities for questions.', s: 3 },
        { t: 'I would build a comfortable environment for interaction.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 8, sec: 1, text: 'A new teaching method is introduced in your school. What\'s your response?', opts: [
        { t: 'I would continue with my existing method.', s: 1 },
        { t: 'I would try it if required.', s: 2 },
        { t: 'I would learn and apply it gradually.', s: 3 },
        { t: 'I would adopt and adapt it effectively.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 9, sec: 1, text: 'If a student doesn\'t understand after your first explanation, what do you do?', opts: [
        { t: 'I would repeat the same explanation.', s: 1 },
        { t: 'I would explain again with slight variation.', s: 2 },
        { t: 'I would clarify using different examples.', s: 3 },
        { t: 'I would adjust my explanation based on the student\'s need.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 10, sec: 1, text: 'How do you usually feel before going to class?', opts: [
        { t: 'I feel it is a routine responsibility.', s: 1 },
        { t: 'I feel prepared to conduct the session.', s: 2 },
        { t: 'I feel interested in delivering the lesson.', s: 3 },
        { t: 'I feel motivated to engage students.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 2: Subject Knowledge & Clarity (Q11-Q20)
      { id: 11, sec: 2, text: 'A student asks a difficult question that you don\'t know the answer to. How would you handle it?', opts: [
        { t: 'I would give a general response and continue the lesson.', s: 1 },
        { t: 'I would acknowledge the question and provide a partial explanation.', s: 2 },
        { t: 'I would admit I\'m not sure and try to relate it to known concepts.', s: 3 },
        { t: 'I would honestly admit it and promise to check and respond later.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 12, sec: 2, text: 'While teaching, you realize you made a mistake in explaining a concept. What do you do?', opts: [
        { t: 'I would continue without addressing it immediately.', s: 1 },
        { t: 'I would correct it briefly and move on.', s: 2 },
        { t: 'I would acknowledge and clarify the mistake.', s: 3 },
        { t: 'I would explain the correction clearly with proper reasoning.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 13, sec: 2, text: 'Your students find a particular topic very difficult to understand. How would you teach it?', opts: [
        { t: 'I would continue teaching as per plan.', s: 1 },
        { t: 'I would repeat the explanation again.', s: 2 },
        { t: 'I would simplify the topic using basic examples.', s: 3 },
        { t: 'I would use multiple methods (visuals, examples, analogies).', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 14, sec: 2, text: 'When preparing for a class, how do you usually approach the content?', opts: [
        { t: 'I follow the textbook or notes directly.', s: 1 },
        { t: 'I prepare key points before the class.', s: 2 },
        { t: 'I organize content for better clarity.', s: 3 },
        { t: 'I include examples and supporting materials.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 15, sec: 2, text: 'A student challenges your explanation with an alternative view. What would you do?', opts: [
        { t: 'I would maintain my explanation and continue.', s: 1 },
        { t: 'I would acknowledge briefly and proceed.', s: 2 },
        { t: 'I would listen and respond with clarification.', s: 3 },
        { t: 'I would discuss the alternative view and compare perspectives.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 16, sec: 2, text: 'Students say your explanation is "too fast." How do you respond?', opts: [
        { t: 'I would continue at my pace.', s: 1 },
        { t: 'I would slow down slightly.', s: 2 },
        { t: 'I would adjust pace and check understanding.', s: 3 },
        { t: 'I would modify my explanation and include pauses.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 17, sec: 2, text: 'You find a new discovery or update in your subject field. How do you treat it?', opts: [
        { t: 'I note it but continue with existing content.', s: 1 },
        { t: 'I mention it briefly in class.', s: 2 },
        { t: 'I include it as additional information.', s: 3 },
        { t: 'I integrate it into my teaching content.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 18, sec: 2, text: 'If students repeatedly perform poorly in your subject, what\'s your first step?', opts: [
        { t: 'I continue teaching as planned.', s: 1 },
        { t: 'I review the content again.', s: 2 },
        { t: 'I analyze common mistakes.', s: 3 },
        { t: 'I adjust teaching methods based on gaps.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 19, sec: 2, text: 'When explaining a tough concept, how do you usually check if students understood?', opts: [
        { t: 'I assume they understood if there are no questions.', s: 1 },
        { t: 'I ask a few general questions.', s: 2 },
        { t: 'I check understanding through responses.', s: 3 },
        { t: 'I use targeted questions or quick assessments.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 20, sec: 2, text: 'How do you keep your subject knowledge updated?', opts: [
        { t: 'I rely on existing knowledge.', s: 1 },
        { t: 'I occasionally read or refer materials.', s: 2 },
        { t: 'I regularly update through books/resources.', s: 3 },
        { t: 'I follow latest developments and trends.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 3: Classroom Management & Discipline (Q21-Q30)
      { id: 21, sec: 3, text: 'During your lesson, two students at the back keep chatting and disturbing others. How do you handle it?', opts: [
        { t: 'I would continue teaching while expecting them to settle down.', s: 1 },
        { t: 'I would give a brief verbal reminder to maintain silence.', s: 2 },
        { t: 'I would address them directly and bring their focus back to the lesson.', s: 3 },
        { t: 'I would involve them in the lesson to redirect their attention.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 22, sec: 3, text: 'A student constantly comes late to your class. What is your approach?', opts: [
        { t: 'I would allow it and continue the class.', s: 1 },
        { t: 'I would remind the student about punctuality.', s: 2 },
        { t: 'I would speak to the student about the issue.', s: 3 },
        { t: 'I would understand the reason and guide improvement.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 23, sec: 3, text: 'While conducting an activity, the class becomes noisy and chaotic. What do you do?', opts: [
        { t: 'I would continue and wait for them to settle.', s: 1 },
        { t: 'I would ask them to reduce noise.', s: 2 },
        { t: 'I would pause the activity and regain control.', s: 3 },
        { t: 'I would reorganize the activity with clear instructions.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 24, sec: 3, text: 'A student refuses to follow your instructions during a group task. How do you respond?', opts: [
        { t: 'I would ignore and continue.', s: 1 },
        { t: 'I would repeat the instructions.', s: 2 },
        { t: 'I would address the student directly.', s: 3 },
        { t: 'I would understand the reason and guide participation.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 25, sec: 3, text: 'You notice bullying behavior among students in your classroom. How do you intervene?', opts: [
        { t: 'I would observe and not intervene immediately.', s: 1 },
        { t: 'I would give a general warning to the class.', s: 2 },
        { t: 'I would address the behavior directly.', s: 3 },
        { t: 'I would counsel the students involved.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 26, sec: 3, text: 'A group of students is consistently disengaged during lessons. What action will you take?', opts: [
        { t: 'I would continue teaching as usual.', s: 1 },
        { t: 'I would encourage them occasionally.', s: 2 },
        { t: 'I would try to involve them during the lesson.', s: 3 },
        { t: 'I would understand their reasons and adapt teaching.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 27, sec: 3, text: 'How do you handle a class where students frequently use mobile phones during lessons?', opts: [
        { t: 'I would ignore it and continue teaching.', s: 1 },
        { t: 'I would remind them not to use phones.', s: 2 },
        { t: 'I would enforce basic rules regarding usage.', s: 3 },
        { t: 'I would manage usage while keeping students engaged.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 28, sec: 3, text: 'A student openly challenges your authority in front of the class. What do you do?', opts: [
        { t: 'I would ignore and continue teaching.', s: 1 },
        { t: 'I would respond briefly and move on.', s: 2 },
        { t: 'I would address the situation calmly.', s: 3 },
        { t: 'I would handle it respectfully and maintain authority.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 29, sec: 3, text: 'Your students are preparing for an important exam, but they appear stressed and restless in class. How do you respond?', opts: [
        { t: 'I would continue with the lesson as planned.', s: 1 },
        { t: 'I would acknowledge their stress briefly.', s: 2 },
        { t: 'I would provide reassurance and guidance.', s: 3 },
        { t: 'I would adjust teaching to support them emotionally.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 30, sec: 3, text: 'You want to establish discipline in your classroom from day one. What is your approach?', opts: [
        { t: 'I would expect students to follow rules naturally.', s: 1 },
        { t: 'I would state basic rules.', s: 2 },
        { t: 'I would explain expectations clearly.', s: 3 },
        { t: 'I would set structure and reinforce consistently.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 4: Communication Skills (Q31-Q40)
      { id: 31, sec: 4, text: 'Students look confused about your activity instructions. How do you respond?', opts: [
        { t: 'I would repeat the same instructions once more.', s: 1 },
        { t: 'I would explain the instructions again with slight clarification.', s: 2 },
        { t: 'I would break down the instructions into simpler steps.', s: 3 },
        { t: 'I would demonstrate the activity along with explanation.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 32, sec: 4, text: 'A student hesitates to ask a doubt in class. You notice their struggle.', opts: [
        { t: 'I would wait for the student to ask.', s: 1 },
        { t: 'I would encourage them to ask questions.', s: 2 },
        { t: 'I would gently invite them to share their doubt.', s: 3 },
        { t: 'I would create a comfortable space for them to express their concern.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 33, sec: 4, text: 'You are teaching a difficult topic. How do you simplify?', opts: [
        { t: 'I would explain it as per the content.', s: 1 },
        { t: 'I would repeat the explanation more slowly.', s: 2 },
        { t: 'I would use simple examples to explain.', s: 3 },
        { t: 'I would use analogies, visuals, or real-life connections.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 34, sec: 4, text: 'A student misunderstood your instruction and made a mistake.', opts: [
        { t: 'I would point out the mistake and move on.', s: 1 },
        { t: 'I would correct the student briefly.', s: 2 },
        { t: 'I would explain the correct approach.', s: 3 },
        { t: 'I would clarify the misunderstanding and guide the student.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 35, sec: 4, text: 'Students seem disengaged during your class. What do you do?', opts: [
        { t: 'I would continue the lesson as planned.', s: 1 },
        { t: 'I would try to regain attention briefly.', s: 2 },
        { t: 'I would include examples to regain interest.', s: 3 },
        { t: 'I would involve students through interaction.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 36, sec: 4, text: 'A student answers incorrectly in front of peers.', opts: [
        { t: 'I would say the answer is incorrect and move on.', s: 1 },
        { t: 'I would correct the answer briefly.', s: 2 },
        { t: 'I would explain the correct answer.', s: 3 },
        { t: 'I would guide the student to understand the mistake.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 37, sec: 4, text: 'During a discussion, a student gives a long unclear explanation.', opts: [
        { t: 'I would move to another student.', s: 1 },
        { t: 'I would briefly summarize and continue.', s: 2 },
        { t: 'I would help clarify their point.', s: 3 },
        { t: 'I would guide the student to express more clearly.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 38, sec: 4, text: 'Your class has mixed ability students. How do you explain a concept?', opts: [
        { t: 'I would teach at a general level.', s: 1 },
        { t: 'I would slightly adjust my explanation.', s: 2 },
        { t: 'I would include examples for better understanding.', s: 3 },
        { t: 'I would use different methods to address varied levels.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 39, sec: 4, text: 'On the first day of class, how do you communicate?', opts: [
        { t: 'I would introduce the subject and begin teaching.', s: 1 },
        { t: 'I would give a brief introduction and outline.', s: 2 },
        { t: 'I would explain expectations and course structure.', s: 3 },
        { t: 'I would interact and build initial connection with students.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 40, sec: 4, text: 'Students say your notes are hard to follow. What do you do?', opts: [
        { t: 'I would continue using the same notes.', s: 1 },
        { t: 'I would make slight adjustments.', s: 2 },
        { t: 'I would simplify the notes.', s: 3 },
        { t: 'I would restructure the content for clarity.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 5: Emotional Intelligence (Q41-Q50)
      { id: 41, sec: 5, text: 'A student suddenly bursts into tears during class because of personal issues. What would you do?', opts: [
        { t: 'I would continue the class while allowing the student some time.', s: 1 },
        { t: 'I would briefly check on the student and continue the session.', s: 2 },
        { t: 'I would pause and offer support to the student.', s: 3 },
        { t: 'I would address the situation sensitively and ensure the student feels comfortable.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 42, sec: 5, text: 'During a staff meeting, a colleague criticizes your teaching style. How do you respond?', opts: [
        { t: 'I would ignore the comment and move on.', s: 1 },
        { t: 'I would respond briefly to defend my approach.', s: 2 },
        { t: 'I would listen and consider the feedback.', s: 3 },
        { t: 'I would reflect on it and respond constructively.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 43, sec: 5, text: 'You notice a usually active student has become quiet and withdrawn. What is your approach?', opts: [
        { t: 'I would assume it is temporary and continue.', s: 1 },
        { t: 'I would observe the student over time.', s: 2 },
        { t: 'I would check on the student casually.', s: 3 },
        { t: 'I would speak with the student to understand the issue.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 44, sec: 5, text: 'A student openly challenges your authority in class. How do you manage it?', opts: [
        { t: 'I would ignore it and continue teaching.', s: 1 },
        { t: 'I would respond briefly and move on.', s: 2 },
        { t: 'I would address the situation calmly.', s: 3 },
        { t: 'I would handle it respectfully while maintaining authority.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 45, sec: 5, text: 'After a long day, you feel emotionally drained but still have one more class. How do you handle it?', opts: [
        { t: 'I would conduct the class without much change.', s: 1 },
        { t: 'I would try to manage my energy and continue.', s: 2 },
        { t: 'I would prepare mentally before starting the class.', s: 3 },
        { t: 'I would consciously energize myself and engage students.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 46, sec: 5, text: 'A student makes a mistake during a presentation and looks embarrassed. What do you do?', opts: [
        { t: 'I would correct the mistake and continue.', s: 1 },
        { t: 'I would briefly reassure the student.', s: 2 },
        { t: 'I would support the student and guide improvement.', s: 3 },
        { t: 'I would respond positively and help them regain confidence.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 47, sec: 5, text: 'A parent is upset about their child\'s poor grades and blames your teaching. How would you react?', opts: [
        { t: 'I would defend my teaching approach.', s: 1 },
        { t: 'I would explain the situation briefly.', s: 2 },
        { t: 'I would listen and clarify the facts.', s: 3 },
        { t: 'I would address concerns calmly and discuss improvement strategies.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 48, sec: 5, text: 'A colleague gets promoted while you do not. What is your emotional response?', opts: [
        { t: 'I feel disappointed and compare myself.', s: 1 },
        { t: 'I accept it but feel slightly discouraged.', s: 2 },
        { t: 'I acknowledge it and reflect on my growth.', s: 3 },
        { t: 'I stay positive and focus on self-improvement.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 49, sec: 5, text: 'A heated debate breaks out among students in your class. What do you do?', opts: [
        { t: 'I would stop the discussion immediately.', s: 1 },
        { t: 'I would calm the students and continue.', s: 2 },
        { t: 'I would moderate the discussion.', s: 3 },
        { t: 'I would guide the discussion constructively.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 50, sec: 5, text: 'You feel stressed about upcoming workload and deadlines. How do you cope?', opts: [
        { t: 'I continue without managing stress.', s: 1 },
        { t: 'I try to manage tasks as they come.', s: 2 },
        { t: 'I plan and organize my work.', s: 3 },
        { t: 'I prioritize tasks and manage stress consciously.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 6: Motivation & Passion for Teaching (Q51-Q60)
      { id: 51, sec: 6, text: 'A student asks you why you chose teaching as a profession. How do you respond?', opts: [
        { t: 'I would give a general or practical reason.', s: 1 },
        { t: 'I would share a simple reason for choosing teaching.', s: 2 },
        { t: 'I would explain my interest in teaching.', s: 3 },
        { t: 'I would share meaningful reasons and experiences.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 52, sec: 6, text: 'After multiple failed attempts to make students understand a tough topic, you...', opts: [
        { t: 'I would move ahead with the syllabus.', s: 1 },
        { t: 'I would try explaining once more.', s: 2 },
        { t: 'I would attempt different examples.', s: 3 },
        { t: 'I would change my teaching approach.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 53, sec: 6, text: 'During a challenging semester, how do you keep yourself motivated?', opts: [
        { t: 'I continue with my routine.', s: 1 },
        { t: 'I try to stay positive.', s: 2 },
        { t: 'I focus on completing my responsibilities.', s: 3 },
        { t: 'I remind myself of my purpose and goals.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 54, sec: 6, text: 'If teaching was not financially rewarding, what would you do?', opts: [
        { t: 'I would consider other options.', s: 1 },
        { t: 'I would continue with some hesitation.', s: 2 },
        { t: 'I would stay if I find satisfaction in teaching.', s: 3 },
        { t: 'I would continue with commitment to the profession.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 55, sec: 6, text: 'When you see your students succeed, you feel...', opts: [
        { t: 'Satisfied that the task is completed.', s: 1 },
        { t: 'Happy about their achievement.', s: 2 },
        { t: 'Encouraged by their success.', s: 3 },
        { t: 'Proud of their growth.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 56, sec: 6, text: 'If faced with a class of disinterested students, how would you act?', opts: [
        { t: 'I would continue teaching as planned.', s: 1 },
        { t: 'I would try to regain attention briefly.', s: 2 },
        { t: 'I would include examples to improve interest.', s: 3 },
        { t: 'I would involve students actively.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 57, sec: 6, text: 'Your colleagues discuss their frustration with students\' lack of discipline. You...', opts: [
        { t: 'I would agree and share similar concerns.', s: 1 },
        { t: 'I would listen and acknowledge.', s: 2 },
        { t: 'I would suggest possible solutions.', s: 3 },
        { t: 'I would encourage a positive approach.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 58, sec: 6, text: 'You are given an opportunity to lead a teaching innovation workshop. How do you react?', opts: [
        { t: 'I would feel hesitant to take it up.', s: 1 },
        { t: 'I would consider participating.', s: 2 },
        { t: 'I would accept with preparation.', s: 3 },
        { t: 'I would take it as a growth opportunity.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 59, sec: 6, text: 'If you are assigned to teach a subject outside your expertise, you...', opts: [
        { t: 'I would manage with basic preparation.', s: 1 },
        { t: 'I would prepare adequately.', s: 2 },
        { t: 'I would learn and improve gradually.', s: 3 },
        { t: 'I would invest time to build strong understanding.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 60, sec: 6, text: 'At the end of a tiring day, a student approaches you for help. You...', opts: [
        { t: 'I would ask them to come another time.', s: 1 },
        { t: 'I would respond briefly.', s: 2 },
        { t: 'I would help if time permits.', s: 3 },
        { t: 'I would give time and support the student.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // [Remaining 60 questions would be similarly structured...]
      // For brevity, including just first 60 - 120 questions will be added in next step
      
      // Category 7: Creativity & Innovation in Teaching (Q61-Q70)
      { id: 61, sec: 7, text: 'You are teaching a difficult concept that students often find boring. How would you handle it?', opts: [
        { t: 'I would teach the concept as per the syllabus.', s: 1 },
        { t: 'I would try to make the explanation slightly interesting.', s: 2 },
        { t: 'I would include examples to improve understanding.', s: 3 },
        { t: 'I would use engaging methods like visuals or storytelling.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 62, sec: 7, text: 'Students are not responding to your lecture. What is your approach?', opts: [
        { t: 'I would continue the lecture as planned.', s: 1 },
        { t: 'I would try to get some responses occasionally.', s: 2 },
        { t: 'I would ask questions to involve students.', s: 3 },
        { t: 'I would introduce interactive elements.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 63, sec: 7, text: 'The school asks you to teach a topic with limited teaching resources. What do you do?', opts: [
        { t: 'I would teach using available basic methods.', s: 1 },
        { t: 'I would manage with minimal adjustments.', s: 2 },
        { t: 'I would use simple examples and explanations.', s: 3 },
        { t: 'I would create alternative resources or aids.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 64, sec: 7, text: 'How do you encourage students to think outside the box?', opts: [
        { t: 'I focus on completing the syllabus.', s: 1 },
        { t: 'I occasionally ask open-ended questions.', s: 2 },
        { t: 'I encourage students to share ideas.', s: 3 },
        { t: 'I design activities that promote creative thinking.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 65, sec: 7, text: 'A student presents a unique solution that is different from the textbook. What would be your reaction?', opts: [
        { t: 'I would correct it based on the textbook.', s: 1 },
        { t: 'I would acknowledge it briefly.', s: 2 },
        { t: 'I would evaluate and explain its relevance.', s: 3 },
        { t: 'I would appreciate and discuss the idea.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 66, sec: 7, text: 'You are asked to conduct a special class on environmental awareness. How do you plan it?', opts: [
        { t: 'I would deliver a basic lecture.', s: 1 },
        { t: 'I would include some examples.', s: 2 },
        { t: 'I would make it informative with relevant content.', s: 3 },
        { t: 'I would include activities or discussions.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 67, sec: 7, text: 'How do you handle curriculum repetition across years?', opts: [
        { t: 'I teach the same way every year.', s: 1 },
        { t: 'I make minor changes.', s: 2 },
        { t: 'I improve explanations gradually.', s: 3 },
        { t: 'I update methods and examples.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 68, sec: 7, text: 'A colleague asks for your input in designing a new teaching method. How do you contribute?', opts: [
        { t: 'I provide minimal input.', s: 1 },
        { t: 'I share basic ideas.', s: 2 },
        { t: 'I contribute useful suggestions.', s: 3 },
        { t: 'I actively collaborate and refine ideas.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 69, sec: 7, text: 'Technology is introduced in your classroom (e.g., smartboards, apps). What do you do?', opts: [
        { t: 'I continue with traditional methods.', s: 1 },
        { t: 'I use it occasionally.', s: 2 },
        { t: 'I learn and try to use it.', s: 3 },
        { t: 'I integrate it into teaching.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 70, sec: 7, text: 'How do you motivate students to express creative ideas?', opts: [
        { t: 'I focus on correct answers.', s: 1 },
        { t: 'I allow ideas occasionally.', s: 2 },
        { t: 'I encourage students to share.', s: 3 },
        { t: 'I create opportunities for expression.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 8: Adaptability & Flexibility (Q71-Q80)
      { id: 71, sec: 8, text: 'Midway through your planned lecture, the projector stops working. Students are waiting. What would you do?', opts: [
        { t: 'I would pause and wait for the issue to be resolved.', s: 1 },
        { t: 'I would continue with basic explanation without using visuals.', s: 2 },
        { t: 'I would adjust and explain using alternative methods.', s: 3 },
        { t: 'I would actively engage students while continuing the lesson.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 72, sec: 8, text: 'The school introduces a new digital learning platform you\'re unfamiliar with. How do you respond?', opts: [
        { t: 'I would prefer to continue with my existing methods.', s: 1 },
        { t: 'I would try using it if required.', s: 2 },
        { t: 'I would learn and gradually adopt it.', s: 3 },
        { t: 'I would actively explore and integrate it into my teaching.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 73, sec: 8, text: 'A lesson plan isn\'t working as expected; students look disengaged. What\'s your action?', opts: [
        { t: 'I would continue with the planned lesson.', s: 1 },
        { t: 'I would try minor adjustments.', s: 2 },
        { t: 'I would modify parts of the lesson.', s: 3 },
        { t: 'I would change my approach to re-engage students.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 74, sec: 8, text: 'A sudden timetable change requires you to handle an extra class of a subject you don\'t usually teach. How do you respond?', opts: [
        { t: 'I would handle it with minimal preparation.', s: 1 },
        { t: 'I would prepare basic content.', s: 2 },
        { t: 'I would prepare adequately and manage the class.', s: 3 },
        { t: 'I would put effort to make the session effective.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 75, sec: 8, text: 'While teaching, some students request to learn through an activity instead of a lecture. What do you do?', opts: [
        { t: 'I would continue with the lecture.', s: 1 },
        { t: 'I would consider it but proceed as planned.', s: 2 },
        { t: 'I would include a small activity.', s: 3 },
        { t: 'I would incorporate activity-based learning.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 76, sec: 8, text: 'A school decides to implement a new evaluation system. How do you react?', opts: [
        { t: 'I would prefer the existing system.', s: 1 },
        { t: 'I would follow the new system as required.', s: 2 },
        { t: 'I would understand and adapt gradually.', s: 3 },
        { t: 'I would actively learn and implement it.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 77, sec: 8, text: 'A student raises a very relevant question that isn\'t part of the curriculum. How do you respond?', opts: [
        { t: 'I would focus only on the syllabus.', s: 1 },
        { t: 'I would briefly acknowledge it.', s: 2 },
        { t: 'I would address it briefly.', s: 3 },
        { t: 'I would connect it with the topic.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 78, sec: 8, text: 'Mid-lesson, you\'re informed your class must shift outdoors due to maintenance. What do you do?', opts: [
        { t: 'I would pause the class until settled.', s: 1 },
        { t: 'I would continue with minimal adjustment.', s: 2 },
        { t: 'I would reorganize and continue the lesson.', s: 3 },
        { t: 'I would adapt the teaching method to suit the environment.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 79, sec: 8, text: 'During an activity, students come up with an idea that\'s different from your instructions but still relevant. What\'s your action?', opts: [
        { t: 'I would ask them to follow original instructions.', s: 1 },
        { t: 'I would acknowledge but stick to the plan.', s: 2 },
        { t: 'I would allow limited flexibility.', s: 3 },
        { t: 'I would encourage and guide their idea.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 80, sec: 8, text: 'Unexpectedly, you\'re asked to teach online instead of offline for a week. How would you handle it?', opts: [
        { t: 'I would continue with basic delivery online.', s: 1 },
        { t: 'I would manage with limited changes.', s: 2 },
        { t: 'I would prepare and adapt to online teaching.', s: 3 },
        { t: 'I would use tools and strategies for engagement.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 9: Leadership & Role Modeling (Q81-Q90)
      { id: 81, sec: 9, text: 'During a school event, your colleagues and students look to you for guidance. How do you respond?', opts: [
        { t: 'I would support only when required.', s: 1 },
        { t: 'I would offer basic guidance when asked.', s: 2 },
        { t: 'I would assist and help coordinate activities.', s: 3 },
        { t: 'I would take initiative and guide others effectively.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 82, sec: 9, text: 'A student constantly seeks to imitate your behavior. What do you do?', opts: [
        { t: 'I continue as usual without much thought.', s: 1 },
        { t: 'I am aware but do not act differently.', s: 2 },
        { t: 'I become mindful of my actions.', s: 3 },
        { t: 'I consciously model positive behaviour.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 83, sec: 9, text: 'When a conflict arises between two students, how do you handle it?', opts: [
        { t: 'I let them resolve it themselves.', s: 1 },
        { t: 'I intervene briefly to stop the issue.', s: 2 },
        { t: 'I listen to both sides and address it.', s: 3 },
        { t: 'I guide them towards a fair resolution.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 84, sec: 9, text: 'You are asked to lead a new teaching initiative. What is your approach?', opts: [
        { t: 'I would participate only if required.', s: 1 },
        { t: 'I would accept with basic involvement.', s: 2 },
        { t: 'I would contribute actively.', s: 3 },
        { t: 'I would plan and execute effectively.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 85, sec: 9, text: 'Students observe how you react when under pressure. How do you ensure you\'re a role model?', opts: [
        { t: 'I focus on completing the task.', s: 1 },
        { t: 'I try to manage my reactions.', s: 2 },
        { t: 'I stay calm and composed.', s: 3 },
        { t: 'I consciously respond in a balanced way.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 86, sec: 9, text: 'In a staff meeting, your colleagues resist a new policy. How do you respond?', opts: [
        { t: 'I remain silent and observe.', s: 1 },
        { t: 'I share my opinion briefly.', s: 2 },
        { t: 'I discuss concerns constructively.', s: 3 },
        { t: 'I help clarify and encourage understanding.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 87, sec: 9, text: 'A fellow teacher struggles with classroom control. How do you help?', opts: [
        { t: 'I focus on my own responsibilities.', s: 1 },
        { t: 'I offer basic suggestions.', s: 2 },
        { t: 'I share my experience.', s: 3 },
        { t: 'I guide them with practical strategies.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 88, sec: 9, text: 'Students look up to you for ethical conduct. What do you demonstrate?', opts: [
        { t: 'I follow rules as required.', s: 1 },
        { t: 'I maintain basic professionalism.', s: 2 },
        { t: 'I act responsibly and fairly.', s: 3 },
        { t: 'I consciously demonstrate integrity.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 89, sec: 9, text: 'A new teacher joins the staff and feels isolated. What do you do?', opts: [
        { t: 'I let them adjust on their own.', s: 1 },
        { t: 'I greet and interact occasionally.', s: 2 },
        { t: 'I include them in conversations.', s: 3 },
        { t: 'I support and guide them.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 90, sec: 9, text: 'Students ask you about career guidance beyond academics. How do you respond?', opts: [
        { t: 'I provide basic or general advice.', s: 1 },
        { t: 'I share limited guidance.', s: 2 },
        { t: 'I give useful suggestions based on knowledge.', s: 3 },
        { t: 'I guide them based on their interests and goals.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 10: Professional Ethics & Values (Q91-Q100)
      { id: 91, sec: 10, text: 'You accidentally receive confidential student marks before the official announcement. A colleague asks you to share them.', opts: [
        { t: 'I would consider sharing informally.', s: 1 },
        { t: 'I would hesitate but not act immediately.', s: 2 },
        { t: 'I would avoid sharing and stay neutral.', s: 3 },
        { t: 'I would clearly refuse to share.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 92, sec: 10, text: 'A parent offers you an expensive gift for giving special attention to their child.', opts: [
        { t: 'I would consider accepting it.', s: 1 },
        { t: 'I would feel uncomfortable but not respond firmly.', s: 2 },
        { t: 'I would politely decline.', s: 3 },
        { t: 'I would refuse and explain fairness.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 93, sec: 10, text: 'You notice a fellow teacher showing favoritism in grading.', opts: [
        { t: 'I would ignore the situation.', s: 1 },
        { t: 'I would observe without taking action.', s: 2 },
        { t: 'I would reflect but remain neutral.', s: 3 },
        { t: 'I would address it professionally.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 94, sec: 10, text: 'A student confides about personal struggles but asks you not to tell anyone.', opts: [
        { t: 'I would keep it completely to myself.', s: 1 },
        { t: 'I would hesitate about what to do.', s: 2 },
        { t: 'I would support the student while being cautious.', s: 3 },
        { t: 'I would handle it sensitively and consider appropriate support.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 95, sec: 10, text: 'You find out an answer key has leaked before an exam.', opts: [
        { t: 'I would ignore and continue.', s: 1 },
        { t: 'I would feel concerned but not act immediately.', s: 2 },
        { t: 'I would verify the situation.', s: 3 },
        { t: 'I would report it to the concerned authority.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 96, sec: 10, text: 'Your close friend is a teacher who often arrives late and neglects duties.', opts: [
        { t: 'I would ignore due to personal relationship.', s: 1 },
        { t: 'I would feel uncomfortable addressing it.', s: 2 },
        { t: 'I would casually mention it.', s: 3 },
        { t: 'I would discuss it honestly and support improvement.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 97, sec: 10, text: 'You are asked to implement a teaching method you believe is not ethical for students.', opts: [
        { t: 'I would follow instructions without question.', s: 1 },
        { t: 'I would feel unsure but comply.', s: 2 },
        { t: 'I would consider the situation carefully.', s: 3 },
        { t: 'I would raise concerns appropriately.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 98, sec: 10, text: 'During exams, you notice students cheating.', opts: [
        { t: 'I would ignore it to avoid disruption.', s: 1 },
        { t: 'I would give a general warning.', s: 2 },
        { t: 'I would address the situation carefully.', s: 3 },
        { t: 'I would take action as per rules.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 99, sec: 10, text: 'You are invited to post negative comments about your institution on social media by a group of staff.', opts: [
        { t: 'I would join in expressing concerns publicly.', s: 1 },
        { t: 'I would consider participating.', s: 2 },
        { t: 'I would avoid involvement.', s: 3 },
        { t: 'I would choose professional ways to address issues.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 100, sec: 10, text: 'You are given a task where plagiarism is an easy shortcut.', opts: [
        { t: 'I would use the shortcut.', s: 1 },
        { t: 'I would consider it to save time.', s: 2 },
        { t: 'I would try to avoid it.', s: 3 },
        { t: 'I would complete the work ethically.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 11: Attitude (Optimism, Growth Mindset, Resilience) (Q101-Q110)
      { id: 101, sec: 11, text: 'A student in your class repeatedly struggles despite your guidance. How do you respond?', opts: [
        { t: 'I would continue teaching and expect improvement over time.', s: 1 },
        { t: 'I would provide additional explanation when needed.', s: 2 },
        { t: 'I would try different examples or methods.', s: 3 },
        { t: 'I would analyze the difficulty and adapt my teaching.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 102, sec: 11, text: 'You prepared a detailed lesson but technology fails (projector/Internet). What do you do?', opts: [
        { t: 'I would pause and wait for the issue to be resolved.', s: 1 },
        { t: 'I would continue with limited explanation.', s: 2 },
        { t: 'I would adjust using basic alternatives.', s: 3 },
        { t: 'I would modify my approach to maintain engagement.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 103, sec: 11, text: 'After receiving constructive criticism from your HOD, you would:', opts: [
        { t: 'I would feel uncomfortable and move on.', s: 1 },
        { t: 'I would acknowledge it but not act immediately.', s: 2 },
        { t: 'I would reflect on the feedback.', s: 3 },
        { t: 'I would apply the feedback for improvement.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 104, sec: 11, text: 'You attempted a new teaching activity, but it failed. Your reaction is:', opts: [
        { t: 'I would avoid trying it again.', s: 1 },
        { t: 'I would feel discouraged.', s: 2 },
        { t: 'I would reflect on what went wrong.', s: 3 },
        { t: 'I would modify and try again.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 105, sec: 11, text: 'A student challenges your authority in class. How do you handle it?', opts: [
        { t: 'I would ignore it and continue teaching.', s: 1 },
        { t: 'I would respond briefly and move on.', s: 2 },
        { t: 'I would address the situation calmly.', s: 3 },
        { t: 'I would handle it respectfully while maintaining control.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 106, sec: 11, text: 'When workload and deadlines pile up, you:', opts: [
        { t: 'I continue without managing stress.', s: 1 },
        { t: 'I try to complete tasks as they come.', s: 2 },
        { t: 'I plan and organize my work.', s: 3 },
        { t: 'I prioritize tasks effectively.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 107, sec: 11, text: 'If a student fails in your subject despite effort, your response is:', opts: [
        { t: 'I would accept it and move on.', s: 1 },
        { t: 'I would feel concerned but not act further.', s: 2 },
        { t: 'I would review the situation.', s: 3 },
        { t: 'I would identify gaps and support improvement.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 108, sec: 11, text: 'Colleagues resist your idea for an innovative teaching method. How do you react?', opts: [
        { t: 'I would drop the idea.', s: 1 },
        { t: 'I would hesitate to pursue it.', s: 2 },
        { t: 'I would explain the idea briefly.', s: 3 },
        { t: 'I would present its benefits clearly.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 109, sec: 11, text: 'When students compare you unfavorably with another teacher, you:', opts: [
        { t: 'I would feel discouraged.', s: 1 },
        { t: 'I would ignore it.', s: 2 },
        { t: 'I would reflect on their feedback.', s: 3 },
        { t: 'I would work on improving my approach.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 110, sec: 11, text: 'During an unexpected challenge (like sudden syllabus change), you:', opts: [
        { t: 'I would feel unsettled and continue as usual.', s: 1 },
        { t: 'I would adjust gradually.', s: 2 },
        { t: 'I would reorganize my plan.', s: 3 },
        { t: 'I would adapt my teaching effectively.', s: 5 }
      ].sort(() => Math.random() - 0.5) },

      // Category 12: Responsibility & Commitment (Q111-Q120)
      { id: 111, sec: 12, text: 'You are assigned to prepare a detailed lesson plan for the upcoming academic year. The submission deadline is in three days, but you already have other pressing work. What would you do?', opts: [
        { t: 'I would manage what I can within the available time.', s: 1 },
        { t: 'I would try to complete it alongside other tasks.', s: 2 },
        { t: 'I would organize my work to meet the deadline.', s: 3 },
        { t: 'I would prioritize and ensure quality completion.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 112, sec: 12, text: 'You committed to mentoring a group of weak students after school hours. A colleague invites you for a personal outing at the same time. What do you choose?', opts: [
        { t: 'I would choose the outing.', s: 1 },
        { t: 'I would consider both options.', s: 2 },
        { t: 'I would try to balance both if possible.', s: 3 },
        { t: 'I would prioritize my commitment to students.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 113, sec: 12, text: 'The school asks teachers to volunteer for a weekend workshop for parents. Many colleagues are reluctant. What would you do?', opts: [
        { t: 'I would avoid volunteering.', s: 1 },
        { t: 'I would wait to see others\' response.', s: 2 },
        { t: 'I would consider participating.', s: 3 },
        { t: 'I would volunteer if needed.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 114, sec: 12, text: 'You notice that a student has not received the marks you recorded in the grade sheet. The error was from your side. How do you respond?', opts: [
        { t: 'I would leave it as it is.', s: 1 },
        { t: 'I would feel concerned but delay action.', s: 2 },
        { t: 'I would correct it when possible.', s: 3 },
        { t: 'I would immediately correct and inform.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 115, sec: 12, text: 'You promised to bring additional learning materials for your students the next day. On reaching school, you realize you forgot. What would you do?', opts: [
        { t: 'I would continue without addressing it.', s: 1 },
        { t: 'I would mention it briefly.', s: 2 },
        { t: 'I would apologize and plan to bring it later.', s: 3 },
        { t: 'I would acknowledge it and provide an alternative immediately.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 116, sec: 12, text: 'A student approaches you for career advice after class. You are already tired and about to leave. What would you do?', opts: [
        { t: 'I would ask them to come another time.', s: 1 },
        { t: 'I would respond briefly.', s: 2 },
        { t: 'I would give limited guidance.', s: 3 },
        { t: 'I would spend time to guide the student.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 117, sec: 12, text: 'During a staff meeting, important responsibilities are being assigned for the annual day. How do you react?', opts: [
        { t: 'I would avoid taking responsibility.', s: 1 },
        { t: 'I would accept only if assigned.', s: 2 },
        { t: 'I would be willing to contribute.', s: 3 },
        { t: 'I would take responsibility and support the team.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 118, sec: 12, text: 'You are entrusted with handling confidential student information. A friend casually asks you about it. What would you do?', opts: [
        { t: 'I would share basic details.', s: 1 },
        { t: 'I would hesitate but not respond clearly.', s: 2 },
        { t: 'I would avoid sharing information.', s: 3 },
        { t: 'I would clearly refuse to share.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 119, sec: 12, text: 'Despite a busy schedule, you are requested to substitute for an absent colleague. What is your likely approach?', opts: [
        { t: 'I would decline due to workload.', s: 1 },
        { t: 'I would hesitate to accept.', s: 2 },
        { t: 'I would accept if manageable.', s: 3 },
        { t: 'I would adjust and take the class.', s: 5 }
      ].sort(() => Math.random() - 0.5) },
      { id: 120, sec: 12, text: 'You commit to preparing students for a competition. However, progress is slower than expected. What do you do?', opts: [
        { t: 'I would continue without major changes.', s: 1 },
        { t: 'I would try to improve gradually.', s: 2 },
        { t: 'I would review and adjust preparation.', s: 3 },
        { t: 'I would modify strategies for better results.', s: 5 }
      ].sort(() => Math.random() - 0.5) }
    ];

    // ══ OVERALL PROFILES ══
    const PROFILES = [
      {
        min: 492, max: 600, label: 'Exceptional Educator', color: '#3ec9a7',
        profile: 'Outstanding teaching aptitude across all dimensions',
        interp: 'You demonstrate exceptional teaching aptitude with strong performance across all twelve dimensions. You exhibit excellent classroom management, outstanding communication skills, deep subject knowledge, and unwavering commitment to student success. Your ability to inspire, innovate, and lead sets you apart as an exemplary educator who positively impacts students and colleagues alike.',
        suggestions: [
          'Continue serving as a role model for other educators',
          'Mentor junior teachers and share your best practices',
          'Take leadership in curriculum development and professional development initiatives',
          'Consider advanced roles in teacher training or educational leadership'
        ]
      },
      {
        min: 372, max: 491, label: 'Competent Educator', color: '#d4a843',
        profile: 'Strong teaching aptitude with room for growth',
        interp: 'You demonstrate competent teaching aptitude across most dimensions. You have solid classroom management, good communication skills, and genuine commitment to teaching. While you are generally effective, there are opportunities to deepen your practice in specific areas such as creativity, emotional intelligence, or adaptability.',
        suggestions: [
          'Identify and strengthen weaker dimensions through targeted professional development',
          'Seek peer observations and constructive feedback',
          'Explore innovative teaching methods and technologies',
          'Engage in reflective practice to enhance consistency'
        ]
      },
      {
        min: 252, max: 371, label: 'Developing Educator', color: '#e87a30',
        profile: 'Moderate teaching aptitude with significant development needed',
        interp: 'You have moderate teaching aptitude with noticeable gaps in one or more dimensions. While you are functional as an educator, you would benefit significantly from focused improvement in areas like classroom management, communication, creativity, or emotional intelligence. With targeted effort and support, you can substantially enhance your teaching effectiveness.',
        suggestions: [
          'Attend professional development workshops targeting your weaker dimensions',
          'Work with a mentor to improve specific skills',
          'Practice reflective teaching after each class',
          'Seek coaching support in areas of struggle',
          'Gradually build confidence through small wins and regular practice'
        ]
      },
      {
        min: 60, max: 251, label: 'Struggling Educator', color: '#d32f2f',
        profile: 'Low teaching aptitude requiring immediate support',
        interp: 'Your overall teaching aptitude is low across multiple dimensions. You may struggle with student engagement, classroom control, communication, or emotional management. This significantly impacts teaching effectiveness and student learning outcomes. Immediate, intensive support and professional intervention are essential to improve your teaching practice.',
        suggestions: [
          'Enroll in comprehensive teacher training or professional development programs',
          'Request intensive mentoring from experienced educators',
          'Participate in teaching skills workshops (communication, classroom management)',
          'Seek counseling or coaching support to address underlying concerns',
          'Reflect seriously on whether teaching aligns with your strengths and interests',
          'Consider peer observations and feedback collection systematically'
        ]
      },
    ];

    // ══ SECTION-WISE RECOMMENDATIONS ══
    const SEC_RECO = {
      1: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Engage in reflective teaching practice',
            'Observe experienced educators and note their teaching methods',
            'Take specialized teacher training programs',
            'Work with a mentor to develop teaching skills',
            'Attend workshops on pedagogical approaches',
            'Seek constructive feedback regularly'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Continue developing your teaching methodology',
            'Incorporate student feedback to improve delivery',
            'Experiment with different teaching techniques',
            'Build on your existing strengths systematically',
            'Learn from peer observations',
            'Develop personalized professional growth plan'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Mentor new teachers in effective teaching practices',
            'Lead workshops on innovative teaching methods',
            'Contribute to curriculum development',
            'Serve as a model for excellence in teaching',
            'Pursue advanced teaching certifications or studies',
            'Document and share best practices with colleagues'
          ]
        }
      },
      2: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Deepen content expertise through continuous study',
            'Participate in subject-specific workshops and seminars',
            'Create clearer explanations with varied examples',
            'Use multiple representations (visual, verbal, concrete)',
            'Seek clarification on topics you find challenging',
            'Study recent developments in your subject area'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Expand depth of subject knowledge regularly',
            'Connect concepts across different topics',
            'Update content to reflect current research',
            'Use real-world applications to clarify concepts',
            'Challenge misconceptions more effectively',
            'Develop supplementary resources for complex topics'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Mentor students in advanced subject concepts',
            'Develop specialized courses or modules',
            'Contribute to subject-specific publications',
            'Lead professional development on your subject',
            'Create innovative teaching materials',
            'Represent your institution in subject expert roles'
          ]
        }
      },
      3: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Establish clear classroom rules and expectations',
            'Use consistent consequences for misbehavior',
            'Practice positive reinforcement techniques',
            'Build stronger student-teacher rapport',
            'Take classroom management workshops',
            'Seek guidance from experienced disciplinarians'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Refine your management strategies based on observations',
            'Create a more engaging classroom environment',
            'Balance firmness with fairness consistently',
            'Address behavioral issues proactively',
            'Use positive classroom management techniques',
            'Monitor class dynamics continuously'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Mentor peers on effective discipline strategies',
            'Create a model classroom environment',
            'Lead workshops on classroom management',
            'Develop innovative behavior management systems',
            'Train others in positive discipline approaches',
            'Serve as a discipline resource for the school'
          ]
        }
      },
      4: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Take communication skills workshops',
            'Practice clear, simple explanations',
            'Improve listening skills with students',
            'Reduce use of jargon in explanations',
            'Get feedback on your communication style',
            'Record and review your teaching sessions'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Enhance clarity and coherence of explanations',
            'Use better questioning techniques with students',
            'Improve non-verbal communication',
            'Engage students more through dialogue',
            'Adapt communication for different learner types',
            'Develop presentation skills further'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Mentor teachers in communication skills',
            'Develop communication training programs',
            'Create engaging learning experiences through dialogue',
            'Lead workshops on effective communication',
            'Use communication to build community in class',
            'Model excellent communication consistently'
          ]
        }
      },
      5: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Learn to recognize and name emotions',
            'Develop empathy towards students and colleagues',
            'Practice self-awareness activities',
            'Attend emotional intelligence training',
            'Reflect on your own emotional responses',
            'Build stronger relationships with students'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Deepen emotional awareness and regulation',
            'Respond to student emotions with greater sensitivity',
            'Build more supportive classroom relationships',
            'Manage conflict with greater emotional skill',
            'Support students dealing with difficulties',
            'Continue developing empathy and understanding'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Mentor others in emotional intelligence',
            'Create emotionally safe learning environments',
            'Lead programs on emotional well-being',
            'Support students with emotional challenges',
            'Build positive relationships across diverse groups',
            'Model emotional maturity and resilience'
          ]
        }
      },
      6: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Reflect on your passion for the subject',
            'Connect teaching to personal values and mission',
            'Share enthusiasm more openly with students',
            'Find meaning in daily teaching activities',
            'Engage in activities that renew your passion',
            'Reconsider your career calling'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Strengthen your passion through new initiatives',
            'Inspire students more consistently',
            'Take on leadership roles in school activities',
            'Share your expertise with others',
            'Develop programs that reflect your passion',
            'Build communities around your interests'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Inspire and motivate entire departments',
            'Develop motivational programs for students',
            'Lead transformative educational initiatives',
            'Mentor others to develop their passion',
            'Create energy and enthusiasm in your school',
            'Serve as a beacon of motivation for others'
          ]
        }
      },
      7: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Experiment with different teaching activities',
            'Use real-world examples in lessons',
            'Incorporate multimedia in your teaching',
            'Attend workshops on creative teaching',
            'Seek inspiration from innovative educators',
            'Challenge yourself to try new methods'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Develop more engaging learning activities',
            'Integrate technology creatively in lessons',
            'Encourage student creativity and exploration',
            'Create personalized learning experiences',
            'Design collaborative and project-based activities',
            'Continuously refresh your teaching approaches'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Lead innovation initiatives in your school',
            'Mentor teachers on creative teaching methods',
            'Design groundbreaking educational programs',
            'Create resources that inspire others',
            'Develop creative problem-solving cultures',
            'Pioneer new approaches in your field'
          ]
        }
      },
      8: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Plan lessons with flexibility in mind',
            'Practice responding to unexpected situations',
            'Develop contingency plans for lessons',
            'Learn to embrace change positively',
            'Build resilience and openness to new ideas',
            'Take workshops on change management'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Adapt more smoothly to changing circumstances',
            'Incorporate diverse teaching methods',
            'Respond to student needs with flexibility',
            'Balance structure with spontaneity',
            'View challenges as opportunities to learn',
            'Develop comfort with ambiguity'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Model adaptability to colleagues and students',
            'Lead organizational transitions effectively',
            'Mentor others in flexible thinking',
            'Create agile learning environments',
            'Guide others through change with confidence',
            'Demonstrate resilience in challenging situations'
          ]
        }
      },
      9: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Build confidence in your leadership abilities',
            'Take on small leadership responsibilities',
            'Model desired behaviors consistently',
            'Develop your vision for education',
            'Attend leadership development programs',
            'Seek mentorship from established leaders'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Take on more visible leadership roles',
            'Guide colleagues towards shared goals',
            'Model excellence and integrity',
            'Build influence through credibility',
            'Develop your personal leadership style',
            'Support others in their professional growth'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Lead major educational initiatives',
            'Mentor and develop future leaders',
            'Shape organizational culture positively',
            'Inspire and motivate large groups',
            'Represent your institution with distinction',
            'Leave a lasting legacy through leadership'
          ]
        }
      },
      10: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Study professional codes of conduct',
            'Reflect on your ethical values and principles',
            'Build integrity in your daily practice',
            'Avoid ethical compromises',
            'Seek guidance on ethical dilemmas',
            'Commit to continuous ethical development'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Strengthen ethical decision-making skills',
            'Apply ethical principles consistently',
            'Address unethical behavior appropriately',
            'Build trust through integrity',
            'Develop a strong personal ethical framework',
            'Support others in ethical conduct'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Be a model of ethical excellence',
            'Guide colleagues on ethical matters',
            'Contribute to institutional ethical policies',
            'Address systemic ethical issues',
            'Mentor others in ethical leadership',
            'Build ethical culture in your community'
          ]
        }
      },
      11: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Develop a growth mindset about challenges',
            'Practice optimism in difficult situations',
            'Build resilience through reflection',
            'Learn from failures and setbacks',
            'Develop stress management techniques',
            'Seek support when facing difficulties'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Strengthen resilience in face of challenges',
            'Maintain optimism even during difficulties',
            'Support students through challenges',
            'View obstacles as learning opportunities',
            'Develop stronger coping mechanisms',
            'Build confidence in your abilities'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Inspire resilience in others',
            'Model growth mindset consistently',
            'Guide others through difficult transitions',
            'Build cultures of optimism and growth',
            'Mentor others in resilience',
            'Demonstrate unwavering commitment to goals'
          ]
        }
      },
      12: {
        low: {
          label: 'Needs Development (10-20)',
          items: [
            'Be more reliable in meeting commitments',
            'Take ownership of your responsibilities',
            'Build accountability into your practice',
            'Follow through on promises to students',
            'Manage time better to honor commitments',
            'Reflect on your commitment to teaching'
          ]
        },
        mod: {
          label: 'Moderate (21-30)',
          items: [
            'Strengthen your sense of responsibility',
            'Be more proactive in your duties',
            'Go beyond minimum requirements',
            'Support colleagues in their responsibilities',
            'Build a reputation for dependability',
            'Continue growing in commitment to excellence'
          ]
        },
        high: {
          label: 'Strong (41-50)',
          items: [
            'Model responsibility for others',
            'Take on additional institutional roles',
            'Mentor others in responsibility',
            'Build accountability cultures',
            'Inspire commitment in colleagues',
            'Lead transformative initiatives'
          ]
        }
      },
    };

    /* ══ STATE ══ */
    let user = {}, gender = '', shuffledQs = [], currentIdx = 0, answers = {};

    /* ══ SESSION LOCK ══ */
    (function initSessionGuard() {
      const status = sessionStorage.getItem('mp_status');
      if (status === 'done') {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-denied').classList.add('active');
      }
      if (status === 'quiz_started') {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-denied').classList.add('active');
      }
    })();

    /* ══ UTILS ══ */
    function showScreen(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); window.scrollTo(0, 0) }
    function pct(s, m) { return Math.min(100, Math.round((s / m) * 100)) }
    function getProfile(total) { return PROFILES.find(p => total >= p.min && total <= p.max) || PROFILES[PROFILES.length - 1] }
    function getSecBand(score) { return score >= 40 ? 'high' : score >= 30 ? 'mod' : 'low' }
    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    /* ══ AUTH ══ */
    function togglePass() { const i = document.getElementById('auth-pass'); i.type = i.type === 'password' ? 'text' : 'password' }
    function doAuth() {
      const u = document.getElementById('auth-user').value.trim();
      const p = document.getElementById('auth-pass').value;
      const err = document.getElementById('auth-err');
      if (u === 'user123' && p === '90143514') { err.style.display = 'none'; sessionStorage.setItem('mp_status', 'authed'); showScreen('screen-login') }
      else { err.style.display = 'block' }
    }

    /* ══ USER DETAILS ══ */
    function calculateAge(dobString) {
      // Parse DOB in DD/MM/YYYY format
      const parts = dobString.split('/');
      if (parts.length !== 3) return null;
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      const year = parseInt(parts[2]);
      
      // Validate date
      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) return null;
      
      const dob = new Date(year, month - 1, day);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age;
    }
    
    function updateAge() {
      const dobField = document.getElementById('inp-dob');
      const ageField = document.getElementById('inp-age');
      const dobValue = dobField.value.trim();
      
      if (dobValue) {
        const age = calculateAge(dobValue);
        if (age !== null && age >= 18 && age <= 80) {
          ageField.value = age;
        } else {
          ageField.value = '';
        }
      } else {
        ageField.value = '';
      }
    }
    
    // Attach event listener to DOB field and setup error clearing
    document.addEventListener('DOMContentLoaded', () => {
      const dobField = document.getElementById('inp-dob');
      if (dobField) {
        dobField.addEventListener('change', updateAge);
        dobField.addEventListener('blur', updateAge);
      }
      
      // Setup error clearing on input/change for all form fields
      const inputFields = ['inp-name', 'inp-dob', 'inp-age', 'inp-college', 'inp-dept'];
      const errorMap = {
        'inp-name': 'err-name',
        'inp-dob': 'err-dob',
        'inp-age': 'err-age',
        'inp-college': 'err-college',
        'inp-dept': 'err-dept'
      };
      
      inputFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
          const eventType = fieldId === 'inp-college' ? 'change' : 'input';
          
          // Clear error on change
          field.addEventListener(eventType, () => {
            field.classList.remove('has-error');
            const errorId = errorMap[fieldId];
            if (errorId) {
              const errorEl = document.getElementById(errorId);
              if (errorEl) errorEl.style.display = 'none';
            }
          });
          
          // Handle label color for select element
          if (fieldId === 'inp-college') {
            field.addEventListener('focus', () => {
              const label = field.closest('.form-group').querySelector('label');
              if (label) label.style.color = 'var(--gold)';
            });
            field.addEventListener('blur', () => {
              const label = field.closest('.form-group').querySelector('label');
              if (label && !field.value) label.style.color = 'var(--text2)';
            });
            field.addEventListener('change', () => {
              const label = field.closest('.form-group').querySelector('label');
              if (label && field.value) label.style.color = 'var(--gold)';
              
              // Handle Others option
              const otherInput = document.getElementById('inp-college-other');
              if (field.value === 'Others') {
                otherInput.style.display = 'block';
                otherInput.focus();
              } else {
                otherInput.style.display = 'none';
                otherInput.value = '';
                otherInput.classList.remove('has-error');
              }
            });
          }
        }
      });
    });

    // Add event listener for custom college input
    document.addEventListener('DOMContentLoaded', () => {
      const otherInput = document.getElementById('inp-college-other');
      if (otherInput) {
        otherInput.addEventListener('input', () => {
          otherInput.classList.remove('has-error');
          const errorEl = document.getElementById('err-college');
          if (errorEl) errorEl.style.display = 'none';
        });
      }
    });

    function pickGender(btn, val) { document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('sel')); btn.classList.add('sel'); gender = val }
    function submitLogin() {
      let ok = true;
      const name = document.getElementById('inp-name').value.trim();
      const dob = document.getElementById('inp-dob').value.trim();
      const age = parseInt(document.getElementById('inp-age').value);
      const collegeSelect = document.getElementById('inp-college').value.trim();
      const collegeOther = document.getElementById('inp-college-other').value.trim();
      const college = collegeSelect === 'Others' ? collegeOther : collegeSelect;
      const dept = document.getElementById('inp-dept').value.trim();
      const se = (id, show) => { document.getElementById(id).style.display = show ? 'block' : 'none' };
      const setErr = (id, inputId, hasError) => { 
        se(id, hasError); 
        if (inputId) document.getElementById(inputId).classList.toggle('has-error', hasError);
      };
      setErr('err-name', 'inp-name', !name); if (!name) ok = false;
      setErr('err-dob', 'inp-dob', !dob); if (!dob) ok = false;
      setErr('err-age', 'inp-age', isNaN(age) || age < 18 || age > 80); if (isNaN(age) || age < 18 || age > 80) ok = false;
      setErr('err-gender', null, !gender); if (!gender) ok = false;
      
      // Handle college validation
      const collegeHasError = !college;
      if (collegeHasError) {
        document.getElementById('err-college').style.display = 'block';
        document.getElementById('inp-college').classList.toggle('has-error', true);
        if (collegeSelect === 'Others') {
          document.getElementById('inp-college-other').classList.add('has-error');
        }
      } else {
        document.getElementById('err-college').style.display = 'none';
        document.getElementById('inp-college').classList.remove('has-error');
        document.getElementById('inp-college-other').classList.remove('has-error');
      }
      if (collegeHasError) ok = false;
      
      setErr('err-dept', 'inp-dept', !dept); if (!dept) ok = false;
      if (!ok) return;
      user = { name, age, dob, gender, college, dept };
      startQuiz();
    }

    /* ══ QUIZ ══ */
    function startQuiz() {
      sessionStorage.setItem('mp_status', 'quiz_started');
      const randomizedQuestions = shuffleArray(QUESTIONS);
      shuffledQs = randomizedQuestions.map(q => ({ ...q, opts: [...q.opts] }));
      currentIdx = 0; answers = {};
      showScreen('screen-quiz');
      buildSlides();
      goToSlide(0, 'none');
    }

    function buildSlides() {
      const vp = document.getElementById('slide-viewport'); vp.innerHTML = '';
      const L = ['A', 'B', 'C', 'D', 'E'];
      shuffledQs.forEach((q, i) => {
        const sec = SECS.find(s => s.id === q.sec);
        const qAnim = Q_ANIMATIONS[q.id] || {};
        const icon = qAnim.icon || '✨';
        const animClass = qAnim.anim ? `q-anim-${qAnim.anim}` : 'q-anim-float';
        const slide = document.createElement('div'); slide.className = 'slide'; slide.id = 'slide-' + i;
        const optsHtml = q.opts.map((opt, oi) => `
      <button class="opt-btn" id="opt-${i}-${oi}" onclick="pickOpt(${i},${oi},${opt.s},event)">
        <span class="mk">${L[oi]}</span><span>${opt.t}</span>
      </button>`).join('');
        slide.innerHTML = `
      <div class="slide-card ${animClass}" style="border-top:3px solid ${sec.color}">
        <div class="slide-illus">${icon}</div>
        <div class="q-text">${q.text}</div>
        <div class="opts">${optsHtml}</div>
      </div>`;
        vp.appendChild(slide);
      });
    }

    function goToSlide(idx, dir) {
      const total = shuffledQs.length;
      const prev = document.querySelector('.slide.active');
      if (prev && dir !== 'none') { prev.classList.remove('active'); prev.classList.add('exit-left'); setTimeout(() => prev.classList.remove('exit-left'), 420) }
      else if (prev) { prev.classList.remove('active') }
      currentIdx = idx;
      const slide = document.getElementById('slide-' + idx);
      if (dir === 'back') { slide.style.transform = 'translateX(-50px)'; requestAnimationFrame(() => { slide.style.transition = 'opacity .38s ease,transform .38s ease'; slide.classList.add('active'); slide.style.transform = '' }) }
      else { slide.classList.add('active') }
      const q = shuffledQs[idx];
      if (answers[q.id] !== undefined) {
        q.opts.forEach((opt, oi) => {
          const btn = document.getElementById(`opt-${idx}-${oi}`); if (!btn) return;
          const s = opt.s === answers[q.id]; btn.classList.toggle('sel', s);
          const mk = btn.querySelector('.mk'); if (mk) { mk.style.background = s ? 'var(--gold)' : ''; mk.style.borderColor = s ? 'var(--gold)' : ''; mk.style.color = s ? '#07080d' : '' }
        });
      }
      const p = Math.round(((idx + 1) / total) * 100);
      document.getElementById('prog-fill').style.width = p + '%';
      document.getElementById('prog-pct').textContent = p + '%';
    }

    function pickOpt(slideIdx, optIdx, score, ev) {
      const q = shuffledQs[slideIdx];
      answers[q.id] = score;
      if (ev) { const btn = ev.currentTarget; const r = document.createElement('span'); r.className = 'opt-ripple'; const rect = btn.getBoundingClientRect(); r.style.left = (ev.clientX - rect.left - 10) + 'px'; r.style.top = (ev.clientY - rect.top - 10) + 'px'; btn.appendChild(r); setTimeout(() => r.remove(), 600) }
      shuffledQs[slideIdx].opts.forEach((_, oi) => {
        const b = document.getElementById(`opt-${slideIdx}-${oi}`); if (!b) return;
        const s = oi === optIdx; b.classList.toggle('sel', s);
        const mk = b.querySelector('.mk'); if (mk) { mk.style.background = s ? 'var(--gold)' : ''; mk.style.borderColor = s ? 'var(--gold)' : ''; mk.style.color = s ? '#07080d' : '' }
      });
      if (slideIdx < shuffledQs.length - 1) { setTimeout(() => { if (answers[q.id] !== undefined) goToSlide(slideIdx + 1, 'forward') }, 480) }
      else { setTimeout(() => buildReport(), 500) }
    }

    /* ══ SCORE CALCULATION ══ */
    function calcScores() {
      const raw = {};
      SECS.forEach(s => { raw[s.id] = 0 });
      QUESTIONS.forEach(q => {
        if (answers[q.id] === undefined) return;
        const sec = SECS.find(s => s.id === q.sec);
        const score = sec.reverse ? (6 - answers[q.id]) : answers[q.id];
        raw[q.sec] += score;
      });
      return raw;
    }

    /* ══ REPORT ══ */
    function buildReport() {
      sessionStorage.setItem('mp_status', 'done');
      showScreen('screen-report');
      const secScores = calcScores();
      const total = Object.values(secScores).reduce((a, b) => a + b, 0);
      const totalPct = pct(total, 600);
      const prof = getProfile(total);

      try { localStorage.setItem('mp_last', JSON.stringify({ secScores, total, totalPct, label: prof.label, date: new Date().toISOString() })) } catch (e) { }
      window._reportData = { secScores, total, totalPct, prof };
      setTimeout(() => downloadReport(), 250);
    }

    /* ══ 2-PAGE PDF DOWNLOAD ══ */
    async function downloadReport() {
      const d = window._reportData; if (!d) { alert('Report data unavailable. Please complete the assessment first.'); return }
      const pdfModule = window.jspdf || window.jsPDF || (window.jspdf && window.jspdf.default) || (window.jsPDF && window.jsPDF.default);
      const jsPDF = typeof pdfModule === 'function' ? pdfModule : (pdfModule && ((pdfModule.jsPDF || pdfModule.default) || pdfModule));
      if (!jsPDF) { console.error('jsPDF module missing', window.jspdf, window.jsPDF); alert('PDF library failed to load. Please refresh the page.'); return }
      try {
        const doc = new jsPDF({ unit: 'mm', format: 'a4' });
        const W = 210, H = 297;
        const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        const dob = !user.dob ? '-' : (() => {
          const raw = String(user.dob).trim();
          const p = raw.split('/');
          if (p.length === 3) {
            const day = parseInt(p[0], 10), month = parseInt(p[1], 10), year = parseInt(p[2], 10);
            if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year >= 1900) {
              const dt = new Date(year, month - 1, day);
              if (!isNaN(dt.getTime())) return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
            }
          }
          const fb = new Date(raw);
          return isNaN(fb.getTime()) ? raw : fb.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
        })();

        // ── helpers ──
        const h2r = h => { const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16); return [r, g, b] };
        const pdfText = v => String(v ?? '').normalize('NFKD').replace(/[^\x20-\x7E]/g, '').replace(/\s+/g, ' ').trim();
        const sf = (style, size, color) => { doc.setFont('helvetica', style); doc.setFontSize(size); doc.setTextColor(...(color || [43, 51, 64])) };
        const tx = (str, x, y, opt) => doc.text(Array.isArray(str) ? str.map(pdfText) : pdfText(str), x, y, opt || {});
        const ln = (x1, y1, x2, y2, col, lw) => { doc.setDrawColor(...(col || [40, 44, 58])); doc.setLineWidth(lw || 0.3); doc.line(x1, y1, x2, y2) };
        const fillRect = (x, y, w, h, col) => { doc.setFillColor(...col); doc.rect(x, y, w, h, 'F') };
        const rndRect = (x, y, w, h, col, scol) => { if (col) doc.setFillColor(...col); if (scol) doc.setDrawColor(...scol); else doc.setDrawColor(...(col || [15, 17, 24])); doc.roundedRect(x, y, w, h, 2, 2, col && scol ? 'FD' : col ? 'F' : 'S') };

        const hBar = (x, y, val, max, w, col) => { doc.setFillColor(232, 237, 244); doc.roundedRect(x, y, w, 3, 1.5, 1.5, 'F'); if (val > 0) { doc.setFillColor(...h2r(col)); doc.roundedRect(x, y, (w * val / max), 3, 1.5, 1.5, 'F') } };

        const pill = (txt, x, y, col) => { const rgb = h2r(col); const safeTxt = pdfText(txt); const tw = doc.getTextWidth(safeTxt) + 8; const bg = [Math.round(rgb[0] * 0.15 + 255 * 0.85), Math.round(rgb[1] * 0.15 + 255 * 0.85), Math.round(rgb[2] * 0.15 + 255 * 0.85)]; doc.setFillColor(...bg); doc.roundedRect(x, y - 3.5, tw, 5.5, 2.5, 2.5, 'F'); doc.setDrawColor(...rgb); doc.setLineWidth(0.25); doc.roundedRect(x, y - 3.5, tw, 5.5, 2.5, 2.5, 'S'); doc.setTextColor(...rgb); doc.setFontSize(7); doc.setFont('helvetica', 'bold'); tx(safeTxt, x + 4, y, { baseline: 'middle' }) };
        const loadPdfImg = src => new Promise(resolve => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => resolve(null); img.src = src });

        /* ════ PAGE 1 ════ */
        const uniBannerSrc = 'assets/Excel.jpeg';
        const uniBanner = await loadPdfImg(uniBannerSrc);
        
        const characterMapping = [
          { min: 551, max: 600, level: 1, title: 'Outstanding Educator', name: 'Krishna', img: 'photos/level1.jpeg', desc: 'Krishna is the supreme guide, philosopher, and strategist. He didn’t fight directly, but transformed warriors into achievers through wisdom, values, and mentorship. Like Krishna, an outstanding teacher inspires, empowers, and leaves a lasting legacy.' },
          { min: 501, max: 550, level: 2, title: 'Exceptional Performer', name: 'Arjuna', img: 'photos/level2.jpeg', desc: 'Arjuna was highly skilled, focused, and disciplined—yet even he needed Krishna’s guidance in moments of doubt. Exceptional teachers are like Arjuna: brilliant and inspiring, but still refining a few aspects through reflection and mentorship.' },
          { min: 451, max: 500, level: 3, title: 'Proficient Educator', name: 'Yudhishthira', img: 'photos/level3.jpeg', desc: 'Yudhishthira stood for dharma (righteousness), truth, and fairness. Though not the most aggressive, he was respected for his principles. A proficient teacher reflects Yudhishthira’s strength—consistent, ethical, dependable, though not always innovative or dynamic.' },
          { min: 401, max: 450, level: 4, title: 'Developing Professional', name: 'Bhima', img: 'photos/level4.jpeg', desc: 'Bhima had immense strength and determination, but often lacked patience, subtlety, and diplomacy. A developing teacher is like Bhima—passionate and committed, but requiring balance, polish, and refinement to channel energy effectively in classrooms.' },
          { min: 351, max: 400, level: 5, title: 'Moderate Performer', name: 'Nakula', img: 'photos/level5.jpeg', desc: 'Nakula was virtuous, skilled, and loyal but often overshadowed by others. Moderate teachers mirror Nakula: they have potential and dedication but remain underutilized or unnoticed due to limited innovation or leadership visibility.' },
          { min: 301, max: 350, level: 6, title: 'Emerging Educator', name: 'Sahadeva', img: 'photos/level6.jpeg', desc: 'Sahadeva had deep knowledge (especially in astrology and foresight) but rarely expressed it with confidence. Emerging teachers reflect Sahadeva’s challenge: knowledge is present, but communication, confidence, or consistency holds them back.' },
          { min: 201, max: 300, level: 7, title: 'Needs Improvement', name: 'Karna', img: 'photos/level7.jpeg', desc: 'Karna was immensely talented and generous but conflicted by divided loyalties and self-doubt. Teachers at this stage resemble Karna—they have talent but struggle with alignment, consistency, or ethical dilemmas, reducing overall impact.' },
          { min: 121, max: 200, level: 8, title: 'Under Performer', name: 'Dronacharya', img: 'photos/level8.jpeg', desc: 'Dronacharya was a great teacher but compromised his ethics by favoring one side due to personal obligations. Teachers here mirror Dronacharya’s weakness—strong technical knowledge but lack of fairness, values, or consistent commitment.' },
          { min: 0, max: 120, level: 9, title: 'Critical Concern', name: 'Duryodhana', img: 'photos/level9.jpeg', desc: 'Duryodhana was powerful but blinded by arrogance, ego, and unethical choices. At this level, teachers resemble Duryodhana—misaligned with teaching values, prioritizing personal interest over student growth, and requiring a fundamental rethinking of purpose.' }
        ];
        const charData = characterMapping.find(c => d.total >= c.min && d.total <= c.max) || characterMapping[8];
        let charImg = null;
        try { charImg = await loadPdfImg(charData.img); } catch(e) {}
        
        const headerY = uniBanner ? 31 : 0;

        fillRect(0, 0, W, H, [246, 248, 252]);
        if (uniBanner) {
          const ar = (uniBanner.width && uniBanner.height) ? (uniBanner.width / uniBanner.height) : 4.5;
          let bw = W - 24, bh = bw / ar;
          if (bh > 24) { bh = 24; bw = bh * ar }
          doc.addImage(uniBanner, 'PNG', (W - bw) / 2, 4, bw, bh, undefined, 'FAST');
        }
        fillRect(0, headerY, W, 22, [31, 41, 55]);
        fillRect(0, headerY + 22, W, 0.8, [212, 168, 67]);
        sf('bold', 14, [238, 234, 224]); tx('Excel Mind', 12, headerY + 13);
        sf('bold', 14, [212, 168, 67]); tx('Pulse', 12 + doc.getTextWidth('Excel Mind'), headerY + 13);
        sf('bold', 14, [238, 234, 224]);
        sf('normal', 8, [185, 192, 203]); tx('Teaching Aptitude Assessment Report', 12, headerY + 19);
        sf('normal', 8, [185, 192, 203]); tx('Date: ' + date, 90, headerY + 19);

        const init = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        doc.setFillColor(43, 39, 32); doc.setDrawColor(212, 168, 67); doc.setLineWidth(0.5); doc.circle(W - 16, headerY + 11, 7, 'FD');
        sf('bold', 8, [212, 168, 67]); tx(init, W - 16, headerY + 11.5, { align: 'center' });

        let y = headerY + 28;

        // ── User Details block ──
        rndRect(12, y, W - 24, 30, [255, 255, 255], [217, 224, 234]);
        sf('bold', 7.5, [108, 120, 138]); tx('PARTICIPANT DETAILS', 16, y + 5.5);
        ln(12, y + 8, W - 12, y + 8, [226, 232, 240], 0.3);
        const fields = [['Name', user.name], ['Age', String(user.age)], ['Gender', user.gender], ['DOB', dob], ['Institution', user.college], ['Department', user.dept]];
        fields.forEach((f, i) => {
          const col = i % 3; const row = Math.floor(i / 3);
          const fx = [16, 78, 140][col]; const fy = y + 13 + row * 10;
          sf('bold', 7, [108, 120, 138]); tx(f[0], fx, fy);
          sf('normal', 8.5, [43, 51, 64]); tx(f[1], fx, fy + 4.5);
        });
        y += 36;

        // ── Overall score band legend (matches ring colours) ──
        const indicators = [
          { label: '80%-100%', desc: 'Exceptional educator profile', col: '#3ec9a7' },
          { label: '60%-79%', desc: 'Strong teaching aptitude', col: '#4a8fe8' },
          { label: '40%-59%', desc: 'Competent with room to grow', col: '#d4a843' },
          { label: '30%-39%', desc: 'Developing — needs focus', col: '#e8624a' },
          { label: '20%-29%', desc: 'Requires significant support', col: '#d32f2f' },
        ];

        let ringColor = d.prof.color;
        if (d.totalPct >= 80) ringColor = '#3ec9a7';
        else if (d.totalPct >= 60) ringColor = '#4a8fe8';
        else if (d.totalPct >= 40) ringColor = '#d4a843';
        else if (d.totalPct >= 30) ringColor = '#e8624a';
        else ringColor = '#d32f2f';

        const prgColor = ringColor;
        const rgb = h2r(prgColor);
        const sugRows = d.prof.suggestions;

        const boxX = 12;
        const boxW = W - 24;
        const colGap = 4;
        const rightBoxW = boxW * 0.55;
        const leftBoxW = boxW - rightBoxW - colGap;
        const rightBoxX = boxX + leftBoxW + colGap;
        
        const interpMaxW = rightBoxW - 12;
        const sugTextW = rightBoxW - 14;
        const sugLineH = 4;

        const interpSlice = doc.splitTextToSize(pdfText(d.prof.interp), interpMaxW);
        let sugPreviewH = 0;
        sugRows.forEach(s => {
          const lines = doc.splitTextToSize(pdfText(s), sugTextW);
          sugPreviewH += lines.length * sugLineH + 2;
        });

        const topBand = 24;
        const r = 17;
        const lcCx = rightBoxX + rightBoxW / 2;
        const lcCy = y + topBand + r + 6;
        let ty = lcCy + r + 11;
        
        const rightBox1H = (ty + 9 + 8 + interpSlice.length * 5 + 6) - y;
        const sugBoxY = y + rightBox1H + 6;
        const sugBoxH = 14 + sugPreviewH + 4;

        // Draw OVERALL RESULT box
        rndRect(rightBoxX, y, rightBoxW, rightBox1H, [255, 255, 255], [217, 224, 234]);
        sf('bold', 7.5, [108, 120, 138]); tx('OVERALL RESULT', rightBoxX + 4, y + 5.5);
        ln(rightBoxX, y + 8, rightBoxX + rightBoxW, y + 8, [226, 232, 240], 0.3);

        const indY = y + 11;
        const slotW = rightBoxW / indicators.length;
        indicators.forEach((ind, ii) => {
          const ix = rightBoxX + ii * slotW + slotW / 2;
          const indRgb = h2r(ind.col);
          sf('bold', 5.5, indRgb);
          const labelW = doc.getTextWidth(pdfText(ind.label));
          const dotR = 1.2;
          const gap = 1.5;
          const groupW = dotR * 2 + gap + labelW;
          const groupStartX = ix - groupW / 2;
          doc.setFillColor(...indRgb);
          doc.circle(groupStartX + dotR, indY - 0.5, dotR, 'F');
          tx(ind.label, groupStartX + dotR * 2 + gap, indY, {});
          sf('normal', 5, [100, 110, 125]);
          const descLines = doc.splitTextToSize(pdfText(ind.desc), slotW - 1);
          descLines.forEach((line, li) => {
            tx(line, ix, indY + 3.5 + (li * 2.5), { align: 'center' });
          });
        });

        ln(rightBoxX, y + 21, rightBoxX + rightBoxW, y + 21, [226, 232, 240], 0.3);

        // Draw Circle
        doc.setDrawColor(226, 232, 240); doc.setLineWidth(4); doc.circle(lcCx, lcCy, r, 'S');
        doc.setDrawColor(...rgb); doc.setLineWidth(4);
        const steps = Math.max(1, Math.round(d.totalPct / 100 * 360 / 3));
        for (let i = 0; i < steps; i++) { const a1 = (-90 + i * 3) * Math.PI / 180; const a2 = (-90 + (i + 1) * 3) * Math.PI / 180; doc.line(lcCx + r * Math.cos(a1), lcCy + r * Math.sin(a1), lcCx + r * Math.cos(a2), lcCy + r * Math.sin(a2)) }
        sf('bold', 16, rgb); tx(d.totalPct + '%', lcCx, lcCy + 2, { align: 'center' });
        sf('normal', 7, [120, 131, 148]); tx('Overall Score', lcCx, lcCy + 8, { align: 'center' });

        const pillW = doc.getTextWidth(pdfText(d.prof.label)) + 8;
        pill(d.prof.label, lcCx - pillW / 2, ty, prgColor);
        ty += 9;
        sf('bold', 8.5, rgb); tx(d.prof.profile, lcCx, ty, { align: 'center' });
        ty += 8;
        sf('normal', 7, [100, 110, 125]);
        interpSlice.forEach((line, i) => { tx(line, lcCx, ty + i * 5, { align: 'center' }) });

        // Draw SUGGESTIONS box
        rndRect(rightBoxX, sugBoxY, rightBoxW, sugBoxH, [255, 255, 255], [217, 224, 234]);
        sf('bold', 7.5, [212, 168, 67]); tx('SUGGESTIONS', rightBoxX + 4, sugBoxY + 5.5);
        ln(rightBoxX, sugBoxY + 8, rightBoxX + rightBoxW, sugBoxY + 8, [226, 232, 240], 0.3);
        
        let sugY = sugBoxY + 13;
        sugRows.forEach((s) => {
          doc.setFillColor(...rgb);
          doc.circle(rightBoxX + 4 + 1.5, sugY - 0.7, 1, 'F');
          sf('normal', 7.5, [82, 93, 110]);
          const lines = doc.splitTextToSize(pdfText(s), sugTextW);
          tx(lines, rightBoxX + 4 + 6, sugY);
          sugY += lines.length * sugLineH + 2;
        });

        // Draw CATEGORY-WISE ANALYSIS box below
        let row2Y = sugBoxY + sugBoxH + 6;

        // --- Draw Left Box (Educator Persona) ---
        const leftBoxH = (sugBoxY + sugBoxH) - y;
        rndRect(boxX, y, leftBoxW, leftBoxH, [255, 255, 255], [217, 224, 234]);
        
        let leftY = y + 6;
        sf('bold', 7.5, [108, 120, 138]); tx('EDUCATOR PERSONA', boxX + 4, leftY);
        ln(boxX, leftY + 2.5, boxX + leftBoxW, leftY + 2.5, [226, 232, 240], 0.3);
        
        leftY += 8;
        sf('bold', 9, [43, 51, 64]);
        tx(charData.title, boxX + leftBoxW / 2, leftY, { align: 'center' });
        
        leftY += 6;
        sf('bold', 12, [212, 168, 67]);
        tx(charData.name, boxX + leftBoxW / 2, leftY, { align: 'center' });
        
        leftY += 4;
        if (charImg) {
          const imgW = leftBoxW - 24;
          const imgRatio = charImg.height / charImg.width;
          const imgH = imgW * imgRatio;
          doc.addImage(charImg, 'JPEG', boxX + 12, leftY, imgW, imgH);
          leftY += imgH + 8;
        } else {
          leftY += 10;
        }
        
        sf('bold', 7.5, [108, 120, 138]);
        tx('SYMBOLISM', boxX + 4, leftY);
        leftY += 4;
        
        sf('normal', 7.5, [71, 85, 105]);
        const descLines = doc.splitTextToSize(pdfText(charData.desc), leftBoxW - 8);
        doc.text(descLines, boxX + 4, leftY);

        const catRowH = 6;
        const catBoxH = 14 + SECS.length * catRowH + 6;
        
        if (row2Y + catBoxH > 288) {
          // Draw footer on current page before adding a new one
          fillRect(0, H - 8, W, 8, [240, 243, 248]);
          sf('normal', 6.5, [124, 135, 151]); tx('Excel MindPulse Psychometric Assessment - Confidential - Page 1 of 2', W / 2, H - 3, { align: 'center' });
          
          doc.addPage();
          fillRect(0, 0, W, H, [246, 248, 252]);
          row2Y = 15;
        }

        rndRect(boxX, row2Y, boxW, catBoxH, [255, 255, 255], [217, 224, 234]);
        sf('bold', 7.5, [108, 120, 138]); tx('CATEGORY-WISE ANALYSIS', boxX + 4, row2Y + 5.5);
        ln(boxX, row2Y + 8, boxX + boxW, row2Y + 8, [226, 232, 240], 0.3);

        const barInset = boxX + 4;
        const nameColW = 70;
        const scoreColW = 13;
        const barW = boxW - 8 - nameColW - scoreColW - 8;
        const barX = barInset + nameColW;
        const scoreX = barX + barW + 3;

        SECS.forEach((sec, i) => {
          const score = d.secScores[sec.id];
          const pctVal = pct(score, 50);
          const rY = row2Y + 13 + i * catRowH;
          const secRgb = h2r(sec.color);
          doc.setFillColor(...secRgb);
          doc.circle(barInset + 1.5, rY + 1, 1.1, 'F');
          sf('bold', 6.5, secRgb);
          tx(sec.id + ': ' + sec.name, barInset + 5, rY + 1.3);
          hBar(barX, rY - 1.5, score, 50, barW, sec.color);
          sf('bold', 7, secRgb);
          tx(pctVal + '%', scoreX + scoreColW - 1, rY + 1.5, { align: 'right' });
        });

        y = row2Y + catBoxH + 4;

        // ── footer p1 ──
        fillRect(0, H - 8, W, 8, [240, 243, 248]);
        sf('normal', 6.5, [124, 135, 151]); tx('Excel MindPulse Psychometric Assessment - Confidential - Page 1 of 2', W / 2, H - 3, { align: 'center' });

        /* ════ PAGE 2 ════ */
        doc.addPage();
        fillRect(0, 0, W, H, [246, 248, 252]);
        fillRect(0, 0, W, 22, [31, 41, 55]);
        fillRect(0, 22, W, 0.8, [212, 168, 67]);
        sf('bold', 12, [238, 234, 224]); tx('Excel Mind', 12, 13);
        sf('bold', 12, [212, 168, 67]); tx('Pulse', 12 + doc.getTextWidth('Excel Mind'), 13);
        sf('normal', 8, [185, 192, 203]); tx('Category-wise Recommendations', 12, 19);
        sf('normal', 8, [185, 192, 203]); tx(user.name + ' - ' + date, W - 12, 19, { align: 'right' });

        y = 28;

        const LINE_H = 3.4;
        const RECO_INDENT = 10;
        const BULLET_X_OFFSET = 7.5;

        for (let si = 0; si < SECS.length; si++) {
          const sec = SECS[si];
          const score = d.secScores[sec.id];
          const p2 = pct(score, 50);
          const band = getSecBand(score);
          const reco = SEC_RECO[sec.id][band];
          const badgeTxt = band === 'high' ? 'High' : band === 'mod' ? 'Moderate' : 'Low';
          const badgeCol = band === 'high' ? '#3ec9a7' : band === 'mod' ? '#d4a843' : '#e8624a';

          const mediaW = (W - 24) * 0.22;
          const detailsW = (W - 24) - mediaW;
          const textMaxW = detailsW - RECO_INDENT - 6;

          let totalRecoLines = 0;
          const recoLineBlocks = [];
          for (let ri = 0; ri < reco.items.length; ri++) {
            const lines = doc.splitTextToSize(pdfText(reco.items[ri]), textMaxW);
            recoLineBlocks.push(lines);
            totalRecoLines += lines.length;
          }

          const itemGapTotal = reco.items.length * 1.0;
          const recoContentH = totalRecoLines * LINE_H + itemGapTotal;
          const CARD_H = 3 + 5 + 5 + 5 + recoContentH + 3;

          const mediaX = 12;
          const detailsX = 12 + mediaW;
          const secRgb = h2r(sec.color);

          rndRect(12, y, W - 24, CARD_H, [255, 255, 255], [217, 224, 234]);

          const secImg = await loadPdfImg(sec.img);
          if (secImg) {
            try { doc.addImage(secImg, 'PNG', mediaX + 1, y + 1, mediaW - 2, CARD_H - 2, undefined, 'FAST') } catch (e) { }
          } else {
            fillRect(mediaX + 1, y + 1, mediaW - 2, CARD_H - 2, [235, 239, 245]);
            sf('bold', 8, secRgb); tx(sec.id, mediaX + (mediaW / 2), y + (CARD_H / 2), { align: 'center' });
          }

          fillRect(detailsX, y, 2.5, CARD_H, secRgb);

          sf('bold', 8.5, secRgb);
          tx('CAT ' + sec.id + ': ' + sec.name, detailsX + 5, y + 5);

          const bpill = pdfText(badgeTxt + ' - ' + p2 + '%');
          const bpillW = doc.getTextWidth(bpill) + 8;
          pill(badgeTxt + ' - ' + p2 + '%', detailsX + detailsW - bpillW - 2, y + 4.5, badgeCol);

          sf('bold', 7, [212, 168, 67]);
          tx('Recommendations (' + reco.label + '):', detailsX + 5, y + 13);

          let recoY = y + 19;
          for (let ri = 0; ri < recoLineBlocks.length; ri++) {
            const lines = recoLineBlocks[ri];
            doc.setFillColor(...secRgb);
            doc.circle(detailsX + BULLET_X_OFFSET, recoY - 0.7, 0.8, 'F');
            sf('normal', 7, [50, 60, 75]);
            tx(lines, detailsX + RECO_INDENT, recoY);
            recoY += lines.length * LINE_H + 1.0;
          }

          y += CARD_H + 2;
        }

        sf('normal', 7, [50, 60, 75]); tx('For any further clarification or counselling sessions contact: Dr. Naveen P Y, Head - SSELD, 90143 51423, 99595 90826', 12, H - 12);

        fillRect(0, H - 8, W, 8, [240, 243, 248]);
        sf('normal', 6.5, [124, 135, 151]); tx('Excel MindPulse Psychometric Assessment - Confidential - Page 2 of 2', W / 2, H - 3, { align: 'center' });

        const filename = 'excel-mindpulse-report-' + user.name.replace(/\s+/g, '-').toLowerCase() + '.pdf';
        try {
          doc.save(filename);
        } catch (saveErr) {
          try {
            const blob = doc.output('blob');
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
          } catch (blobErr) {
            console.error('PDF download failed', saveErr, blobErr);
            alert('PDF download failed. Please open the browser console for details.');
          }
        }
      } catch (err) {
        console.error('PDF generation failed', err);
        alert('PDF generation failed. Please open the browser console for details.');
      }
    }