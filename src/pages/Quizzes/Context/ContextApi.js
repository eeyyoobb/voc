import { createContext, useContext, useEffect, useState } from 'react';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { fetchAllQuizzes } from '../../../hooks/fetchQuizze'; 
import { getUserProfile } from '../../../services/index/users'; 

const GlobalContext = createContext();

export function ContextProvider({ children }) {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selectQuizToStart, setSelectQuizToStart] = useState(null);
  const [user, setUser] = useState(null);
  const [openIconBox, setOpenIconBox] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState({ faIcon: faQuestion });
  
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [threeDotsPositions, setThreeDotsPositions] = useState({ x: 0, y: 0 });
  const [isLoading, setLoading] = useState(true);
  const [userXP, setUserXP] = useState(0)
 useEffect(() => {
    const AllQuizzes = async () => {
      try {
        setLoading(true);
        const quizzesData = await fetchAllQuizzes();
        setAllQuizzes(quizzesData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    AllQuizzes();
  }, []);

  useEffect(() => {
    const User = async () => {
      try {
        // Assuming token is stored in localStorage
        // const token = localStorage.getItem('token');
        // if (!token) throw new Error('No token found');
  
        const userData = await getUserProfile(/*{ token }*/);
        setUser(userData);
        console.log('User data fetched:', userData);
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
  
    User();
  }, []);
  

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      experience: userXP,
    }));
  }, [userXP]);

  useEffect(() => {
    if (selectedQuiz) {
      setSelectedIcon({ faIcon: selectedQuiz.icon });
    } else {
      setSelectedIcon({ faIcon: faQuestion });
    }
  }, [selectedQuiz]);

  return (
    <GlobalContext.Provider
      value={{
        allQuizzes,
        setAllQuizzes,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
        userObject: { user, setUser },
        openBoxToggle: { openIconBox, setOpenIconBox },
        selectedIconObject: { selectedIcon, setSelectedIcon },
        dropDownToggleObject: { dropDownToggle, setDropDownToggle },
        threeDotsPositionsObject: { threeDotsPositions, setThreeDotsPositions },
        selectedQuizObject: { selectedQuiz, setSelectedQuiz },
        userXpObject: { userXP, setUserXP },
        isLoadingObject: { isLoading, setLoading },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContextProvider() {
  return useContext(GlobalContext);
}
