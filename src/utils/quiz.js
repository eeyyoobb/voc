// quizUtils.js

export function calculateEmojiIconScore(score, totalQuestions) {
    const result = (score / totalQuestions) * 100;
    if (result < 25) {
      return 'confused-emoji.png';
    } else if (result < 50) {
      return 'happy-emoji.png';
    } else {
      return 'very-happy-emoji.png';
    }
  }
  