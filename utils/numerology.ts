export function calculateLifePathNumber(birthDate: Date): number {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1; // getMonth() returns 0-11
  const year = birthDate.getFullYear();

  // Convert to strings and sum all digits
  const daySum = sumDigits(day);
  const monthSum = sumDigits(month);
  const yearSum = sumDigits(year);

  // Sum all components
  const total = daySum + monthSum + yearSum;

  // Reduce to single digit (except for master numbers 11, 22, 33)
  return reduceToSingleDigit(total);
}

function sumDigits(num: number): number {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

function reduceToSingleDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = sumDigits(num);
  }
  return num;
}

export function getNumerologyData(lifePathNumber: number) {
  const numerologyMap: { [key: number]: any } = {
    1: {
      name: "The Leader",
      characteristics: "You are a natural-born leader with strong independence and pioneering spirit. You have the drive to initiate new projects and the courage to venture into uncharted territories. Your confidence and determination inspire others to follow your vision.",
      strengths: [
        "Natural leadership abilities",
        "Strong independence and self-reliance",
        "Innovative and original thinking",
        "Ambitious and goal-oriented",
        "Courageous and pioneering spirit"
      ],
      careerSuggestions: "You excel in leadership roles such as CEO, entrepreneur, manager, director, or any position where you can pioneer new ideas and lead teams. Consider careers in business, politics, military, or starting your own company.",
      lifePurpose: "Your purpose is to lead by example, break new ground, and inspire others to achieve their potential. You're here to initiate change and create new pathways for others to follow."
    },
    2: {
      name: "The Peacemaker",
      characteristics: "You are naturally diplomatic, cooperative, and sensitive to others' needs. You excel at bringing people together and creating harmony in relationships. Your intuitive nature helps you understand others deeply.",
      strengths: [
        "Excellent diplomatic and mediation skills",
        "Strong empathy and sensitivity",
        "Natural team player and collaborator",
        "Intuitive and psychic abilities",
        "Patient and supportive nature"
      ],
      careerSuggestions: "You thrive in careers that involve helping others and creating harmony, such as counseling, social work, human resources, diplomacy, teaching, healthcare, or any collaborative team environment.",
      lifePurpose: "Your purpose is to bring peace, cooperation, and understanding to the world. You're here to heal relationships, mediate conflicts, and create harmonious connections between people."
    },
    3: {
      name: "The Creative Communicator",
      characteristics: "You are naturally creative, expressive, and charismatic. You have a gift for communication and can inspire others through your words and artistic abilities. Your optimistic nature brightens any room you enter.",
      strengths: [
        "Exceptional creativity and artistic talent",
        "Excellent communication and social skills",
        "Natural charisma and charm",
        "Optimistic and joyful nature",
        "Inspiring and motivating presence"
      ],
      careerSuggestions: "You excel in creative fields such as writing, acting, music, art, design, public speaking, marketing, entertainment, or any career that allows you to express your creativity and communicate with others.",
      lifePurpose: "Your purpose is to inspire joy, creativity, and self-expression in others. You're here to share your talents and help people find their voice and creative potential."
    },
    4: {
      name: "The Builder",
      characteristics: "You are practical, reliable, and hardworking with a strong sense of order and discipline. You excel at creating solid foundations and turning ideas into reality through systematic effort and dedication.",
      strengths: [
        "Strong work ethic and reliability",
        "Excellent organizational and planning skills",
        "Practical and methodical approach",
        "Loyal and dependable nature",
        "Attention to detail and precision"
      ],
      careerSuggestions: "You thrive in structured environments such as engineering, architecture, accounting, project management, construction, banking, administration, or any career requiring systematic planning and execution.",
      lifePurpose: "Your purpose is to build lasting structures and create stability in the world. You're here to transform ideas into tangible reality and provide reliable foundations for others to build upon."
    },
    5: {
      name: "The Freedom Seeker",
      characteristics: "You are adventurous, curious, and crave freedom and variety in life. You have a natural ability to adapt to change and thrive on new experiences. Your progressive thinking challenges conventional wisdom.",
      strengths: [
        "Highly adaptable and versatile",
        "Natural curiosity and love of learning",
        "Excellent communication skills",
        "Progressive and innovative thinking",
        "Adventurous and fearless spirit"
      ],
      careerSuggestions: "You excel in dynamic, varied careers such as travel, journalism, sales, marketing, teaching, photography, entertainment, technology, or any field that offers variety, travel, and constant learning opportunities.",
      lifePurpose: "Your purpose is to explore the world and share your discoveries with others. You're here to break down barriers, promote freedom, and help others expand their horizons."
    },
    6: {
      name: "The Nurturer",
      characteristics: "You are naturally caring, responsible, and have a strong desire to help and heal others. You excel at creating harmony in family and community settings, often taking on the role of caregiver and protector.",
      strengths: [
        "Deep compassion and nurturing nature",
        "Strong sense of responsibility",
        "Natural healing and counseling abilities",
        "Excellent parenting and mentoring skills",
        "Creating harmony and beauty in surroundings"
      ],
      careerSuggestions: "You thrive in caring professions such as healthcare, counseling, social work, teaching, childcare, veterinary work, hospitality, interior design, or any career focused on helping and healing others.",
      lifePurpose: "Your purpose is to nurture, heal, and create harmony in the world. You're here to care for others, strengthen families and communities, and spread love and compassion."
    },
    7: {
      name: "The Seeker",
      characteristics: "You are naturally introspective, analytical, and drawn to spiritual and philosophical pursuits. You have a deep need to understand life's mysteries and often possess intuitive or psychic abilities.",
      strengths: [
        "Deep analytical and research abilities",
        "Strong intuition and spiritual awareness",
        "Natural wisdom and philosophical thinking",
        "Independent and self-sufficient nature",
        "Ability to see beyond surface appearances"
      ],
      careerSuggestions: "You excel in fields requiring research, analysis, and spiritual insight such as research, psychology, spirituality, teaching, writing, technology, science, or any career involving deep investigation and understanding.",
      lifePurpose: "Your purpose is to seek truth, share wisdom, and help others understand life's deeper meanings. You're here to bridge the gap between the material and spiritual worlds."
    },
    8: {
      name: "The Achiever",
      characteristics: "You are naturally ambitious, business-minded, and have a strong drive for success and material achievement. You possess excellent organizational skills and the ability to manage people and resources effectively.",
      strengths: [
        "Exceptional business and leadership skills",
        "Strong drive for success and achievement",
        "Excellent organizational and management abilities",
        "Natural understanding of money and resources",
        "Ability to see the big picture and long-term goals"
      ],
      careerSuggestions: "You excel in business, finance, real estate, law, politics, corporate leadership, entrepreneurship, or any career involving management, financial planning, and large-scale operations.",
      lifePurpose: "Your purpose is to achieve material success and use your resources to make a positive impact on the world. You're here to show others how to achieve prosperity through ethical means."
    },
    9: {
      name: "The Humanitarian",
      characteristics: "You are naturally compassionate, generous, and have a strong desire to serve humanity. You possess a universal perspective and are drawn to causes that benefit the greater good of all people.",
      strengths: [
        "Deep compassion for all humanity",
        "Natural wisdom and understanding",
        "Generous and giving nature",
        "Universal perspective and tolerance",
        "Inspiring and uplifting presence"
      ],
      careerSuggestions: "You thrive in humanitarian fields such as social work, non-profit organizations, international aid, teaching, psychology, arts, writing, or any career focused on serving the greater good of humanity.",
      lifePurpose: "Your purpose is to serve humanity and make the world a better place for all. You're here to inspire others to think globally and act with compassion and generosity."
    },
    11: {
      name: "The Intuitive Illuminator",
      characteristics: "You are a highly intuitive and spiritually aware individual with the ability to inspire and illuminate others. You possess natural psychic abilities and serve as a bridge between the material and spiritual worlds.",
      strengths: [
        "Highly developed intuition and psychic abilities",
        "Natural inspirational and teaching abilities",
        "Deep spiritual awareness and wisdom",
        "Ability to see the bigger picture",
        "Charismatic and influential presence"
      ],
      careerSuggestions: "You excel in spiritual, healing, and inspirational fields such as spiritual teaching, healing arts, psychology, counseling, writing, speaking, or any career where you can inspire and uplift others.",
      lifePurpose: "Your purpose is to serve as a spiritual teacher and guide, helping others awaken to their higher potential and spiritual truth."
    },
    22: {
      name: "The Master Builder",
      characteristics: "You are a visionary with the practical ability to turn grand ideas into reality. You possess the rare combination of high spiritual ideals and the organizational skills to manifest them on a large scale.",
      strengths: [
        "Exceptional ability to turn dreams into reality",
        "Visionary thinking combined with practical skills",
        "Natural leadership and organizational abilities",
        "Ability to inspire and motivate others",
        "Strong sense of purpose and mission"
      ],
      careerSuggestions: "You excel in large-scale projects and visionary endeavors such as architecture, engineering, politics, international business, humanitarian organizations, or any field where you can build something significant for humanity.",
      lifePurpose: "Your purpose is to build something lasting and meaningful that serves humanity on a grand scale. You're here to turn universal ideals into practical reality."
    },
    33: {
      name: "The Master Healer",
      characteristics: "You are a natural healer and teacher with an exceptional ability to love and nurture others. You possess the rare gift of unconditional love and the wisdom to guide others toward healing and spiritual growth.",
      strengths: [
        "Exceptional healing and nurturing abilities",
        "Unconditional love and compassion",
        "Natural teaching and mentoring skills",
        "Deep spiritual wisdom and understanding",
        "Ability to inspire profound transformation in others"
      ],
      careerSuggestions: "You excel in healing and teaching professions such as spiritual healing, counseling, teaching, healthcare, ministry, or any career focused on healing and uplifting humanity.",
      lifePurpose: "Your purpose is to serve as a master healer and teacher, helping others heal on all levels and discover their own capacity for love and service."
    }
  };

  return numerologyMap[lifePathNumber] || numerologyMap[1];
}

