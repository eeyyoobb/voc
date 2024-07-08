import axios from 'axios';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function attempts_Number(result){
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point){
    return result.map((element, i) => answers[i] === element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
}


export function flagResult(totalPoints, earnPoints){
    return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
}

/** check user auth  */
export function CheckUserExist({ children }){
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

/** get server data */
export async function getServerData(url, callback){
    try {
        const response = await axios.get("http://localhost:5000/api/quiz/questions");
        const data = response.data;
        return callback ? callback(data) : data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

/** post server data */
export async function postServerData(url, result, callback){
    try {
        const response = await axios.post(url, result);
        const data = response.data;
        return callback ? callback(data) : data;
    } catch (error) {
        console.error("Error posting data:", error);
        return null;
    }
}
