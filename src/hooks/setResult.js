import { postServerData } from '../utils/helper'
import * as Action from '../store/reducers/result_reducer'
import { useEffect } from 'react';


export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result));
    } catch (error) {
        console.log(error);
    }
};

export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error);
    }
};

/** insert user data */
export const usePublishResult = (resultData) => {
    const { result, username, userId, attempts, points, achived } = resultData;

    useEffect(() => {
        (async () => {
            try {
                if (result.length === 0 || !username) throw new Error("Couldn't get Result");
                await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/quiz/result`, {
                    result, username, userId, attempts, points, achived
                }, data => data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [result, username, userId, attempts, points, achived]);
};