export function getCompatibilityData(lifePathNumber: number) {
  const compatibilityMap: { [key: number]: any } = {
    1: {
      romantic: {
        compatible: [3, 5, 6],
        description: "You're most compatible with creative 3s who inspire your leadership, adventurous 5s who support your independence, and nurturing 6s who provide emotional support for your ambitions."
      },
      friendship: {
        bestFriends: [2, 4, 8],
        description: "You form strong friendships with diplomatic 2s who balance your directness, reliable 4s who support your goals, and ambitious 8s who understand your drive for success."
      },
      business: {
        partners: [4, 8, 22],
        description: "Your best business partnerships are with methodical 4s who handle details, powerful 8s who share your ambition, and visionary 22s who can match your leadership scope."
      },
      tips: "Remember to listen to others and share leadership responsibilities. Your natural confidence is attractive, but balance it with humility and consideration for others' ideas."
    },
    2: {
      romantic: {
        compatible: [1, 6, 8],
        description: "You harmonize beautifully with confident 1s who appreciate your support, caring 6s who share your nurturing nature, and successful 8s who value your diplomatic skills."
      },
      friendship: {
        bestFriends: [3, 7, 9],
        description: "You connect deeply with expressive 3s who appreciate your sensitivity, introspective 7s who value your intuition, and humanitarian 9s who share your caring nature."
      },
      business: {
        partners: [1, 6, 11],
        description: "You excel in partnerships with decisive 1s who provide direction, responsible 6s who share your service orientation, and intuitive 11s who appreciate your sensitivity."
      },
      tips: "Trust your intuition and don't be afraid to speak up for your needs. Your diplomatic nature is valuable, but remember to maintain healthy boundaries in relationships."
    },
    3: {
      romantic: {
        compatible: [1, 5, 7],
        description: "You shine with confident 1s who appreciate your creativity, free-spirited 5s who match your enthusiasm, and deep 7s who are fascinated by your expressive nature."
      },
      friendship: {
        bestFriends: [2, 6, 9],
        description: "You thrive with supportive 2s who encourage your talents, nurturing 6s who provide stability, and wise 9s who appreciate your artistic gifts."
      },
      business: {
        partners: [5, 6, 8],
        description: "Your creative talents flourish with versatile 5s who bring variety, reliable 6s who handle practical matters, and ambitious 8s who can commercialize your creativity."
      },
      tips: "Channel your creativity into focused projects and avoid scattering your energy. Your natural charisma opens doors, so use it to build meaningful connections and opportunities."
    },
    4: {
      romantic: {
        compatible: [1, 2, 8],
        description: "You build strong relationships with ambitious 1s who respect your reliability, gentle 2s who appreciate your stability, and successful 8s who share your practical approach to life."
      },
      friendship: {
        bestFriends: [6, 7, 22],
        description: "You form lasting bonds with caring 6s who value your dependability, thoughtful 7s who respect your methodical nature, and visionary 22s who need your practical skills."
      },
      business: {
        partners: [1, 8, 22],
        description: "You're invaluable to ambitious 1s who need your organizational skills, powerful 8s who appreciate your work ethic, and master builders 22s who require your practical expertise."
      },
      tips: "Allow flexibility in your routines and be open to new experiences. Your reliability is your strength, but remember to balance work with play and spontaneity."
    },
    5: {
      romantic: {
        compatible: [1, 3, 7],
        description: "You find excitement with independent 1s who share your leadership spirit, creative 3s who match your enthusiasm, and mysterious 7s who intrigue your curious nature."
      },
      friendship: {
        bestFriends: [3, 8, 9],
        description: "You connect with expressive 3s who share your love of variety, ambitious 8s who appreciate your versatility, and worldly 9s who understand your need for freedom."
      },
      business: {
        partners: [3, 8, 11],
        description: "You excel with creative 3s who bring artistic vision, business-minded 8s who provide structure, and intuitive 11s who inspire your innovative thinking."
      },
      tips: "Focus your energy on meaningful pursuits and avoid constantly seeking new experiences without depth. Your adaptability is a gift - use it to help others embrace positive change."
    },
    6: {
      romantic: {
        compatible: [1, 2, 9],
        description: "You create loving relationships with confident 1s who appreciate your support, sensitive 2s who share your caring nature, and humanitarian 9s who understand your desire to help others."
      },
      friendship: {
        bestFriends: [3, 4, 8],
        description: "You nurture beautiful friendships with creative 3s who brighten your world, dependable 4s who appreciate your stability, and ambitious 8s who value your supportive nature."
      },
      business: {
        partners: [2, 4, 33],
        description: "You thrive with diplomatic 2s who share your service orientation, organized 4s who handle practical details, and healing 33s who match your desire to help humanity."
      },
      tips: "Remember to take care of your own needs while caring for others. Set healthy boundaries and don't sacrifice your well-being in the name of helping everyone else."
    },
    7: {
      romantic: {
        compatible: [3, 5, 4],
        description: "You find deep connection with expressive 3s who bring joy to your serious nature, adventurous 5s who respect your independence, and steady 4s who provide grounding for your spiritual pursuits."
      },
      friendship: {
        bestFriends: [2, 9, 11],
        description: "You form meaningful bonds with intuitive 2s who understand your sensitivity, wise 9s who share your spiritual interests, and enlightened 11s who match your mystical nature."
      },
      business: {
        partners: [4, 8, 22],
        description: "You complement practical 4s who handle details while you provide insight, successful 8s who value your analytical skills, and visionary 22s who appreciate your wisdom."
      },
      tips: "Share your wisdom with others and don't isolate yourself too much. Your insights are valuable - find ways to communicate your deep understanding in accessible ways."
    },
    8: {
      romantic: {
        compatible: [2, 4, 6],
        description: "You build strong partnerships with supportive 2s who balance your intensity, reliable 4s who share your work ethic, and nurturing 6s who provide emotional grounding for your ambitions."
      },
      friendship: {
        bestFriends: [1, 5, 9],
        description: "You connect with confident 1s who understand your leadership drive, versatile 5s who appreciate your business acumen, and humanitarian 9s who inspire your higher purpose."
      },
      business: {
        partners: [1, 4, 22],
        description: "You excel with ambitious 1s who share your leadership vision, methodical 4s who execute your plans, and master builders 22s who can match your large-scale thinking."
      },
      tips: "Remember that true success includes personal relationships and spiritual fulfillment. Use your material success to make a positive impact on others and the world."
    },
    9: {
      romantic: {
        compatible: [3, 6, 7],
        description: "You find fulfilling love with creative 3s who appreciate your wisdom, caring 6s who share your nurturing nature, and spiritual 7s who understand your humanitarian perspective."
      },
      friendship: {
        bestFriends: [2, 5, 11],
        description: "You form deep friendships with compassionate 2s who support your causes, freedom-loving 5s who share your global perspective, and inspired 11s who match your spiritual vision."
      },
      business: {
        partners: [6, 11, 33],
        description: "You thrive with service-oriented 6s who share your desire to help others, intuitive 11s who inspire your humanitarian efforts, and healing 33s who understand your mission to serve humanity."
      },
      tips: "Take care of your own needs while serving others, and remember that you can't save everyone. Focus your humanitarian efforts for maximum impact rather than trying to help everyone at once."
    },
    11: {
      romantic: {
        compatible: [2, 6, 22],
        description: "You find understanding with sensitive 2s who appreciate your intuitive nature, nurturing 6s who support your spiritual mission, and visionary 22s who can match your inspirational energy."
      },
      friendship: {
        bestFriends: [7, 9, 33],
        description: "You connect deeply with spiritual 7s who understand your mystical nature, humanitarian 9s who share your desire to serve, and healing 33s who match your spiritual mission."
      },
      business: {
        partners: [4, 8, 22],
        description: "You balance well with practical 4s who ground your visions, ambitious 8s who can manifest your ideas, and master builders 22s who share your ability to inspire others."
      },
      tips: "Ground your intuitive insights in practical action and don't let your sensitivity overwhelm you. Your inspiration is a gift - share it in ways that others can understand and apply."
    },
    22: {
      romantic: {
        compatible: [4, 6, 11],
        description: "You build meaningful relationships with dependable 4s who support your grand visions, nurturing 6s who provide emotional stability, and intuitive 11s who understand your spiritual mission."
      },
      friendship: {
        bestFriends: [1, 8, 33],
        description: "You connect with ambitious 1s who appreciate your leadership, successful 8s who understand your drive for achievement, and healing 33s who share your desire to serve humanity."
      },
      business: {
        partners: [1, 8, 11],
        description: "You excel with confident 1s who can lead alongside you, business-minded 8s who handle material aspects, and inspired 11s who provide spiritual insight for your projects."
      },
      tips: "Stay grounded while pursuing your grand visions. Your ability to turn dreams into reality is rare - use it responsibly to create lasting positive change for humanity."
    },
    33: {
      romantic: {
        compatible: [6, 9, 11],
        description: "You find deep love with caring 6s who share your nurturing nature, humanitarian 9s who understand your service mission, and spiritual 11s who appreciate your healing gifts."
      },
      friendship: {
        bestFriends: [2, 9, 22],
        description: "You form profound connections with sensitive 2s who support your healing work, wise 9s who share your humanitarian vision, and visionary 22s who can help manifest your healing mission."
      },
      business: {
        partners: [6, 9, 22],
        description: "You thrive with service-oriented 6s who share your caring nature, humanitarian 9s who understand your mission, and master builders 22s who can help you create healing institutions."
      },
      tips: "Maintain your own spiritual and emotional health while healing others. Your gift of unconditional love is powerful - use it wisely and remember that you must fill your own cup first."
    }
  };

  return compatibilityMap[lifePathNumber] || compatibilityMap[1];
}