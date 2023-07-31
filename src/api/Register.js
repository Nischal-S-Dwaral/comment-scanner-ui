import {processFailure, processStart} from "../redux/userRedux";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from "../firebase"

/**
 * Call firebase create user and does redux actions
 * @param dispatch
 * @param navigate
 * @param user
 * @returns {Promise<void>}
 */
export const register = async (dispatch, navigate, user) => {
    dispatch(processStart());
    try {
        await createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const userCred = userCredential.user;
                updateProfile(userCred, {
                    displayName: user.username
                }).then(() => {
                    navigate("/login", {replace: true});
                }).catch((error) => {
                    console.error(error);
                });
            })
    } catch (error) {
        dispatch(processFailure(error.code))
    }
}