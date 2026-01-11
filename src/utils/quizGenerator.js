// AI Quiz Generator - Generates quizzes based on level (increasing difficulty)

export const generateIQQuiz = (level) => {
  const quizzes = {
    1: [
      {
        type: 'pattern',
        question: 'What comes next? 🔴 🔵 🔴 🔵 🔴 ?',
        options: ['🔴', '🔵', '🟢', '🟡'],
        correct: 1,
        explanation: 'The pattern alternates between red and blue!'
      },
      {
        type: 'counting',
        question: 'Count the apples: 🍎🍎🍎',
        options: ['2', '3', '4', '5'],
        correct: 1,
        explanation: 'There are 3 apples! Great counting!'
      },
      {
        type: 'shape',
        question: 'Which shape has 3 sides?',
        options: ['🔺', '🟦', '🔵', '🟡'],
        correct: 0,
        explanation: 'A triangle (🔺) has 3 sides!'
      },
      {
        type: 'sequence',
        question: 'What comes next? 1, 2, 3, ?',
        options: ['3', '4', '5', '6'],
        correct: 1,
        explanation: 'The numbers are counting up: 1, 2, 3, 4!'
      },
      {
        type: 'counting',
        question: 'How many stars? ⭐⭐⭐⭐',
        options: ['3', '4', '5', '6'],
        correct: 1,
        explanation: 'There are 4 stars!'
      }
    ],
    2: [
      {
        type: 'pattern',
        question: 'Complete the pattern: 🔴 🔵 🟢 🔴 🔵 ?',
        options: ['🔴', '🟢', '🔵', '🟡'],
        correct: 1,
        explanation: 'The pattern repeats: red, blue, green!'
      },
      {
        type: 'logic',
        question: 'If 1 dog has 4 legs, how many legs do 2 dogs have?',
        options: ['6', '8', '10', '12'],
        correct: 1,
        explanation: '2 dogs × 4 legs = 8 legs!'
      },
      {
        type: 'counting',
        question: 'How many total? 🍎🍎 🍊🍊🍊',
        options: ['4', '5', '6', '7'],
        correct: 1,
        explanation: '2 apples + 3 oranges = 5 fruits!'
      },
      {
        type: 'sequence',
        question: 'Complete: 2, 4, 6, ?',
        options: ['7', '8', '9', '10'],
        correct: 1,
        explanation: 'Counting by 2s: 2, 4, 6, 8!'
      },
      {
        type: 'shape',
        question: 'Which shape has 4 equal sides?',
        options: ['🔺', '🟦', '🔵', '⬛'],
        correct: 1,
        explanation: 'A square (🟦) has 4 equal sides!'
      }
    ],
    3: [
      {
        type: 'pattern',
        question: 'What\'s missing? 🔴 🔴 🔵 🔴 🔴 ?',
        options: ['🔴', '🔵', '🟢', '🟡'],
        correct: 1,
        explanation: 'Pattern: 2 red, 1 blue, 2 red, 1 blue!'
      },
      {
        type: 'logic',
        question: '3 cats have how many ears total?',
        options: ['4', '6', '8', '10'],
        correct: 1,
        explanation: 'Each cat has 2 ears: 3 × 2 = 6 ears!'
      },
      {
        type: 'math',
        question: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        correct: 2,
        explanation: '5 + 3 = 8!'
      },
      {
        type: 'sequence',
        question: 'Complete: 10, 20, 30, ?',
        options: ['35', '40', '45', '50'],
        correct: 1,
        explanation: 'Counting by 10s: 10, 20, 30, 40!'
      },
      {
        type: 'comparison',
        question: 'Which is bigger? 7 or 3',
        options: ['3', '7', 'Same', 'Cannot tell'],
        correct: 1,
        explanation: '7 is bigger than 3!'
      }
    ],
    4: [
      {
        type: 'pattern',
        question: 'Find the pattern: 🔴🔵 🟢🔴 🔵🟢 🔴?',
        options: ['🔵', '🟢', '🔴', '🟡'],
        correct: 0,
        explanation: 'Pattern: red-blue, green-red, blue-green, red-blue!'
      },
      {
        type: 'logic',
        question: 'If today is Monday, what day is 2 days later?',
        options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        correct: 1,
        explanation: 'Monday + 2 days = Wednesday!'
      },
      {
        type: 'math',
        question: 'What is 12 - 5?',
        options: ['5', '6', '7', '8'],
        correct: 2,
        explanation: '12 - 5 = 7!'
      },
      {
        type: 'sequence',
        question: 'Complete: 5, 10, 15, ?',
        options: ['18', '20', '22', '25'],
        correct: 1,
        explanation: 'Counting by 5s: 5, 10, 15, 20!'
      },
      {
        type: 'comparison',
        question: 'Which number is smallest? 9, 4, 7, 2',
        options: ['9', '4', '7', '2'],
        correct: 3,
        explanation: '2 is the smallest number!'
      }
    ],
    5: [
      {
        type: 'pattern',
        question: 'Complex pattern: 🔴🔵🔴 🟢🟡🟢 🔴🔵?',
        options: ['🔴', '🔵', '🟢', '🟡'],
        correct: 0,
        explanation: 'Pattern repeats every 3: red-blue-red!'
      },
      {
        type: 'logic',
        question: '4 birds have how many wings total?',
        options: ['6', '8', '10', '12'],
        correct: 1,
        explanation: 'Each bird has 2 wings: 4 × 2 = 8 wings!'
      },
      {
        type: 'math',
        question: 'What is 6 × 2?',
        options: ['10', '12', '14', '16'],
        correct: 1,
        explanation: '6 × 2 = 12!'
      },
      {
        type: 'sequence',
        question: 'Complete: 1, 4, 7, 10, ?',
        options: ['12', '13', '14', '15'],
        correct: 1,
        explanation: 'Adding 3 each time: +3, +3, +3, so 10+3=13!'
      },
      {
        type: 'problem-solving',
        question: 'You have 8 candies and give away 3. How many left?',
        options: ['4', '5', '6', '7'],
        correct: 1,
        explanation: '8 - 3 = 5 candies left!'
      }
    ]
  };

  // For levels beyond 5, generate dynamically with increasing difficulty
  if (level > 5) {
    return generateAdvancedIQQuiz(level);
  }

  return quizzes[level] || quizzes[5];
};

