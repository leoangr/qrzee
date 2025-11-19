import { addToDatabase } from "./addToDatabase";

export const generateQR = ({
    type,
    value,
    setQrValue,
    setAlertOpen,
    setAlertMessage,
}: {
    type: string;
    value: string;
    setQrValue: (url: string) => void;
    setAlertOpen: (open: boolean) => void;
    setAlertMessage: (msg: string) => void;
}) => {

    try {
        
        const endpoint = "https://api.qrserver.com/v1/create-qr-code"
        let trimmedValue = value.trim();

        if (type === "URL" || type === "url") {

            try {
                new URL(trimmedValue);
            } catch {
                setAlertOpen(true)
                setAlertMessage("Please enter a valid URL!")
                return;
            }

        } else if (type === "Text" || type === "text") {

            if (!trimmedValue) {
                setAlertOpen(true)
                setAlertMessage("Please enter some text!")
                return;
            }

            if (trimmedValue.length > 800) {
                setAlertOpen(true)
                setAlertMessage("Text maximum is 800 characters")
                return;
            }
        }

        const qrData = `${endpoint}/?size=220x220&data=${encodeURIComponent(value)}`;
        setQrValue(qrData);
        addToDatabase(qrData, trimmedValue)
        
    } catch (error) {
        console.error(error)
    }
    
};
