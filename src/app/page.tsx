"use client"

import React, { useState, useEffect } from 'react';
import { Moon, Frown, Zap, Flame, Cloud, Circle, CheckCircle2, ArrowRight, TrendingUp, Lock, Sparkles, Award, Calendar, BarChart3, AlertCircle, Volume2, VolumeX, BookOpen, Share2, Target, Clock, Bell, Trophy, Gift } from 'lucide-react';

const EMOTIONS = [
  { id: 'sleep', label: "CAN'T SLEEP", emoji: '😴', icon: Moon, color: 'from-indigo-600 to-purple-600', description: 'Racing thoughts keeping you awake' },
  { id: 'anxious', label: 'ANXIOUS', emoji: '😰', icon: Frown, color: 'from-yellow-600 to-orange-600', description: 'Worried, overwhelmed, or panicked' },
  { id: 'stressed', label: 'STRESSED', emoji: '😫', icon: Zap, color: 'from-red-600 to-pink-600', description: 'Work pressure or tension' },
  { id: 'angry', label: 'ANGRY', emoji: '😤', icon: Flame, color: 'from-orange-600 to-red-600', description: 'Frustrated or irritated' },
  { id: 'sad', label: 'SAD', emoji: '😢', icon: Cloud, color: 'from-blue-600 to-indigo-600', description: 'Down, depressed, or grieving' },
];

const ACHIEVEMENTS = [
  { id: 'first_session', title: 'First Step', description: 'Completed your first protocol', icon: '🎯' },
  { id: 'week_streak', title: 'Consistent', description: '7-day streak', icon: '🔥' },
  { id: 'month_streak', title: 'Dedicated', description: '30-day streak', icon: '💪' },
  { id: 'ten_sessions', title: 'Building Skills', description: '10 sessions completed', icon: '⭐' },
  { id: 'fifty_sessions', title: 'Expert', description: '50 sessions completed', icon: '🏆' },
  { id: 'all_protocols', title: 'Explorer', description: 'Tried all 5 protocols', icon: '🗺️' },
  { id: 'high_effectiveness', title: 'Finding What Works', description: '80%+ effectiveness rate', icon: '🎊' },
];

const EMERGENCY_PROTOCOLS = {
  sleep: {
    title: '60-Second Sleep Reset',
    steps: [{ type: 'emergency_breathing', title: '4-7-8 Quick', duration: 60, breathPattern: { inhale: 4, hold: 7, exhale: 8 }, cycles: 3 }]
  },
  anxious: {
    title: '60-Second Anxiety Break',
    steps: [{ type: 'emergency_grounding', title: '5-4-3-2-1 Grounding', duration: 60 }]
  },
  stressed: {
    title: '60-Second Stress Release',
    steps: [{ type: 'emergency_breathing', title: 'Box Breathing', duration: 60, breathPattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 }, cycles: 3 }]
  },
};

const PROTOCOLS = {
  sleep: {
    title: "Sleep Recovery Protocol",
    duration: "5 minutes",
    free: true,
    science: "Combines 4-7-8 breathing (activates parasympathetic nervous system), cognitive shuffling (prevents rumination), and paradoxical intention (reduces performance anxiety)",
    steps: [
      { type: 'breathing', title: '4-7-8 Breathing', subtitle: 'Activate your relaxation response', duration: 120, instructions: 'Follow the breathing pattern. This calms your nervous system.', breathPattern: { inhale: 4, hold: 7, exhale: 8 }, voiceGuidance: 'Breathe in for 4... hold for 7... breathe out for 8...' },
      { type: 'cognitive_shuffle', title: 'Cognitive Shuffling', subtitle: 'Stop racing thoughts', duration: 120, instructions: 'Visualize each word that appears. This prevents rumination.', words: ['beach', 'lamp', 'tree', 'book', 'cloud', 'chair', 'flower', 'door', 'window', 'table', 'pillow', 'star', 'moon', 'river', 'stone', 'feather', 'candle', 'mountain', 'ocean', 'breeze'], voiceGuidance: 'Visualize: {word}. See it clearly in your mind.' },
      { type: 'paradox', title: 'Paradoxical Intention', subtitle: 'Reverse the pressure', duration: 60, instructions: 'Try to stay awake. Removing the pressure to sleep helps you relax.', prompt: 'Try to keep your eyes open for just 60 more seconds...', voiceGuidance: 'Try to stay awake for one more minute. Notice how this reduces the pressure.' }
    ]
  },
  anxious: {
    title: "Anxiety Relief Protocol",
    duration: "4 minutes",
    free: true,
    science: "Uses DBT's STOP technique (interrupts anxiety spiral), cognitive restructuring (reality-tests anxious thoughts), and opposite action (behavioral activation)",
    steps: [
      { type: 'dbt_stop', title: 'STOP Technique', subtitle: 'Break the anxiety spiral', duration: 60, instructions: 'DBT\'s most powerful quick intervention', sequence: ['Stop', 'Take a breath', 'Observe', 'Proceed mindfully'], voiceGuidance: 'Stop what you\'re doing... Take a deep breath... Observe what\'s happening... Now proceed mindfully.' },
      { type: 'check_facts', title: 'Check the Facts', subtitle: 'Reality test your thoughts', duration: 120, instructions: 'Anxiety lies. Let\'s find the truth.', questions: ['What\'s the WORST that could happen?', 'What\'s MOST LIKELY to happen?', 'Have you survived this before?', 'What evidence supports your worry?'], voiceGuidance: 'Let\'s check the facts. Think about: {question}' },
      { type: 'opposite_action', title: 'Opposite Action', subtitle: 'Do the opposite of what anxiety wants', duration: 60, instructions: 'Anxiety wants you to avoid. You\'re going to do the opposite.', prompt: 'Name one small thing you\'ll do anyway:', voiceGuidance: 'Anxiety wants you to avoid. What\'s one small thing you\'ll do instead?' }
    ]
  },
  stressed: {
    title: "Stress Reset Protocol",
    duration: "4 minutes",
    free: true,
    science: "Uses box breathing (used by Navy SEALs, improves HRV), cognitive reframing (perspective shift), and somatic release (releases physical tension)",
    steps: [
      { type: 'box_breathing', title: 'Box Breathing', subtitle: 'Used by Navy SEALs', duration: 90, instructions: 'Equal counts: inhale, hold, exhale, hold', breathPattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 }, voiceGuidance: 'In for 4... hold for 4... out for 4... pause for 4...' },
      { type: 'perspective', title: 'Perspective Shift', subtitle: 'Zoom out', duration: 90, instructions: 'Answer honestly to regain perspective', questions: ['Will this matter in 5 years?', 'What\'s one thing going RIGHT?', 'What would you tell a friend in this situation?'], voiceGuidance: 'Consider this: {question}' },
      { type: 'physical', title: 'Physical Release', subtitle: 'Move the stress out', duration: 60, instructions: 'Stress lives in your body. Release it.', actions: ['Roll your shoulders 5 times', 'Shake your hands out', 'Stretch your neck slowly'], voiceGuidance: 'Now: {action}. Notice the release.' }
    ]
  },
  angry: {
    title: "Anger Cooling Protocol",
    duration: "4 minutes",
    free: false,
    science: "Combines physiological release (discharges anger energy), cognitive processing (identifies true needs), and cooling visualization (lowers arousal)",
    steps: [
      { type: 'breathing', title: 'Lion\'s Breath', subtitle: 'Physical release for anger', duration: 90, instructions: 'Anger needs physical outlet. This is it.', breathPattern: { inhale: 4, hold: 2, exhale: 6 }, voiceGuidance: 'Deep breath in... hold... release with force...' },
      { type: 'anger_check', title: 'Understand the Anger', subtitle: 'What\'s really happening?', duration: 120, instructions: 'Anger is often a mask for other emotions', questions: ['What triggered this feeling?', 'What do I REALLY need right now?', 'Is this worth damaging a relationship?', 'How will I feel about my response tomorrow?'], voiceGuidance: 'Reflect on: {question}' },
      { type: 'cooling', title: 'Cool Down', subtitle: 'Lower the temperature', duration: 60, instructions: 'Visualize something cooling', prompt: 'Imagine cold water, ice, or cool wind on your face for 60 seconds', voiceGuidance: 'Imagine cold water washing over you. Feel the temperature dropping.' }
    ]
  },
  sad: {
    title: "Mood Lift Protocol",
    duration: "4 minutes",
    free: false,
    science: "Uses validation (prevents fighting the emotion), self-compassion (CBT technique), and behavioral activation (proven anti-depressant intervention)",
    steps: [
      { type: 'validation', title: 'Validate Your Feelings', subtitle: 'It\'s okay to feel sad', duration: 60, instructions: 'Fighting sadness makes it worse. Accept it first.', affirmations: ['Sadness is a natural emotion', 'I\'m allowed to feel this way', 'This feeling will pass', 'I\'ve survived 100% of my worst days'], voiceGuidance: '{affirmation}. Let this truth sink in.' },
      { type: 'self_compassion', title: 'Self-Compassion', subtitle: 'Be kind to yourself', duration: 120, instructions: 'Answer with compassion, as if talking to a friend', questions: ['What do I need right now?', 'How can I be gentle with myself?', 'What small comfort can I give myself?'], voiceGuidance: 'Ask yourself with kindness: {question}' },
      { type: 'behavioral_activation', title: 'One Small Action', subtitle: 'Gentle movement forward', duration: 60, instructions: 'Depression says "do nothing". Do one tiny thing instead.', prompt: 'Name ONE small thing you\'ll do in the next 10 minutes:', voiceGuidance: 'Depression wants inaction. What\'s one tiny thing you can do?' }
    ]
  }
};

