import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

export const useAuthCommon = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");


    const { setUserInfo, saveInfoWithName } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleError = (error: Error) => {
        const msg = extractErrorMessage(error, "ログインできません");
        setErrorMessage(msg);
        toast.error(msg);
    }

    return {};
}