import { useNavigate } from "react-router-dom";

export const ErrorPage = ({ error }: { error: string }) => {
    const navigate = useNavigate ();
    return (
        <div>
            <p>{error}</p>
            <button onClick={() => navigate("/")} type="button">Volver</button>
        </div>
    )
}