export default function MindShift() {
  const [user, setUser] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [view, setView] = useState('welcome');
  const [sessionData, setSessionData] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = localStorage.getItem('mindshift_user');
      if (data) {
        const parsed = JSON.parse(data);
        setUserData(parsed);
        setUser({ id: 'user_1', isPremium: parsed.isPremium || false });
        setView(parsed.hasCompletedOnboarding ? 'home' : 'welcome');
      } else {
        const newUserData = {
          createdAt: new Date().toISOString(),
          isPremium: false,
          hasCompletedOnboarding: false,
          usageToday: 0,
          totalSessions: 0,
          sessionHistory: [],
          effectiveness: {},
          achievements: [],
          scheduledInterventions: []
        };
        localStorage.setItem('mindshift_user', JSON.stringify(newUserData));
        setUserData(newUserData);
        setUser({ id: 'user_1', isPremium: false });
        setView('welcome');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
      const defaultUserData = {
        createdAt: new Date().toISOString(),
        isPremium: false,
        hasCompletedOnboarding: false,
        usageToday: 0,
        totalSessions: 0,
        sessionHistory: [],
        effectiveness: {},
        achievements: [],
        scheduledInterventions: []
      };
      setUserData(defaultUserData);
      setUser({ id: 'user_1', isPremium: false });
      setView('welcome');
    }
    setLoading(false);
  };

  const saveUserData = async (data: typeof userData) => {
    try {
      localStorage.setItem('mindshift_user', JSON.stringify(data));
      setUserData(data);
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const completeOnboarding = async () => {
    const newUserData = {
      ...userData,
      hasCompletedOnboarding: true
    };
    await saveUserData(newUserData);
    setView('home');
  };

  const startProtocol = (emotionId, emergency = false) => {
    const protocol = emergency ? EMERGENCY_PROTOCOLS[emotionId] : PROTOCOLS[emotionId];
    
    if (!emergency && !user.isPremium) {
      const today = new Date().toDateString();
      const lastUsed = userData.lastUsedDate;
      const usageToday = lastUsed === today ? userData.usageToday : 0;
      
      if (usageToday >= 3) {
        setView('premium');
        return;
      }
      
      if (!protocol.free) {
        setView('premium');
        return;
      }
    }

    setSelectedEmotion(emotionId);
    setCurrentStepIndex(0);
    setSessionData({ startTime: Date.now(), isEmergency: emergency });
    setIsEmergencyMode(emergency);
    setView('protocol');
  };

  const nextStep = (data = {}) => {
    setSessionData(prev => ({ ...prev, ...data }));
    const protocol = isEmergencyMode ? EMERGENCY_PROTOCOLS[selectedEmotion] : PROTOCOLS[selectedEmotion];
    if (currentStepIndex < protocol.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setView('feedback');
    }
  };

  const checkAchievements = (newUserData) => {
    const earned = [];
    
    if (newUserData.totalSessions === 1 && !newUserData.achievements.includes('first_session')) {
      earned.push('first_session');
    }
    if (newUserData.totalSessions === 10 && !newUserData.achievements.includes('ten_sessions')) {
      earned.push('ten_sessions');
    }
    if (newUserData.totalSessions === 50 && !newUserData.achievements.includes('fifty_sessions')) {
      earned.push('fifty_sessions');
    }
    
    const streak = calculateStreak(newUserData);
    if (streak >= 7 && !newUserData.achievements.includes('week_streak')) {
      earned.push('week_streak');
    }
    if (streak >= 30 && !newUserData.achievements.includes('month_streak')) {
      earned.push('month_streak');
    }
    
    const uniqueEmotions = new Set(newUserData.sessionHistory.map(s => s.emotion));
    if (uniqueEmotions.size >= 5 && !newUserData.achievements.includes('all_protocols')) {
      earned.push('all_protocols');
    }
    
    const effectiveness = calculateEffectiveness(newUserData);
    if (effectiveness >= 0.8 && newUserData.totalSessions >= 10 && !newUserData.achievements.includes('high_effectiveness')) {
      earned.push('high_effectiveness');
    }
    
    return earned;
  };

  const handleFeedback = async (feeling, intensity = 3, notes = '') => {
    const session = {
      emotion: selectedEmotion,
      timestamp: new Date().toISOString(),
      duration: Math.round((Date.now() - sessionData.startTime) / 1000),
      feeling: feeling,
      intensity: intensity,
      notes: notes,
      isEmergency: isEmergencyMode,
      dayOfWeek: new Date().getDay(),
      hourOfDay: new Date().getHours()
    };

    const today = new Date().toDateString();
    const lastUsed = userData.lastUsedDate;
    const usageToday = lastUsed === today ? userData.usageToday + 1 : 1;

    const newUserData = {
      ...userData,
      lastUsedDate: today,
      usageToday: usageToday,
      totalSessions: (userData.totalSessions || 0) + 1,
      sessionHistory: [...(userData.sessionHistory || []).slice(-100), session],
      effectiveness: {
        ...userData.effectiveness,
        [selectedEmotion]: [
          ...(userData.effectiveness[selectedEmotion] || []).slice(-20),
          feeling
        ]
      }
    };

    const newAchievementsEarned = checkAchievements(newUserData);
    if (newAchievementsEarned.length > 0) {
      newUserData.achievements = [...(newUserData.achievements || []), ...newAchievementsEarned];
      setNewAchievements(newAchievementsEarned);
    }

    await saveUserData(newUserData);

    const recentUsage = newUserData.sessionHistory.slice(-15);
    const sameEmotionRecent = recentUsage.filter(s => s.emotion === selectedEmotion).length;
    const recentWorseRatings = recentUsage.filter(s => s.feeling === 'worse').length;

    if (sameEmotionRecent >= 10 || recentWorseRatings >= 4) {
      setView('crisis');
      return;
    }

    if (newAchievementsEarned.length > 0) {
      setView('achievements');
    } else {
      resetToHome();
    }
  };

  const resetToHome = () => {
    setSelectedEmotion(null);
    setCurrentStepIndex(0);
    setSessionData({});
    setIsEmergencyMode(false);
    setView('home');
  };

  const upgradeToPremium = async () => {
    const newUserData = {
      ...userData,
      isPremium: true,
      upgradedAt: new Date().toISOString()
    };
    await saveUserData(newUserData);
    setUser({ ...user, isPremium: true });
    setView('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading MindShift...</p>
        </div>
      </div>
    );
  }

  if (view === 'welcome') {
    return <OnboardingFlow onComplete={completeOnboarding} />;
  }

  if (view === 'achievements') {
    return (
      <AchievementCelebration 
        achievements={newAchievements}
        onContinue={() => {
          setNewAchievements([]);
          resetToHome();
        }}
      />
    );
  }

  if (view === 'crisis') {
    return <CrisisSupport onBack={resetToHome} emotion={selectedEmotion} />;
  }

  if (view === 'premium') {
    return <PremiumUpsell onUpgrade={upgradeToPremium} onBack={() => setView('home')} userData={userData} />;
  }

  if (view === 'stats') {
    return <StatsView userData={userData} onBack={() => setView('home')} isPremium={user.isPremium} onUpgrade={() => setView('premium')} />;
  }

  if (view === 'learn') {
    return <LearnView onBack={() => setView('home')} isPremium={user.isPremium} />;
  }

  if (view === 'schedule') {
    return <ScheduleView userData={userData} onBack={() => setView('home')} onSave={saveUserData} isPremium={user.isPremium} />;
  }

  if (view === 'feedback') {
    return <EnhancedFeedbackView emotion={selectedEmotion} onFeedback={handleFeedback} userData={userData} isEmergency={isEmergencyMode} />;
  }

  if (view === 'protocol') {
    return (
      <ProtocolView
        emotion={selectedEmotion}
        stepIndex={currentStepIndex}
        onNext={nextStep}
        onExit={resetToHome}
        isPremium={user.isPremium}
        userData={userData}
        isEmergency={isEmergencyMode}
        voiceEnabled={voiceEnabled}
      />
    );
  }

  const today = new Date().toDateString();
  const lastUsed = userData.lastUsedDate;
  const usageToday = lastUsed === today ? userData.usageToday : 0;
  const remainingFree = user.isPremium ? '∞' : Math.max(0, 3 - usageToday);

  const prediction = getPredictiveInsight(userData);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                MindShift
                {user.isPremium && <Sparkles className="w-5 h-5 text-yellow-400" />}
              </h1>
              <p className="text-gray-400 text-xs">Evidence-based emotional relief</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setView('learn')} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <BookOpen className="w-5 h-5 text-gray-400" />
              </button>
              {user.isPremium && (
                <button onClick={() => setView('schedule')} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </button>
              )}
              <button onClick={() => setView('stats')} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          {!user.isPremium && (
            <div className="p-3 bg-gray-800 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Free Tier</p>
                <p className="text-gray-400 text-xs">{remainingFree} uses remaining today</p>
              </div>
              <button onClick={() => setView('premium')} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition">
                Upgrade
              </button>
            </div>
          )}
        </div>
      </div>

      {userData.totalSessions > 0 && (
        <div className="p-3 bg-gray-800/50 border-b border-gray-800">
          <div className="max-w-2xl mx-auto flex gap-4 text-center">
            <div className="flex-1">
              <p className="text-xl font-bold text-white">{userData.totalSessions}</p>
              <p className="text-xs text-gray-400">Sessions</p>
            </div>
            <div className="flex-1">
              <p className="text-xl font-bold text-green-400">{Math.round(calculateEffectiveness(userData) * 100)}%</p>
              <p className="text-xs text-gray-400">Effective</p>
            </div>
            <div className="flex-1">
              <p className="text-xl font-bold text-purple-400">{calculateStreak(userData)}</p>
              <p className="text-xs text-gray-400">Day Streak</p>
            </div>
            <div className="flex-1">
              <p className="text-xl font-bold text-yellow-400">{userData.achievements?.length || 0}</p>
              <p className="text-xs text-gray-400">Badges</p>
            </div>
          </div>
        </div>
      )}

      {prediction && user.isPremium && (
        <div className="p-3 bg-blue-900/20 border-b border-blue-800">
          <div className="max-w-2xl mx-auto flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-300 text-sm font-medium">Predictive Insight</p>
              <p className="text-gray-400 text-xs">{prediction}</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-3 bg-red-900/20 border-b border-red-800">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-300 text-xs font-medium mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Need immediate help? Use 60-second emergency protocols:
          </p>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => startProtocol('anxious', true)} className="px-3 py-1.5 bg-red-900/50 hover:bg-red-900/70 text-red-200 rounded text-xs font-medium transition">
              😰 Anxiety (60s)
            </button>
            <button onClick={() => startProtocol('stressed', true)} className="px-3 py-1.5 bg-red-900/50 hover:bg-red-900/70 text-red-200 rounded text-xs font-medium transition">
              😫 Stress (60s)
            </button>
            <button onClick={() => startProtocol('sleep', true)} className="px-3 py-1.5 bg-red-900/50 hover:bg-red-900/70 text-red-200 rounded text-xs font-medium transition">
              😴 Sleep (60s)
            </button>
          </div>
        </div>
      </div>

      {user.isPremium && (
        <div className="p-3 bg-gray-800/30 border-b border-gray-800">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {voiceEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
              <span className="text-sm text-gray-300">Voice Guidance</span>
            </div>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`px-3 py-1 rounded text-xs font-medium transition ${
                voiceEnabled ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {voiceEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-3">
          {EMOTIONS.map((emotion) => {
            const protocol = PROTOCOLS[emotion.id];
            const isLocked = !user.isPremium && !protocol.free;
            const recentSessions = userData.sessionHistory?.filter(s => s.emotion === emotion.id).slice(-10) || [];
            const avgEffectiveness = recentSessions.length > 0
              ? recentSessions.filter(s => s.feeling === 'better' || s.feeling === 'somewhat').length / recentSessions.length
              : 0;

            return (
              <button
                key={emotion.id}
                onClick={() => startProtocol(emotion.id)}
                disabled={isLocked && remainingFree === 0}
                className={`w-full p-5 rounded-xl bg-gradient-to-r ${emotion.color} hover:opacity-90 transform hover:scale-[1.01] transition-all duration-200 shadow-lg relative ${
                  (isLocked && remainingFree === 0) ? 'opacity-50' : ''
                }`}
              >
                {isLocked && (
                  <div className="absolute top-3 right-3">
                    <Lock className="w-4 h-4 text-white/80" />
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{emotion.emoji}</span>
                  <div className="text-left flex-1">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      {emotion.label}
                      {isLocked && <span className="text-xs bg-white/20 px-2 py-0.5 rounded">PRO</span>}
                    </h2>
                    <p className="text-white/70 text-xs mt-0.5">{emotion.description}</p>
                    <p className="text-white/60 text-xs mt-1">
                      {protocol.duration} • {protocol.steps.length} steps
                    </p>
                    {recentSessions.length >= 3 && (
                      <p className="text-white/80 text-xs mt-1 font-medium">
                        {Math.round(avgEffectiveness * 100)}% effective for you
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-3 text-center text-gray-500 text-xs border-t border-gray-800">
        <p>Based on DBT & CBT • Developed with licensed therapists</p>
      </div>
    </div>
  );
}

function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);

  const screens = [
    {
      title: "Welcome to MindShift",
      description: "Your evidence-based emotional emergency button",
      content: "When anxiety, stress, or sleeplessness strikes, you need relief in minutes, not hours. MindShift delivers proven therapeutic techniques right when you need them.",
      icon: "🎯"
    },
    {
      title: "The Science Behind It",
      description: "Not meditation. Not entertainment. Clinical intervention.",
      content: "Every protocol is based on Dialectical Behavior Therapy (DBT) and Cognitive Behavioral Therapy (CBT) - the gold standards in emotion regulation with decades of research.",
      icon: "🧠"
    },
    {
      title: "How It Works",
      description: "Click a button. Follow the protocol. Feel better.",
      content: "Each protocol takes 4-5 minutes and combines physiological techniques (breathing), cognitive tools (reframing), and behavioral interventions (action steps).",
      icon: "⚡"
    },
    {
      title: "It Learns About You",
      description: "The more you use it, the better it works",
      content: "MindShift tracks what works for you, when you need help most, and personalizes protocols based on your patterns. Your effectiveness rate improves over time.",
      icon: "📈"
    }
  ];

  const currentScreen = screens[step];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{currentScreen.icon}</div>
          <h2 className="text-3xl font-bold text-white mb-2">{currentScreen.title}</h2>
          <p className="text-purple-400 mb-4">{currentScreen.description}</p>
          <p className="text-gray-300 text-sm">{currentScreen.content}</p>
        </div>

        <div className="flex gap-2 justify-center mb-8">
          {screens.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === step ? 'w-8 bg-purple-500' : 'w-2 bg-gray-700'
              }`}
            />
          ))}
        </div>

        <div className="space-y-3">
          {step < screens.length - 1 ? (
            <>
              <button
                onClick={() => setStep(step + 1)}
                className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
              >
                Continue
              </button>
              <button
                onClick={onComplete}
                className="w-full py-3 px-6 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-medium transition"
              >
                Skip Tutorial
              </button>
            </>
          ) : (
            <button
              onClick={onComplete}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-xl font-semibold transition shadow-lg"
            >
              Get Started →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
function AchievementCelebration({ achievements, onContinue }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold text-white mb-2">Achievement Unlocked!</h2>
        <p className="text-gray-400 mb-8">You're building powerful coping skills</p>

        <div className="space-y-4 mb-8">
          {achievements.map(id => {
            const achievement = ACHIEVEMENTS.find(a => a.id === id);
            return (
              <div key={id} className="bg-gray-800 p-4 rounded-xl border-2 border-yellow-500/50">
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h3 className="text-white font-semibold">{achievement.title}</h3>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function LearnView({ onBack, isPremium }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    {
      id: 'dbt',
      title: 'What is DBT?',
      emoji: '🧘',
      content: 'Dialectical Behavior Therapy (DBT) was developed by Dr. Marsha Linehan in the 1980s. It teaches skills for managing intense emotions through mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness. MindShift uses DBT\'s core techniques like STOP, Check the Facts, and Opposite Action.'
    },
    {
      id: 'cbt',
      title: 'What is CBT?',
      emoji: '💭',
      content: 'Cognitive Behavioral Therapy (CBT) focuses on the connection between thoughts, feelings, and behaviors. By changing unhelpful thought patterns, we can change how we feel and act. MindShift uses CBT techniques like cognitive reframing and behavioral activation.'
    },
    {
      id: 'breathing',
      title: 'Why Breathing Works',
      emoji: '🫁',
      content: '4-7-8 and box breathing activate your parasympathetic nervous system (rest-and-digest). This physiologically counteracts your sympathetic nervous system (fight-or-flight). Studies show controlled breathing reduces cortisol, lowers heart rate, and improves heart rate variability (HRV).'
    },
    {
      id: 'cognitive_shuffle',
      title: 'Cognitive Shuffling',
      emoji: '🔀',
      content: 'Developed by Dr. Luc Beaudoin, cognitive shuffling prevents rumination by occupying your mind with random, meaningless images. This "cognitive shuffle" makes it impossible to maintain worry patterns, allowing natural sleep onset.'
    },
    {
      id: 'opposite_action',
      title: 'Opposite Action',
      emoji: '🔄',
      content: 'One of DBT\'s most powerful tools. When emotions drive unhelpful urges (anxiety → avoid, anger → lash out, sadness → isolate), doing the opposite changes the emotional state. This isn\'t forcing positivity - it\'s behavioral intervention that actually works.'
    }
  ];

  if (selectedTopic) {
    const topic = topics.find(t => t.id === selectedTopic);
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setSelectedTopic(null)} className="text-purple-400 text-sm mb-6 hover:text-purple-300 transition">
            ← Back to Topics
          </button>
          <div className="text-6xl mb-4">{topic.emoji}</div>
          <h2 className="text-3xl font-bold text-white mb-4">{topic.title}</h2>
          <p className="text-gray-300 leading-relaxed">{topic.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Learn the Science</h2>
          <button onClick={onBack} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition">
            Back
          </button>
        </div>

        <div className="space-y-3">
          {topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{topic.emoji}</span>
                <div>
                  <h3 className="text-white font-semibold">{topic.title}</h3>
                  <p className="text-gray-400 text-sm">Tap to learn more</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleView({ userData, onBack, onSave, isPremium }) {
  const [schedules, setSchedules] = useState(userData.scheduledInterventions || []);

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Scheduled Interventions</h2>
          <p className="text-gray-400 mb-6">Upgrade to Pro to schedule proactive interventions before stressful events</p>
          <button onClick={onBack} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Scheduled Interventions</h2>
          <button onClick={onBack} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition">
            Back
          </button>
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4 mb-6">
          <p className="text-blue-300 text-sm">
            <strong>Pro tip:</strong> Schedule interventions before stressful events. For example: "Every Monday at 8:45am before my weekly 1:1 with my boss" or "Every night at 10pm to help me wind down for sleep."
          </p>
        </div>

        {schedules.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No scheduled interventions yet</p>
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition">
              Create Schedule
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {schedules.map((schedule, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">{schedule.title}</p>
                      <p className="text-gray-400 text-sm">{schedule.time} • {schedule.emotion}</p>
                    </div>
                  </div>
                  <button className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EnhancedFeedbackView({ emotion, onFeedback, userData, isEmergency }) {
  const [feeling, setFeeling] = useState(null);
  const [intensity, setIntensity] = useState(3);
  const [notes, setNotes] = useState('');

  const emotionData = EMOTIONS.find(e => e.id === emotion);
  const recentUsage = userData?.sessionHistory?.filter(s => s.emotion === emotion).slice(-10) || [];
  const showReferral = recentUsage.length >= 7;

  if (!feeling) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{emotionData.emoji}</div>
            <h2 className="text-3xl font-bold text-white mb-2">How do you feel now?</h2>
            <p className="text-gray-400">Your feedback personalizes future sessions</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setFeeling('better')}
              className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-semibold transition shadow-lg"
            >
              ✓ Much Better
            </button>
            <button
              onClick={() => setFeeling('somewhat')}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition shadow-lg"
            >
              → Somewhat Better
            </button>
            <button
              onClick={() => setFeeling('same')}
              className="w-full py-4 px-6 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-lg font-semibold transition shadow-lg"
            >
              = About the Same
            </button>
            <button
              onClick={() => setFeeling('worse')}
              className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl text-lg font-semibold transition shadow-lg"
            >
              ✗ Worse
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">Tell us more (optional)</h3>
        
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">How intense was the {emotion}? (1-5)</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(val => (
              <button
                key={val}
                onClick={() => setIntensity(val)}
                className={`flex-1 py-2 rounded-lg font-medium transition ${
                  intensity === val 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">Any notes about what helped or didn't?</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional feedback..."
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none min-h-24"
          />
        </div>

        <button
          onClick={() => onFeedback(feeling, intensity, notes)}
          className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition"
        >
          Submit Feedback
        </button>

        {showReferral && (
          <div className="mt-6 p-4 bg-blue-900/30 border border-blue-600 rounded-xl">
            <p className="text-blue-300 text-sm mb-2">
              💙 You've used this {recentUsage.length} times recently
            </p>
            <p className="text-gray-300 text-sm mb-3">
              Quick techniques help, but frequent struggles might benefit from ongoing professional support.
            </p>
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
              Explore Therapy Options →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProtocolView({ emotion, stepIndex, onNext, onExit, isPremium, userData, isEmergency, voiceEnabled }) {
  const protocol = isEmergency ? EMERGENCY_PROTOCOLS[emotion] : PROTOCOLS[emotion];
  const currentStep = protocol.steps[stepIndex];
  
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onExit} className="text-gray-400 hover:text-white text-sm font-medium transition">
              ✕ Exit
            </button>
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                {isEmergency ? 'Emergency Mode' : `Step ${stepIndex + 1} of ${protocol.steps.length}`}
              </p>
            </div>
            {voiceEnabled && <Volume2 className="w-5 h-5 text-purple-400" />}
            {!voiceEnabled && <div className="w-5"></div>}
          </div>
          <div className="flex gap-2">
            {protocol.steps.map((_, idx) => (
              <div key={idx} className={`h-1 flex-1 rounded-full ${idx <= stepIndex ? 'bg-purple-500' : 'bg-gray-700'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {currentStep.type === 'breathing' && <BreathingExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'emergency_breathing' && <BreathingExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'box_breathing' && <BreathingExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'dbt_stop' && <DBTStopExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'check_facts' && <QuestionExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'opposite_action' && <InputExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'cognitive_shuffle' && <CognitiveShuffleExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'paradox' && <ParadoxExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'perspective' && <QuestionExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'physical' && <PhysicalExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'anger_check' && <QuestionExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'cooling' && <TimedExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'validation' && <AffirmationExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'self_compassion' && <QuestionExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'behavioral_activation' && <InputExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
          {currentStep.type === 'emergency_grounding' && <EmergencyGroundingExercise step={currentStep} onComplete={onNext} voiceEnabled={voiceEnabled} />}
        </div>
      </div>
    </div>
  );
}

function EmergencyGroundingExercise({ step, onComplete, voiceEnabled }) {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState(0);
  
  const phases = [
    { text: '5 things you can SEE', count: 5 },
    { text: '4 things you can TOUCH', count: 4 },
    { text: '3 things you can HEAR', count: 3 },
    { text: '2 things you can SMELL', count: 2 },
    { text: '1 thing you can TASTE', count: 1 }
  ];

  useEffect(() => {
    if (!started) return;
    if (phase >= phases.length) {
      setTimeout(onComplete, 1000);
      return;
    }
    const timer = setTimeout(() => setPhase(phase + 1), 8000);
    return () => clearTimeout(timer);
  }, [started, phase, onComplete]);

  if (!started) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-purple-400 mb-8">Ground yourself in the present moment</p>
        <button onClick={() => setStarted(true)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Start 5-4-3-2-1
        </button>
      </div>
    );
  }

  const currentPhase = phases[phase];
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-white mb-8 animate-pulse">
        {currentPhase ? currentPhase.text : 'Complete'}
      </h2>
      <p className="text-gray-400">Take your time to notice each one</p>
    </div>
  );
}

function BreathingExercise({ step, onComplete, voiceEnabled }) {
  const [phase, setPhase] = useState('ready');
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const pattern = step.breathPattern;
  const totalCycles = step.cycles || 6;

  useEffect(() => {
    if (phase === 'ready') return;
    const phases = pattern.pause ? ['inhale', 'hold', 'exhale', 'pause'] : ['inhale', 'hold', 'exhale'];
    const durations = pattern.pause ? [pattern.inhale, pattern.hold, pattern.exhale, pattern.pause] : [pattern.inhale, pattern.hold, pattern.exhale];
    const currentPhaseIndex = phases.indexOf(phase);
    const duration = durations[currentPhaseIndex];
    
    if (count < duration) {
      const timer = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      if (nextPhaseIndex === 0) {
        if (cycle + 1 >= totalCycles) {
          onComplete();
          return;
        }
        setCycle(cycle + 1);
      }
      setPhase(phases[nextPhaseIndex]);
      setCount(0);
    }
  }, [phase, count, cycle, pattern, onComplete, totalCycles]);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
      <p className="text-purple-400 mb-4">{step.subtitle}</p>
      <p className="text-gray-400 text-sm mb-8">{step.instructions}</p>
      {phase === 'ready' ? (
        <button onClick={() => setPhase('inhale')} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Start Breathing
        </button>
      ) : (
        <div>
          <div className="relative w-64 h-64 mx-auto mb-6">
            <div className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
              phase === 'inhale' ? 'scale-100 border-blue-500' :
              phase === 'hold' ? 'scale-100 border-purple-500' :
              phase === 'exhale' ? 'scale-75 border-green-500' :
              'scale-75 border-gray-500'
            }`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-bold capitalize">{phase}</p>
              <p className="text-gray-400 text-6xl font-bold mt-2">{count}</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Cycle {cycle + 1} of {totalCycles}</p>
        </div>
      )}
    </div>
  );
}

function DBTStopExercise({ step, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    if (currentIndex === -1) return;
    if (currentIndex >= step.sequence.length) {
      setTimeout(onComplete, 1000);
      return;
    }
    const timer = setTimeout(() => setCurrentIndex(currentIndex + 1), 3000);
    return () => clearTimeout(timer);
  }, [currentIndex, step.sequence.length, onComplete]);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
      <p className="text-purple-400 mb-4">{step.subtitle}</p>
      <p className="text-gray-400 text-sm mb-8">{step.instructions}</p>
      {currentIndex === -1 ? (
        <button onClick={() => setCurrentIndex(0)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Start STOP
        </button>
      ) : (
        <div className="space-y-6">
          {step.sequence.map((item, idx) => (
            <div key={idx} className={`p-6 rounded-xl transition-all ${
              idx === currentIndex ? 'bg-purple-600 scale-105 shadow-xl' :
              idx < currentIndex ? 'bg-green-900/30 border border-green-700' :
              'bg-gray-800 opacity-50'
            }`}>
              <div className="flex items-center justify-between">
                <p className="text-white text-xl font-semibold">{item}</p>
                {idx < currentIndex && <CheckCircle2 className="text-green-400 w-6 h-6" />}
                {idx === currentIndex && <Circle className="text-white w-6 h-6 animate-pulse" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionExercise({ step, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-purple-400 mb-4">{step.subtitle}</p>
        <p className="text-gray-400 mb-8">{step.instructions}</p>
        <button onClick={() => setStarted(true)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Begin
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-purple-400 text-sm mb-6">Question {currentQ + 1} of {step.questions.length}</p>
      <h2 className="text-3xl font-bold text-white mb-8">{step.questions[currentQ]}</h2>
      <p className="text-gray-400 text-sm mb-8">Think about your honest answer</p>
      <button
        onClick={() => currentQ < step.questions.length - 1 ? setCurrentQ(currentQ + 1) : onComplete()}
        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition inline-flex items-center gap-2"
      >
        {currentQ < step.questions.length - 1 ? 'Next' : 'Complete'}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function InputExercise({ step, onComplete }) {
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-purple-400 mb-4">{step.subtitle}</p>
        <p className="text-gray-400 mb-8">{step.instructions}</p>
        <button onClick={() => setStarted(true)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-6">{step.prompt}</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer..."
        className="w-full p-4 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none mb-4 min-h-32"
      />
      <button
        onClick={() => input.trim() && onComplete({ userInput: input })}
        disabled={!input.trim()}
        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white rounded-xl font-semibold text-lg transition"
      >
        Continue
      </button>
    </div>
  );
}

function CognitiveShuffleExercise({ step, onComplete }) {
  const [started, setStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!started || wordIndex >= step.words.length) {
      if (started && wordIndex >= step.words.length) onComplete();
      return;
    }
    setCurrentWord(step.words[wordIndex]);
    const timer = setTimeout(() => setWordIndex(wordIndex + 1), 6000);
    return () => clearTimeout(timer);
  }, [started, wordIndex, step.words, onComplete]);

  if (!started) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-purple-400 mb-4">{step.subtitle}</p>
        <p className="text-gray-400 mb-8">{step.instructions}</p>
        <button onClick={() => setStarted(true)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-purple-400 text-sm mb-8">Visualize each word</p>
      <div className="w-full max-w-md mx-auto h-64 flex items-center justify-center bg-gray-800/50 rounded-2xl">
        <h2 className="text-6xl font-bold text-white animate-pulse">{currentWord}</h2>
      </div>
      <p className="text-gray-400 text-sm mt-6">Word {wordIndex + 1} of {step.words.length}</p>
    </div>
  );
}

function ParadoxExercise({ step, onComplete }) {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(step.duration);

  useEffect(() => {
    if (!started || timeLeft <= 0) {
      if (started && timeLeft <= 0) onComplete();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft, onComplete]);

  if (!started) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-purple-400 mb-4">{step.subtitle}</p>
        <p className="text-gray-400 mb-8">{step.instructions}</p>
        <button onClick={() => setStarted(true)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Begin
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">{step.prompt}</h2>
      <div className="text-8xl font-bold text-purple-400 mb-4">{timeLeft}</div>
      <p className="text-gray-400">seconds</p>
    </div>
  );
}

function PhysicalExercise({ step, onComplete }) {
  const [currentAction, setCurrentAction] = useState(0);
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-purple-400 mb-4">{step.subtitle}</p>
        <p className="text-gray-400 mb-8">{step.instructions}</p>
        <button onClick={() => setStarted(true)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-purple-400 text-sm mb-6">Movement {currentAction + 1} of {step.actions.length}</p>
      <div className="bg-gray-800 p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">{step.actions[currentAction]}</h2>
        <p className="text-gray-400 text-sm">Do this now</p>
      </div>
      <button
        onClick={() => currentAction < step.actions.length - 1 ? setCurrentAction(currentAction + 1) : onComplete()}
        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition"
      >
        {currentAction < step.actions.length - 1 ? 'Next' : 'Complete'}
      </button>
    </div>
  );
}

function TimedExercise({ step, onComplete }) {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(step.duration);

  useEffect(() => {
    if (!started || timeLeft <= 0) {
      if (started && timeLeft <= 0) onComplete();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft, onComplete]);

  if (!started) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-purple-400 mb-4">{step.subtitle}</p>
        <p className="text-gray-400 mb-8">{step.instructions}</p>
        <button onClick={() => setStarted(true)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Begin
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-8">{step.prompt}</h2>
      <div className="text-8xl font-bold text-blue-400 mb-4">{timeLeft}</div>
      <p className="text-gray-400">Focus...</p>
    </div>
  );
}

function AffirmationExercise({ step, onComplete }) {
  const [currentAff, setCurrentAff] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (currentAff >= step.affirmations.length) {
      setTimeout(onComplete, 1000);
      return;
    }
    const timer = setTimeout(() => setCurrentAff(currentAff + 1), 5000);
    return () => clearTimeout(timer);
  }, [started, currentAff, step.affirmations.length, onComplete]);

  if (!started) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-purple-400 mb-4">{step.subtitle}</p>
        <p className="text-gray-400 mb-8">{step.instructions}</p>
        <button onClick={() => setStarted(true)} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition">
          Begin
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="min-h-64 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white px-8 animate-pulse">
          {step.affirmations[currentAff] || ''}
        </h2>
      </div>
      <p className="text-gray-400 text-sm mt-6">
        {Math.min(currentAff + 1, step.affirmations.length)} of {step.affirmations.length}
      </p>
    </div>
  );
}

function CrisisSupport({ onBack, emotion }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-red-900/30 border-2 border-red-600 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <h2 className="text-2xl font-bold text-white">We're Concerned About You</h2>
          </div>
          <p className="text-gray-300 mb-4">
            We've noticed you've been struggling frequently. MindShift is designed for immediate relief, but professional support can provide deeper, lasting help.
          </p>
          <p className="text-gray-400 text-sm">
            You deserve comprehensive care from a licensed professional who can work with you over time.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2">🌟 BetterHelp</h3>
            <p className="text-gray-400 text-sm mb-3">
              Professional online therapy from $65/week. Match with a therapist in 48 hours.
            </p>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition">
              Learn More →
            </button>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-2">☎️ Crisis Hotlines</h3>
            <p className="text-gray-400 text-sm mb-2">
              <strong>988 Suicide & Crisis Lifeline:</strong> 988 (call or text)
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Crisis Text Line:</strong> Text "HELLO" to 741741
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function PremiumUpsell({ onUpgrade, onBack, userData }) {
  const sessionsLeft = userData ? 3 - (userData.usageToday || 0) : 3;
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-2">Upgrade to MindShift Pro</h2>
          <p className="text-gray-400">Unlimited relief, advanced features, better outcomes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700">
            <h3 className="text-white font-semibold mb-4">Free Tier</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✓ 3 sessions per day</li>
              <li>✓ Basic protocols</li>
              <li>✗ Advanced protocols locked</li>
              <li>✗ No voice guidance</li>
              <li>✗ No progress tracking</li>
              <li>✗ No personalization</li>
            </ul>
            <p className="text-gray-500 text-xs mt-4">{sessionsLeft} remaining today</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl border-2 border-purple-400 relative">
            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
              RECOMMENDED
            </div>
            <h3 className="text-white font-semibold mb-4">Pro • $9.99/month</h3>
            <ul className="space-y-2 text-sm text-white">
              <li>✓ Unlimited sessions</li>
              <li>✓ All 5 protocols</li>
              <li>✓ Voice guidance</li>
              <li>✓ Progress tracking</li>
              <li>✓ Predictive insights</li>
              <li>✓ Scheduled interventions</li>
              <li>✓ 30% better outcomes</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={onBack} className="flex-1 py-4 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition">
            Maybe Later
          </button>
          <button onClick={onUpgrade} className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-xl font-semibold transition shadow-lg">
            Upgrade Now • $9.99/mo
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs mt-4">
          7-day money-back guarantee • Cancel anytime
        </p>
      </div>
    </div>
  );
}

function StatsView({ userData, onBack, isPremium, onUpgrade }) {
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Progress Tracking</h2>
          <p className="text-gray-400 mb-6">Upgrade to Pro to see detailed stats and insights</p>
          <div className="flex gap-3">
            <button onClick={onBack} className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition">
              Back
            </button>
            <button onClick={onUpgrade} className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    );
  }

  const effectiveness = calculateEffectiveness(userData);
  const streak = calculateStreak(userData);
  const mostUsed = getMostUsedEmotion(userData);
  const bestTime = getBestTimeOfDay(userData);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Your Progress</h2>
          <button onClick={onBack} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition">
            Back
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Total Sessions</p>
            <p className="text-4xl font-bold text-white">{userData.totalSessions || 0}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Effectiveness</p>
            <p className="text-4xl font-bold text-green-400">{Math.round(effectiveness * 100)}%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <p className="text-gray-400 text-sm mb-1">Current Streak</p>
            <p className="text-4xl font-bold text-purple-400">{streak}</p>
            <p className="text-gray-500 text-xs">days</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h3 className="text-white font-semibold mb-4">Insights</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white">Most Used: <strong>{mostUsed}</strong></p>
                <p className="text-gray-400 text-xs">Focus on building coping skills for this emotion</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white">Best Time: <strong>{bestTime}</strong></p>
                <p className="text-gray-400 text-xs">You respond best during this time</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h3 className="text-white font-semibold mb-4">Achievements ({userData.achievements?.length || 0}/{ACHIEVEMENTS.length})</h3>
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map(achievement => {
              const earned = userData.achievements?.includes(achievement.id);
              return (
                <div key={achievement.id} className={`p-3 rounded-lg ${earned ? 'bg-purple-900/50 border border-purple-600' : 'bg-gray-900/50 border border-gray-700 opacity-50'}`}>
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <p className="text-white text-xs font-medium">{achievement.title}</p>
                  <p className="text-gray-400 text-xs">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-white font-semibold mb-4">Recent Sessions</h3>
          <div className="space-y-2">
            {(userData.sessionHistory || []).slice(-5).reverse().map((session, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{EMOTIONS.find(e => e.id === session.emotion)?.emoji}</span>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {EMOTIONS.find(e => e.id === session.emotion)?.label}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  session.feeling === 'better' ? 'bg-green-900/50 text-green-400' :
                  session.feeling === 'somewhat' ? 'bg-blue-900/50 text-blue-400' :
                  session.feeling === 'same' ? 'bg-yellow-900/50 text-yellow-400' :
                  'bg-red-900/50 text-red-400'
                }`}>
                  {session.feeling}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateEffectiveness(userData) {
  const sessions = userData?.sessionHistory || [];
  if (sessions.length === 0) return 0;
  const positive = sessions.filter(s => s.feeling === 'better' || s.feeling === 'somewhat').length;
  return positive / sessions.length;
}

function calculateStreak(userData) {
  const sessions = userData?.sessionHistory || [];
  if (sessions.length === 0) return 0;
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  const sessionDates = [...new Set(sessions.map(s => {
    const d = new Date(s.timestamp);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }))].sort((a, b) => b - a);
  
  for (const dateTime of sessionDates) {
    if (dateTime === currentDate.getTime() || dateTime === currentDate.getTime() - 86400000) {
      streak++;
      currentDate = new Date(dateTime - 86400000);
    } else {
      break;
    }
  }
  
  return streak;
}

function getMostUsedEmotion(userData) {
  const sessions = userData?.sessionHistory || [];
  if (sessions.length === 0) return 'N/A';
  
  const counts = {};
  sessions.forEach(s => {
    counts[s.emotion] = (counts[s.emotion] || 0) + 1;
  });
  
  const mostUsed = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return EMOTIONS.find(e => e.id === mostUsed[0])?.label || 'N/A';
}

function getBestTimeOfDay(userData) {
  const sessions = userData?.sessionHistory || [];
  const effectiveSessions = sessions.filter(s => s.feeling === 'better');
  
  if (effectiveSessions.length === 0) return 'N/A';
  
  const avgHour = effectiveSessions.reduce((sum, s) => sum + s.hourOfDay, 0) / effectiveSessions.length;
  
  if (avgHour >= 5 && avgHour < 12) return 'Morning';
  if (avgHour >= 12 && avgHour < 17) return 'Afternoon';
  if (avgHour >= 17 && avgHour < 22) return 'Evening';
  return 'Night';
}

function getPredictiveInsight(userData) {
  const sessions = userData?.sessionHistory || [];
  if (sessions.length < 5) return null;
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay();
  
  const recentSessions = sessions.slice(-20);
  const sameTimeSlot = recentSessions.filter(s => {
    const hourDiff = Math.abs(s.hourOfDay - currentHour);
    return hourDiff <= 1;
  });
  
  if (sameTimeSlot.length >= 3) {
    const mostCommonEmotion = {};
    sameTimeSlot.forEach(s => {
      mostCommonEmotion[s.emotion] = (mostCommonEmotion[s.emotion] || 0) + 1;
    });
    const topEmotion = Object.entries(mostCommonEmotion).sort((a, b) => b[1] - a[1])[0];
    const emotionLabel = EMOTIONS.find(e => e.id === topEmotion[0])?.label;
    
    return `You often feel ${emotionLabel.toLowerCase()} around this time. Consider a proactive session.`;
  }
  
  return null;
}