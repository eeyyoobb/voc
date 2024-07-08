import toast from 'react-hot-toast';
import convertFromFaToText from '../pages/Quizzes/common/convertFromFaToText';

const API_URL = 'https://api.voicesofchrstian.com/api';

// Fetch all quizzes
export const fetchAllQuizzes = async () => {
  try {
    const response = await fetch(`${API_URL}/quizzes`, {
      cache: 'no-cache',
    });

    if (!response.ok) {
      toast.error('fetch all quiz went wrong...');
      throw new Error('Fetching failed...');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch or create user
export const fetchOrCreateUser = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the headers
      },
      body: JSON.stringify({
        name: 'quizUser',
        isLogged: false,
        experience: 0,
      }),
    });

    if (!response.ok) {
      // Handle error response
      throw new Error('Fetching failed...');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch user data
export const fetchUserData = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/user?id=${userId}`);
    if (!res.ok) {
      throw new Error('Fetching user data failed...');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update user
export const updateUser = async (userCopy) => {
  try {
    const res = await fetch(`${API_URL}/user?id=${userCopy._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ updateUser: userCopy }),
    });

    if (!res.ok) {
      throw new Error('Updating user failed...');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create quiz
export const createQuiz = async (newQuiz, allQuizzes, setAllQuizzes, navigate, setIsLoading, setNewQuiz) => {
  try {
    setIsLoading(true);
    const textIcon = convertFromFaToText(newQuiz.icon);
    const quizWithTextIcon = {
      ...newQuiz,
      icon: textIcon,
    };

    const res = await fetch(`${API_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizWithTextIcon),
    });

    if (!res.ok) {
      toast.error('Failed to create a new quiz!');
      setIsLoading(false);
      return;
    }

    const { id } = await res.json();
    if (!id) {
      toast.error('Failed to retrieve quiz ID!');
      setIsLoading(false);
      return;
    }

    const updatedQuiz = { ...newQuiz, _id: id, icon: textIcon };
    setAllQuizzes([...allQuizzes, updatedQuiz]);
    if (setNewQuiz) {
      setNewQuiz((prevQuiz) => ({
        ...prevQuiz,
        _id: id,
      }));
    }

    toast.success('The quiz has been created successfully!');
    navigate('/quiz');
  } catch (error) {
    console.error('Error creating quiz:', error);
    toast.error('An error occurred while creating the quiz!');
  } finally {
    setIsLoading(false);
  }
};

// Save quiz
export const saveQuiz = async (newQuiz, allQuizzes, setAllQuizzes, navigate, setIsLoading) => {
  if (newQuiz.quizTitle.trim().length === 0) {
    return toast.error('Please add a name for the quiz!');
  }

  const isValid = validateQuizQuestions(newQuiz.quizQuestions);
  if (!isValid.valid) {
    toast.error(isValid.message);
    return;
  }

  if (newQuiz._id) {
    const updatedQuizzes = [...allQuizzes];
    const quizIndex = updatedQuizzes.findIndex((quiz) => quiz._id === newQuiz._id);

    if (quizIndex !== -1) {
      const updatedQuiz = updatedQuizzes[quizIndex];
      const convertedIconText = convertFromFaToText(updatedQuiz.icon);

      try {
        const res = await fetch(`${API_URL}/quizzes/${newQuiz._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...updatedQuiz,
            icon: convertedIconText,
            quizQuestions: newQuiz.quizQuestions, // Update quiz questions
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to update quiz');
        }

        toast.success('The quiz has been saved successfully.');
        updatedQuizzes[quizIndex] = newQuiz; // Update the local state with the modified quiz
        setAllQuizzes(updatedQuizzes);
        navigate('/quiz');
      } catch (error) {
        console.error(error);
        toast.error('Failed to update quiz');
      }
    }
  } else {
    createQuiz(newQuiz, allQuizzes, setAllQuizzes, navigate, setIsLoading); // Adjusted to call createQuiz
  }
};

// Validate quiz questions
function validateQuizQuestions(quizQuestions) {
  for (let question of quizQuestions) {
    if (!question.mainQuestion.trim()) {
      return { valid: false, message: 'Please fill in the main question.' };
    }
    if (question.choices.some((choice) => !choice.trim().substring(2))) {
      return { valid: false, message: 'Please fill in all choices.' };
    }
    if (question.correctAnswer.length === 0) {
      return { valid: false, message: 'Please specify the correct answer.' };
    }
  }
  return { valid: true };
}

// Delete quiz
export const deleteQuiz = async (quizId, setAllQuizzes, setSelectedQuiz, setIsDialogOpened) => {
  try {
    const res = await fetch(`${API_URL}/quizzes/${quizId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Error while deleting the quiz');
    }

    setAllQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz._id !== quizId));
    toast.success('The Quiz has been deleted successfully.');
    setIsDialogOpened(false);
    setSelectedQuiz(null);
  } catch (error) {
    console.error(error);
    toast.error('Error while deleting the quiz');
  }
};

// Update quiz questions
export async function updateQuizQuestions(quizId, updatedQuestions) {
  try {
    const res = await fetch(`${API_URL}/quizzes?id=${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        updateQuizQuestions: updatedQuestions,
      }),
    });

    if (!res.ok) {
      throw new Error('Error updating quiz questions');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error('updateQuiz went wrong while updating quiz questions');
  }
}

// Save quiz data into the database
// Save quiz data into the database
export const saveDataIntoDB = async (id, allQuizzes, indexOfQuizSelected) => {
  try {
    if (!id || !allQuizzes || indexOfQuizSelected < 0 || indexOfQuizSelected >= allQuizzes.length) {
      throw new Error('Invalid input parameters');
    }

    const res = await fetch(`${API_URL}/quizzes?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updateQuizQuestions: allQuizzes[indexOfQuizSelected].quizQuestions.map(question => ({
          ...question,
          explanation: question.explanation // Include the explanation field
        })),
      }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to update quiz questions: ${errorMessage}`);
    }

    console.log('Quiz questions updated successfully:', allQuizzes[indexOfQuizSelected].quizQuestions);
  } catch (error) {
    console.error('Error updating quiz questions:', error);
    throw error;
  }
};


// Add experience to the user
export const addExperience = async (user, setUser) => {
  if (!user || !user._id || typeof user.experience !== 'number') {
    console.error('Invalid user object:', user);
    return;
  }

  const updatedUser = { ...user, experience: user.experience + 1 };

  try {
    const response = await fetch(`${API_URL}/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ experience: updatedUser.experience }),
    });

        if (!response.ok) {
      const errorMessage = await response.text();
      toast.error(`Failed to update experience: ${errorMessage}`);
      console.error('addExperience request failed:', response.statusText);
      return;
    }

    const responseBody = await response.json();
    if (!responseBody || responseBody.experience !== updatedUser.experience) {
      console.error('Experience update failed:', responseBody);
      return;
    }

    setUser(updatedUser);
    console.log('User experience updated successfully:', updatedUser);
  } catch (error) {
    toast.error('An error occurred while updating experience.');
    console.error('Error updating user experience:', error);
  }
};

// Fetch user
export const fetchUser = async () => {
  try {
    const response = await fetch('http://localhost:000/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'quizUser',
        isLogged: false,
        experience: 0,
      }),
    });

    if (!response.ok) {
      toast.error('user went wrong...');
      throw new Error('fetching failed...');
    }

    const userData = await response.json();
    console.log(userData);

    return userData;
  } catch (error) {
    console.log(error);
  }
};