const generateAdvancedIQQuiz = (level) => {
  const questions = [];
  const basePatterns = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];
  const complexity = Math.min(level - 5, 5); // Max complexity boost

  for (let i = 0; i < 5; i++) {
    const qType = ['pattern', 'math', 'logic', 'sequence', 'problem-solving'][i % 5];
    
    if (qType === 'pattern') {
      const patternLength = 3 + complexity;
      let pattern = '';
      for (let j = 0; j < patternLength; j++) {
        pattern += basePatterns[j % basePatterns.length] + ' ';
      }
      questions.push({
        type: 'pattern',
        question: `Find the pattern: ${pattern.trim()}?`,
        options: basePatterns.slice(0, 4),
        correct: patternLength % 4,
        explanation: 'Look for the repeating pattern!'
      });
    } else if (qType === 'math') {
      const num1 = 5 + complexity * 2;
      const num2 = 3 + complexity;
      questions.push({
        type: 'math',
        question: `What is ${num1} + ${num2}?`,
        options: [
          (num1 + num2 - 2).toString(),
          (num1 + num2 - 1).toString(),
          (num1 + num2).toString(),
          (num1 + num2 + 1).toString()
        ],
        correct: 2,
        explanation: `${num1} + ${num2} = ${num1 + num2}!`
      });
    } else if (qType === 'logic') {
      const items = 3 + complexity;
      questions.push({
        type: 'logic',
        question: `If ${items} cats each have 2 eyes, how many eyes total?`,
        options: [
          (items * 2 - 2).toString(),
          (items * 2).toString(),
          (items * 2 + 2).toString(),
          (items * 3).toString()
        ],
        correct: 1,
        explanation: `${items} cats × 2 eyes = ${items * 2} eyes!`
      });
    } else if (qType === 'sequence') {
      const start = 5 + complexity;
      const step = 2 + complexity;
      questions.push({
        type: 'sequence',
        question: `Complete: ${start}, ${start + step}, ${start + step * 2}, ?`,
        options: [
          (start + step * 3 - 1).toString(),
          (start + step * 3).toString(),
          (start + step * 3 + 1).toString(),
          (start + step * 4).toString()
        ],
        correct: 1,
        explanation: `Adding ${step} each time: ${start + step * 3}!`
      });
    } else {
      const num1 = 10 + complexity * 2;
      const num2 = 4 + complexity;
      questions.push({
        type: 'problem-solving',
        question: `You have ${num1} toys and give ${num2} away. How many left?`,
        options: [
          (num1 - num2 - 1).toString(),
          (num1 - num2).toString(),
          (num1 - num2 + 1).toString(),
          (num2).toString()
        ],
        correct: 1,
        explanation: `${num1} - ${num2} = ${num1 - num2} toys left!`
      });
    }
  }
  return questions;
};

export const generateEQQuiz = (level) => {
  const quizzes = {
    1: [
      {
        type: 'emotions',
        question: 'How does this person feel? 😢',
        options: ['Happy', 'Sad', 'Angry', 'Excited'],
        correct: 1,
        explanation: 'This person looks sad. It\'s okay to feel sad sometimes!'
      },
      {
        type: 'feelings',
        question: 'Which emoji shows happiness?',
        options: ['😢', '😡', '😊', '😴'],
        correct: 2,
        explanation: '😊 shows a happy face with a big smile!'
      },
      {
        type: 'emotions',
        question: 'How does this person feel? 😡',
        options: ['Happy', 'Sad', 'Angry', 'Tired'],
        correct: 2,
        explanation: 'This person looks angry. Taking deep breaths can help!'
      }
    ],
    2: [
      {
        type: 'empathy',
        question: 'Your friend lost their toy. What should you do?',
        options: ['Laugh at them', 'Help them look', 'Ignore them', 'Take their toy'],
        correct: 1,
        explanation: 'Being a good friend means helping when someone is upset!'
      },
      {
        type: 'social',
        question: 'You want to play. What should you say?',
        options: ['Give me your toy!', 'Can we play together?', 'Go away!', 'Nothing'],
        correct: 1,
        explanation: 'Asking politely is the best way to make friends!'
      },
      {
        type: 'self-awareness',
        question: 'You feel angry. What helps?',
        options: ['Yell at someone', 'Take deep breaths', 'Break something', 'Be mean'],
        correct: 1,
        explanation: 'Taking deep breaths helps us calm down!'
      }
    ],
    3: [
      {
        type: 'empathy',
        question: 'Your friend is crying. What do you do?',
        options: ['Laugh', 'Give them a hug', 'Walk away', 'Tell them to stop'],
        correct: 1,
        explanation: 'A hug shows you care about your friend!'
      },
      {
        type: 'social',
        question: 'Someone says "thank you". What do you say?',
        options: ['Nothing', 'You\'re welcome', 'Go away', 'Stop talking'],
        correct: 1,
        explanation: 'Say "you\'re welcome" when someone thanks you!'
      },
      {
        type: 'emotions',
        question: 'You feel worried. What can help?',
        options: ['Think of happy things', 'Worry more', 'Ignore it', 'Get angry'],
        correct: 0,
        explanation: 'Thinking of happy things can help when we feel worried!'
      }
    ],
    4: [
      {
        type: 'empathy',
        question: 'You see someone being mean to your friend. What should you do?',
        options: ['Join in', 'Tell a teacher', 'Do nothing', 'Be mean back'],
        correct: 1,
        explanation: 'Tell a trusted adult when someone is being mean!'
      },
      {
        type: 'self-awareness',
        question: 'You made a mistake. What should you do?',
        options: ['Hide it', 'Say sorry and try again', 'Blame others', 'Get angry'],
        correct: 1,
        explanation: 'Everyone makes mistakes. Saying sorry shows you care!'
      },
      {
        type: 'social',
        question: 'You want something someone has. What should you do?',
        options: ['Take it', 'Ask politely', 'Demand it', 'Get angry'],
        correct: 1,
        explanation: 'Always ask politely and respect others\' things!'
      }
    ],
    5: [
      {
        type: 'empathy',
        question: 'Your friend is sad because they didn\'t win. What do you say?',
        options: ['You\'re bad', 'Maybe next time! Keep trying!', 'Stop crying', 'I don\'t care'],
        correct: 1,
        explanation: 'Encourage your friends and be supportive!'
      },
      {
        type: 'self-awareness',
        question: 'You\'re feeling overwhelmed. What helps most?',
        options: ['Keep going', 'Take a break and breathe', 'Get frustrated', 'Give up'],
        correct: 1,
        explanation: 'Taking breaks helps us feel better when overwhelmed!'
      },
      {
        type: 'social',
        question: 'You disagree with a friend. How should you handle it?',
        options: ['Fight', 'Talk calmly', 'Stop being friends', 'Ignore them'],
        correct: 1,
        explanation: 'Friends can disagree. Talking calmly helps solve problems!'
      }
    ]
  };

  // For levels beyond 5, reuse level 5 with slight variations
  return quizzes[Math.min(level, 5)] || quizzes[5];
};



